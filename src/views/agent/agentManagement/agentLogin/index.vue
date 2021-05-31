<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="登录时间:">
            <el-date-picker
              v-model="loginTime"
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
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="代理账号:">
            <el-input
              v-model="queryData.userName"
              clearable
              maxlength="11"
              size="medium"
              style="width: 200px; margin-right: 20px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理类型:" class="tagheight" prop="accountType">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录状态:" class="tagheight" prop="loginStatus">
            <el-select
              v-model="queryData.loginStatus"
              style="width: 280px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in loginStatusType"
                :key="item.description"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录IP:" prop="loginIp">
            <el-input
              v-model="queryData.loginIp"
              clearable
              :maxlength="15"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP归属地:" prop="ipAttribution">
            <el-input
              v-model="queryData.ipAttribution"
              clearable
              :maxlength="10"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录终端:" class="tagheight" prop="deviceType">
            <el-select
              v-model="queryData.deviceType"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in loginDeviceType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端设备号:" prop="deviceNo">
            <el-input
              v-model="queryData.deviceNo"
              clearable
              :maxlength="50"
              size="medium"
              show-word-limit
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
        <div class="msgList">
          <p>
            <span>数据更新时间：</span><span>{{ now }}</span>
          </p>
          <p>
            总登录次数：
            {{ summary.count }}
            次
          </p>
        </div>
        <div class="msgList">
          <p>
            登录成功：<span class="enableColor">{{ summary.successCount }}</span>
            次
          </p>
          <p>
            登录失败：<span class="redColor">{{ summary.failCount }}</span>
            次
          </p>
        </div>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            prop="loginTime"
            align="center"
            label="登录时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="loginStatus" align="center" label="登录状态">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.loginStatus, "loginStatusType") }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="代理账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="accountType" align="center" label="代理类型">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column prop="loginIp" align="center" label="登录IP">
            <template slot="header">
              登录IP
              <br />
              风控层级
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.loginIp !== null">
                {{ scope.row.loginIp }}
              </span>
              <span v-else>-</span>
              <br />
              <span
class="redColor"
>风控层级：{{
                  scope.row.ipControlName === null
                    ? "无"
                    : scope.row.ipControlName
                }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ipAttribution"
            align="center"
            label="IP归属地"
          ></el-table-column>
          <el-table-column prop="deviceType" align="center" label="登录终端">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.deviceType, "loginDeviceType") }}
            </template>
          </el-table-column>
          <el-table-column prop="deviceNo" align="center" label="终端设备号">
            <template slot="header">
              终端设备号
              <br />
              风控层级
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.deviceNo !== null">
                {{ scope.row.deviceNo }}
              </span>
              <span v-else>-</span>
              <br />
              <span
class="redColor"
>风控层级：{{
                  scope.row.deviceNoControlName === null
                    ? "无"
                    : scope.row.deviceNoControlName
                }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="loginReference"
            align="center"
            label="登录地址"
          ></el-table-column>
          <el-table-column
            prop="browseContent"
            align="center"
            label="设备版本"
          ></el-table-column>
          <el-table-column
            prop="loginError"
            align="center"
            label="备注"
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
import { routerNames } from '@/utils/consts'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.gamePlatform,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      loginTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      summary: {
        count: 0,
        failCount: 0,
        successCount: 0
      },
      tableData: []
    }
  },
  computed: {
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    },
    loginStatusType() {
      return this.globalDics.loginStatusType
    },
    accountType() {
      return this.globalDics.accountType
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const create = this.loginTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        loginStartTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        loginEndTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getProxyDetailProxyLoginLog(params)
        .then((res) => {
          this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
            this.summary =
              res.data.summary !== null
                ? res.data.summary
                : { count: 0, failCount: 0, successCount: 0 }
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loginTime = [startTime, endTime]
      this.loadData()
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'loginTime') {
        prop = 1
      }
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      }
      this.loadData()
    },
    enterSubmit() {
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
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
}
.msgList {
  font-size: 14px;
  display: flex;
  p {
    margin-right: 20px;
    line-height: 24px;
  }
  &:last-child p {
    margin-bottom: 15px;
  }
}
</style>
