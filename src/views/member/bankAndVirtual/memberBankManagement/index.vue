<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="银行卡号:">
            <el-input
              v-model="queryData.id"
              clearable
              :maxlength="25"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行名称:">
            <el-input
              v-model="queryData.thirdOrderId"
              clearable
              :maxlength="10"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行支行:">
            <el-input
              v-model="queryData.thirdOrderId"
              clearable
              :maxlength="10"
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
              v-model="queryData.deviceType"
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
              v-model="queryData.memberName"
              clearable
              :maxlength="20"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="当前绑定会员账号:">
            <el-input
              v-model="queryData.memberName"
              clearable
              :maxlength="11"
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
              :maxlength="6"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款被拒次数:">
            <el-input
              v-model="queryData.betAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="betAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.betAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="betAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款成功次数:">
            <el-input
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员提款总金额:">
            <el-input
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="风控层级:" class="tagheight">
            <el-select
              v-model="queryData.deviceType1"
              style="width: 210px"
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
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款成功次数:">
            <el-input
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理提款总金额:">
            <el-input
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="绑定账号次数:">
            <el-input
              v-model="queryData.loginIp"
              clearable
              :maxlength="10"
              size="medium"
              style="width: 210px"
              placeholder="请输入"
              :disabled="loading"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
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
          <el-table-column prop="id" align="center" width="240px" label="银行卡号">
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.memberName"
                :title="scope.row.memberName"
                :copy="copy"
              >
                {{ scope.row.memberName }}
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
              <el-button type="success" icon="el-icon-view" size="medium">
                解绑
              </el-button>
              <el-button type="danger" icon="el-icon-view" size="medium">
                解绑
              </el-button>
              <el-button type="warning" icon="el-icon-view" size="medium">
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
      dataList: {}
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
        .getGameRecordNotes(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
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
        case 'betAmountMax':
          if (
            !!this.queryData.betAmountMin &&
            value &&
            value * 1 <= this.queryData.betAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额输入最大值不能小于最小值`
            })
          } else {
            this.queryData.betAmountMax = value
          }
          break
        case 'netAmountMax':
          if (
            !!this.queryData.netAmountMin &&
            value &&
            value * 1 < this.queryData.netAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员输赢输入最大值不能小于最小值`
            })
          } else {
            this.queryData.netAmountMax = value
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
