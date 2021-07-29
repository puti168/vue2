<template>
  <div id="basicInformation">
    <div class="backgroundTitelBox">财务信息</div>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span>代理余额</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh('余额')"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        总余额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resBalanceList.balance }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金余额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resBalanceList.commissionBalance }}
        </span>
      </el-col>
      <el-col :span="16">
        额度余额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resBalanceList.quotaBalance }}
        </span>
      </el-col>
      <el-col>
        提现冻结金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resBalanceList.freezeAmount }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">佣金信息</div>
    <el-row class="msgList">
      <el-col :span="4">
        累计返佣： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ commission.rebateAmount }} </span>
      </el-col>
      <el-col :span="4">
        上月返佣： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ commission.lastMonthBalance }} </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span>充提信息</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh('充提')"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        存款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.rechargeAmount }} </span>
      </el-col>
      <el-col :span="4">
        取款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.withdrawAmount }} </span>
      </el-col>
      <el-col :span="16">
        银行卡数量： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.bankCount }} </span>
      </el-col>
      <el-col :span="4">
        存款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.rechargeCount }} </span>
      </el-col>
      <el-col :span="4">
        取款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.withdrawCount }} </span>
      </el-col>
      <el-col :span="16">
        虚拟币账号数量： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resPlayerList.virtualCoinCount }} </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="1"> 代存信息 </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh('代存')"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        代存总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.proxyRechargeTotal }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金代存总额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.commissionProxyRechargeTotal }}
        </span>
      </el-col>
      <el-col :span="16">
        额度代存总额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.quotaProxyRechargeTotal }}
        </span>
      </el-col>
      <el-col :span="4">
        代存总次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.proxyRechargeCount }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金代存次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.commissionProxyRechargeCount }}
        </span>
      </el-col>
      <el-col :span="4">
        额度代存次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resSurrogateList.quotaProxyRechargeCount }}
        </span>
      </el-col>
    </el-row>
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
    commission: { type: Object, default: () => ({}) },
    playerList: { type: Object, default: () => ({}) },
    surrogateList: { type: Object, default: () => ({}) }
  },
  data() {
    this.refresh = this.throttle(this.refresh, 1000)
    return {
      activeL: true,
      resBalanceList: {}, // 代理余额
      resPlayerList: {}, // 充提信息
      resSurrogateList: {} // 代存信息
    }
  },
  computed: {
    balanceData() {
      return this.balanceList
    },
    playerData() {
      return this.playerList
    },
    surrogateData() {
      return this.surrogateList
    }
  },
  watch: {
    balanceData: {
      handler(newV) {
        this.resBalanceList = { ...newV }
      },
      deep: true
    },
    playerData: {
      handler(newV) {
        this.resPlayerList = { ...newV }
      },
      deep: true
    },
    surrogateData: {
      handler(newV) {
        this.resSurrogateList = { ...newV }
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 代理余额
    getProxyDataBalance(val) {
      this.$api.getProxyDataBalance({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resBalanceList = res.data
          console.log('代理余额', res)
        }
      })
    },
    // 存提信息
    getRechargeAndWithdrawInfo(val) {
      this.$api.getRechargeAndWithdrawInfo({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resPlayerList = res.data
          console.log('存提信息', res)
        }
      })
    },
    // 代存信息
    getProxyDetailProxyRechargeInfo(val) {
      this.$api.getProxyDetailProxyRechargeInfo({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resSurrogateList = res.data
          console.log('代存信息', res)
        }
      })
    },
    refresh(val) {
      const params = this.parentData.userId
      switch (val) {
        case '余额':
          this.getProxyDataBalance(params)
          break
        case '充提':
          this.getRechargeAndWithdrawInfo(params)
          break
        case '代存':
          this.getProxyDetailProxyRechargeInfo(params)
          break

        default:
          break
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
