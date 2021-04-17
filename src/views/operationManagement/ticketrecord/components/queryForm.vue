<template>
  <el-form ref="form" :inline="true" :model="query" label-width="100px">
    <el-form-item label="门票名称">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入门票名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="门票ID">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入门票ID"
      ></el-input>
    </el-form-item>
    <el-form-item label="时间">
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
    <el-form-item label="会员账号">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入会员账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="变更类型">
      <el-select
        v-model="query.payout"
        style="width: 280px"
        :popper-append-to-body="false"
      >
        <el-option label="全部类型" :value="0"></el-option>
        <el-option label="报名比赛" :value="1"></el-option>
        <el-option label="比赛奖励" :value="2"></el-option>
        <el-option label="主动退赛" :value="3"></el-option>
        <el-option label="比赛取消" :value="4"></el-option>
        <el-option label="兑换门票" :value="5"></el-option>
        <el-option label="获赠门票" :value="6"></el-option>
        <el-option label="门票过期" :value="7"></el-option>
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
