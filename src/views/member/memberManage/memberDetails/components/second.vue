<template>
  <div id="basicInformation">
    <div class="backgroundTitelBox">财务信息</div>
    <div class="titelBox">
      <el-row>
        <el-col :span="1" style="cursor: pointer">
          <span @click="borderL = true">中心钱包</span>
        </el-col>
        <el-col :span="2" class="refrestBox cell">
          <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="3" style="line-height: 36px">
        <div>中心钱包余额：310.00</div>
        <div>提现冻结余额：20.00</div>
      </el-col>
      <el-col :span="13">
        <div
          v-show="borderL"
          class="blueColor"
          style="cursor: pointer"
          @click="borderL = !borderL"
        >
          点击查看全部场馆金额分布
        </div>
        <el-row v-show="!borderL" class="" :class="{ borderL: !borderL }">
          <el-col :span="8">
            <span class="width70 paddingL">AG：(admin789789)</span>
            <span class="blueColor width30 textR">10000000.00</span></el-col>
          <el-col :span="8">
            <span class="width70 paddingL">eBET：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="8">
            <span class="width70 paddingL">OB棋牌：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="8">
            <span class="width70 paddingL">贝博体育：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="8">
            <span class="width70 paddingL">OB彩票：(admin789789)</span>
            <span class="blueColor width30 textR">00.00</span>
          </el-col>
          <el-col :span="8">
            <span class="width70 paddingL">欢乐棋牌：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="8">
            <span class="width70 paddingL">小金真人：(admin789789)</span>
            <span class="blueColor width30 textR">10.00</span>
          </el-col>
          <el-col :span="16">
            <div class="blueColor textR decoration" @click="recycle">一键回收</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">
      <el-row>
        <el-col :span="2"> 提现流水信息 </el-col>
        <el-col :span="1" class="refrestBox cell">
          <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="msgList">
      <el-col :span="4">用户余额： 310.00</el-col>
      <el-col :span="20">所需流水： 310.00</el-col>
      <el-col :span="4">已完成投注流水： 0.00</el-col>
      <el-col :span="8">剩余流水： 310.00</el-col>
      <el-col :span="4">流水开始统计时间： 2019-09-19 15:55:54</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">充提信息</div>
    <el-row class="msgList">
      <el-col :span="4">存款总额： 8800.00</el-col>
      <el-col :span="20">取款总额： 2100.00</el-col>
      <el-col :span="4">存款次数： 13</el-col>
      <el-col :span="20">取款次数： 9次 (普通6次，大额3次)</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">投注信息</div>
    <el-row class="msgList">
      <el-col :span="4">总投注： 79232.00</el-col>
      <el-col :span="4">总派彩： 2100.00</el-col>
      <el-col :span="16">玩家输赢： 6700.00</el-col>
      <el-col :span="4">活动： 182.00</el-col>
      <el-col :span="4">返水： 182.00</el-col>
      <el-col :span="16">公司总输赢： -6700.00</el-col>
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
    <div v-if="tabHeader === 'sy'" style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="dataList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" type="index" label="平台"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="会员输赢"
        ></el-table-column>
        <el-table-column prop="updateDt" align="center" label="投注"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
    </div>
    <div v-else style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="dataList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" type="index" label="平台"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="投注金额"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="有效投注"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="会员输赢"
        ></el-table-column>
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
  props: {},
  data() {
    return {
      dataList: [],
      borderL: true,
      tabHeader: 'sy'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    recycle(val) {
      this.$confirm(
        `<strong>是否一键将所有钱汇总至中心钱包?</strong></br><span style='font-size:12px;color:#c1c1c1'>提现冻结金额不受影响</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '回收成功!'
          })
        })
        .catch(() => {})
    },
    tabHeaderFn(val) {
      console.log(val)
      this.tabHeader = val
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
.borderL {
  border-left: 1px solid #ccc;
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
