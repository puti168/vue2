<template>
  <div class="dealer-container">
    <div class="betslip">
      <strong class="strong">注单信息</strong>
      <div>
        <el-row class="paddingLR paddingB">
          <el-col :span="6">注单号： {{ dataList.id }}</el-col>
          <el-col :span="6">三方注单号： {{ dataList.thirdOrderId }}</el-col>
          <el-col
:span="6"
>游戏平台：
            <span v-for="item in gameTypeList" :key="item.gameCode">
              {{ dataList.gameCode === item.gameCode ? item.gameName : "" }}
            </span>
          </el-col>
          <el-col :span="6">彩种名称： {{ dataList.seriesName }}</el-col>
          <el-col :span="6">注单状态： {{ dataList.betStatus }}</el-col>
          <el-col :span="6">期号： {{ dataList.ticketPlanNo }}</el-col>
          <el-col :span="6">模式： {{ dataList.betModel }}</el-col>
          <el-col :span="6">赔率： {{ dataList.oddsValue }}</el-col>
          <el-col :span="6">
            <span> 投注内容：</span>
            <span> {{ dataList.betNum }}</span>
          </el-col>
          <el-col :span="6">
            判奖内容： <span>{{ dataList.judgeResultCn }}</span>
          </el-col>
          <el-col :span="6">输赢金额： {{ dataList.netAmount }}</el-col>
          <el-col :span="6">
            终端： {{ typeFilter(dataList.deviceType, "betDeviceType") }}
          </el-col>
          <el-col :span="6">投注IP： {{ dataList.loginIp }}</el-col>
          <el-col :span="6">投注时间： {{ dataList.createAt }}</el-col>
          <el-col :span="6">结算时间： {{ dataList.netAt }}</el-col>
          <el-col :span="6">同步时间： {{ dataList.synchronizationTime }}</el-col>
        </el-row>
      </div>
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="tableData"
        style="width: 100%"
        :header-row-style="{ height: '24px', lineHeight: '24px', background: '#000' }"
      >
        <el-table-column prop="playName" label="玩法名称" align="center">
        </el-table-column>
        <el-table-column prop="betCount" label="注数" align="center"> </el-table-column>
        <el-table-column prop="betMultiple" label="倍数" align="center">
        </el-table-column>
        <el-table-column prop="betAmount" label="投注金额" align="center">
        </el-table-column>
        <el-table-column prop="betStatus" label="状态" align="center"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  name: 'CpDetails',
  components: {},
  mixins: [list],
  props: {
    dataList: {
      typeL: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      gameTypeList: {},
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getGameTypeList()
  },
  mounted() {
    const res = {}
    res.playName = this.dataList.playName
    res.betCount = this.dataList.betCount
    res.betMultiple = this.dataList.betMultiple
    res.betAmount = this.dataList.betAmount
    res.betStatus = this.dataList.betStatus
    this.tableData.push(res)
  },
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
/deep/.betslip {
  line-height: 30px;
  padding: 30px;
  .strong {
    line-height: 70px;
  }
  .paddingB {
    padding-bottom: 30px;
  }
  th {
    color: #ffff;
    background: #000;
    border: 1px solid #000;
  }
}
</style>
