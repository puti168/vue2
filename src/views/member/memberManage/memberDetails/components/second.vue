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
            :disabled="queryData.userId === ''"
            @click="refresh"
            >刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="3" style="line-height: 36px">
        <div>中心钱包余额：{{ balance }}</div>
        <div>提现冻结余额：{{ freezeBalance }}</div>
      </el-col>
      <el-col :span="13">
        <el-button
          v-show="borderL"
          type="text"
          class="blueColor"
          :disabled="queryData.userId === ''"
          @click="balanceAll"
          >点击查看全部场馆金额分布</el-button>
        <el-row v-show="!borderL" class="" :class="{ borderL: !borderL }">
          <!-- <el-col :span="8" v-for="item in balanceAllList" :key="item.gameCode">
            <span class="width70 paddingL"
              >{{ item.gameName }}：({{ queryData.userName }})</span
            >
            <span class="blueColor width30 textR">{{ item.balance }}</span></el-col
          > -->

          <el-col :span="8">
            <span class="width70 paddingL">小金真人：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="16">
            <div class="blueColor textR decoration" @click="recycle">一键回收</div>
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
            :disabled="queryData.userId === ''"
            @click="refreshTWithdrawWater"
            >刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">用户余额： {{ resWaterList.userBalance }}</el-col>
      <el-col :span="20">所需流水： {{ resWaterList.runningWaterRequired }}</el-col>
      <el-col :span="4">已完成投注流水： {{ resWaterList.finishDetOnWater }}</el-col>
      <el-col :span="8">剩余流水： {{ resWaterList.residualFlow }}</el-col>
      <el-col :span="4">流水开始统计时间： {{ resWaterList.waterStarTime }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">充提信息</div>
    <el-row class="msgList">
      <el-col :span="4">存款总额： {{ playerList.sumDepositAmount }}</el-col>
      <el-col :span="20">取款总额： {{ playerList.sumWithdrawAmount }}</el-col>
      <el-col :span="4">存款次数： {{ playerList.depositTimes }}</el-col>
      <el-col
:span="20"
>取款次数： {{ playerList.withdrawTimes }} (普通{{
          playerList.commonWithdrawTimes
        }}次，大额{{ playerList.bigWithdrawTimes }}次)</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">投注信息</div>
    <el-row class="msgList">
      <el-col :span="4">总投注： {{ sumList.betAmount }}</el-col>
      <el-col :span="4">总派彩： {{ sumList.payAmount }}</el-col>
      <el-col :span="16">玩家输赢： {{ sumList.netAmount }}</el-col>
      <el-col :span="4">活动： {{ sumList.discountAmount }}</el-col>
      <el-col :span="4">返水： {{ sumList.returnWaterAmount }}</el-col>
      <el-col :span="16">公司总输赢： {{ sumList.companyNetAmount }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2"> top前3平台统计 </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button
            type="primary"
            :disabled="queryData.userId === ''"
            @click="tabHeaderFn('sy')"
            >输赢</el-button>
        </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button
            type="primary"
            :disabled="queryData.userId === ''"
            @click="tabHeaderFn('tz')"
            >投注</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if="tabHeader === 'sy'" style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="top3SyList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" type="index" label="平台"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="会员输赢"
        ></el-table-column>
        <el-table-column prop="updateDt" align="center" label="投注"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
    </div>
    <div v-else style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="top3TzList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" type="index" label="平台"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="投注金额"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="有效投注"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="会员输赢"
        ></el-table-column>
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
    queryData: { type: Object, default: () => ({}) },
    balanceList: { type: Object, default: () => ({}) },
    waterList: { type: Object, default: () => ({}) },
    top3Sy: { type: Array, default: () => [] },
    playerList: { type: Object, default: () => ({}) },
    sumList: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      balance: '', // 提现冻结
      freezeBalance: '', // 中心钱包
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
        this.balance = newV.balance
        this.freezeBalance = newV.freezeBalance
      },
      deep: true,
      immediate: true
    },
    waterList: {
      handler(newV) {
        this.resWaterList = newV
      },
      deep: true,
      immediate: true
    },
    top3Sy: {
      handler(newV) {
        this.top3SyList = newV
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询中心钱包余额
    getAccountCashAccount(val) {
      this.$api.getAccountCashAccount({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.balance = res.data.balance
        }
      })
    },
    // 提现冻结余额
    getWithdrawalFreeze(val) {
      this.$api.getWithdrawalFreeze({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.freezeBalance = res.data.freezeBalance
        }
      })
    },
    // 一键查询所有场馆余额
    getOneKeyBalance(val) {
      this.$api.getOneKeyBalance({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.balanceAllList = res.data
        }
        console.log('一键查询所有场馆余额', res)
      })
    },
    // 一键下分
    getOneKeyWithdraw(val) {
      this.$api.getOneKeyWithdraw(val).then((res) => {
        console.log(res)
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
      this.getOneKeyBalance(this.queryData.userId)
      this.borderL = false
    },
    refresh() {
      const params = this.queryData.userId
      this.getAccountCashAccount(params)
      this.getWithdrawalFreeze(params)
      this.getOneKeyBalance(params)
    },
    refreshTWithdrawWater() {
      const val = this.queryData.userId
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
          // this.$message({
          //   type: 'success',
          //   message: '回收成功!'
          // })
          this.getOneKeyWithdraw(this.queryData.userId).then((res) => {
            console.log(res)
          }) // 一键下分
        })
        .catch(() => {})
    },
    tabHeaderFn(val) {
      console.log(val)
      this.tabHeader = val
      if (val === 'sy') {
        const params = { userId: this.queryData.userId, orderKey: 1 }
        this.$api.getPlayerTop3(params).then((res) => {
          if (res.code === 200) {
            this.top3SyList = res.data
          }
        })
      } else {
        const params = { userId: this.queryData.userId, orderKey: 2 }
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
