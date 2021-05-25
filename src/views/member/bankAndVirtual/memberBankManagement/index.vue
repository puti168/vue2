<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="银行卡号:">
            <el-input
              v-model="queryData.cardnum"
              maxlength="25"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              name="cardnum"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="queryData.cardnum = $event.target.value"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行名称:">
            <el-input
              v-model="queryData.bankName"
              clearable
              maxlength="10"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行支行:">
            <el-input
              v-model="queryData.bankzh"
              clearable
              maxlength="10"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="黑名单状态:">
            <el-select
              v-model="queryData.deviceType"
              style="width: 210px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in blackStatusType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定状态:">
            <el-select
              v-model="queryData.status"
              style="width: 210px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in bindStatusType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.operation"
              clearable
              maxlength="20"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="当前绑定会员账号:">
            <el-input
              v-model="queryData.bdzhanghao"
              clearable
              maxlength="11"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员姓名:">
            <el-input
              v-model="queryData.memberName"
              clearable
              maxlength="6"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款被拒次数:">
            <el-input
              v-model="queryData.hytkbjcsmin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="hytkbjcsmin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.hytkbjcsmax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="hytkbjcsmax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款成功次数:">
            <el-input
              v-model="queryData.hytkcgcsmin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="hytkcgcsmin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.hytkcgcsmax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="hytkcgcsmax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款总金额:">
            <el-input
              v-model="queryData.hytkzemin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="hytkzemin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.hytkzemax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="hytkzemax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="风控层级:" class="tagheight">
            <el-select
              v-model="queryData.deviceType1"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in windLevelType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理提款被拒次数:">
            <el-input
              v-model="queryData.dltkbjcsmin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="dltkbjcsmin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.dltkbjcsmax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="dltkbjcsmax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款成功次数:">
            <el-input
              v-model="queryData.dltkcgcsmin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="dltkcgcsmin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.dltkcgcsmax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="dltkcgcsmax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款总金额:">
            <el-input
              v-model="queryData.dltkzemin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="dltkzemin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.dltkzemax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="dltkzemax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="绑定账号次数:">
            <el-input
              v-model="queryData.bdcs"
              maxlength="10"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="queryData.bdcs = $event.target.value"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              :disabled="loading"
              size="medium"
              @click="search"
            >
              查询
            </el-button>
            <el-button
              icon="el-icon-refresh-left"
              :disabled="loading"
              size="medium"
              @click="reset"
            >
              重置
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
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="cardnum" align="center" width="240px" label="银行卡号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.cardnum" :title="scope.row.cardnum" :copy="copy">
                {{ scope.row.cardnum }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" align="center" width="150px">
            <template slot="header">
              银行名称
              <br />
              银行支行
            </template>
          </el-table-column>
          <el-table-column
            prop="memberName"
            align="center"
            label="黑名单状态"
            width="130px"
          >
          </el-table-column>
          <el-table-column
            prop="accountType"
            align="center"
            label="绑定状态"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="风控层级"
            width="150px"
          >
          </el-table-column>
          <el-table-column
            prop="playerName"
            align="center"
            label="绑定账号次数"
            width="180px"
          >
          </el-table-column>
          <el-table-column prop="betStatus" align="center" width="100px">
            <template slot="header">
              当前绑定会员账号
              <br />
              会员姓名
            </template>
          </el-table-column>
          <el-table-column prop="betStatus" align="center" width="100px">
            <template slot="header">
              会员提款成功次数
              <br />
              会员提款被拒次数
            </template>
          </el-table-column>
          <el-table-column
            prop="betAmount"
            align="center"
            label="会员提款总金额"
            width="120px"
          ></el-table-column>
          <el-table-column prop="betStatus" align="center" width="100px">
            <template slot="header">
              代理提款成功次数
              <br />
              代理提款被拒次数
            </template>
          </el-table-column>
          <el-table-column
            prop="createAt"
            align="center"
            label="代理提款总金额"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="netAt"
            align="center"
            label="银行卡新增时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="loginIp"
            align="center"
            label="最近提款时间"
            width="150px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="deviceType"
            align="center"
            label="最近操作人"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="deviceType"
            align="center"
            label="最近操作时间"
            width="120px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="operation" align="center" label="操作" width="120px">
            <template slot-scope="scope">
              {{ scope.row.id }}
              <el-button
                type="success"
                size="medium"
                @click="eidtDialog('开启', scope.row)"
              >
                开启
              </el-button>
              <el-button
                type="danger"
                size="medium"
                @click="eidtDialog('禁用', scope.row)"
              >
                禁用
              </el-button>
              <el-button
                type="warning"
                size="medium"
                @click="eidtDialog('解绑', scope.row)"
              >
                解绑
              </el-button>
            </template>
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
    </div>
    <el-dialog
      :title="moduleBox"
      center
      :visible.sync="editVisible"
      :before-close="closeFormDialog"
      width="520px"
    >
      <el-form
        ref="editForm"
        :model="editData"
        label-width="105px"
        @submit.native.prevent="enterSearch"
      >
        <el-form-item
          v-if="moduleBox === '状态变更'"
          label="黑名单状态："
          prop="deviceType"
        >
          <el-select
            v-model="editData.deviceType"
            placeholder="请选择"
            @change="changeAccountStatus"
          >
            <el-option
              v-for="item in blackStatusType"
              :key="item.code"
              :label="item.description"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注信息："
          prop="remark"
          :rules="[
            { required: true, message: '请输入备注信息', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="editData.remark"
            :maxlength="50"
            type="textarea"
            show-word-limit
            placeholder="请输入 2 到 50个字符"
          >
          </el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '解除绑定'">
          <el-checkbox v-model="checked">将该银行卡变更为黑名单禁用状态</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitEdit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
  name: routerNames.memberBankManagement,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      tableData: [],
      dataList: {},
      moduleBox: '',
      editVisible: false,
      editData: {},
      checked: true
    }
  },
  computed: {
    blackStatusType() {
      return this.globalDics.blackStatusType
    },
    bindStatusType() {
      return this.globalDics.bindStatusType
    },
    windLevelType() {
      return this.globalDics.windLevelType
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        cardnum: '464544654'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
      // this.$api
      //   .getGameRecordNotes(params)
      //   .then((res) => {
      //     if (res.code === 200) {
      //       this.tableData = res.data.record;
      //       this.total = res.data.totalRecord;
      //     }
      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    eidtDialog(text, val) {
      if (text === '开启' || text === '禁用') {
        this.moduleBox = '状态变更'
      } else {
        this.moduleBox = '解除绑定'
      }
      this.$nextTick(() => {
        this.editVisible = true
      })
      console.log(text, val)
    },
    changeAccountStatus(val) {
      console.log(val)
    },
    submitEdit() {},
    cancel() {
      // this.$refs.editForm.resetFields();
      this.$nextTick(() => {
        this.editVisible = false
      })
    },
    closeFormDialog() {
      console.log(11111)
      this.editData.remark = ''
      this.editVisible = false
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'betAmount') {
        prop = 1
      }
      if (prop === 'netAmount') {
        prop = 2
      }
      if (prop === 'createAt') {
        prop = 3
      }
      if (prop === 'netAt') {
        prop = 4
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
    checkValue(e) {
      const { name, value } = e.target
      switch (name) {
        case 'hytkbjcsmin':
          if (
            !!this.queryData.hytkbjcsmax &&
            value &&
            value * 1 > this.queryData.hytkbjcsmax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款被拒次数最小值不能大于最大值`
            })
            this.queryData.hytkbjcsmin = ''
          } else {
            this.queryData.hytkbjcsmin = value
          }
          break
        case 'hytkbjcsmax':
          if (
            !!this.queryData.hytkbjcsmin &&
            value &&
            value * 1 < this.queryData.hytkbjcsmin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款被拒次数最大值不能小于最小值`
            })
            this.queryData.hytkbjcsmax = ''
          } else {
            this.queryData.hytkbjcsmax = value
          }
          break
        case 'hytkcgcsmin':
          if (
            !!this.queryData.hytkcgcsmax &&
            value &&
            value * 1 > this.queryData.hytkcgcsmax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款成功次数最小值不能大于最大值`
            })
            this.queryData.hytkcgcsmin = ''
          } else {
            this.queryData.hytkcgcsmin = value
          }
          break
        case 'hytkcgcsmax':
          if (
            !!this.queryData.hytkcgcsmin &&
            value &&
            value * 1 < this.queryData.hytkcgcsmin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款成功次数最大值不能小于最小值`
            })
            this.queryData.hytkcgcsmax = ''
          } else {
            this.queryData.hytkcgcsmax = value
          }
          break
        case 'hytkzemin':
          if (
            !!this.queryData.hytkzemax &&
            value &&
            value * 1 > this.queryData.hytkzemax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款总金额最小值不能大于最大值`
            })
            this.queryData.hytkzemin = ''
          } else {
            this.queryData.hytkzemin = value
          }
          break
        case 'hytkzemax':
          if (
            !!this.queryData.hytkzemin &&
            value &&
            value * 1 < this.queryData.hytkzemin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款总金额最大值不能小于最小值`
            })
            this.queryData.hytkzemax = ''
          } else {
            this.queryData.hytkzemax = value
          }
          break

        case 'dltkbjcsmin':
          if (
            !!this.queryData.dltkbjcsmax &&
            value &&
            value * 1 > this.queryData.dltkbjcsmax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款被拒次数最小值不能大于最大值`
            })
            this.queryData.dltkbjcsmin = ''
          } else {
            this.queryData.dltkbjcsmin = value
          }
          break
        case 'dltkbjcsmax':
          if (
            !!this.queryData.dltkbjcsmin &&
            value &&
            value * 1 < this.queryData.dltkbjcsmin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款被拒次数最大值不能小于最小值`
            })
            this.queryData.dltkbjcsmax = ''
          } else {
            this.queryData.dltkbjcsmax = value
          }
          break
        case 'dltkcgcsmin':
          if (
            !!this.queryData.dltkcgcsmax &&
            value &&
            value * 1 > this.queryData.dltkcgcsmax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款成功次数最小值不能大于最大值`
            })
            this.queryData.dltkcgcsmin = ''
          } else {
            this.queryData.dltkcgcsmin = value
          }
          break
        case 'dltkcgcsmax':
          if (
            !!this.queryData.dltkcgcsmin &&
            value &&
            value * 1 < this.queryData.dltkcgcsmin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款成功次数最大值不能小于最小值`
            })
            this.queryData.dltkcgcsmax = ''
          } else {
            this.queryData.dltkcgcsmax = value
          }
          break
        case 'dltkzemin':
          if (
            !!this.queryData.dltkzemax &&
            value &&
            value * 1 > this.queryData.dltkzemax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款总金额最小值不能大于最大值`
            })
            this.queryData.dltkzemin = ''
          } else {
            this.queryData.dltkzemin = value
          }
          break
        case 'dltkzemax':
          if (
            !!this.queryData.dltkzemin &&
            value &&
            value * 1 < this.queryData.dltkzemin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款总金额最大值不能小于最小值`
            })
            this.queryData.dltkzemax = ''
          } else {
            this.queryData.dltkzemax = value
          }
          break
      }
    },
    enterSearch() {
      this.loadData()
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
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
}
</style>
