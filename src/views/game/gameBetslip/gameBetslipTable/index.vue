<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="注单号:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="100"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="三方注单号:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="100"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="下注时间:">
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
          <el-form-item label="结算时间:">
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
          <el-form-item label="游戏平台:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 180px"
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
          <el-form-item label="游戏类型:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="100"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员账号:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号类型:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 180px"
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
          <el-form-item label="上级代理:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="游戏账号:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="25"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="注单状态:" class="tagheight">
            <el-select
              v-model="queryData.accountType1"
              style="width: 180px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="已计算" value="1"></el-option>
              <el-option label="未计算" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投注金额:">
            <el-input
              v-model="queryData.offLineDaysStart"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="offLineDaysStart"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.offLineDaysEnd"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="offLineDaysEnd"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员输赢:">
            <el-input
              v-model="queryData.offLineDays"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="offLineDays"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.offLine"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="offLine"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注IP:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="15"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注终端:" class="tagheight">
            <el-select
              v-model="queryData.deviceType"
              style="width: 180px; margin-right: 20px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in deviceType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
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
          <p>总注单数：{{ summary.count }}条</p>
        </div>
        <div class="msgList">
          <p>
            <span class="normalRgba">已结算</span>
            <span>{{ summary.successCount }}</span>
            条
          </p>
          <p>
            <span class="deleteRgba">未结算</span>
            <span>{{ summary.successCount }}</span>
            条
          </p>
          <p>投注金额：5000</p>
          <p>
            会员输赢：
            <span class="redColor">{{ summary.successCount }}</span>
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
          <el-table-column prop="vipSerialNum" align="center">
            <template slot="header">
              注单号
              <br />
              三方订单号
            </template>
          </el-table-column>
          <el-table-column prop="bankName" align="center">
            <template slot="header">
              游戏平台
              <br />
              游戏类型
            </template>
          </el-table-column>
          <el-table-column prop="createDt" align="center" label="会员账号">
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
            label="账号类型"
          ></el-table-column>
          <el-table-column prop="createDt" align="center" label="上级代理">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.createDt" :title="scope.row.createDt" :copy="copy">
                {{ scope.row.createDt }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDt" align="center" label="游戏账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.createDt" :title="scope.row.createDt" :copy="copy">
                {{ scope.row.createDt }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="" align="center" label="注单状态">
            <template slot-scope="">
              <span class="normalRgba">已结算</span>
              <span class="deleteRgba">未结算</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="投注金额"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="会员输赢"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="投注时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="结算时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="投注IP"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="投注终端"
          ></el-table-column>
          <el-table-column prop="operation" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-view"
                size="medium"
                @click="lookMsg(scope.row)"
              >
                查看详情
              </el-button>
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
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.gameBetslipTable,
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
    },
    deviceType() {
      return this.globalDics.deviceType
    }
  },
  mounted() {
    this.tableData[0] = {
      bankCode: '165416416464654',
      bankName: '真人游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'zr'
    }
    this.tableData[1] = {
      bankCode: '165416416464654',
      bankName: '棋牌游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'qp'
    }
    this.tableData[2] = {
      bankCode: '165416416464654',
      bankName: '体育游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'ty'
    }
    this.tableData[3] = {
      bankCode: '165416416464654',
      bankName: '电竞游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'dj'
    }
    this.tableData[4] = {
      bankCode: '165416416464654',
      bankName: '彩票游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'cp'
    }
    this.tableData[5] = {
      bankCode: '165416416464654',
      bankName: '电游游戏',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'dy'
    }
    this.tableData[6] = {
      bankCode: '165416416464654',
      bankName: '老虎机',
      createDt: '2021-02-13 20:28:54',
      updateDt: '2021-02-13 20:28:54',
      gameType: 'lhj'
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
    lookMsg(val) {
      console.log(val)
      this.$store.dispatch('tagsView/delView', {
        name: routerNames.gameBetslipDetails
      })
      this.$nextTick(() => {
        this.$router.push({
          path: '/game/gameBetslip/gameBetslipDetails',
          query: val
        })
      })
      // switch (val.gameType) {
      //   case "zr":

      //     break;
      // }
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
    checkValue(e) {
      const { name, value } = e.target
      switch (name) {
        case 'offLineDaysEnd':
          if (
            !!this.queryData.offLineDaysStart &&
            value &&
            value * 1 <= this.queryData.offLineDaysStart * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额输入最大值不能小于最小值`
            })
          }
          break
        case 'offLine':
          if (
            !!this.queryData.offLineDays &&
            value &&
            value * 1 <= this.queryData.offLineDays * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员输赢输入最大值不能小于最小值`
            })
          }
          break
      }
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
  line-height: 24px;
  text-align: center;
  p {
    margin-right: 20px;
  }
  &:last-child p {
    margin-bottom: 15px;
  }
}
</style>
