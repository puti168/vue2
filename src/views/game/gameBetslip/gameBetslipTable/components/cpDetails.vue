<template>
    <div class="dealer-container">
      <div class="betslip">
        <strong class="strong">投注人信息</strong>
        <div>
          <el-row class="paddingLR paddingB">
            <el-col :span="6">注单号： 45646544445451</el-col>
            <el-col :span="6">三方注单号： 45646544445451</el-col>
            <el-col :span="6">游戏平台： B端名称</el-col>
            <el-col :span="6">彩种名称： 极速飞艇</el-col>
            <el-col :span="6">注单状态： 已结算</el-col>
            <el-col :span="6">期号： 4545454545454A4</el-col>
            <el-col :span="6">模式： 2元</el-col>
            <el-col :span="6">赔率： 8.11</el-col>
            <el-col :span="6">投注内容： 5，6，8，9，10</el-col>
            <el-col :span="6">判奖内容： 5，6，8，9，10</el-col>
            <el-col :span="6">输赢金额： -60.00</el-col>
            <el-col :span="6">终端： H5</el-col>
            <el-col :span="6">投注IP： 192.168.0.1</el-col>
            <el-col :span="6">投注时间： 1991/11/11 06:11:12</el-col>
            <el-col :span="6">结算时间： 1991/11/11 07:11:12</el-col>
            <el-col :span="6">同步时间： 1991/11/11 08:11:12</el-col>
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
          <el-table-column prop="vipSerialNum" label="玩法名称" align="center">
          </el-table-column>
          <el-table-column prop="vipSerialNum" label="注数" align="center">
          </el-table-column>
          <el-table-column prop="vipSerialNum" label="倍数" align="center">
          </el-table-column>
          <el-table-column prop="vipSerialNum" label="投注金额" align="center">
          </el-table-column>
          <el-table-column prop="vipSerialNum" label="状态" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CpDetails',
  components: {},
  props: {},
  data() {
    return {
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        bankCode: '165416416464654',
        bankName: '中国银行',
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54',
        index: i
      }
    }
  },
  methods: {}
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
