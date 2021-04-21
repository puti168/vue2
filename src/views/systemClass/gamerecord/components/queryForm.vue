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
    <el-form-item label="比赛状态">
      <el-select v-model="query.formType" style="width: 280px">
        <el-option label="全选" :value="0"></el-option>
        <el-option label="预告中" :value="1"></el-option>
        <el-option label="报名中" :value="2"></el-option>
        <el-option label="比赛中" :value="3"></el-option>
        <el-option label="已取消-未成赛" :value="4"></el-option>
        <el-option label="已取消-手动取消" :value="5"></el-option>
        <el-option label="比赛结束" :value="6"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="参赛资格">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入参赛资格"
      ></el-input>
    </el-form-item>
    <el-form-item label="报名费">
      <el-input
        v-model="query.memberAccount"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入报名费"
      ></el-input>
    </el-form-item>
    <el-form-item label="开赛时间">
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
    <el-form-item label="结束时间">
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
  </el-form>
</template>

<script>
import dayjs from 'dayjs'
export default {
  components: {},
  props: {},
  data() {
    const start = dayjs().startOf('day')
    const end = dayjs().endOf('day')
    return {
      query: {
        memberAccount: '',
        formType: 0
      },
      form: {
        time: [start, end],
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
