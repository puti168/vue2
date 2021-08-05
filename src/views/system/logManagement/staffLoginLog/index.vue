<template>
  <div class="game-container report-container">
     <div class="params">
      <el-form ref="form" :inline="true" :model="queryData">
        <el-form-item label="用户名称:">
          <el-input
            v-model="queryData.userName"
            clearable
            :maxlength="10"
            size="medium"
            style="width: 200px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录IP:">
          <el-input
            v-model="queryData.ip"
            clearable
            size="medium"
            :maxlength="20"
            style="width: 200px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="primary" icon="el-icon-search" size="medium" @click="search">
            查询
          </el-button>
          <el-button icon="el-icon-refresh-left" size="medium" @click="reset">
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
        >
          <el-table-column prop="userName" align="center" label="用户名">
          </el-table-column>
          <el-table-column
            prop="loginTime"
            align="center"
            label="登录时间"
          ></el-table-column>
          <el-table-column prop="ip" align="center" label="登录IP">
            <template slot="header"> 登录IP </template>
            <template slot-scope="scope">
              <span v-if="scope.row.ip !== null">
                {{ scope.row.ip }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="deviceNo" align="center" label="终端设备号" width="350">
            <template slot-scope="scope">
              <span v-if="scope.row.deviceNo !== null">
                {{ scope.row.deviceNo }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
         <el-table-column
            prop="loginRegion"
            align="center"
            label="登录地区"
          ></el-table-column>
          <el-table-column prop="loginStatus" align="center" label="登录状态">
            <template slot-scope="scope">
              <span v-if="scope.row.loginStatus === 0 " class="redColor">
                {{ typeFilter(scope.row.loginStatus, "loginStatusType") }}
              </span>
              <span v-else-if="scope.row.loginStatus > 0 " class="enableColor">
                {{ typeFilter(scope.row.loginStatus, "loginStatusType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
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
import { routerNames } from '@/utils/consts'
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()
export default {
  name: routerNames.memberLogin,
  components: {},
  mixins: [list],
  data() {
    this.search = this.throttle(this.search, 1000)
    this.reset = this.throttle(this.reset, 1000)
    return {
      queryData: {
        userName: '',
        loginStatus: '',
        loginIp: '',
        ipAttribution: '',
        deviceNo: ''
      },
      accountType1: [],
      deviceType1: [],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),

      formTime: {
        time: [start, end]
      },
      dataList: []
    }
  },
  computed: {
    loginStatusType() {
      return this.globalDics.loginStatusType
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }

      this.$api
        .getSystemUserLoginRecordQueryLoginLog(params)
        .then((res) => {
          if (res.code === 200) {
            this.dataList = res.data.records
            this.total = res.data.total
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    reset() {
      this.queryData = {
        userName: '',
        loginStatus: '',
        loginIp: '',
        ipAttribution: '',
        deviceNo: ''
      }
      this.pageNum = 1
      this.accountType1 = []
      this.deviceType1 = []
      this.formTime.time = [start, end]
      this.loadData()
    },
     _changeTableSort({ column, prop, order }) {
      if (prop === 'loginTime') {
				prop = 1
			}
      this.queryData.orderKey = prop
      console.log(this.queryData.orderKey, '小明')
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      }
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
.login1 {
  margin-top: 0;
  span {
    margin-left: 50px;
  }
}
.login2 {
  padding-bottom: 15px;
  .fail {
    margin-left: 50px;
  }
}
</style>
