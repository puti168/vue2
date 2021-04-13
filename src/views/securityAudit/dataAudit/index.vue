<template>
  <div class="game-container role">
    <div class="flex-h flex-bc">
      <h2 class="h2-line">{{ $t('route.securityAudit') }}</h2>
      <div class="flex-h handle">
        <el-button type="primary" size="medium" icon="el-icon-search" @click="handleSearch">{{ $t('btn.query') }}</el-button>
        <el-button type="primary" size="medium" icon="el-icon-refresh" @click="handleReset">{{ $t('btn.reset') }}</el-button>
      </div>
    </div>
    <div class="params flex-h flex-bc">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item :label="$t('label.system')">
          <el-select v-model="form.type" size="medium" clearable style="width:280px;">
            <el-option :label="$t('label.noSelect')" value></el-option>
            <el-option label="商户管理系统" :value="0"></el-option>
            <el-option label="风控管理系统" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('label.user')">
          <el-input v-model="form.userName" size="medium" style="width:280px;" :placeholder="$t('placeholder.inputUser')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.business')">
          <el-input v-model="form.agentName" size="medium" style="width:280px;" :placeholder="$t('placeholder.inputBus')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.playId')">
          <el-input v-model="form.operation" size="medium" style="width:280px;" :placeholder="$t('placeholder.inputPlayId')" clearable></el-input>
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
        <el-table-column align="center" prop="sysName" :label="$t('label.sysName')"></el-table-column>
        <el-table-column align="center" prop="userName" :label="$t('label.userName')"></el-table-column>
        <el-table-column align="center" prop="agentName" :label="$t('label.agentName')"></el-table-column>
        <el-table-column align="center" prop="ip" :label="$t('label.ip')"></el-table-column>
        <el-table-column align="center" prop="operation" :label="$t('label.playId')"></el-table-column>
        <el-table-column align="center" prop="createTime" :label="$t('label.time')">
          <template v-if="scope.row.createTime" slot-scope="scope">
            <span>{{ scope.row.createTime | dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="hasPermission('5111')" align="center" fixed="right" :label="$t('tableColumn.operating')" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="showAuditDetail(scope.$index, scope.row)">{{ $t('btn.view') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination v-if="total > 0" :current-page.sync="pageIndex" layout="total,sizes,prev,pager,next,jumper" :page-sizes="$store.getters.pageSizes" :total="total" :page-size="pageSize" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
      <detail :drawer.sync="drawer" :auditData.sync="dealData" @close="closeDetail" />
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { getAuditList, getAuditDetail } from '@/api/audit'
import { getCurrentDate } from '@/utils/index'
import detail from './components/detail'
export default {
  name: 'SecurityAudit',
  components: { detail },
  mixins: [list],
  data() {
    return {
      listLoading: false,
      drawer: false,
      dealData: {},
      list: [],
      form: {
        type: '',
        userName: '',
        agentName: '',
        operation: '',
        time: getCurrentDate()
      },
      reSearch: false
    }
  },
  watch: {
    form: {
      handler(val) {
        const { time } = val
        const { type, userName, agentName, operation } = val
        const forms = { type, userName, agentName, operation }
        const para = Object.values(forms).some((key) => {
          return key !== ''
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
      this.listLoading = true
      const create = this.form.time || []
      const [startTime, endTime] = create
      const { userName, agentName, operation, type } = this.form
      const form = { userName, agentName, operation }
      Object.keys(form).forEach((key) => {
        form[key] = form[key].trim()
      })
      const params = {
        startTime: (startTime && startTime + '') || '',
        endTime: (endTime && endTime + '') || '',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ...form
      }
      if (type === 0) {
        params.sysName = '商户管理系统'
      } else if (type === 5) {
        params.sysName = '风控管理系统'
      } else {
        params.sysName = ''
      }
      getAuditList(params).then(
        (response) => {
          this.list = response.data.auditLogBOS
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
      getAuditDetail(params).then((res) => {
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
