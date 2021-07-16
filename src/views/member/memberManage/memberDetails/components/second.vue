<template>
  <div id="basicInformation">
    <div class="backgroundTitelBox">财务信息</div>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span @click="borderL = true">中心钱包</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="3" style="line-height: 36px">
        <div>
          中心钱包余额：<i v-if="activeL" class="el-icon-loading"></i>
          <span v-else>
            {{ moneyList.balance }}
          </span>
        </div>
        <div>
          提现冻结余额：<i v-if="activeL" class="el-icon-loading"></i>
          <span v-else>
            {{ moneyList.freezeBalance }}
          </span>
        </div>
      </el-col>
      <el-col :span="13">
        <el-button
v-show="borderL"
type="text"
class="blueColor"
@click="balanceAll"
>点击查看全部场馆金额分布</el-button>
        <el-row v-show="!borderL" :class="{ borderL: !borderL }">
          <el-col v-for="item in balanceAllList" :key="item.gameCode" :span="8">
            <span v-show="item.gameName !== null" class="width70 paddingL">
              {{ item.gameName }}：({{ item.playName }})
            </span>
            <span class="blueColor width30 textR">{{ item.balance }}</span>
          </el-col>
          <el-col v-show="balanceAllList.length > 0" :span="16">
            <div
              class="blueColor textR decoration"
              style="width: 80px; float: right"
              @click="recycle"
            >
              一键回收
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2"> 提现流水信息 </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refreshTWithdrawWater"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        用户余额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.userBalance }}
        </span>
      </el-col>
      <el-col :span="20">
        所需流水：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.runningWaterRequired }}
        </span>
      </el-col>
      <el-col :span="4">
        已完成投注流水：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.finishDetOnWater }}
        </span>
      </el-col>
      <el-col :span="8">
        剩余流水：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.residualFlow }}
        </span>
      </el-col>
      <el-col :span="4">
        流水开始统计时间：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.waterStarTime }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">充提信息</div>
    <el-row class="msgList">
      <el-col :span="4">
        存款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ playerList.totalDepositAmount }}
        </span>
      </el-col>
      <el-col :span="20">
        取款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ playerList.totalWithdrawAmount }}
        </span>
      </el-col>
      <el-col :span="4">
        存款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ playerList.totalDepositNum }}
        </span>
      </el-col>
      <el-col :span="20">
        取款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ playerList.totalWithdrawNum }} (普通{{ playerList.generalCount }}次，大额{{
            playerList.bigCount
          }}次)
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">投注信息</div>
    <el-row class="msgList">
      <el-col :span="4">
        总投注：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.betAmount }}
        </span>
      </el-col>
      <el-col :span="4">
        总派彩：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.payAmount }}
        </span>
      </el-col>
      <el-col :span="16">
        玩家输赢：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.netAmount }}
        </span>
      </el-col>
      <el-col :span="4">
        活动：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.discountAmount }}
        </span>
      </el-col>
      <el-col :span="4">
        返水：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.returnWaterAmount }}
        </span>
      </el-col>
      <el-col :span="16">
        公司总输赢：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ sumList.companyNetAmount }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2"> top前3平台统计 </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button type="primary" @click="tabHeaderFn('sy')">输赢</el-button>
        </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button type="primary" @click="tabHeaderFn('tz')">投注</el-button>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="activeL"
      style="
        height: 100px;
        width: 300px;
        line-height: 100px;
        text-align: center;
        font-size: 24px;
      "
    >
      <i class="el-icon-loading"></i>
    </div>
    <div v-else style="width: 70%">
      <el-table
        v-if="tabHeader === 'sy'"
        border
        size="mini"
        class="small-size-table"
        :data="top3SyList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" prop="gameName" label="平台">
          <template slot-scope="scope">
            <span class="blueColor">{{ scope.row.gameName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="netAmount" align="center" label="会员输赢">
          <template slot-scope="scope">
            <span v-if="scope.row.netAmount > 0" class="redColor">{{
              scope.row.netAmount
            }}</span>
            <span v-else-if="scope.row.netAmount < 0" class="enableColor">{{
              scope.row.netAmount
            }}</span>
            <span v-else>{{ scope.row.netAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="betAmount" align="center" label="投注"></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
      <el-table
        v-else
        border
        size="mini"
        class="small-size-table"
        :data="top3TzList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" prop="gameName" label="平台">
          <template slot-scope="scope">
            <span class="blueColor">{{ scope.row.gameName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="betAmount"
          align="center"
          label="投注金额"
        ></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
        <el-table-column prop="netAmount" align="center" label="会员输赢">
          <template slot-scope="scope">
            <span v-if="scope.row.netAmount > 0" class="redColor">{{
              scope.row.netAmount
            }}</span>
            <span v-else-if="scope.row.netAmount < 0" class="enableColor">{{
              scope.row.netAmount
            }}</span>
            <span v-else>{{ scope.row.netAmount }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: {
    parentData: { type: Object, default: () => ({}) },
    balanceList: { type: Object, default: () => ({}) },
    waterList: { type: Object, default: () => ({}) },
    top3Sy: { type: Array, default: () => [] },
    playerList: { type: Object, default: () => ({}) },
    sumList: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      activeL: true,
      moneyList: {
        balance: '', // 提现冻结
        freezeBalance: '' // 中心钱包
      },
      balanceAllList: [], // 一键查询所有场馆
      resWaterList: {}, // 充提信息
      top3SyList: [],
      top3TzList: [],
      borderL: true,
      tabHeader: 'sy'
    }
  },
  computed: {},
  watch: {
    balanceList: {
      handler(newV) {
        // this.balance = newV.balance;
        // this.freezeBalance = newV.freezeBalance;
        this.moneyList = { ...newV }
      },
      deep: true
    },
    waterList: {
      handler(newV) {
        this.resWaterList = newV
      },
      deep: true
    },
    top3Sy: {
      handler(newV) {
        this.top3SyList = newV
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询中心钱包余额
    getAccountCashAccount(val) {
      this.$api.getAccountCashAccount({ userId: val }).then((res) => {
        if (res.code === 200 && res.data !== null) {
          this.moneyList.balance = res.data.balance
        } else {
          this.moneyList.balance = ''
        }
      })
    },
    // 提现冻结余额
    getWithdrawalFreeze(val) {
      this.$api.getWithdrawalFreeze({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.moneyList.freezeBalance = res.data.freezeBalance
        }
      })
    },
    // 一键查询所有场馆余额
    getOneKeyBalance(val) {
      this.$api
        .getOneKeyBalance({ userId: val })
        .then((res) => {
          if (res.code === 200) {
            this.balanceAllList = res.data
          }
        })
        .catch(() => {
          this.borderL = true
        })
    },
    // 一键下分
    getOneKeyWithdraw(val) {
      this.$api
        .getOneKeyWithdraw(val)
        .then((res) => {
          if (res.code === 200) {
            this.refresh()
            this.$message({
              type: 'success',
              message: '回收成功!'
            })
          }
        })
        .catch(() => {
          this.borderL = true
        })
    },
    // 提现流水查询
    getWithdrawWater(val) {
      this.$api.getWithdrawWater({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resWaterList = res.data
        }
      })
    },
    balanceAll() {
      this.getOneKeyBalance(this.parentData.userId)
      this.borderL = false
    },
    refresh() {
      const params = this.parentData.userId
      this.getAccountCashAccount(params)
      this.getWithdrawalFreeze(params)
      this.borderL = true
    },
    refreshTWithdrawWater() {
      const val = this.parentData.userId
      this.getWithdrawWater(val)
    },
    recycle(val) {
      this.$confirm(
        `<strong>是否一键将所有钱汇总至中心钱包?</strong></br><span style='font-size:12px;color:#c1c1c1'>提现冻结金额不受影响</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.getOneKeyWithdraw({ userId: this.parentData.userId }) // 一键下分
        })
        .catch(() => {})
    },
    tabHeaderFn(val) {
      this.tabHeader = val
      if (val === 'sy') {
        const params = { userId: this.parentData.userId, orderKey: 1 }
        this.$api.getPlayerTop3(params).then((res) => {
          if (res.code === 200) {
            this.top3SyList = res.data
          }
        })
      } else {
        const params = { userId: this.parentData.userId, orderKey: 2 }
        this.$api.getPlayerTop3(params).then((res) => {
          if (res.code === 200) {
            this.top3TzList = res.data
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#basicInformation {
  font-size: 14px;
  line-height: 40px;
  padding-top: 10px;
  padding-bottom: 40px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
.titelBox {
  font-size: 16px;
  font-weight: bold;
  position: relative;
}
.backgroundTitelBox {
  width: 188px;
  height: 40px;
  text-align: center;
  background: #000;
  color: rgb(255, 255, 255);
}
.cell .el-button {
  min-width: 60px;
  height: 24px;
  line-height: 24px;
}
.refrestBox {
  text-align: center;
}
.msgList {
  line-height: 24px;
  margin-bottom: 10px;
}
.borderL {
  min-height: 72px;
  border-left: 1px solid #ccc;
}
.textR {
  text-align: right;
}
.paddingL {
  padding-left: 30px;
}
.width70 {
  display: inline-block;
  box-sizing: border-box;
  min-width: 68%;
}
.width30 {
  display: inline-block;
  min-width: 30%;
}
.decoration {
  text-decoration: underline;
  cursor: pointer;
}
</style>
