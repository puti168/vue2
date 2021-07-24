<template>
  <div class="game-container report-container editPicturePage-container">
    <div class="editPicturePage-content">
      <div class="form-header">
        <span>创建/编辑</span>
        <span>
          <el-button type="info" @click="back">取消</el-button>
          <el-button type="success" @click="add">保存</el-button>
        </span>
      </div>
      <div class="content-part2">
        <el-form
          ref="form"
          :model="queryData"
          :inline="true"
          label-width="150px"
          class="agent-form"
        >
          <el-form-item
            label="代理等级:"
            prop="proxyGradeName"
            :rules="[
              {
                required: true,
                min: 1,
                message: '代理等级不能为空',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input
              v-model="queryData.proxyGradeName"
              size="medium"
              maxlength="8"
              placeholder="请输入"
              clearable
              style="width: 405px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="本月活跃人数≥:"
            prop="monthActiveNum"
            :rules="[
              {
                required: true,
                min: 1,
                type: 'number',
                message: '请输入最多7位且大于0的数字',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input-number
              v-model.number="queryData.monthActiveNum"
              size="medium"
              :max="9999999"
              placeholder="请输入数字"
              clearable
              style="width: 120px"
              :precision="0"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="本月新增活跃人数≥:"
            prop="monthNewNum"
            :rules="[
              {
                required: true,
                min: 1,
                type: 'number',
                message: '请输入大于0的数字',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input-number
              v-model="queryData.monthNewNum"
              size="medium"
              :max="9999999"
              placeholder="请输入数字"
              clearable
              style="width: 120px"
              :precision="0"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="额外赠佣比例%:"
            prop="additionalCommission"
            :rules="[
              {
                required: true,
                min: 0,
                max: 100,
                type: 'number',
                message: '输入值不能小于0大于100，最多2位小数',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input-number
              v-model.number="queryData.additionalCommission"
              size="medium"
              :max="100"
              placeholder="请输入数字"
              clearable
              :precision="2"
              style="width: 120px"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="赠佣上限:"
            prop="additionalCommissionLimit"
            :rules="[
              {
                required: true,
                min: 1,
                type: 'number',
                message: '请输入大于0的数字',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input-number
              v-model="queryData.additionalCommissionLimit"
              size="medium"
              :max="99999"
              placeholder="请输入数字"
              clearable
              style="width: 120px"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="赠送彩金:"
            prop="giveJackpot"
            :rules="[
              {
                required: true,
                min: 0,
                type: 'number',
                message: '请输入大于等于0的数字',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input-number
              v-model="queryData.giveJackpot"
              size="medium"
              placeholder="请输入数字"
              clearable
              :max="9999999"
              style="width: 405px"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  name: 'EditPage',
  mixins: [list],
  props: { editRowData: { type: Object, default: () => {} } },
  data() {
    return {
      loading: false,
      queryData: { ...this.editRowData }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    back() {
      this.$emit('back')
    },
    setProxyGradeInsert(val) {
      this.$api
        .setProxyGradeInsert(val)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success('创建成功')
            this.pageNum = 1
            this.reset()
            setTimeout(() => {
              this.back()
            }, 500)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    setProxyGradeUpdate(val) {
      this.$api
        .setProxyGradeUpdate(val)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success('修改成功')
            setTimeout(() => {
              this.back()
            }, 500)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    add() {
      this.loading = true
      const params = {
        ...this.queryData
      }
      console.log(params)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (params.id) {
            this.$confirm(`确定修改吗？`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.setProxyGradeUpdate(params)
              })
              .catch(() => {})
          } else {
            this.$confirm(`确定创建吗？`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            })
              .then(() => {
                this.setProxyGradeInsert(params)
              })
              .catch(() => {})
          }
        }
      })
    },
    reset() {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
/deep/ .el-button--info {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
  background-color: #eeeded;
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number .el-input__inner {
  padding: 0 15px;
  text-align: left;
}
/deep/.el-form-item {
  margin-bottom: 25px;
}
.editPicturePage-container {
  background-color: #f5f5f5;
  margin: 0;
  min-height: calc(90vh - 120px);
  .editPicturePage-content {
    width: 50%;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    padding-bottom: 30px;
    .form-header {
      height: 55px;
      line-height: 55px;
      width: 100%;
      background-color: rgba(0, 0, 0, 1);
      span:nth-child(1) {
        position: absolute;
        left: 30px;
        top: 0;
        color: rgba(255, 255, 255, 0.847058823529412);
        font-size: 16px;
        font-weight: 700;
      }
      span:nth-child(2) {
        position: absolute;
        right: 30px;
        top: 0;
        color: #999;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .form-header:after {
      content: ".";
      height: 0;
      display: table;
      clear: both;
    }
    .content-part2 {
      width: 100%;
      padding: 25px 35px 20px;
      position: relative;
      margin: 0 auto;
      .agent-form {
        position: relative;
        width: 800px;
        max-width: 100%;
        padding: 35px 35px 0;
        margin: 0 auto;
        overflow: hidden;
        .el-form-item {
          .el-form-item_label {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>
