<template>
  <div class="game-container report-container">
    <div class="params">
      <el-form ref="form" :inline="true" :model="queryData">
        <el-form-item label="操作时间:">
          <el-date-picker
            v-model="formTime.time"
            size="medium"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            :clearable="false"
            :default-time="defaultTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="操作页面:">
          <el-select
            v-model="queryData.pageName"
            style="width: 300px"
            multiple
            placeholder="默认选择全部"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in EnumsList.operatePage"
              :key="item.value"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="显示终端:">
          <el-select
            v-model="queryData.clientType"
            style="width: 300px"
            multiple
            placeholder="默认选择全部"
            :popper-append-to-body="false"
          >
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in EnumsList.client"
              :key="item.codes"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input
            v-model="queryData.fieldName"
            clearable
            size="medium"
            :maxlength="20"
            style="width: 180px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="变更类型:">
          <el-select
            v-model="queryData.changeType"
            style="width: 300px"
            multiple
            placeholder="默认选择全部"
            :popper-append-to-body="false"
          >
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in EnumsList.changeType"
              :key="item.codein"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人:">
          <el-input
            v-model="queryData.createdBy"
            clearable
            size="medium"
            :maxlength="12"
            style="width: 180px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 30px">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="search"
          >
            查询
          </el-button>
          <el-button
            icon="el-icon-refresh-left"
            :disabled="loading"
            size="medium"
            @click="reset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view-container dealer-container">
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="dataList"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="changeTableSort"
        >
          <el-table-column prop="pageName" align="center" label="操作页面">
            <template slot-scope="scope">
              <p>{{ typeFilter(scope.row.pageName, "EnumsList.operatePage") }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="clientType" align="center" label="显示终端">
            <template slot-scope="scope">
              <p>{{ typeFilter(scope.row.clientType, "EnumsList.client") }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" align="center" label="名称">
          </el-table-column>
          <el-table-column prop="changeType" align="center" label="">
            <template slot-scope="scope">
              <p>{{ typeFilter(scope.row.changeType, "EnumsList.changeType") }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="beforeValue" label="变更前">
          </el-table-column>
          <el-table-column align="center" prop="afterValue" label="变更后">
          </el-table-column>
          <el-table-column prop="remark" align="center" label="备注">
          </el-table-column>
          <el-table-column prop="createdBy" align="center" width="100" label="操作人">
            <template slot-scope="scope">
              <p>{{ scope.row.applyName }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="操作时间"
            sortable="custom"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="pageNum"
          class="pageValue"
          background
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()
export default {
  name: 'MemberMsgChange',
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      formTime: {
        time: [start, end]
      },
      dataList: [],
	  EnumsList: [],
      title: ''
    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountType
    },
    virtualType() {
      return this.globalDics.virtualType
    },
    virtualProtocolType() {
      return this.globalDics.virtualProtocolType
    },
    applyType() {
      return this.globalDics.applyType
    }
  },
  created() {
    this.getEnums()
  },
  mounted() {},
  methods: {
    loadData() {
      const [startTime, endTime] = this.formTime.time || []
      let params = {
        ...this.queryData,
        startAt: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      if (!params.startAt || !params.endAt) {
        this.$message({
          message: '操作时间参数必传',
          type: 'info'
        })
        return
      }
      params = {
        ...this.getParams(params)
      }
      this.loading = true

      this.$api
        .getOperateConfigClientRecordQueryRecordList(params)
        .then((res) => {
          if (res.code === 200) {
            const response = res.data
            this.loading = false
            this.dataList = response.record
            this.total = response.totalRecord
          } else {
            this.loading = false
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getEnums() {
      this.$api.operateConfigClientRecordQueryEnumsAPI().then((res) => {
        if (res.code === 200) {
          this.EnumsList = res.data
        }
      })
    },
    changeTableSort({ column, prop, order }) {
      this.pageNum = 1
      console.log(prop)
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      }
      this.loadData()
    },
    reset() {
      this.queryData = {
        userName: '',
        applyName: '',
        accountType: [],
        applyType: []
      }
      this.pageNum = 1
      this.formTime.time = [start, end]
      this.loadData()
    },
    handleCurrentChange() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
</style>
