<template>
  <div class="game-container report-container">
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
      <lotteryDetails v-else-if="gameType === 'cp'" :dataList="dataList"></lotteryDetails>
      <eGameDetails v-else-if="gameType === 'dy'" :dataList="dataList"></eGameDetails>
      <slotDetails v-else></slotDetails>
    </div>
  </div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import realDetails from './components/realDetails'
import chessDetails from './components/chessDetails'
import sportDetails from './components/sportDetails'
import eSportDetails from './components/eSportDetails'
import lotteryDetails from './components/lotteryDetails'
import eGameDetails from './components/eGameDetails'
import slotDetails from './components/slotDetails'
export default {
  name: routerNames.gameBetslipDetails,
  components: {
    realDetails,
    chessDetails,
    sportDetails,
    eSportDetails,
    lotteryDetails,
    eGameDetails,
    slotDetails
  },
  props: {},
  data() {
    return {
      gameType: 'zr',
      dataList: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.name === 'gameBetslipDetails') {
      this.gameType = this.$route.query.gameType
      this.dataList = this.$route.query
    }
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
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
