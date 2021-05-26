<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="虚拟币账号地址:">
            <el-input
              v-model="queryData.virtualAddress"
              maxlength="100"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              name="virtualAddress"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="虚拟币种类:">
            <el-select
              v-model="queryData.virtualCoinKind"
              style="width: 300px"
              multiple
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
          <el-form-item label="虚拟币协议:">
            <el-select
              v-model="queryData.virtualAgreement"
              style="width: 300px"
              multiple
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
          <el-form-item label="黑名单状态:">
            <el-select
              v-model="queryData.blackStatus"
              style="width: 210px"
              clearable
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
              v-model="queryData.bindStatus"
              clearable
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
          <el-form-item label="风控层级:" class="tagheight">
            <el-select
              v-model="queryData.windControlId"
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
          <el-form-item label="当前绑定会员账号:">
            <el-input
              v-model="queryData.bindUserName"
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
              v-model="queryData.userName"
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
              v-model="queryData.userWithdrawRefuseMinCount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawRefuseMinCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.userWithdrawRefuseMaxCount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawRefuseMaxCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款成功次数:">
            <el-input
              v-model="queryData.userWithdrawSuccessMinCount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawSuccessMinCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.userWithdrawSuccessMaxCount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawSuccessMaxCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款总金额:">
            <el-input
              v-model="queryData.userWithdrawMinAmount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawMinAmount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.userWithdrawMaxAmount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="userWithdrawMaxAmount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="操作人:">
            <el-input
              v-model="queryData.lastOperator"
              clearable
              maxlength="20"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>

          <el-form-item label="代理提款被拒次数:">
            <el-input
              v-model="queryData.proxyWithdrawRefuseMinCount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawRefuseMinCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.proxyWithdrawRefuseMaxCount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawRefuseMaxCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款成功次数:">
            <el-input
              v-model="queryData.proxyWithdrawSuccessMinCount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawSuccessMinCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.proxyWithdrawSuccessMaxCount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawSuccessMaxCount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款总金额:">
            <el-input
              v-model="queryData.proxyWithdrawMinAmount"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawMinAmount"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.proxyWithdrawMaxAmount"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              name="proxyWithdrawMaxAmount"
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
          <el-table-column
            prop="virtualAddress"
            align="center"
            width="240px"
            label="虚拟币账号地址"
          >
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.virtualAddress"
                :title="scope.row.virtualAddress"
                :copy="copy"
              >
                {{ scope.row.virtualAddress }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="virtualKind" align="center" width="150px">
            <template slot="header">
              虚拟币种类
              <br />
              虚拟币协议
            </template>
            <template slot-scope="scope">
              {{ scope.row.virtualKind }}
              <br />
              {{ scope.row.virtualProtocol }}
            </template>
          </el-table-column>
          <el-table-column
            prop="blacklistStatus"
            align="center"
            label="黑名单状态"
            width="130px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.blacklistStatus === 0" class="disableRgba">
                {{ typeFilter(scope.row.blacklistStatus, "blackStatusType") }}
              </span>
              <span v-else-if="scope.row.blacklistStatus === 1" class="normalRgba">
                {{ typeFilter(scope.row.blacklistStatus, "blackStatusType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bindStatus"
            align="center"
            label="绑定状态"
            width="100px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.bindStatus === 0" class="disableRgba">
                {{ typeFilter(scope.row.bindStatus, "bindStatusType") }}
              </span>
              <span v-else-if="scope.row.bindStatus === 1" class="normalRgba">
                {{ typeFilter(scope.row.bindStatus, "bindStatusType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="windControlId"
            align="center"
            label="风控层级"
            width="150px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.windControlId !== null">
                {{ typeFilter(scope.row.windControlId, "windLevelType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bindNum"
            align="center"
            label="绑定账号次数"
            width="180px"
          >
          </el-table-column>
          <el-table-column prop="bindUserName" align="center" width="100px">
            <template slot="header">
              当前绑定会员账号
              <br />
              会员姓名
            </template>
            <template slot-scope="scope">
              {{ scope.row.bindUserName }}
              <br />
              <!-- {{ scope.row.userName }} -->
            </template>
          </el-table-column>
          <el-table-column prop="withdrawalSuccessNum" align="center" width="100px">
            <template slot="header">
              会员提款成功次数
              <br />
              会员提款被拒次数
            </template>
            <template slot-scope="scope">
              {{ scope.row.withdrawalSuccessNum }}
              <br />
              {{ scope.row.withdrawalFailNum }}
            </template>
          </el-table-column>
          <el-table-column
            prop="withdrawalTotalAmount"
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
            prop="createAt1"
            align="center"
            label="代理提款总金额"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="银行卡新增时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="withdrawalTime"
            align="center"
            label="最近提款时间"
            width="150px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updatedBy"
            align="center"
            label="最近操作人"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="最近操作时间"
            width="120px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="operation" align="center" label="操作" width="120px">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.blacklistStatus === 0"
                type="success"
                size="medium"
                @click="eidtDialog('开启', scope.row)"
              >
                开启
              </el-button>
              <el-button
                v-else
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
    <el-dialog :title="moduleBox" center :visible.sync="editVisible" width="520px">
      <el-form
        ref="editForm"
        :model="editData"
        label-width="105px"
        @submit.native.prevent="enterSearch"
      >
        <!-- <el-form-item
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
        </el-form-item> -->
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
          <el-checkbox
v-model="editData.checked"
>将该地址变更为黑名单禁用状态</el-checkbox>
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
      editData: {}
      // checked: true
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
    for (let i = 0; i < 3; i++) {
      this.tableData[i] = {
        virtualAddress: '464544654'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      // let params = {
      //   ...this.queryData,
      //   dataType: 1
      // }
      // params = {
      //   ...this.getParams(params)
      // }
      // console.log(params)
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
    submitEdit() {
      console.log(this.editData)
      // const params = {}
      // this.$refs.editForm.validate((valid) => {
      //   if (valid) {
      //   }
      // })
    },
    cancel() {
      // this.$refs.editForm.resetFields()
      // this.$nextTick(() => {
      //   this.editVisible = false
      // })
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
      }
      if (prop === 'withdrawalTime') {
        prop = 2
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
        case 'userWithdrawRefuseMinCount':
          if (
            !!this.queryData.userWithdrawRefuseMaxCount &&
            value &&
            value * 1 > this.queryData.userWithdrawRefuseMaxCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款被拒次数最小值不能大于最大值`
            })
            this.queryData.userWithdrawRefuseMinCount = ''
          } else {
            this.queryData.userWithdrawRefuseMinCount = value
          }
          break
        case 'userWithdrawRefuseMaxCount':
          if (
            !!this.queryData.userWithdrawRefuseMinCount &&
            value &&
            value * 1 < this.queryData.userWithdrawRefuseMinCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款被拒次数最大值不能小于最小值`
            })
            this.queryData.userWithdrawRefuseMaxCount = ''
          } else {
            this.queryData.userWithdrawRefuseMaxCount = value
          }
          break
        case 'userWithdrawSuccessMinCount':
          if (
            !!this.queryData.userWithdrawSuccessMaxCount &&
            value &&
            value * 1 > this.queryData.userWithdrawSuccessMaxCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款成功次数最小值不能大于最大值`
            })
            this.queryData.userWithdrawSuccessMinCount = ''
          } else {
            this.queryData.userWithdrawSuccessMinCount = value
          }
          break
        case 'userWithdrawSuccessMaxCount':
          if (
            !!this.queryData.userWithdrawSuccessMinCount &&
            value &&
            value * 1 < this.queryData.userWithdrawSuccessMinCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款成功次数最大值不能小于最小值`
            })
            this.queryData.userWithdrawSuccessMaxCount = ''
          } else {
            this.queryData.userWithdrawSuccessMaxCount = value
          }
          break
        case 'userWithdrawMinAmount':
          if (
            !!this.queryData.userWithdrawMaxAmount &&
            value &&
            value * 1 > this.queryData.userWithdrawMaxAmount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款总金额最小值不能大于最大值`
            })
            this.queryData.userWithdrawMinAmount = ''
          } else {
            this.queryData.userWithdrawMinAmount = value
          }
          break
        case 'userWithdrawMaxAmount':
          if (
            !!this.queryData.userWithdrawMinAmount &&
            value &&
            value * 1 < this.queryData.userWithdrawMinAmount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员提款总金额最大值不能小于最小值`
            })
            this.queryData.userWithdrawMaxAmount = ''
          } else {
            this.queryData.userWithdrawMaxAmount = value
          }
          break

        case 'proxyWithdrawRefuseMinCount':
          if (
            !!this.queryData.proxyWithdrawRefuseMaxCount &&
            value &&
            value * 1 > this.queryData.proxyWithdrawRefuseMaxCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款被拒次数最小值不能大于最大值`
            })
            this.queryData.proxyWithdrawRefuseMinCount = ''
          } else {
            this.queryData.proxyWithdrawRefuseMinCount = value
          }
          break
        case 'proxyWithdrawRefuseMaxCount':
          if (
            !!this.queryData.proxyWithdrawRefuseMinCount &&
            value &&
            value * 1 < this.queryData.proxyWithdrawRefuseMinCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款被拒次数最大值不能小于最小值`
            })
            this.queryData.proxyWithdrawRefuseMaxCount = ''
          } else {
            this.queryData.proxyWithdrawRefuseMaxCount = value
          }
          break
        case 'proxyWithdrawSuccessMinCount':
          if (
            !!this.queryData.proxyWithdrawSuccessMaxCount &&
            value &&
            value * 1 > this.queryData.proxyWithdrawSuccessMaxCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款成功次数最小值不能大于最大值`
            })
            this.queryData.proxyWithdrawSuccessMinCount = ''
          } else {
            this.queryData.proxyWithdrawSuccessMinCount = value
          }
          break
        case 'proxyWithdrawSuccessMaxCount':
          if (
            !!this.queryData.proxyWithdrawSuccessMinCount &&
            value &&
            value * 1 < this.queryData.proxyWithdrawSuccessMinCount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款成功次数最大值不能小于最小值`
            })
            this.queryData.proxyWithdrawSuccessMaxCount = ''
          } else {
            this.queryData.proxyWithdrawSuccessMaxCount = value
          }
          break
        case 'proxyWithdrawMinAmount':
          if (
            !!this.queryData.proxyWithdrawMaxAmount &&
            value &&
            value * 1 > this.queryData.proxyWithdrawMaxAmount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款总金额最小值不能大于最大值`
            })
            this.queryData.proxyWithdrawMinAmount = ''
          } else {
            this.queryData.proxyWithdrawMinAmount = value
          }
          break
        case 'proxyWithdrawMaxAmount':
          if (
            !!this.queryData.proxyWithdrawMinAmount &&
            value &&
            value * 1 < this.queryData.proxyWithdrawMinAmount * 1
          ) {
            this.$message({
              type: 'warning',
              message: `代理提款总金额最大值不能小于最小值`
            })
            this.queryData.proxyWithdrawMaxAmount = ''
          } else {
            this.queryData.proxyWithdrawMaxAmount = value
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
