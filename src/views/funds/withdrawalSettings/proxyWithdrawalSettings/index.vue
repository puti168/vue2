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
            type="index"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-link type="primary" size="medium" @click="edit(scope.row)">
                修改
              </el-link>
              <el-link
                v-if="scope.row.withdrawStatus !== 0 && scope.row.proxyAccount !== '0'"
                type="primary"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                删除
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="withdrawStatus" align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.withdrawStatus === 0" class="normalRgba">开启</span>
              <span
v-else-if="scope.row.withdrawStatus === 1"
class="disableRgba"
>关闭</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="proxyAccount" align="center" label="代理账号">
            <template slot-scope="scope">
              <span v-if="scope.row.proxyAccount === '0'">通用</span>
              <span v-else>{{ scope.row.proxyAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proxyName" align="center" label="代理姓名">
            <template slot-scope="scope">
              <span v-if="scope.row.proxyAccount === '0'">-</span>
              <span v-else>{{ scope.row.proxyName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proxyAccountType" align="center" label="代理类型">
            <template slot-scope="scope">
              <span v-if="scope.row.proxyAccount === '0'">-</span>
              <span v-else>{{
                typeFilter(scope.row.proxyAccountType, "accountType")
                  ? typeFilter(scope.row.proxyAccountType, "accountType")
                  : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proxyAccountStatus" align="center" label="代理状态">
            <template slot-scope="scope">
              <span v-if="scope.row.proxyAccount === '0'">-</span>
              <span v-else>{{
                typeFilter(scope.row.proxyAccountStatus, "accountStatusType")
                  ? typeFilter(scope.row.proxyAccountStatus, "accountStatusType")
                  : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="windControlName"
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
          >
          </el-table-column>
          <el-table-column
            prop="rateDateTotal"
            align="center"
            label="超出单日提款总额手续费"
          >
          </el-table-column>
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
        <el-form
          v-if="isUniversal"
          ref="formProxy"
          :inline="true"
          class="information"
          :model="queryData"
          label-width="92px"
        >
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
            <el-input
              v-model="queryData.proxyAccount"
              :disabled="isDisabled"
              class="proxyInput"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理姓名：" class="proxyItem">
            <el-input
              v-model="queryData.proxyName"
              disabled
              class="proxyInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理类型：" class="proxyItem">
            <el-select
              v-model="queryData.accountType"
              class="proxyInput"
              disabled
              placeholder=""
            >
              <el-option
                v-for="item in accountType"
                :key="item.description"
                :label="item.description"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理状态：" class="proxyItem">
            <el-select
              v-model="queryData.accountStatus"
              disabled
              class="proxyInput"
              placeholder=""
            >
              <el-option
                v-for="item in accountStatusType"
                :key="item.description"
                :label="item.description"
                :value="item.code"
              >
              </el-option>
            </el-select>
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
              :min="0"
              :precision="0"
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
              :min="0"
              :precision="0"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日免费提款次数：" prop="dateFreeNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateFreeNum"
              class="setInput"
              :min="0"
              :precision="0"
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
              :min="0"
              :precision="0"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日最高提款次数：" prop="dateTotalNum" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateTotalNum"
              class="setInput"
              :min="0"
              :precision="0"
              placeholder="请输入次数，0为不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item label="单日最高提款总额：" prop="dateMaxAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.dateMaxAmount"
              class="setInput"
              :min="0"
              :precision="0"
              placeholder="请输入金额，0为不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="大额提款标记金额：" prop="bigAmount" class="proxyItem">
            <el-input-number
              v-model="dialogForm.bigAmount"
              class="setInput"
              :min="0"
              :precision="0"
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
              v-if="dialogForm.rateDateFreeType === 2"
              v-model="dialogForm.rateDateFree"
              style="width: 100px"
              :min="0"
              :max="100"
              :precision="0"
              placeholder="请输入"
            ></el-input-number>
            <el-input-number
              v-else
              v-model="dialogForm.rateDateFree"
              style="width: 100px"
              :min="0"
              :precision="0"
              placeholder="请输入"
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
              v-if="dialogForm.rateDateTotalType === 2"
              v-model="dialogForm.rateDateTotal"
              style="width: 100px"
              :min="0"
              :max="100"
              :precision="0"
              placeholder="请输入"
            ></el-input-number>
            <el-input-number
              v-else
              v-model="dialogForm.rateDateTotal"
              style="width: 100px"
              :min="0"
              :precision="0"
              placeholder="请输入"
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
          <el-form-item label="状态" prop="withdrawStatus">
            <el-select v-model="dialogForm.withdrawStatus" :popper-append-to-body="false">
              <el-option label="开启" :value="0"></el-option>
              <el-option label="关闭" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="subAddOrEidt"
          >
            提交
          </el-button>
          <el-button @click="reset">重置</el-button>
        </div>
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
        withdrawStatus: 1
      },
      title: '',
      isDisabled: true,
      isUniversal: true
    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountStatusType
    },
    accountStatusType() {
      return this.globalDics.accountStatusType
    },

    rules() {
      const minRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 0) {
          callback(new Error('请输入金额'))
        } else if (value > this.dialogForm.dateMaxAmount) {
          callback(new Error('不能大于单日最高提款总额，请重新输入'))
        } else {
          callback()
        }
      }
      const freeRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 0) {
          callback(new Error('请输入次数'))
        } else if (value > this.dialogForm.dateTotalNum) {
          callback(new Error('不能大于单日最高提款次数，请重新输入'))
        } else {
          callback()
        }
      }
      const maxRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 0) {
          callback(new Error('请输入金额'))
        } else if (value < this.dialogForm.singleMinAmount) {
          callback(new Error('不能小于单次提款最低额度，请重新输入'))
        } else if (value < this.dialogForm.singleMaxAmount) {
          callback(new Error('不能小于单次提款最高额度，请重新输入'))
        } else if (value < this.dialogForm.dateFreeAmount) {
          callback(new Error('不能小于单日免费提款总额，请重新输入'))
        } else if (value < this.dialogForm.bigAmount) {
          callback(new Error('不能小于大额提款标记金额，请重新输入'))
        } else {
          callback()
        }
      }
      const totalRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 0) {
          callback(new Error('请输入次数'))
        } else if (value < this.dialogForm.dateFreeNum) {
          callback(new Error('不能小于单日免费提款次数，请重新输入'))
        } else {
          callback()
        }
      }
      const singleMinAmount = [{ required: true, validator: minRules, trigger: 'blur' }]
      const singleMaxAmount = [{ required: true, validator: minRules, trigger: 'blur' }]
      const dateFreeNum = [{ required: true, validator: freeRules, trigger: 'blur' }]
      const dateFreeAmount = [{ required: true, validator: minRules, trigger: 'blur' }]
      const dateTotalNum = [{ required: true, validator: totalRules, trigger: 'blur' }]
      const dateMaxAmount = [{ required: true, validator: maxRules, trigger: 'blur' }]
      const bigAmount = [{ required: true, validator: minRules, trigger: 'blur' }]
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
      const withdrawStatus = [{ required: true, message: '请选择状态', trigger: 'blur' }]

      // const oneFree = [{ required: true, validator: oneFreeRules, trigger: 'blur' }]grady2dev
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
        withdrawStatus
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
    getProxyDetailQueryDetail(val) {
      this.$api.getProxyDetailQueryDetail({ userName: val }).then((res) => {
        if (res.code === 200) {
          const { id, realName, accountType, accountStatus, windControlName } = {
            ...res.data
          }
          this.$set(this.queryData, 'proxyId', id)
          this.$set(this.queryData, 'proxyName', realName)
          this.$set(this.queryData, 'accountType', accountType + '')
          this.$set(this.queryData, 'accountStatus', accountStatus + '')
          this.$set(this.queryData, 'windControlName', windControlName)
        }
      })
    },
    enterSearch() {
      const val = this.queryData.proxyAccount
      this.getProxyDetailQueryDetail(val)
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
        withdrawStatus: 1
      }
      if (this.isUniversal) {
        this.$refs.formProxy.resetFields()
      }
      this.$refs.formSub.resetFields()
    },
    addLabel() {
      this.title = '新增'
      this.isDisabled = false
      this.isUniversal = true
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
        withdrawStatus: 1
      }
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '编辑'
      console.log('编辑', val)
      this.isDisabled = true
      this.isUniversal = val.proxyAccount !== '0'
      const {
        proxyAccount,
        proxyName,
        proxyAccountType,
        proxyAccountStatus,
        windControlName
      } = { ...val }
      this.$set(this.queryData, 'proxyAccount', proxyAccount)
      this.$set(this.queryData, 'proxyName', proxyName)
      this.$set(
        this.queryData,
        'accountType',
        proxyAccountType === 0 ? '' : proxyAccountType + ''
      )
      this.$set(
        this.queryData,
        'accountStatus',
        proxyAccountStatus === 0 ? '' : proxyAccountStatus + ''
      )
      this.$set(this.queryData, 'windControlName', windControlName)
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
          this.$api.setWithdrawSettingProxyDelete({ id: val.id }).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },
    subAddOrEidt() {
      if (this.title === '新增') {
        this.$refs.formProxy.validate((valid) => {
          if (valid) {
            const params = {
              ...this.dialogForm,
              proxyId: this.queryData.proxyId,
              proxyName: this.queryData.proxyName,
              proxyAccount: this.queryData.proxyAccount
            }
            this.$refs.formSub.validate((valid) => {
              if (valid) {
                console.log(params)
                this.$confirm(
                  `<strong>您确认要执行新增代理提款设置的操作?</strong>`,
                  `确认提示`,
                  {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }
                )
                  .then(() => {
                    this.$api.setWithdrawSettingProxyAdd(params).then((res) => {
                      if (res.code === 200) {
                        console.log(res)
                        this.$message.success('新增成功!')
                        this.loadData()
                      }
                      this.dialogFormVisible = false
                    })
                  })
                  .catch(() => {})
              }
            })
          }
        })
      } else {
        const params = {
          ...this.dialogForm
        }
        this.$refs.formSub.validate((valid) => {
          if (valid) {
            console.log(params)
            this.$confirm(
              `<strong>您确认要执行修改代理提款设置的操作?</strong>`,
              `确认提示`,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )
              .then(() => {
                console.log(params)
                this.$api.setWithdrawSettingProxyUpdate(params).then((res) => {
                  if (res.code === 200) {
                    console.log(res)
                    this.$message.success('修改成功!')
                    this.loadData()
                  }
                  this.dialogFormVisible = false
                })
              })
              .catch(() => {})
          }
        })
      }
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
    /deep/.el-icon-arrow-up:before {
      content: "";
    }
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
