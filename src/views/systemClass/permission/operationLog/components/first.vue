<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">基本信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-col>
      <el-col :span="2" class="editMsg">
        <i class="el-icon-edit-outline"></i><br />
        编辑信息
      </el-col>
      <el-col :span="16" class="btngroup">
        <el-button type="primary">账号状态</el-button>
        <el-button type="primary">风控层级</el-button>
        <el-button type="primary">会员标签</el-button>
        <el-button type="primary">出生日期</el-button>
        <el-button type="primary">手机号码</el-button>
        <el-button type="primary">姓名</el-button>
        <el-button type="primary">性别</el-button>
        <el-button type="primary">邮箱</el-button>
        <el-button type="primary">账号备注</el-button>
      </el-col>
    </el-row>
    <div class="titelBox">概要信息</div>
    <el-row class="msgList">
      <el-col :span="5">会员账号：LAKA12</el-col>
      <el-col :span="5">账号类型：正式</el-col>
      <el-col :span="5">帐号状态：正常</el-col>
      <el-col :span="5">风控层级：风控二级</el-col>
      <el-col :span="5">首存时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">首存金额：10000.00</el-col>
      <el-col :span="5">最后登录时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">离线天数：20</el-col>
      <el-col :span="5">注册时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">注册IP：119.92.65.155</el-col>
      <el-col :span="5">注册端：PC</el-col>
      <el-col :span="5">上级代理：MICO123556</el-col>
      <el-col :span="5">会员标签：标签1</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">个人资料</div>
    <el-row class="msgList">
      <el-col :span="5">姓名：张龙</el-col>
      <el-col :span="5">性别：男</el-col>
      <el-col :span="5">出生日期：1911-11-11</el-col>
      <el-col :span="5">手机号码：+86 186****0227</el-col>
      <el-col :span="5">邮箱：akdjajj@qq.com</el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- <div class="titelBox">
      <p class="borderR"></p>
    </div> -->
    <el-row class="titelBox">
      <el-col :span="12">VIP信息</el-col>
      <el-col :span="12" class="borderL"></el-col>
    </el-row>
    <el-row class="msgList">
      <el-col :span="12" class="paddingBox">
        <el-row>
          <el-col :span="3">剩余</el-col>
          <el-col :span="7" class="textR">10000</el-col>
          <el-col :span="7" class="textR">10000</el-col>
          <el-col :span="7" class="textR">10000</el-col>
        </el-row>
        <el-row style="height: 14px">
          <el-col :span="3" style="color: #fff; height: 14px">进度条 </el-col>
          <el-col :span="7" class="">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
        </el-row>
        <el-row>
          <el-col :span="3">已完成</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" style="color: #fff">描述</el-col>
          <el-col :span="7" class="textC">(升级)存款金额</el-col>
          <el-col :span="7" class="textC">(升级)有效投注</el-col>
          <el-col :span="7" class="textC">(保级: 2019-12-31)有效投注</el-col>
        </el-row>
      </el-col>
      <el-col :span="10" class="paddingBox">
        <div>VIP等级：5</div>
        <div>VIP经验：20</div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">备注信息</div>
    <el-table
      border
      size="mini"
      class="small-size-table"
      :data="dataList"
      style="width: 100%"
      :header-cell-style="getRowClass"
    >
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column prop="updateDt" align="center" label="更新时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  mixins: [list],
  props: {},
  data() {
    return {
      percentage: 0,
      dataList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.percentage = (10000 / 20000) * 100 + 0
    if (this.percentage > 100) {
      this.percentage = 100
    }
    console.log(typeof this.percentage)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#basicInformation {
  font-size: 14px;
  line-height: 40px;
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
.refrestBox {
  text-align: center;
  border-right: 1px solid #ccc;
}
.editMsg {
  text-align: center;
  line-height: 20px;
  i {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
.btngroup button {
  min-width: 40px;
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
}
.msgList {
  line-height: 24px;
  margin-bottom: 10px;
}
.borderBox {
  height: 60px;
}
.borderL {
  position: absolute;
  right: 0;
  height: 130px;
  border-left: 1px solid #ccc;
}
.textR {
  text-align: right;
}
.paddingBox {
  padding: 0 30px;
}
.paddingL {
  padding-left: 30px;
}
.textC {
  text-align: center;
}
</style>
