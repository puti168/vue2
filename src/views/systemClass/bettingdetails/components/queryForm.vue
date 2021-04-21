<template>
  <el-form ref="form" :inline="true" :model="query" label-width="100px">
    <el-form-item label="比赛名称">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入比赛名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="比赛编号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入比赛编号"
      ></el-input>
    </el-form-item>
    <el-form-item label="注单号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入注单号"
      ></el-input>
    </el-form-item>
    <el-form-item label="游戏局号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入游戏局号"
      ></el-input>
    </el-form-item>
    <el-form-item label="会员账号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入会员账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="玩法">
      <el-select
        v-model="query.payout"
        style="width: 280px"
        :popper-append-to-body="false"
      >
        <el-option label="全部" :value="0"></el-option>
        <el-option label="庄免佣" :value="1"></el-option>
        <el-option label="闲" :value="2"></el-option>
        <el-option label="和" :value="3"></el-option>
        <el-option label="庄对" :value="4"></el-option>
        <el-option label="闲对" :value="5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="注单标记">
      <el-select
        v-model="query.payout"
        style="width: 280px"
        :popper-append-to-body="false"
      >
        <el-option label="全部" :value="0"></el-option>
        <el-option label="正常" :value="1"></el-option>
        <el-option label="跑局" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下注时间">
      <el-date-picker
        v-model="form.time"
        size="medium"
        :format="format"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="timestamp"
        clearable
        style="width: 280px"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="商户名称/编号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入商户名称/编号"
      ></el-input>
    </el-form-item>
    <el-form-item label="功能使用">
      <el-select
        v-model="query.payout"
        style="width: 280px"
        :popper-append-to-body="false"
      >
        <el-option label="全部" :value="0"></el-option>
        <el-option label="pass" :value="1"></el-option>
        <el-option label="暗注" :value="2"></el-option>
        <el-option label="托管" :value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="轮局信息">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 140px"
        placeholder="轮数"
      ></el-input>
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 140px"
        placeholder="局数"
      ></el-input>
    </el-form-item>
    <el-form-item label="终端类型">
      <el-select
        v-model="query.payout"
        style="width: 280px"
        :popper-append-to-body="false"
      >
        <el-option label="全部" :value="0"></el-option>
        <el-option label="APP" :value="1"></el-option>
        <el-option label="PC" :value="2"></el-option>
        <el-option label="H5" :value="3"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      query: {
        memberAccount: '',
        payout: 0
      },
      form: {
        time: [],
        time2: '',
        agentId: '',
        reportType: 2
      },
      timestamp: +new Date(),
      format: 'yyyy-MM-dd HH时'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
