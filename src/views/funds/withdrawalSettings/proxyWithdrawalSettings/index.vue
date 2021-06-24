<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="head flex-h-end">
        <el-button
          type="primary"
          style="padding: 0 15px"
          :disabled="loading"
          size="medium"
          @click="addLabel"
        >
          新增代理提款设置
        </el-button>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
        >
          <el-table-column
            prop="description"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-link
                type="primary"
                icon="el-icon-edit"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="edit(scope.row)"
              >
                修改
              </el-link>
              <el-link
                type="warning"
                icon="el-icon-delete"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                删除
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0" class="disableRgba">关闭</div>
              <div v-else-if="scope.row.status === 1" class="normalRgba">开启</div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="proxyAccount"
            align="center"
            label="代理账号"
          ></el-table-column>
          <el-table-column
            prop="proxyName"
            align="center"
            label="代理姓名"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="代理类型"
          ></el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="代理状态"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="风控层级"
          ></el-table-column>
          <el-table-column
            prop="singleMinAmount"
            align="center"
            label="单次提现最低限额"
          ></el-table-column>
          <el-table-column
            prop="singleMaxAmount"
            align="center"
            label="单次提现最高限额"
          ></el-table-column>
          <el-table-column
            prop="dateFreeNum"
            align="center"
            label="单日免费提现次数"
          ></el-table-column>
          <el-table-column
            prop="dateTotalNum"
            align="center"
            label="单日最高提款次数"
          ></el-table-column>
          <el-table-column
            prop="dateFreeAmount"
            align="center"
            label="单日免费提款总额限制"
          ></el-table-column>
          <el-table-column
            prop="dateMaxAmount"
            align="center"
            label="单日最高提款总额度"
          ></el-table-column>
          <el-table-column
            prop="bigAmount"
            align="center"
            label="大额提现标记金额"
          ></el-table-column>
          <el-table-column
            prop="rateDateFree"
            align="center"
            label="超出单日免费次数手续费"
          ></el-table-column>
          <el-table-column
            prop="rateDateTotal"
            align="center"
            label="超出单日提款总额手续费"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="pageNum"
          class="pageValue"
          background
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" :destroy-on-close="true" width="870px">
        <div class="form-header">
          <span class="fontSize">新增代理提款设置</span>
          <span>
            <code style="color: #ff3b30">*</code>
            为必填项
          </span>
        </div>
        <el-form :inline="true" class="information" :model="queryData" label-width="92px">
          <h3>代理信息</h3>
          <el-form-item
            prop="proxyAccount"
            class="proxyItem"
            label="代理账号："
            :rules="[
              { required: true, message: '请输入代理账号', trigger: 'blur' },
              { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
            ]"
          >
            <el-input v-model="queryData.proxyAccount" class="proxyInput"></el-input>
          </el-form-item>
          <el-form-item label="代理姓名：" class="proxyItem">
            <el-input
              v-model="queryData.proxyName"
              disabled
              class="proxyInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理类型：" class="proxyItem">
            <el-input
              v-model="queryData.agenttype"
              disabled
              class="proxyInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理状态：" class="proxyItem">
            <el-input
              v-model="queryData.agentstate"
              disabled
              class="proxyInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="风控层级：" class="proxyItem">
            <el-input
              v-model="queryData.windControlName"
              disabled
              class="proxyInput"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          ref="formSub"
          :rules="rules"
          :inline="true"
          class="information"
          :model="dialogForm"
        >
          <h3>提款配置</h3>
          <el-form-item
            label="单次提款最低额度："
            prop="singleMinAmount"
            class="proxyItem"
          >
            <el-input-number
              v-model="dialogForm.singleMinAmount"
              class="setInput"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item
            label="单次提款最高额度："
            prop="singleMaxAmount"
            class="proxyItem"
          >
            <el-input-number
              v-model="dialogForm.singleMaxAmount"
              class="setInput"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日免费提款次数：" prop="dateFreeNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateFreeNum"
              class="setInput"
              placeholder="请输入次数，0为不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item
            label="单日免费提款总额："
            prop="dateFreeAmount"
            class="proxyItem"
          >
            <el-input-number
              v-model="dialogForm.dateFreeAmount"
              class="setInput"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日最高提款次数：" prop="dateTotalNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateTotalNum"
              class="setInput"
              placeholder="请输入次数，0为不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item label="单日最高提款总额：" prop="dateMaxAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateMaxAmount"
              class="setInput"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="大额提款标记金额：" prop="bigAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.bigAmount"
              class="setInput"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <h3>提款手续费配置</h3>
          <el-form-item label="超出单日免费次数：" prop="rateDateFree">
            <el-select
              v-model="dialogForm.rateDateFreeType"
              placeholder="请选择"
              class="selectW"
            >
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
              v-model="dialogForm.rateDateFree"
              style="width: 100px"
              placeholder="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="超出单日免费次数总额：" prop="rateDateTotal">
            <el-select
              v-model="dialogForm.rateDateTotalType"
              placeholder="请选择"
              class="selectW"
            >
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
              v-model="dialogForm.rateDateTotal"
              style="width: 100px"
              placeholder="0"
            ></el-input-number>
          </el-form-item>
          <h3>提款提示语配置</h3>
          <div class="disp">
            <p>超出单日最高次数提示语：</p>
            <p>超出单日最高提款总额提示语：</p>
          </div>
          <el-form-item label="" prop="dateTotalNumRemark">
            <el-input
              v-model="dialogForm.dateTotalNumRemark"
              style="width: 385px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="dateMaxAmountRemark">
            <el-input
              v-model="dialogForm.dateMaxAmountRemark"
              style="width: 385px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="dialogForm.status" :popper-append-to-body="false">
              <el-option label="开启" :value="0"></el-option>
              <el-option label="关闭" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="add"
          >
            提交
          </el-button>
          <el-button @click="reset">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.gameLabel,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {
        singleMinAmount: 0,
        singleMaxAmount: 0,
        dateFreeNum: 0,
        dateFreeAmount: 0,
        dateTotalNum: 0,
        dateMaxAmount: 0,
        bigAmount: 0,
        rateDateFree: 0,
        rateDateTotal: 0,
        rateDateFreeType: 2,
        rateDateTotalType: 2,
        status: 1
      },
      gameList: [],
      title: '',
      labelName: ''
    }
  },
  computed: {
    rules() {
      // const oneFreeRules = (rule, value, callback) => {
      //   console.log(value)
      //   if (!Number.isInteger(value) || value < 1) {
      //     callback(new Error('输入大于单日最高提款次数，请重新输入'))
      //   } else if (value <= this.ruleForm.maxmum) {
      //     callback(new Error('输入大于单日最高提款次数，请重新输入'))
      //   } else if (value > 9999999999) {
      //     callback(new Error('输入值最多为9999999999'))
      //   } else {
      //     callback()
      //   }
      // }
      const singleMinAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' }
      ]
      const singleMaxAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' }
      ]
      const dateFreeNum = [{ required: true, message: '请输入次数', trigger: 'blur' }]
      const dateFreeAmount = [{ required: true, message: '请输入金额', trigger: 'blur' }]
      const dateTotalNum = [{ required: true, message: '请输入次数', trigger: 'blur' }]
      const dateMaxAmount = [{ required: true, message: '请输入金额', trigger: 'blur' }]
      const bigAmount = [{ required: true, message: '请输入金额', trigger: 'blur' }]
      const rateDateFree = [
        {
          required: true,
          message: '请输入超出次数手续费收取金额或百分比',
          trigger: 'blur'
        }
      ]
      const rateDateTotal = [
        {
          required: true,
          message: '请输入超出金额手续费收取金额或百分比',
          trigger: 'blur'
        }
      ]
      const status = [{ required: true, message: '请选择状态', trigger: 'blur' }]

      // const oneFree = [{ required: true, validator: oneFreeRules, trigger: 'blur' }]
      return {
        singleMinAmount,
        singleMaxAmount,
        dateFreeNum,
        dateFreeAmount,
        dateTotalNum,
        dateMaxAmount,
        bigAmount,
        rateDateFree,
        rateDateTotal,
        status
      }
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const params = {
        ...this.getParams(params)
      }

      this.$api
        .getWithdrawSettingProxySelectPage(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.records
            this.total = res.data.total
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    add(done) {
      this.$confirm('您确认要执行新增提款设置的操作？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    reset() {
      this.queryData = {}
      this.dialogForm = {
        singleMinAmount: 0,
        singleMaxAmount: 0,
        dateFreeNum: 0,
        dateFreeAmount: 0,
        dateTotalNum: 0,
        dateMaxAmount: 0,
        bigAmount: 0,
        rateDateFree: 0,
        rateDateTotal: 0,
        rateDateFreeType: 2,
        rateDateTotalType: 2,
        status: 1
      }
    },
    addLabel() {
      console.log(11111)
      this.title = '新增'
      this.dialogForm = {
        singleMinAmount: 0,
        singleMaxAmount: 0,
        dateFreeNum: 0,
        dateFreeAmount: 0,
        dateTotalNum: 0,
        dateMaxAmount: 0,
        bigAmount: 0,
        rateDateFree: 0,
        rateDateTotal: 0,
        rateDateFreeType: 2,
        rateDateTotalType: 2,
        status: 1
      }
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '编辑'
      this.dialogForm = { ...val }
      this.dialogFormVisible = true
    },
    deleteLabel(val) {
      this.$confirm(`<strong>确定删除此条配置吗?</strong>`, `确认提示`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.setUpdateDelete({ id: val.id }).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },

    subAddOrEidt() {
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            console.log('新增')
            // this.$api.addObGameLabel(data).then((res) => {
            //   if (res.code === 200) {
            //     this.$message.success('创建成功')
            //     this.pageNum = 1
            //     this.loadData()
            //   }
            // })
          } else {
            // this.$api.setUpdateLabel(data).then((res) => {
            //   if (res.code === 200) {
            //     this.$message.success('修改成功')
            //     this.loadData()
            //   }
            // })
          }
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 15px;
}

.form-header {
  background-color: #f2f2f2;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  .fontSize {
    font-size: 18px;
    font-weight: 700;
  }
}
.information {
  margin: 5px 0;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  .proxyItem {
    padding-left: 15px;
  }
  .proxyInput {
    width: 145px;
  }
  .setInput {
    width: 205px;
  }
  /deep/label {
    font-weight: 500;
  }
  .selectW {
    width: 120px;
  }
}
.disp {
  display: flex;
  p {
    width: 50%;
    margin-bottom: 10px;
  }
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input__inner {
  padding: 0 15px;
  text-align: left;
}
</style>
