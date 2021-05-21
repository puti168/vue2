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
            <el-col :span="6">
              游戏平台：
              <span v-for="item in gameTypeList" :key="item.gameCode">
                {{ dataList.gameCode === item.gameCode ? item.gameName : "" }}
              </span>
            </el-col>
            <el-col :span="6">玩法名称： {{ dataList.gameTypeName }}</el-col>
            <el-col :span="6"> 游戏桌台号： {{ dataList.tableCode }} </el-col>
            <el-col :span="6">投注玩法： {{ dataList.playOptionName }}</el-col>
            <el-col :span="6">玩法赔率： {{ dataList.oddsValue }}</el-col>
            <el-col :span="6">局结果： {{ dataList.judgeResult1 }}</el-col>
            <el-col :span="6">投注金额： {{ dataList.betAmount }}</el-col>
            <el-col :span="6">有效投注： {{ dataList.validBetAmount }}</el-col>
            <el-col :span="6">输赢金额： {{ dataList.netAmount }}</el-col>
            <el-col :span="6">注单状态： {{ dataList.betStatus }}</el-col>
            <el-col :span="6">投注IP： {{ dataList.loginIp }}</el-col>
            <el-col :span="6">
              投注终端：
              {{
                dataList.deviceType === "其他"
                  ? dataList.deviceType
                  : typeFilter(dataList.deviceType, "betDeviceType")
              }}
            </el-col>
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
import list from '@/mixins/list'
export default {
  name: 'ZrDetails',
  components: {},
  mixins: [list],
  props: {
    dataList: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      gameTypeList: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getGameTypeList()
  },
  mounted() {},
  methods: {
    getGameTypeList() {
      this.$api.getMerchantGameGamePlant().then((res) => {
        if (res.code === 200) {
          this.gameTypeList = res.data
        }
      })
    }
  }
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
