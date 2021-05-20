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
          :rules="rules"
          label-width="180px"
          class="agent-form"
        >
          <el-form-item label="代理等级:" prop="proxyGradeName">
            <el-input
              v-model="queryData.proxyGradeName"
              size="medium"
              maxlength="50"
              placeholder="请输入"
              clearable
              style="width: 365px"
            ></el-input>
          </el-form-item>
          <el-form-item label="本月活跃人数≥:" prop="monthActiveNum">
            <el-input
              v-model="queryData.monthActiveNum"
              size="medium"
              maxlength="50"
              placeholder="请输入"
              clearable
              style="width: 365px"
            ></el-input>
          </el-form-item>
          <el-form-item label="本月新增活跃人数≥:" prop="monthNewNum">
            <el-input
              v-model="queryData.monthNewNum"
              size="medium"
              maxlength="50"
              placeholder="请输入"
              clearable
              style="width: 365px"
            ></el-input>
          </el-form-item>
          <el-form-item label="额外赠佣比例%:" prop="additionalCommission">
            <el-input
              v-model="queryData.additionalCommission"
              size="medium"
              maxlength="50"
              placeholder="请输入"
              clearable
              style="width: 365px"
            ></el-input>
          </el-form-item>
          <el-form-item label="赠佣上限:" prop="additionalCommissionLimit">
            <el-input
              v-model="queryData.additionalCommissionLimit"
              size="medium"
              maxlength="50"
              placeholder="请输入"
              clearable
              style="width: 365px"
            ></el-input>
          </el-form-item>
          <el-form-item label="赠送彩金:" prop="giveJackpot">
            <el-input
              v-model="queryData.giveJackpot"
              size="medium"
              type="textarea"
              placeholder="请输入"
              clearable
              maxlength="50"
              style="width: 365px"
            ></el-input>
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
      queryData: {...this.editRowData},
      dataList: []
    }
  },
  computed: {
    rules() {
      return {
        proxyGradeName: [{ required: true, message: '请输入', trigger: 'change' }],
        monthActiveNum: [{ required: true, message: '请输入', trigger: 'change' }],
        monthNewNum: [{ required: true, message: '请输入', trigger: 'change' }],
        additionalCommissionLimit: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        additionalCommission: [{ required: true, message: '请输入', trigger: 'change' }],
        giveJackpot: [{ required: true, message: '请输入', trigger: 'change' }]
      }
    }
    // agentDataR() {
    //   console.log(55555, this.editRowData);
    //   this.queryData = this.editRowData;
    //   return this.editRowData;
    // },
  },
  watch: {
      queryData: {
          handler(newV) {

          }
      }
    // agentDataR: {
    //   handler(newV) {
    //     let {
    //       proxyGradeName,
    //       monthActiveNum,
    //       monthNewNum,
    //       additionalCommission,
    //       additionalCommissionLimit,
    //       giveJackpot,
    //     } = { ...newV };
    //     this.queryData = {
    //       proxyGradeName,
    //       monthActiveNum,
    //       monthNewNum,
    //       additionalCommission,
    //       additionalCommissionLimit,
    //       giveJackpot,
    //     };
    //     console.log(99999, { ...newV });
    //   },
    //   deep: true,
    // },
  },
  mounted() {},
  methods: {
    back() {
      this.$emit('back')
    },
    add() {
      this.loading = true
    //   const params = {
    //     ...this.form
    //   }
      console.log(this.queryData)
      //   this.$refs["form"].validate((valid) => {
      //     console.log("valid", valid);
      //     if (valid) {
      //       this.$api
      //         .addMemberAPI(params)
      //         .then((res) => {
      //           this.loading = false;
      //           const { code, data, msg } = res;
      //           if (code === 200) {
      //             this.$confirm(`会员${data}资料提交成功`, {
      //               confirmButtonText: "确定",
      //               type: "success",
      //               showCancelButton: false,
      //             });
      //             this.reset();
      //           } else {
      //             this.$message({
      //               message: msg,
      //               type: "error",
      //             });
      //           }
      //         })
      //         .catch(() => {
      //           this.loading = false;
      //         });
      //     }
      //   });
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
.editPicturePage-container {
  background-color: #f5f5f5;
  margin: 0;
  min-height: calc(100vh - 105px);
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
