<template>
  <el-form
    ref="form"
    :model="editData"
    label-width="80px"
    @submit.native.prevent="enterSearch"
  >
    <el-form-item label="银行卡号">
      <el-input
        v-model="editData.cardNo"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入银行卡号"
        :disabled="loading"
      ></el-input>
    </el-form-item>
    <el-form-item label="创建人">
      <el-input
        v-model="editData.createBy"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入创建人"
        :disabled="loading"
      ></el-input>
    </el-form-item>
    <el-form-item label="更新人">
      <el-input
        v-model="editData.modifyBy"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入更新人"
        :disabled="loading"
      ></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="editData.remark"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入备注"
        :disabled="loading"
      ></el-input>
    </el-form-item>
    <el-form-item label="更新时间">
      <el-date-picker
        v-model="formTime.time"
        size="medium"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        clearable
        style="width: 280px"
      ></el-date-picker>
    </el-form-item>
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
      console.log(222222222)
      setEidteBank().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
