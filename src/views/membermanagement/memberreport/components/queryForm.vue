<template>
  <div>
    <el-form ref="form" :inline="true" :model="query" label-width="100px">
      <el-form-item label="统计周期">
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
      <el-form-item label="累计注单量">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入上限"
        ></el-input>
        ——
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入下限"
        ></el-input>
      </el-form-item>
      <el-form-item label="累计投注额">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入上限"
        ></el-input>
        ——
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入下限"
        ></el-input>
      </el-form-item>
      <el-form-item label="累计返还金额">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入上限"
        ></el-input>
        ——
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入下限"
        ></el-input>
      </el-form-item>
      <el-form-item label="累计游戏输赢">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入上限"
        ></el-input>
        ——
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 122.5px"
          placeholder="请输入下限"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      query: {
        memberAccount: ''
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

<style lang="scss" scoped>
.innerbox {
  display: inline-block;
  margin-left: 30px;
}
</style>
