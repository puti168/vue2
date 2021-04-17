<template>
  <div>
    <el-form ref="form" :inline="true" :model="query" label-width="100px">
      <el-form-item label="交易日期">
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
      <el-form-item label="会员账号">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 280px"
          placeholder="请输入会员账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="会员昵称">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 280px"
          placeholder="请输入会员昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="交易金额">
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 120px"
          placeholder="请输入上限"
        ></el-input>
        ——
        <el-input
          v-model="query.memberAccount"
          clearable
          size="medium"
          style="width: 120px"
          placeholder="请输入下限"
        ></el-input>
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
    <el-form :inline="true" :model="checkedData" label-width="100px">
      <el-form-item label="流水类别:">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          class="innerbox"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in cityOptions"
            :key="item.label"
            :label="item.value"
            >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
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
      format: 'yyyy-MM-dd HH时',
      checkedData: {},
      checkAll: false,
      isIndeterminate: true,
      cityOptions: [
        { label: '上分', value: 1 },
        { label: '下分', value: 2 },
        { label: '下注', value: 3 },
        { label: '派彩', value: 4 },
        { label: '重算', value: 5 },
        { label: '取消', value: 6 },
        { label: '红包雨', value: 7 },
        { label: '玩家返利', value: 8 },
        { label: '荷官打赏', value: 9 },
        { label: '桌边主播打赏', value: 10 },
        { label: '冲正', value: 11 },
        { label: '冲负', value: 12 },
        { label: '美女主播送礼', value: 13 },
        { label: '比赛派奖', value: 14 }
      ],
      checkedCities: [1, 2, 3]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      console.log(val)
      if (val) {
        for (let i = 0; i < this.cityOptions.length; i++) {
          const ele = this.cityOptions[i].value
          this.checkedCities.push(ele)
        }
        this.checkAll = true
        this.isIndeterminate = false
      } else {
        this.checkedCities = []
        this.isIndeterminate = false
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cityOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cityOptions.length
    }
  }
}
</script>

<style lang="scss" scoped>
.innerbox {
  display: inline-block;
  margin-left: 30px;
}
</style>
