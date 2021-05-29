<template>
  <div id="basicInformation">
    <div class="backgroundTitelBox">团队信息</div>
    <div class="titelBox">
      <el-row>
        <el-col :span="1">
          <span> 成员概览</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh('概览')"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        下级人数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.lowerLevelCount }} </span>
      </el-col>
      <el-col :span="4">
        活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.activeCount }} </span>
      </el-col>
      <el-col :span="4">
        有效活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.effectiveActiveCount }} </span>
      </el-col>
      <el-col :span="4">
        首存人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.firstCount }} </span>
      </el-col>
      <el-col :span="8">
        首存金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.firstAmount }} </span>
      </el-col>
      <el-col :span="4">
        今日新增： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.todayCount }} </span>
      </el-col>
      <el-col :span="4">
        今日活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.todayActiveCount }} </span>
      </el-col>
      <el-col :span="4">
        今日有效活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.todayEffectiveActiveCount }} </span>
      </el-col>
      <el-col :span="4">
        今日首存人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.todayFirstCount }} </span>
      </el-col>
      <el-col :span="8">
        今日首存金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.todayFirstAmount }} </span>
      </el-col>
      <el-col :span="4">
        本月新增： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.monthCount }} </span>
      </el-col>
      <el-col :span="4">
        本月活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.monthActiveCount }} </span>
      </el-col>
      <el-col :span="4">
        本月有效活跃人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.monthEffectiveActiveCount }} </span>
      </el-col>
      <el-col :span="4">
        本月首存人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.monthFirstCount }} </span>
      </el-col>
      <el-col :span="8">
        本月首存金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.monthFirstAmount }} </span>
      </el-col>
      <el-col :span="4">
        转入会员人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.transferInNum }} </span>
      </el-col>
      <el-col :span="4">
        转出会员人数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resOverviewList.transferOutNum }} </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2">
          <span>成员投注信息</span>
        </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button
type="primary"
icon="el-icon-refresh"
@click="refresh('投注')"
>刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList" style="margin-bottom: 30px">
      <el-col :span="4">
        今日活动： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayActive }} </span>
      </el-col>
      <el-col :span="4">
        今日返水： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayCashRebate }} </span>
      </el-col>
      <el-col :span="16">
        今日总派彩： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayPayout }} </span>
      </el-col>
      <el-col :span="4">
        今日总投注： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayBet }} </span>
      </el-col>
      <el-col :span="4">
        今日总有效投注： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayEffectiveBet }} </span>
      </el-col>
      <el-col :span="16">
        今日总输赢： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.todayWinAndLose }} </span>
      </el-col>
    </el-row>
    <el-row class="msgList">
      <el-col :span="4">
        本月活动： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthActive }} </span>
      </el-col>
      <el-col :span="4">
        本月返水： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthCashRebate }} </span>
      </el-col>
      <el-col :span="16">
        本月总派彩： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthPayout }} </span>
      </el-col>
      <el-col :span="4">
        本月总投注： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthBet }} </span>
      </el-col>
      <el-col :span="4">
        本月总有效投注： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthEffectiveBet }} </span>
      </el-col>
      <el-col :span="16">
        本月总输赢： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ resBettingList.monthWinAndLose }} </span>
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
    overviewList: { type: Object, default: () => ({}) },
    bettingList: { type: Object, default: () => ({}) },
    top3Sy: { type: Array, default: () => [] }
  },
  data() {
    return {
      activeL: true,
      resOverviewList: {}, // 成员概览
      resBettingList: {}, // 成员投注
      top3SyList: [],
      top3TzList: [],
      tabHeader: 'sy'
    }
  },
  computed: {
    overviewData() {
      return this.overviewList
    },
    bettingData() {
      return this.bettingList
    },
    top3SyData() {
      return this.top3Sy
    }
  },
  watch: {
    overviewData: {
      handler(newV) {
        this.resOverviewList = { ...newV }
      },
      deep: true
    },
    bettingData: {
      handler(newV) {
        this.resBettingList = { ...newV }
      },
      deep: true
    },
    top3SyData: {
      handler(newV) {
        this.top3SyList = newV
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 成员概览
    getProxyDetailTeamInfo(val) {
      this.$api.getProxyDetailTeamInfo({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resOverviewList = res.data
        }
      })
    },
    // 成员下注
    getProxyDetailTeamBet(val) {
      this.$api.getProxyDetailTeamBet({ userId: val }).then((res) => {
        if (res.code === 200) {
          this.resBettingList = res.data
        }
      })
    },
    refresh(val) {
      const params = this.parentData.userId
      if (val === '概览') {
        this.getProxyDetailTeamInfo(params)
      } else {
        this.getProxyDetailTeamBet(params)
      }
    },
    tabHeaderFn(val) {
      this.tabHeader = val
      if (val === 'sy') {
        const params = { userId: this.parentData.userId, orderKey: 1 }
        this.$api.getProxyDetailTop3Bet(params).then((res) => {
          if (res.code === 200) {
            this.top3SyList = res.data
          }
        })
      } else {
        const params = { userId: this.parentData.userId, orderKey: 2 }
        this.$api.getProxyDetailTop3Bet(params).then((res) => {
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
