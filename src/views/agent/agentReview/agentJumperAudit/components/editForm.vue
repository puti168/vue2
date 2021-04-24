<template>
  <el-form ref="editData" :model="editData" label-width="80px">
    <el-form-item label="渠道编号">
      <el-input
        v-model="editData.channelId"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入渠道编号"
      ></el-input>
    </el-form-item>
    <el-form-item label="Ip地址">
      <el-input
        v-model="editData.ip"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入Ip地址"
      ></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="editData.remark"
        type="textarea"
        clearable
        size="medium"
        style="width: 675px"
        placeholder="最多输入100"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    editFormData: { type: Object, default: () => ({}) },
    type: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {
      editData: {}
    }
  },
  computed: {},
  watch: {
    editFormData: {
      handler(newV) {
        if (newV) {
          this.editData = { ...newV }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    submit(val) {
      this.$refs.editData.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.type === '新增') {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            this.$api
              .thirdPayWhiteAdd(this.editData)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
                this.$emit('refresh')
                val()
                loading.close()
              })
              .catch(() => {
                loading.close()
              })
          } else {
            this.$api
              .thirdPayWhiteEidt(this.editData)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.$emit('refresh')
                val()
                loading.close()
              })
              .catch(() => {
                loading.close()
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
