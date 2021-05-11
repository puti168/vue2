<template>
  <div class="game-container report-container">
    <h3>代理登录信息</h3>
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="登录时间:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              :default-time="defaultTime"
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="代理账号:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入会员账号"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理类型:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 280px"
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
          <el-form-item label="登录状态:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 280px"
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
          <el-form-item label="登录IP:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="30"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP归属地:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="30"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录终端:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 280px"
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
          <el-form-item label="登录设备号:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="30"
              size="medium"
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
            登录失败<span class="redColor">{{ summary.successCount }}</span>
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
            prop="vipSerialNum"
            align="center"
            label="登录时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="登录状态"
          ></el-table-column>
          <el-table-column prop="createDt" align="center" label="代理账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.createDt" :title="scope.row.createDt" :copy="copy">
                {{ scope.row.createDt }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="代理类型"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="登录IP"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="IP归属地"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="登录终端"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="终端设备号"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="登录地址"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="设备版本"
          ></el-table-column>
          <el-table-column prop="updateDt" align="center" label="备注"></el-table-column>
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
      queryData: {
        accountType: []
      },
      searchTime: [startTime, endTime],
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
    accountType() {
      return this.globalDics.accountType
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        bankCode: '165416416464654',
        bankName: '中国银行',
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
    },
    reset() {
      this.queryData = {}
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'vipSerialNum') {
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
