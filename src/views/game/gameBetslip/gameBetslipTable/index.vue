<template>
  <div class="game-container report-container">
    <div v-if="gameType === 'init'" class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="注单号:">
            <el-input
              v-model="queryData.id"
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
              v-model="queryData.thirdOrderId"
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
              v-model="netTime"
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
              v-model="queryData.gameCode"
              style="width: 200px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in gameTypeList"
                :key="item.gameCode"
                :label="item.gameName"
                :value="item.gameCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏类型:">
            <el-input
              v-model="queryData.gameTypeName"
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
              v-model="queryData.memberName"
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
              v-model="queryData.parentProxyName"
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
              v-model="queryData.playerName"
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
              v-model="queryData.betStatus"
              style="width: 180px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="已计算" value="1"></el-option>
              <el-option label="未计算" value="2"></el-option>
              <el-option label="已取消" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投注金额:">
            <el-input
              v-model="queryData.betAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="betAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.betAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="betAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员输赢:">
            <el-input
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注IP:">
            <el-input
              v-model="queryData.loginIp"
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
                v-for="item in betDeviceType"
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
          <el-table-column prop="id" align="center">
            <template slot="header">
              注单号
              <br />
              三方订单号
            </template>
            <template slot-scope="scope">
              {{ scope.row.id }}
              <br />
              {{ scope.row.thirdId }}
            </template>
          </el-table-column>
          <el-table-column prop="bankName" align="center">
            <template slot="header">
              游戏平台
              <br />
              游戏类型
            </template>
            <template slot-scope="scope">
              {{ scope.row.gameCode }}
              <br />
              {{ scope.row.gameTypeName }}
            </template>
          </el-table-column>
          <el-table-column prop="memberName" align="center" label="会员账号">
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.memberName"
                :title="scope.row.memberName"
                :copy="copy"
              >
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountType"
            align="center"
            label="账号类型"
          ></el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="上级代理">
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.parentProxyName"
                :title="scope.row.parentProxyName"
                :copy="copy"
              >
                {{ scope.row.parentProxyName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="playerName" align="center" label="游戏账号">
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.playerName"
                :title="scope.row.playerName"
                :copy="copy"
              >
                {{ scope.row.playerName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="betStatus" align="center" label="注单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.betStatus === '1'" class="normalRgba">已结算</span>
              <span
v-else-if="scope.row.betStatus === '2'"
class="deleteRgba"
>未结算</span>
              <span
v-else-if="scope.row.betStatus === '3'"
class="disableRgba"
>已取消</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="betAmount"
            align="center"
            label="投注金额"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="netAmount"
            align="center"
            label="会员输赢"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="createAt"
            align="center"
            label="投注时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="netAt"
            align="center"
            label="结算时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="loginIp" align="center" label="投注IP"></el-table-column>
          <el-table-column
            prop="deviceType"
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
    <div v-else class="game-container report-container">
      <div class="view-container dealer-container">
        <div class="review-content">
          <div class="head paddingLR">
            <p class="title">注单详情</p>
            <p class="right-btn">
              <el-button plain @click="goBack">返回</el-button>
            </p>
          </div>
          <strong class="paddingLR strong">投注人信息</strong>
          <div class="paddingLR paddingB">
            <el-row class="paddingLR">
              <el-col :span="6">账号类型： 正式</el-col>
              <el-col :span="6">会员账号： mico123456</el-col>
              <el-col :span="6">上级代理： mico11</el-col>
              <el-col :span="6">VIP等级： 5级</el-col>
              <el-col :span="6">游戏账号： 8885411</el-col>
              <el-col :span="6">
                账号状态：
                <span class="normalRgba">正常</span>
              </el-col>
              <el-col :span="6">该类游戏总输赢： +55555</el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
        </div>
        <realDetails v-if="gameType === 'zr'" :dataList="dataList"></realDetails>
        <chessDetails v-else-if="gameType === 'qp'" :dataList="dataList"></chessDetails>
        <sportDetails v-else-if="gameType === 'ty'" :dataList="dataList"></sportDetails>
        <eSportDetails v-else-if="gameType === 'dj'" :dataList="dataList"></eSportDetails>
        <lotteryDetails
          v-else-if="gameType === 'cp'"
          :dataList="dataList"
        ></lotteryDetails>
        <eGameDetails v-else-if="gameType === 'dy'" :dataList="dataList"></eGameDetails>
        <slotDetails v-else></slotDetails>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
import realDetails from './components/realDetails'
import chessDetails from './components/chessDetails'
import sportDetails from './components/sportDetails'
import eSportDetails from './components/eSportDetails'
import lotteryDetails from './components/lotteryDetails'
import eGameDetails from './components/eGameDetails'
import slotDetails from './components/slotDetails'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.gameBetslipTable,
  components: {
    realDetails,
    chessDetails,
    sportDetails,
    eSportDetails,
    lotteryDetails,
    eGameDetails,
    slotDetails
  },
  mixins: [list],
  data() {
    return {
      queryData: {},
      gameTypeList: [],
      searchTime: [startTime, endTime],
      netTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      summary: {
        count: 0,
        failCount: 0,
        successCount: 0
      },
      tableData: [],
      gameType: 'init',
      dataList: {}
    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountType
    },
    betDeviceType() {
      return this.globalDics.betDeviceType
    }
  },
  mounted() {
    this.getGameTypeList()
  },
  methods: {
    getGameTypeList() {
      this.$api.getMerchantGameGamePlant().then((res) => {
        if (res.code === 200) {
          this.gameTypeList = res.data
        }
      })
    },
    loadData() {
      // this.loading = true;
      const create = this.searchTime || []
      const net = this.netTime || []
      const [startTime, endTime] = create
      const [netAtStart, netAtEnd] = net
      let params = {
        ...this.queryData,
        createAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtStart: netAtStart ? dayjs(netAtStart).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtEnd: netAtEnd ? dayjs(netAtEnd).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      if (startTime && endTime && netAtStart && netAtEnd) {
        this.$api.getGameRecordNotes(params).then((res) => {
          console.log(res)
        })
      } else {
        this.$message.warning('请选择一个下注时间或者结算时间')
      }

      console.log(params)
    },
    reset() {
      this.queryData = {}
    },
    lookMsg(val) {
      console.log(val)
      this.dataList = { ...val }
      this.gameType = 'zr'
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
        case 'betAmountMax':
          if (
            !!this.queryData.betAmountMin &&
            value &&
            value * 1 <= this.queryData.betAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额输入最大值不能小于最小值`
            })
          } else {
            this.queryData.betAmountMax = value
          }
          break
        case 'netAmountMax':
          if (
            !!this.queryData.netAmountMin &&
            value &&
            value * 1 < this.queryData.netAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员输赢输入最大值不能小于最小值`
            })
          } else {
            this.queryData.netAmountMax = value
          }
          break
      }
    },
    goBack() {
      this.gameType = 'init'
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
.view-container {
  border: 1px solid #dcdfe6;
  font-size: 14px;
}
.review-content {
  line-height: 30px;
}
.paddingLR {
  padding: 0 30px;
}
.head {
  height: 70px;
  line-height: 70px;
  width: 100%;
  background: #000;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: rgb(192, 190, 190);
  }
  .right-btn {
    float: right;
  }
}
.strong {
  height: 70px;
  line-height: 80px;
}
.paddingB {
  padding-bottom: 30px;
}
</style>
