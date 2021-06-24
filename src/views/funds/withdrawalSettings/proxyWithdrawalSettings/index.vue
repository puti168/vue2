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
          @sort-change="_changeTableSort"
        >
          <el-table-column
            prop="description"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="edit(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                删除
              </el-button>
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
      <el-dialog
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
        width="800px"
        @close="clear"
      >
        <div class="form-header">
          <span class="fontSize">新增代理提款设置</span>
          <span>
            <code style="color: #ff3b30">*</code>
            为必填项
          </span>
        </div>
        <el-form :inline="true" class="information">
          <h3>代理信息</h3>
          <el-form-item prop="proxyAccount" class="proxyItem" label="代理账号:">
            <el-input v-model="queryData.proxyAccount" class="proxyInput"></el-input>
          </el-form-item>
          <el-form-item label="代理姓名:" class="proxyItem">
            <el-input v-model="queryData.proxyName" class="proxyInput"></el-input>
          </el-form-item>
          <el-form-item label="代理类型:" class="proxyItem">
            <el-input v-model="queryData.agenttype" class="proxyInput"></el-input>
          </el-form-item>
          <el-form-item label="代理状态:" class="proxyItem">
            <el-input v-model="queryData.agentstate" class="proxyInput"></el-input>
          </el-form-item>
          <el-form-item label="风控层级:" class="proxyItem">
            <el-input v-model="queryData.risk" class="proxyInput"></el-input>
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
            label="单次提款最低额度:"
            prop="singleMinAmount"
            class="proxyItem"
          >
            <el-input-number
              v-model="dialogForm.singleMinAmount"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item
            label="单次提款最高额度:"
            prop="singleMaxAmount"
            class="proxyItem"
          >
            <el-input-number
              v-model="dialogForm.singleMaxAmount"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日免费提款次数:" prop="dateFreeNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateFreeNum"
              placeholder="请输入次数，0为不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item label="单日免费提款总额:" prop="dateFreeAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateFreeAmount"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日最高提款次数:" prop="dateTotalNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateTotalNum"
              placeholder="请输入次数，0为不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item label="单日最高提款总额:" prop="dateMaxAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateMaxAmount"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="大额提款标记金额:" prop="bigAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.bigAmount"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <h3>提款手续费配置</h3>
          <el-form-item label="超出单日免费次数：" prop="rateDateFree">
            <el-select v-model="dialogForm.rateDateFreeType" placeholder="请选择">
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
              v-model="dialogForm.rateDateFree"
              placeholder="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="超出单日免费次数总额：" prop="rateDateTotal">
            <el-select v-model="dialogForm.rateDateTotalType" placeholder="请选择">
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
              v-model="dialogForm.rateDateTotal"
              placeholder="0"
            ></el-input-number>
          </el-form-item>
          <h3>提款提示语配置</h3>
          <el-form-item
            class="configure"
            label="超出单日最高次数提示语："
            prop="dateTotalNumRemark"
          >
            <el-input
              v-model="dialogForm.dateTotalNumRemark"
              style="width: 260px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="configure"
            label="超出单日最高提款总额提示语："
            prop="dateMaxAmountRemark"
          >
            <el-input
              v-model="dialogForm.dateMaxAmountRemark"
              style="width: 260px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="dialogForm.status"
              clearable
              :popper-append-to-body="false"
            >
              <el-option label="关闭" value="shanghai"></el-option>
              <el-option label="开启" value="beijing"></el-option>
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
      dialogForm: { minimum: '' },
      gameList: [],
      title: '',
      labelName: ''
    }
  },
  computed: {
    rules() {
      const oneFreeRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 1) {
          callback(new Error('输入大于单日最高提款次数，请重新输入'))
        } else if (value <= this.ruleForm.maxmum) {
          callback(new Error('输入大于单日最高提款次数，请重新输入'))
        } else if (value > 9999999999) {
          callback(new Error('输入值最多为9999999999'))
        } else {
          callback()
        }
      }
      const singleMinAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const singleMaxAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const dateFreeNum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const dateFreeAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const dateTotalNum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const dateMaxAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const bigAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]

      const oneFree = [{ required: true, validator: oneFreeRules, trigger: 'blur' }]

      const minimum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const maxmum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const signminimum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const onefreetotal = [
        {
          required: true,
          message: '输入大于单日最高提款次数，请重新输入',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const region = [{ required: true, message: '百分比（%）', trigger: 'change' }]
      const beyondfrequency = [
        { required: true, message: '请输入提示语', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const beyondtotal = [
        { required: true, message: '请输入提示语', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      return {
        singleMinAmount,
        singleMaxAmount,
        dateFreeNum,
        dateFreeAmount,
        dateTotalNum,
        dateMaxAmount,
        bigAmount,
        oneFree,
        minimum,
        maxmum,
        signminimum,
        onefreetotal,
        region,
        beyondfrequency,
        beyondtotal
      }
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }

      this.$api
        .getWithdrawSettingProxySelectPage(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
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
      this.$refs['form'].resetFields()
    },
    addLabel() {
      console.log(11111)
      this.title = '新增'
      this.dialogForm = {}
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '编辑'
      this.dialogForm = { ...val }
      this.dialogFormVisible = true
    },
    deleteLabel(val) {
      const data = {}
      data.id = val.id
      data.description = val.description
      data.gameLabelName = val.gameLabelName
      this.$confirm(`<strong>确定删除此条标签类型吗?</strong>`, `确认提示`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.setUpdateDelete(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },

    subAddOrEidt() {
      console.log(this.title)
      const data = {}
      data.id = this.dialogForm.id
      data.description = this.dialogForm.description
      data.gameLabelName = this.dialogForm.gameLabelName
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            console.log('新增')
            this.$api.addObGameLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('创建成功')
                this.pageNum = 1
                this.loadData()
              }
            })
          } else {
            this.$api.setUpdateLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.loadData()
              }
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    checkValue(e) {
      const { value } = e.target
      this.queryData.gameLabelId = value
      console.log(value)
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'gameLabelId') {
        prop = 1
      }
      if (prop === 'createdAt') {
        prop = 2
      }
      if (prop === 'updatedAt') {
        prop = 3
      }
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      }
      this.loadData()
    },
    clear() {
      this.$refs.formSub.resetFields()
    },
    enterSubmit() {
      this.loadData()
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
    width: 130px;
  }
  /deep/label {
    font-weight: 500;
  }
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number--medium .el-input__inner {
  padding: 0 15px;
  text-align: left;
}
</style>
