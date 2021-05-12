<template>
  <div id="basicInformation">
    <div class="backgroundTitelBox">财务信息</div>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span>代理余额</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        总余额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.userBalance }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金余额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.runningWaterRequired }}
        </span>
      </el-col>
      <el-col :span="16">
        额度余额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.finishDetOnWater }}
        </span>
      </el-col>
      <el-col>
        提现冻结金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.residualFlow }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">佣金信息</div>
    <el-row class="msgList">
      <el-col :span="4">
        累计返佣： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="4">
        上月返佣： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span>充提信息</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        存款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="4">
        取款总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="16">
        银行卡数量： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="4">
        存款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="4">
        取款次数： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
      <el-col :span="16">
        虚拟币账号数量： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> 0 </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2"> 代存信息 </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">
        代存总额： <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.userBalance }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金代存总额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.runningWaterRequired }}
        </span>
      </el-col>
      <el-col :span="16">
        额度代存总额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.finishDetOnWater }}
        </span>
      </el-col>
      <el-col :span="4">
        代存总次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.residualFlow }}
        </span>
      </el-col>
      <el-col :span="4">
        佣金代存次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.waterStarTime }}
        </span>
      </el-col>
      <el-col :span="4">
        额度代存次数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ resWaterList.waterStarTime }}
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
    return {
      activeL: true,
      moneyList: {}, // 代理余额
      resWaterList: {} // 充提信息
    }
  },
  computed: {},
  watch: {
    balanceList: {
      handler(newV) {
        this.moneyList = newV
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
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
