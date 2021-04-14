<template>
  <div class="game-container role">
    <div class="flex-h flex-bc">
      <h2 class="h2-line">{{ $t('route.monitorAudit') }}</h2>
      <div class="flex-h handle">
        <el-button type="primary" size="medium" icon="el-icon-search" @click="handleSearch">{{ $t('btn.query') }}</el-button>
        <el-button type="primary" size="medium" icon="el-icon-refresh" @click="handleReset">{{ $t('btn.reset') }}</el-button>
      </div>
    </div>
    <div class="params flex-h flex-bc">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item :label="$t('label.alarmType')">
          <el-select v-model="form.alarmType" size="medium" clearable style="width:280px;">
            <el-option :label="$t('label.noSelect')" value></el-option>
            <el-option label="数据篡改" :value="1"></el-option>
            <el-option label="敏感操作" :value="2"></el-option>
            <el-option label="登录地址异常" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('label.alarmLevel')">
          <el-select v-model="form.alarmLevel" size="medium" clearable style="width:280px;">
            <el-option :label="$t('label.noSelect')" value></el-option>
            <el-option label="一级" :value="10"></el-option>
            <el-option label="二级" :value="5"></el-option>
            <el-option label="三级" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('label.times')">
          <el-date-picker
v-model="form.time"
size="medium"
format="yyyy-MM-dd HH:mm:ss"
type="datetimerange"
:picker-options="pickerOptions"
:default-time="defaultTime"
:range-separator="$t('placeholder.to')"
:start-placeholder="$t('placeholder.startTime')"
:end-placeholder="$t('placeholder.endTime')"
align="right"
value-format="timestamp"
></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-divider></el-divider>
      <el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
        <el-table-column align="center" prop="alarmType" :label="$t('tableColumn.alarmType')"></el-table-column>
        <el-table-column align="center" prop="alarmLevel" :label="$t('tableColumn.alarmLevel')"></el-table-column>
        <el-table-column align="center" prop="service" :label="$t('tableColumn.service')"></el-table-column>
        <el-table-column align="center" prop="method" :label="$t('tableColumn.monitorMethod')"></el-table-column>
        <el-table-column align="center" prop="alarmContent" :label="$t('tableColumn.alarmContent')"></el-table-column>
        <el-table-column align="center" prop="createTime" :label="$t('tableColumn.time')">
          <template v-if="scope.row.createTime" slot-scope="scope">
            <span>{{ scope.row.createTime | dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="hasPermission('5113')" align="center" fixed="right" :label="$t('tableColumn.operating')" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="showAuditDetail(scope.$index, scope.row)">{{ $t('btn.view') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination v-if="total > 0" :current-page.sync="pageIndex" layout="total,sizes,prev,pager,next,jumper" :page-sizes="$store.getters.pageSizes" :total="total" :page-size="pageSize" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
      <detail :drawer.sync="drawer" :monitorData.sync="dealData" @close="closeDetail" />
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { getAlarmList, getAlarmDetail } from '@/api/audit'
import { getCurrentDate } from '@/utils/index'
import detail from './components/detail'
export default {
  name: 'MonitorAudit',
  components: { detail },
  mixins: [list],
  data() {
    return {
      listLoading: false,
      drawer: false,
      dealData: {},
      list: [],
      form: {
        alarmType: '',
        alarmLevel: '',
        time: getCurrentDate()
      },
      reSearch: false
    }
  },
  watch: {
    form: {
      handler(val) {
        const { time } = val
        const { alarmType, alarmLevel } = val
        const forms = { alarmType, alarmLevel }
        const para = Object.values(forms).some((value) => {
          return value !== ''
        })
        if (para || time) {
          this.reSearch = true
        } else if (!para && !time && this.reSearch) {
          this.pageIndex = 1
          this.loadData()
          this.reSearch = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loadData() {
      const create = this.form.time || []
      const [startTime, endTime] = create
      const { alarmType, alarmLevel } = this.form
      const form = { alarmType, alarmLevel }
      const params = {
        startTime: (startTime && startTime + '') || '',
        endTime: (endTime && endTime + '') || '',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ...form
      }
      this.listLoading = true
      getAlarmList(params).then(
        (response) => {
          this.list = response.data.alarmBOList
          this.total = response.data.totalRecord
          this.listLoading = false
        },
        () => {
          this.listLoading = false
          this.$message({
            message: this.$t('message.getDataError'),
            type: 'error',
            duration: 2000
          })
        }
      )
    },
    handleSearch() {
      this.pageIndex = 1
      this.loadData()
    },
    handleReset() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = ''
      })
      this.form.time = getCurrentDate()
      this.loadData()
    },
    showAuditDetail(index, row) {
      const { id } = row
      if (!id) {
        this.$message({
          message: this.$t('message.getDataError'),
          type: 'error',
          duration: 1500
        })
        return
      }
      const params = { id }
      getAlarmDetail(params).then((res) => {
        if (res.code === 200) {
          this.dealData = res.data
          this.drawer = true
        } else {
          this.$message({
            message: this.$t('message.getDataError'),
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    closeDetail() {
      this.drawer = false
      this.dealData = {}
    }
  }
}
</script>
