<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData" label-width="85px">
          <el-form-item label="注册时间:" prop="registerTime">
            <el-date-picker
              v-model="queryData.registerTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :clearable="true"
              value-format="timestamp"
              style="width: 300px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="会员账号:">
            <el-input
              v-model="queryData.userName"
              size="medium"
              placeholder="请输入"
              clearable
              style="width: 180px"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input
              v-model="queryData.realName"
              size="medium"
              placeholder="请输入"
              clearable
              style="width: 180px"
              maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级代理:">
            <el-input
              v-model="queryData.parentProxyName"
              size="medium"
              placeholder="请输入"
              clearable
              style="width: 180px"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号类型:">
            <el-select
              v-model="queryData.accountType"
              size="medium"
              placeholder="默认选择全部"
              clearable
              multiple
              collapse-tags
              style="width: 220px"
            >
              <el-option
                v-for="item in accountTypeArr"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态:">
            <el-select
              v-model="queryData.accountStatus"
              size="medium"
              placeholder="默认选择全部"
              clearable
              multiple
              style="width: 400px"
            >
              <el-option
                v-for="item in accountStatusArr"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风控层级:">
            <el-select
              v-model="queryData.windControlId"
              size="medium"
              placeholder="全部"
              clearable
              style="width: 180px"
            >
              <el-option
                v-for="item in vipDict"
                :key="item.windControlId"
                :label="item.windControlName"
                :value="item.windControlId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员标签:">
            <el-select
              v-model="queryData.labelId"
              size="medium"
              placeholder="全部"
              clearable
              style="width: 180px"
            >
              <el-option
                v-for="item in userLabel"
                :key="item.labelId"
                :label="item.labelName"
                :value="item.labelId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VIP等级:">
            <el-input
              v-model="queryData.vipSerialNumMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="3"
              name="vipSerialNumMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.vipSerialNumMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="10"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="vipSerialNumMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="注单量:">
            <el-input
              v-model="queryData.betNumMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="10"
              name="betNumMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.betNumMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="10"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="betNumMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注金额:">
            <el-input
              v-model="queryData.depositAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="depositAmountMin"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.depositAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="depositAmountMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效投注:">
            <el-input
              v-model="queryData.depositAmountValidMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="15"
              name="depositAmountValidMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.depositAmountValidMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="15"
              name="depositAmountValidMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注盈亏:">
            <el-input
              v-model="queryData.profitMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="profitMin"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.profitMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="profitMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="总存款:">
            <el-input
              v-model="queryData.totalDepositMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="10"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="totalDepositMin"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.totalDepositMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="10"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="totalDepositMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="总取款:">
            <el-input
              v-model="queryData.withdrawalMin"
              size="medium"
              placeholder="最小数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="withdrawalMin"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.withdrawalMax"
              size="medium"
              placeholder="最大数值"
              style="width: 135px"
              maxlength="15"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="withdrawalMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="medium"
              :disabled="queryText !== '查询'"
              @click="_search"
            >
              {{ queryText }}
            </el-button>
            <el-button
              icon="el-icon-refresh-left"
              :disabled="loading"
              size="medium"
              @click="reset"
            >
              重置
            </el-button>
            <el-button
              v-if="hasPermission('349')"
              type="warning"
              icon="el-icon-folder-add"
              size="medium"
              :disabled="loading"
              @click="exportExcel"
            >
              导出
            </el-button>
            <el-button
              type="success"
              icon="el-icon-setting"
              :disabled="loading"
              size="medium"
              @click="openSetting"
            >
              列设置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="content">
        <el-table
          ref="tables"
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="dataList"
          style="width: 100%"
          :header-cell-style="getRowClass"
          :summary-method="getSummaries"
          show-summary
          @sort-change="_changeTableSort"
        >
          <el-table-column
            v-if="settingList['会员账号']"
            prop="userName"
            align="center"
            label="会员账号"
            width="150"
            fixed
          >
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['姓名']"
            prop="realName"
            align="center"
            label="姓名"
            width="150"
          >
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.realName" :title="scope.row.realName" :copy="copy">
                {{ scope.row.realName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['账号类型']"
            prop="accountType"
            align="center"
            label="账号类型"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.accountType">
                {{ typeFilter(scope.row.accountType, "accountType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['上级代理']"
            prop="parentProxyName"
            align="center"
            label="上级代理"
            width="150"
          >
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.parentProxyName"
                :title="scope.row.parentProxyName"
                :copy="copy"
              >
                {{ scope.row.parentProxyName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['VIP等级']"
            prop="vipSerialNum"
            align="center"
            label="VIP等级"
            width="100"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.vipSerialNum || scope.row.vipSerialNum === 0">
                {{ scope.row.vipSerialNum }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['账号状态']"
            prop="accountStatus"
            align="center"
            label="账号状态"
            width="120"
          >
            <template slot-scope="scope">
              <span
                v-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 1"
                class="normalRgba"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span
                v-else-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2"
                class="disableRgba"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span
                v-else-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 3"
                class="lockingRgba"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span
                v-else-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4"
                class="deleteRgba"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['会员标签']"
            prop="labelName"
            align="center"
            label="会员标签"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.labelName">
                {{ scope.row.labelName }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="windControlName"
            align="center"
            label="风控层级"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.windControlName">
                {{ scope.row.windControlName }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createDt"
            align="center"
            label="注册时间"
            width="180"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.createDt">
                {{ scope.row.createDt }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="firstDepositAmount"
            align="center"
            label="首存金额"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  !!scope.row.firstDepositAmount || scope.row.firstDepositAmount === 0
                "
              >
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="总存款"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.depositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="存款次数"
            sortable="custom"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="上级转入"
            sortable="custom"
            width="120"
          >
          <template slot="header" slot-scope="scope">
              <el-popover placement="top-start" title="提示" width="280" trigger="hover">
                <div v-if="!scope.row">
                  <div>汇总搜索时间内的会员的上级转入金额</div>
                </div>
                <div slot="reference" class="el-icon-question">
                  <span class="other-class">上级转入</span>
                </div>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="depositAmount"
            align="center"
            label="转入次数"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="depositAmount"
            align="center"
            label="转中心钱包"
            sortable="custom"
            width="120"
          >
          <template slot="header" slot-scope="scope">
              <el-popover placement="top-start" title="提示" width="280" trigger="hover">
                <div v-if="!scope.row">
                  <div>汇总搜索时间内同账号代理转入中心钱包的金额</div>
                </div>
                <div slot="reference" class="el-icon-question">
                  <span class="other-class">转中心钱包</span>
                </div>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="depositAmount"
            align="center"
            label="转入次数"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="总取数"
            sortable="custom"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="取款次数"
            sortable="custom"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="大额取款次数"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="取款差"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="总反水"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="其他调整"
            sortable="custom"
            width="110"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="注单量"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="投注金额"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="有效投注"
            sortable="custom"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="depositAmount"
            align="center"
            label="投注盈亏"
            sortable="custom"
            width="150"
          >
            <template slot="header" slot-scope="scope">
              <el-popover placement="top-start" title="提示" width="280" trigger="hover">
                <div v-if="!scope.row">
                  <div>汇总会员搜索时间内的总输赢</div>
                </div>
                <div slot="reference" class="el-icon-question">
                  <span class="other-class">投注盈亏</span>
                </div>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span v-if="!!scope.row.depositAmount || scope.row.depositAmount === 0">
                {{ scope.row.firstDepositAmount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="transforNum" align="center" label="转代次数">
            <template slot-scope="scope">
              <span v-if="!!scope.row.transforNum || scope.row.transforNum * 1 === 0">
                {{ scope.row.transforNum }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userBalance"
            align="center"
            label="中心钱包余额"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.userBalance || scope.row.userBalance === 0">
                {{ scope.row.userBalance }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userBalance"
            align="center"
            label="钱包总余额"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.userBalance || scope.row.userBalance === 0">
                {{ scope.row.userBalance }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-show="!!total"
          class="pageValue"
          :current-page.sync="pageNum"
          background
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="$store.getters.pageSizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <el-dialog
        title="列设置"
        center
        :visible.sync="visible"
        width="610px"
        class="col-setting"
      >
        <el-button type="primary" @click="setAll">复原缺省</el-button>
        <div v-for="(value, name) in settingList" :key="name" class="setting-div">
          <el-checkbox v-model="newList[name]">{{ name }}</el-checkbox>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
// import { UTable } from 'umy-ui'
import { routerNames } from '@/utils/consts'
const start = dayjs().startOf('day').valueOf()
const end = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.memberReport,
  mixins: [list],
  data() {
    return {
      queryData: {
        registerTime: [start, end],
        userName: undefined,
        realName: undefined,
        parentProxyName: undefined,
        accountType: [],
        accountStatus: [],
        windControlId: undefined,
        labelId: undefined,
        vipSerialNumMax: undefined,
        vipSerialNumMin: undefined,
        betNumMin: undefined,
        betNumMax: undefined,
        depositAmountMin: undefined,
        depositAmountMax: undefined,
        depositAmountValidMin: undefined,
        depositAmountValidMax: undefined,
        profitMin: undefined,
        profitMax: undefined,
        totalDepositMin: undefined,
        totalDepositMax: undefined,
        withdrawalMin: undefined,
        withdrawalMax: undefined,
        orderKey: undefined,
        orderType: undefined
      },
      dataList: [],
      total: 0,
      vipDict: [],
      userLabel: [],
      queryText: '查询',
      visible: false,
      settingList: {
        会员账号: true,
        姓名: true,
        账号类型: true,
        上级代理: true,
        VIP等级: true,
        账号状态: true,
        会员标签: true
      },
      newList: [],
      totalLoading: false,
      summary: undefined // 总计
    }
  },
  computed: {
    accountStatusArr() {
      return this.globalDics.accountStatusType
    },
    accountTypeArr() {
      return this.globalDics.accountType
    }
  },
  created() {
    this.getMemberLabelDict()
  },
  mounted() {
    this.getWindControllerLevelDict()
    if (localStorage.getItem('memberReport')) {
      this.settingList = JSON.parse(localStorage.getItem('memberReport'))
    }

    setTimeout(() => {
      this.totalLoading = true
    }, 3000)

    this.$nextTick(() => {
      console.log('sss', this.$refs.tables.bodyWrapper)
      this.$refs.tables.bodyWrapper.scrollTop = 1000
      this.$refs.tables.doLayout()
    })
  },
  methods: {
    _search() {
      let t = 10
      const timeCount = setInterval(() => {
        t--
        this.queryText = t + 's'
        if (t < 0) {
          clearInterval(timeCount)
          this.queryText = '查询'
        }
      }, 1000)
      this.loadData()
    },
    // 列设置
    openSetting() {
      this.visible = true
      this.newList = JSON.parse(JSON.stringify(this.settingList))
    },
    setAll() {
      Object.keys(this.newList).forEach((item) => {
        this.newList[item] = true
      })
    },
    confirm() {
      localStorage.setItem('memberReport', JSON.stringify(this.newList))
      this.settingList = this.newList
      this.visible = false
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          const el = (
            <div class='count_row'>
              <p>本页合计</p>
              <p>全部合计</p>
            </div>
          )
          sums[index] = el
          return
        }
        const includeArr = new Map([
          ['vipSerialNum', 'vipSerialNum'],
          ['depositAmount', 'depositAmount'],
          ['depositTotal', 'depositTotal'],
          ['firstDepositAmount', 'firstDepositAmount'],
          ['transforNum', 'transforNum'],
          ['userBalance', 'userBalance']
        ])

        if (includeArr.get(column.property)) {
          const values = data.map((item) => Number(item[column.property]))
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            switch (column.property) {
              case 'vipSerialNum':
                // eslint-disable-next-line no-case-declarations
                let vipTotal
                if (!this.totalLoading) {
                  vipTotal = (
                    <div class='count_row'>
                      <p>{sums[index]}</p>
                      <p>
                        <el-button icon='el-icon-loading' />
                      </p>
                    </div>
                  )
                } else {
                  vipTotal = (
                    <div class='count_row'>
                      <p>{sums[index]}</p>
                      <p>10000</p>
                    </div>
                  )
                }
                return (sums[index] = vipTotal)
              case 'depositAmount':
                // eslint-disable-next-line no-case-declarations
                const depositTotal = (
                  <div class='count_row'>
                    <p>{sums[index]}</p>
                    <p>200</p>
                  </div>
                )
                return (sums[index] = depositTotal)
              case 'firstDepositAmount':
                // eslint-disable-next-line no-case-declarations
                const firstDepositTotal = (
                  <div class='count_row'>
                    <p>{sums[index]}</p>
                    <p>200</p>
                  </div>
                )
                return (sums[index] = firstDepositTotal)
              case 'transforNum':
                // eslint-disable-next-line no-case-declarations
                const transforTotal = (
                  <div class='count_row'>
                    <p>{sums[index]}</p>
                    <p>200</p>
                  </div>
                )
                return (sums[index] = transforTotal)
              case 'userBalance':
                // eslint-disable-next-line no-case-declarations
                const userBalanceTotal = (
                  <div class='count_row'>
                    <p>{sums[index]}</p>
                    <p>200</p>
                  </div>
                )
                return (sums[index] = userBalanceTotal)
            }
          } else {
            sums[index] = ''
          }
        }
      })

      return sums
    },
    loadData() {
      const create = this.queryData.registerTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createDtStart: startTime
          ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        createDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : undefined
      }
      params = {
        ...this.getParams(params)
      }
      if (!startTime && !endTime) {
        this.$message({
          type: 'warning',
          message: `请选择注册时间`
        })
        return false
      }
      this.dataList = []
      this.loading = true
      this.totalLoading = false
      delete params.registerTime
      this.$api
        .memberListAPI(params)
        .then((res) => {
          const {
            code,
            data: { record, totalRecord },
            msg
          } = res
          if (code === 200) {
            this.loading = false
            this.dataList = record
            this.total = totalRecord
          } else {
            this.loading = false
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        })
        .catch(() => (this.loading = false))

      setTimeout(() => {
        this.loading = false
      }, 1000)

      setTimeout(() => {
        this.totalLoading = true
      }, 1000)
    },
    // 获取会员标签
    getMemberLabelDict() {
      this.$api.getMemberLabelDict().then((res) => {
        const { code, data, msg } = res
        if (code === 200) {
          this.userLabel = data || []
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      })
    },
    // 获取风控层级
    getWindControllerLevelDict() {
      this.$api.getWindControllerLevelDict({ windControlType: 1 }).then((res) => {
        if (res.code === 200) {
          this.vipDict = res.data
        }
      })
    },
    reset() {
      this.pageNum = 1
      this.queryData = {
        registerTime: [start, end],
        userName: undefined,
        realName: undefined,
        parentProxyName: undefined,
        accountType: [],
        accountStatus: [],
        windControlId: undefined,
        labelId: undefined,
        vipSerialNumMax: undefined,
        vipSerialNumMin: undefined,
        betNumMin: undefined,
        betNumMax: undefined,
        depositAmountMin: undefined,
        depositAmountMax: undefined,
        depositAmountValidMin: undefined,
        depositAmountValidMax: undefined,
        profitMin: undefined,
        profitMax: undefined,
        totalDepositMin: undefined,
        totalDepositMax: undefined,
        withdrawalMin: undefined,
        withdrawalMax: undefined,
        orderKey: undefined,
        orderType: undefined
      }
      this.$refs['form'].resetFields()
      this.loadData()
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'vipSerialNum') {
        prop = 1
      }
      if (prop === 'createDt') {
        prop = 2
      }
      if (prop === 'firstDepositTime') {
        prop = 3
      }
      if (prop === 'firstDepositAmount') {
        prop = 4
      }
      if (prop === 'lastLoginTime') {
        prop = 5
      }
      if (prop === 'offLineDays') {
        prop = 6
      }
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderKey
        delete this.queryData.orderType
      }
      this.loadData()
    },

    checkValue(e) {
      const { name, value } = e.target
      switch (name) {
        case 'vipSerialNumMin':
          if (
            !!this.queryData.vipSerialNumMax &&
            value &&
            value * 1 > this.queryData.vipSerialNumMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.vipSerialNumMax}等级`
            })
          } else {
            this.queryData.vipSerialNumMin = value
          }
          break
        case 'vipSerialNumMax':
          if (
            !!this.queryData.vipSerialNumMin &&
            value &&
            value * 1 < this.queryData.vipSerialNumMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.vipSerialNumMin}等级`
            })
          } else {
            this.queryData.vipSerialNumMax = value
          }
          break
        case 'betNumMin':
          if (
            !!this.queryData.betNumMax &&
            value &&
            value * 1 > this.queryData.betNumMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.betNumMax}注单量`
            })
          } else {
            this.queryData.betNumMin = value
          }
          break
        case 'betNumMax':
          if (
            !!this.queryData.betNumMin &&
            value &&
            value * 1 < this.queryData.betNumMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.betNumMin}注单量`
            })
          } else {
            this.queryData.betNumMax = value
          }
          break
        case 'depositAmountMin':
          if (
            !!this.queryData.depositAmountMax &&
            value &&
            value * 1 > this.queryData.depositAmountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.depositAmountMax}金额`
            })
          } else {
            this.queryData.depositAmountMin = value
          }
          break
        case 'depositAmountMax':
          if (
            !!this.queryData.depositAmountMin &&
            value &&
            value * 1 < this.queryData.depositAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.depositAmountMin}金额`
            })
          } else {
            this.queryData.depositAmountMax = value
          }
          break
        case 'depositAmountValidMin':
          if (
            !!this.queryData.depositAmountValidMax &&
            value &&
            value * 1 > this.queryData.depositAmountValidMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.depositAmountValidMax}金额`
            })
          } else {
            this.queryData.depositAmountValidMin = value
          }
          break
        case 'depositAmountValidMax':
          if (
            !!this.queryData.depositAmountValidMin &&
            value &&
            value * 1 < this.queryData.depositAmountValidMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.depositAmountValidMin}金额`
            })
          } else {
            this.queryData.depositAmountValidMax = value
          }
          break
        case 'profitMin':
          if (
            !!this.queryData.profitMax &&
            value &&
            value * 1 > this.queryData.profitMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.profitMax}金额`
            })
          } else {
            this.queryData.profitMin = value
          }
          break
        case 'profitMax':
          if (
            !!this.queryData.profitMin &&
            value &&
            value * 1 < this.queryData.profitMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.profitMin}金额`
            })
          } else {
            this.queryData.profitMax = value
          }
          break
        case 'totalDepositMin':
          if (
            !!this.queryData.totalDepositMax &&
            value &&
            value * 1 > this.queryData.totalDepositMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.totalDepositMax}金额`
            })
          } else {
            this.queryData.totalDepositMin = value
          }
          break
        case 'totalDepositMax':
          if (
            !!this.queryData.totalDepositMin &&
            value &&
            value * 1 < this.queryData.totalDepositMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.totalDepositMin}金额`
            })
          } else {
            this.queryData.totalDepositMax = value
          }
          break
        case 'withdrawalMin':
          if (
            !!this.queryData.withdrawalMax &&
            value &&
            value * 1 > this.queryData.withdrawalMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入小于${this.queryData.withdrawalMax}金额`
            })
          } else {
            this.queryData.withdrawalMin = value
          }
          break
        case 'withdrawalMax':
          if (
            !!this.queryData.withdrawalMin &&
            value &&
            value * 1 < this.queryData.withdrawalMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `请输入大于${this.queryData.withdrawalMin}金额`
            })
          } else {
            this.queryData.withdrawalMax = value
          }
          break
      }
    },
    exportExcel() {
      const create = this.queryData.registerTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createDtStart: startTime
          ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        createDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : undefined
      }
      params = {
        ...this.getParams(params)
      }
      delete params.registerTime
      params.accountStatus =
        params.accountStatus && params.accountStatus.length
          ? params.accountStatus
          : undefined
      params.deviceType =
        params.deviceType && params.deviceType.length ? params.deviceType : undefined
      params.accountType =
        params.accountType && params.accountType.length ? params.accountType : undefined
      this.$confirm(
        `<strong>是否导出?</strong></br><span style='font-size:12px;color:#c1c1c1'>数据过大时，请耐心等待</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.loading = true
          this.$api
            .exportExcelAPI(params)
            .then((res) => {
              this.loading = false
              const { data, status } = res
              if (res && status === 200) {
                const { type } = data
                if (type.includes('application/json')) {
                  const reader = new FileReader()
                  reader.onload = (evt) => {
                    if (evt.target.readyState === 2) {
                      const {
                        target: { result }
                      } = evt
                      const ret = JSON.parse(result)
                      if (ret.code !== 200) {
                        this.$message({
                          type: 'error',
                          message: ret.msg,
                          duration: 1500
                        })
                      }
                    }
                  }
                  reader.readAsText(data)
                } else {
                  const result = res.data
                  const disposition = res.headers['content-disposition']
                  const fileNames = disposition && disposition.split("''")
                  let fileName = fileNames[1]
                  fileName = decodeURIComponent(fileName)
                  const blob = new Blob([result], {
                    type: 'application/octet-stream'
                  })
                  if ('download' in document.createElement('a')) {
                    const downloadLink = document.createElement('a')
                    downloadLink.download = fileName || ''
                    downloadLink.style.display = 'none'
                    downloadLink.href = URL.createObjectURL(blob)
                    document.body.appendChild(downloadLink)
                    downloadLink.click()
                    URL.revokeObjectURL(downloadLink.href)
                    document.body.removeChild(downloadLink)
                  } else {
                    window.navigator.msSaveBlob(blob, fileName)
                  }
                  this.$message({
                    type: 'success',
                    message: '导出成功',
                    duration: 1500
                  })
                }
              }
            })
            .catch(() => {
              this.loading = false
              this.$message({
                type: 'error',
                message: '导出失败',
                duration: 1500
              })
            })
        })
        .catch(() => {})

      setTimeout(() => {
        this.loading = false
      }, 1500)
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
///deep/ .el-table {
//	overflow: auto;
//	.el-table__fixed {
//        height:auto !important;
//		bottom: 17px;
//	}
//}

///deep/ .el-table__header-wrapper,
///deep/ .el-table__footer-wrapper {
//	overflow: visible;
//}

/deep/ .el-table__body-wrapper {
  z-index: 2;
}
///deep/ .el-table__body-wrapper::-webkit-scrollbar {
//	height: 5px;
//}

///deep/ .el-table::after {
//	position: relative !important;
//}

///deep/ .el-table__footer-wrapper::after {
//	border: 1px solid #ebeef5;
//	content: '';
//	position: absolute;
//	bottom: 41px;
//	left: 0;
//	width: 100%;
//}

/deep/ .el-table__footer-wrapper .cell::after {
  border: 0.5px solid #ebeef5;
  content: "";
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
}

/deep/ .el-table__fixed-footer-wrapper tr::after {
  border: 0.5px solid #ebeef5;
  content: "";
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
}
.count_row {
  height: 80px;
  p {
    height: 40px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
  }
}
/deep/ .caret-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
/deep/ .count_row p .el-button {
  min-width: 0;
  border: 0;
  padding: 0;
  width: 20px;
}
/deep/ .count_row p .el-button:hover {
  background-color: unset;
}
</style>
