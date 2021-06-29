<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="head flex-h-end">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item>
            <el-button
              type="primary"
              :disabled="loading"
              size="medium"
              class="pattern"
              @click="open"
            >
              初始化提款设置
            </el-button>

            <el-button
              type="primary"
              class="pattern"
              :disabled="loading"
              size="medium"
              @click="addLabel"
            >
              新增会员提款设置
            </el-button>
          </el-form-item>
        </el-form>
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
          <el-table-column prop="operating" align="center" label="操作" width="140px">
            <template slot-scope="scope">
              <el-link type="primary" size="medium" @click="edit(scope.row)">
                修改
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="withdrawStatus" align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.withdrawStatus === 1" class="disableRgba">关闭</div>
              <div v-else-if="scope.row.withdrawStatus === 0" class="normalRgba">开启</div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
prop="vipNum"
align="center"
label="VIP等级"
width="120px"
><template slot-scope="scope">
              <span v-if="!!scope.row.vipNum || scope.row.vipNum === 0">
                {{ scope.row.vipNum }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="singleMinAmount"
            align="center"
            label="单次提款最低限额"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="singleMaxAmount"
            align="center"
            label="单次提款最高限额"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="dateFreeNum"
            align="center"
            label="单日免费提款次数"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="dateTotalNum"
            align="center"
            label="单日提款总次数"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="dateFreeAmount"
            align="center"
            width="170px"
            label="单日免费提款总额限制"
          ></el-table-column>
          <el-table-column
            prop="dateMaxAmount"
            width="170px"
            align="center"
            label="单日最高提款总额"
          ></el-table-column>
          <el-table-column
            prop="bigAmount"
            align="center"
            width="170px"
            label="大额提款标记金额"
          ></el-table-column>
          <el-table-column
            prop="rateDateFree"
            align="center"
            width="170px"
            label="超出单日免费次数手续费"
          ></el-table-column>
          <el-table-column
            prop="rateDateTotal"
            align="center"
            width="170px"
            label="超出单日提款总额手续费"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
      </div>
      <el-dialog :visible.sync="dialogFormVisible" :destroy-on-close="true" width="970px">
        <div class="form-header">
          <span>{{ title }}会员资提款设置</span>
          <span>
            <code style="color: #ff3b30">*</code>
            为必填项
          </span>
        </div>
        <h2>提款配置</h2>
        <el-form
          v-if="isUniversal"
          ref="formSub"
          :rules="rules"
          :inline="true"
          class="demo-form-inline"
          :model="dialogForm"
        >
          <el-form-item
            prop="vipNum"
            label-width="147px"
            label="VIP等级："
            class="configure"
          >
            <el-input-number
              v-model="dialogForm.vipNum"
              :disabled="isDisabled"
              placeholder=""
            ></el-input-number>
          </el-form-item>
          <el-form-item label="单次提款最低额度：" prop="singleMinAmount">
            <el-input-number
              v-model="dialogForm.singleMinAmount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item
            label="单次提款最高额度："
            class="configure"
            prop="singleMaxAmount"
          >
            <el-input-number
              v-model="dialogForm.singleMaxAmount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日免费提款次数：" prop="dateFreeNum">
            <el-input-number
              v-model="dialogForm.dateFreeNum"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input-number>
            <span>次</span>
          </el-form-item>
          <el-form-item label="大额提款标记金额：" class="configure" prop="bigAmount">
            <el-input-number
              v-model="dialogForm.bigAmount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input-number>
            <span style="w">元</span>
          </el-form-item>
          <el-form-item label="单日免费提款总额：" prop="dateFreeAmount">
            <el-input-number
              v-model="dialogForm.dateFreeAmount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <h2>提款手续费配置</h2>
          <el-form-item
            label="超出单日免费次数："
            class="configure"
            prop="rateDateFreeType"
          >
            <el-select
              v-model="dialogForm.rateDateFreeType"
              class="sun"
              placeholder="请选择"
            >
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
            v-if="dialogForm.rateDateFreeType === 2"
              v-model="dialogForm.rateDateFree"
              :min="0"
              :precision="0"
              placeholder="请输入"
              class="sun"
            ></el-input-number>
            <el-input-number
              v-else
              v-model="dialogForm.rateDateFree"
              class="sun"
              :min="0"
              :precision="0"
              placeholder="请输入"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="超出单日免费次数总额：" prop="rateDateTotalType">
            <el-select
              v-model="dialogForm.rateDateTotalType"
              class="sun"
              placeholder="请选择"
            >
              <el-option label="固定金额(元)" :value="1"></el-option>
              <el-option label="百分比(%)" :value="2"></el-option>
            </el-select>
            <el-input-number
             v-if="dialogForm.rateDateTotalType === 2"
              v-model="dialogForm.rateDateTotal"
              :min="0"
              :precision="0"
              placeholder="请输入"
              class="sun"
            ></el-input-number>
            <el-input-number
              v-else
              v-model="dialogForm.rateDateTotal"
              class="sun"
              :min="0"
              :precision="0"
              placeholder="请输入"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="状态" prop="withdrawStatus">
            <el-select
              v-model="dialogForm.withdrawStatus"
              clearable
              :popper-append-to-body="false"
            >
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
      vipExclusive: [],
      vipadd: {},
      queryData: {},
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {
        vipNum: 0,
        singleMinAmount: 0,
        singleMaxAmount: 0,
        dateFreeNum: 0,
        bigAmount: 0,
        dateFreeAmount: 0,
        rateDateFreeType: 2,
        rateDateFree: 0,
        rateDateTotalType: 2,
        rateDateTotal: 0,
        withdrawStatus: 1
      },
      title: '',
      isDisabled: true,
      isUniversal: true
    }
  },
  computed: {
    rules() {
      // 单日免费提款次数
      const withdrawaltimes = (rule, value, callback) => {
        let vip = ''
        const num = this.dialogForm.vipNum
        for (let i = 0; i < this.vipExclusive.length; i++) {
          const ele = this.vipExclusive[i]
          if (num === ele.vipLevel) {
            vip = ele.maxFrequency
          }
        }

        if (typeof num !== 'number') {
          callback(new Error('请输入vip等级'))
        } else if (value <= vip) {
          callback(new Error('输入大于单日最高提款次数，请重新输入'))
        } else {
          callback()
        }
      }
      // 单日免费提款总额
      const withdrawallimit = (rule, value, callback) => {
        let vip = ''
        const num = this.dialogForm.vipNum
        for (let i = 0; i < this.vipExclusive.length; i++) {
          const ele = this.vipExclusive[i]
          if (num === ele.maxTotal) {
            vip = ele.maxFrequency
          }
        }
        if (typeof num !== 'number') {
          callback(new Error('请输入vip等级'))
        } else if (value <= vip) {
          callback(new Error('输入大于单日最高提款总额，请重新输入'))
        } else {
          callback()
        }
      }
      const dateFreeNum = [
        { required: true, validator: withdrawaltimes, trigger: 'blur' }
      ]
      const dateFreeAmount = [
        { required: true, validator: withdrawallimit, trigger: 'blur' }
      ]

      const singleMinAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' }
      ]
      const singleMaxAmount = [
        { required: true, message: '请输入金额', trigger: 'blur' }
      ]
      const bigAmount = [{ required: true, message: '请输入金额', trigger: 'blur' }]

      const rateDateFreeType = [
        { required: true, message: '百分比（%）', trigger: 'change' }
      ]
      const rateDateTotalType = [
        { required: true, message: '百分比（%）', trigger: 'change' }
      ]
      const beyondfrequency = [
        { required: true, message: '请输入提示语', trigger: 'blur' }
      ]
      const beyondtotal = [{ required: true, message: '请输入提示语', trigger: 'blur' }]
      const withdrawStatus = [{ required: true, message: '请选择状态', trigger: 'blur' }]
      return {
        dateFreeNum,
        singleMinAmount,
        singleMaxAmount,
        bigAmount,
        dateFreeAmount,
        rateDateFreeType,
        rateDateTotalType,
        beyondfrequency,
        beyondtotal,
        withdrawStatus
      }
    }
  },

  mounted() {},
  methods: {
    add() {
      const params = {
        ...this.dialogForm
      }
      console.log(params, '11222')
      if (this.title === '新增') {
        this.$refs.formSub.validate((valid) => {
          if (valid) {
            console.log(params, '33322')
            this.$confirm(
              `<strong>您确认要执行新增会员提款设置的操作?</strong>`,
              `确认提示`,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )
              .then(() => {
                this.$api.getWithdrawSettingMemberAdd(params).then((res) => {
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
      } else {
        const params = {
          ...this.dialogForm
        }
        this.$refs.formSub.validate((valid) => {
          if (valid) {
            console.log(params)
            this.$confirm(
              `<strong>您确认要执行修改会员提款设置的操作?</strong>`,
              `确认提示`,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )

              .then(() => {
                this.$api.getWithdrawSettingMemberUpdate(params).then((res) => {
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
    },
    open() {
      this.$confirm('您确定要初始化会员提款设置？请谨慎操作！！！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.getWithdrawSettingMemberreset().then((res) => {
            console.log(res, '90')
             if (res.code === 200) {
               console.log(res)
               this.$message.success('初始化会员提款设置成功!')
                    this.loadData()
             }
               this.dialogFormVisible = false
          })
        })
        .catch(() => {})
    },
    reset() {
        this.queryData = {}
        debugger
        if (this.title === '新增') {
        this.dialogForm = {
          vipNum: 0,
          singleMinAmount: 0,
          singleMaxAmount: 0,
          dateFreeNum: 0,
          bigAmount: 0,
          dateFreeAmount: 0,
          rateDateFreeType: 2,
          rateDateFree: 0,
          rateDateTotalType: 2,
          rateDateTotal: 0,
          withdrawStatus: 1
        }
      } else {
        this.dialogForm = {
          singleMinAmount: 0,
          singleMaxAmount: 0,
          dateFreeNum: 0,
          bigAmount: 0,
          dateFreeAmount: 0,
          rateDateFreeType: 2,
          rateDateFree: 0,
          rateDateTotalType: 2,
          rateDateTotal: 0,
          withdrawStatus: 1
        }
      }
    },
    loadData() {
      this.loading = true
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getWithdrawSettingMemberSelectAll(params)
        .then((res) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              const obj = {}
              const ele = res.data[i]
              obj.vipLevel = ele.vipNum
              obj.maxFrequency = ele.dateTotalNum
              obj.maxTotal = ele.dateMaxAmount
              this.vipExclusive.push(obj)
            }
            this.tableData = res.data
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

    addLabel() {
      console.log(11111)
      this.title = '新增'
      this.isDisabled = false
      this.isUniversal = true
      this.queryData = {}
      this.dialogForm = {
        vipNum: 0,
        singleMinAmount: 0,
        singleMaxAmount: 0,
        dateFreeNum: 0,
        bigAmount: 0,
        dateFreeAmount: 0,
        rateDateFreeType: 2,
        rateDateFree: 0,
        rateDateTotalType: 2,
        rateDateTotal: 0,
        withdrawStatus: 1
      }
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '修改'
      this.dialogForm = { ...val }

      this.dialogFormVisible = true
      this.isDisabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form--inline {
  line-height: 4;
}
.sun {
  width: 120px;
}
.configure {
  width: 420px;
}
.chief {
  width: 180px;
}
.form-header {
  width: 930px;
  left: 0px;
  background-color: #d3d7df;
  height: 45px;
  line-height: 45px;
  span:nth-child(1) {
    position: absolute;
    left: 30px;
    top: 65px;
    color: #666;
    font-size: 27px;
    font-weight: 700;
  }
  span:nth-child(2) {
    position: absolute;
    right: 30px;
    color: #999;
    font-weight: 400;
    font-size: 18px;
    top: 60px;
  }
}
.pattern {
  padding-left: 8px;
  padding-right: 8px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
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
