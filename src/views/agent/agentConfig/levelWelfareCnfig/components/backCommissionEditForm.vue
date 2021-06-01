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
          :inline="true"
          :rules="rules"
          :model="queryData"
          label-width="120px"
          class="picture-form"
        >
          <el-form-item
            label="返佣等级:"
            prop="rebateLevel"
            :rules="[
              {
                required: true,
                min: 1,
                message: '返佣等级不能为空',
                trigger: ['blur'],
              },
            ]"
          >
            <el-input
              v-model="queryData.rebateLevel"
              size="medium"
              maxlength="8"
              placeholder="请输入"
              clearable
              style="width: 370px"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司总输赢:" prop="totalMinNetAmount">
            <el-input-number
              v-model="queryData.totalMinNetAmount"
              size="medium"
              placeholder="请输入数字"
              clearable
              :max="9999999999"
              style="width: 164px"
            ></el-input-number>
          </el-form-item>
          <el-form-item> — </el-form-item>
          <el-form-item prop="totalMaxNetAmount">
            <el-input-number
              v-model="queryData.totalMaxNetAmount"
              size="medium"
              placeholder="请输入数字"
              clearable
              :max="9999999999"
              style="width: 164px"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="本月活跃人数≥:"
            prop="monthActiveNum"
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
              v-model="queryData.monthActiveNum"
              size="medium"
              :max="9999999"
              placeholder="请输入数字"
              clearable
              style="width: 118px"
              :precision="0"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="佣金比例%:"
            prop="commissionRate"
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
              v-model.number="queryData.commissionRate"
              size="medium"
              :max="100"
              placeholder="请输入数字"
              clearable
              :precision="2"
              style="width: 118px"
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
  computed: {
    rules() {
      const totalMinNetAmountRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 1) {
          callback(new Error('请输入大于0的数字'))
        } else if (value > 9999999999) {
          callback(new Error('输入值最多为9999999999'))
        } else {
          callback()
        }
      }
      const totalMaxNetAmountRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 1) {
          callback(new Error('请输入大于0的数字'))
        } else if (value <= this.queryData.totalMinNetAmount) {
          callback(new Error('输入值必须大于前面的值'))
        } else if (value > 9999999999) {
          callback(new Error('输入值最多为9999999999'))
        } else {
          callback()
        }
      }
      const totalMinNetAmount = [
        { required: true, validator: totalMinNetAmountRules, trigger: 'blur' }
      ]
      const totalMaxNetAmount = [
        { required: true, validator: totalMaxNetAmountRules, trigger: 'blur' }
      ]
      return { totalMinNetAmount, totalMaxNetAmount }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    back() {
      this.$emit('back')
    },
    setProxyCommissionInsert(val) {
      this.$api
        .setProxyCommissionInsert(val)
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
    setProxyCommissionUpdate(val) {
      this.$api
        .setProxyCommissionUpdate(val)
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
                this.setProxyCommissionUpdate(params)
              })
              .catch(() => {})
          } else {
            this.$confirm(`确定创建吗？`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            })
              .then(() => {
                this.setProxyCommissionInsert(params)
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
.editPicturePage-container {
  background-color: #f5f5f5;
  margin: 0;
  min-height: calc(100vh);
  .editPicturePage-content {
    width: 50%;
    margin: 0 auto;
    background-color: #fff;
    position: relative;

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
      height: 300px;
      position: relative;
      margin: 0 auto;
      .picture-form {
        position: relative;
        width: 600px;
        max-width: 100%;
        min-height: 100%;
        padding: 35px 35px 0;
        margin: 0 auto;
        overflow: hidden;
      }
    }
  }
}
</style>
