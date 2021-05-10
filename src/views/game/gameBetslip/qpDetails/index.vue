<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <headerMsg></headerMsg>
      <div class="betslip">
        <strong class="strong">投注人信息</strong>
        <div>
          <el-row class="paddingLR paddingB">
            <el-col :span="6">注单号： 45646544445451</el-col>
            <el-col :span="6">三方注单号： 45646544445451</el-col>
            <el-col :span="6">牌局ID： 45646544445451</el-col>
            <el-col :span="6">游戏平台： B端名称</el-col>
            <el-col :span="6">游戏名称： 欢乐斗地主</el-col>
            <el-col :span="6"> 房间类型： 高级房 </el-col>
            <el-col :span="6">投注金额： 60.00</el-col>
            <el-col :span="6">有效投注： 60.00</el-col>
            <el-col :span="6">投注IP： 192.168.0.1</el-col>
            <el-col :span="6">输赢金额： -60.00</el-col>
            <el-col :span="6">投注时间： 1991/11/11 06:11:12</el-col>
            <el-col :span="6">结算时间： 1991/11/11 07:11:12</el-col>
            <el-col :span="6">投注终端： IOS</el-col>
            <el-col :span="6">注单状态： 已结算</el-col>
            <el-col :span="6">同步时间： 1991/11/11 08:11:12</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerMsg from '../gameBetslipTable/components/headerMsg'
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.zrDetails,
  components: { headerMsg },
  props: {},
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
.view-container {
  border: 1px solid #dcdfe6;
  font-size: 14px;
}
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
