<template>
  <div class="bd-account-panel">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="24">
        <a-form-model ref="loginForm" layout="inline" class="bd-center">
          <a-form-model-item label="账户总额度"> {{ totalBalance | formatNumber}} </a-form-model-item
          ><a-form-model-item label="=" :colon="false"> </a-form-model-item>
          <a-form-model-item label="现金额度"> {{ userInfo.balance | formatNumber }} </a-form-model-item
          ><a-form-model-item label="+" :colon="false"> </a-form-model-item>
          <a-form-model-item label="OB钱包额度">
            {{ walletBalance | formatNumber }}
          </a-form-model-item>
          <a-form-model-item>
            <balance-button text="存款" :type="1" @confirm="changeBlance" />
            <balance-button text="取款" :type="2" :default-amount="userInfo.balance" @confirm="changeBlance" />
            <balance-button text="上分" :type="3" :default-amount="userInfo.balance" @confirm="changeBlance" />
            <balance-button text="下分" :type="4" :default-amount="walletBalance" @confirm="changeBlance" />
            <a-button type="primary" class="balance-btn" @click="loadWallet">刷新</a-button>
          </a-form-model-item>
        </a-form-model></a-col
      >
    </a-row>
    <a-row>
      <a-col :span="6" class="balance-item">
        <ob-balance :obBalance="obBalance" />
      </a-col>
      <a-col :span="6" :key="item.gameCode" v-for="item in gameBalances" class="balance-item">
        <game-balance :balanceInfo="item" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import GameBalance from './GameBalance'
import ObBalance from './ObBalance'
import BalanceButton from './BalanceButton'
import { loadWalletBalance } from '@/api/wallet'
import { changeBalance } from '@/api/user'

const DICT_GAME = [
  { code: 'ty', value: '体育' },
  { code: 'zr', value: '真人' },
  { code: 'qp', value: '棋牌' },
  { code: 'dj', value: '电竞' },
  { code: 'cp', value: '彩票' },
  { code: 'dy', value: '电游' },
]
const DEFAULT_BALANCE = DICT_GAME.map((v) => ({
  gameCode: v.code,
  game: v.value,
  balance: 0,
}))
export default {
  name: 'AccountPanel',
  components: { GameBalance, ObBalance, BalanceButton },
  props: {
    userInfo: PropTypes.object.def({}),
  },
  data() {
    return {
      type: 1, //1：上分 2：下分 3:OB钱包转入 4：OB钱包转出
      walletBalance: 0,
      obBalance: 0,
      gameBalances: [],
    }
  },
  methods: {
    changeBlance(type, amount) {
      this.type = type
      const { username, balance } = this.userInfo
      if ((type == 2 && amount > balance) || amount<=0) {
        this.$message.warning(`取款金额不能大于${balance}，且必须为正数`)
        return
      }
      changeBalance({ type, amount, username }).then(
        this.$handleResponse((data) => {
          this.userInfo.balance = data.balance
        })
      )
    },
    loadWallet() {
      loadWalletBalance({
        loginName: this.userInfo.username,
        merchantCode: this.userInfo.merchantCode,
      }).then(({ code, data }) => {
        if (code != 0) {
          data = {
            obBalance: 0,
            totalBalance: 0,
            gameBalBoList: [],
          }
        }
        this.walletBalance = data.totalBalance
        this.obBalance = data.obBalance

        this.gameBalances = DEFAULT_BALANCE.map((v) => {
          let item = data.gameBalBoList.find((i) => v.gameCode == i.gameCode)
          let balance = v.balance
          if (item) {
            balance = item.balance
          }
          return { ...v, balance: balance }
        })
      })
    },
  },
  computed: {
    totalBalance(){
      return this.userInfo.balance + this.walletBalance
    }
  },
  created() {
    this.loadWallet()
  },
  watch: {
    userInfo(val) {
      this.loadWallet()
    },
  },
}
</script>
<style lang="less" scoped>
.bd-account-panel /deep/ .balance-item {
  margin-top: 20px;
}
.bd-account-panel /deep/ .balance-btn {
  margin-left: 16px;
}
.bd-center /deep/ .ant-form-item-children{
  font-size: 16px;;
}
.bd-center /deep/ label{
  font-size: 16px;;
}
</style>