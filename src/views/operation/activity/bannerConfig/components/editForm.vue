<template>
  <el-form
    ref="form"
    :model="editData"
    label-width="80px"
    @submit.native.prevent="enterSearch"
  >
    <el-form-item label="银行卡号">
      <el-input
        v-model="editData.bankCode"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入银行卡号"
        :disabled="loading"
        @keyup.enter.native="enterSearch"
      ></el-input>
    </el-form-item>
    <el-form-item label="银行名称">
      <el-input
        v-model="editData.bankName"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入银行名称"
        :disabled="loading"
        @keyup.enter.native="enterSearch"
      ></el-input>
    </el-form-item>
    <!-- <el-form-item label="时间">
      <el-date-picker
        v-model="formTime.time"
        size="medium"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        clearable
        style="width: 280px"
      ></el-date-picker>
    </el-form-item>-->
  </el-form>
</template>

<script>
import list from '@/mixins/list'
import { setEidteBank } from '@/api/bankController'
export default {
  components: {},
  mixins: [list],
  props: { editFormData: { type: Object, default: () => ({}) } },
  data() {
    return {
      editData: {},
      formTime: {
        time: []
      }
    }
  },
  computed: {},
  watch: {
    editFormData(val) {
      this.editData = { ...val }
    }
  },
  created() {},
  mounted() {},
  methods: {
    enterSubmit() {
      setEidteBank().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
