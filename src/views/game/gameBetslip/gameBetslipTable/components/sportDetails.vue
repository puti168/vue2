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
          <el-col :span="6">比赛类型： {{ dataList.gameTypeName }}</el-col>
          <el-col :span="6">投注金额： {{ dataList.betAmount }}</el-col>
          <el-col :span="6">
            投注终端：
            {{
              dataList.deviceType === "其他"
                ? dataList.deviceType
                : typeFilter(dataList.deviceType, "betDeviceType")
            }}
          </el-col>
          <el-col :span="6">投注IP： {{ dataList.loginIp }}</el-col>
          <el-col :span="6">输赢金额： {{ dataList.netAmount }}</el-col>
          <el-col :span="6">投注时间： {{ dataList.createAt }}</el-col>
          <el-col :span="6">结算时间： {{ dataList.netAt }}</el-col>
          <el-col :span="6">同步时间： {{ dataList.synchronizationTime }}</el-col>
          <el-col :span="6">注单归类： {{ dataList.betStatus }}</el-col>
        </el-row>
      </div>
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="dataList.details"
        style="width: 100%"
      >
        <el-table-column prop="matchDetail" label="赛事详情" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.matchDetail"></span>
          </template>
        </el-table-column>
        <el-table-column prop="marketDetail" label="盘口详情" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.marketDetail"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderDetail" label="注单详情" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.orderDetail"></span>
          </template>
        </el-table-column>
        <el-table-column prop="netAt" label="结算时间" align="center"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  name: 'TyDetails',
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
