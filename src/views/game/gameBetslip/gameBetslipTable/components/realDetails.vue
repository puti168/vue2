<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="betslip">
        <strong class="strong">注单信息</strong>
        <div>
          <el-row class="paddingLR paddingB">
            <el-col :span="6">注单号： {{ dataList.id }}</el-col>
            <el-col :span="6">三方注单号： {{ dataList.thirdOrderId }}</el-col>
            <el-col :span="6">局号： {{ dataList.roundNo }}</el-col>
            <el-col :span="6">游戏平台： {{ dataList.gameCode }}</el-col>
            <el-col :span="6">玩法名称： {{ dataList.playName }}</el-col>
            <el-col :span="6"> 游戏桌台号： {{ dataList.tableCode }} </el-col>
            <el-col :span="6">投注玩法： {{ dataList.playOptionName }}</el-col>
            <el-col :span="6">玩法赔率： {{ dataList.oddsValue }}</el-col>
            <el-col
:span="6"
>局结果： {{ dataList.judgeResultCn }}{{ dataList.judgeResult1 }}</el-col>
            <el-col :span="6">投注金额： {{ dataList.betAmount }}</el-col>
            <el-col :span="6">有效投注： {{ dataList.validBetAmount }}</el-col>
            <el-col :span="6">输赢金额： {{ dataList.netAmount }}</el-col>
            <el-col :span="6">注单状态： {{ dataList.betStatus }}</el-col>
            <el-col :span="6">投注IP： {{ dataList.loginIp }}</el-col>
            <el-col :span="6">投注终端： {{ dataList.deviceType }}</el-col>
            <el-col :span="6">投注时间： {{ dataList.createAt }}</el-col>
            <el-col :span="6">结算时间： {{ dataList.netAt }}</el-col>
            <el-col :span="6">同步时间： {{ dataList.synchronizationTime }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZrDetails',
  components: {},
  props: {
    dataList: {
      typeL: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.paddingLR {
  padding: 0 30px;
}
.betslip {
  line-height: 30px;
  padding: 30px;
  .strong {
    line-height: 70px;
  }
  .paddingB {
    padding-bottom: 30px;
  }
}
</style>
