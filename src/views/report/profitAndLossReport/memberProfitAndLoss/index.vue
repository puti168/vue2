<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="日期:" prop="registerTime">
            <el-date-picker
              v-model="searchTime"
              type="daterange"
              range-separator="-"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="timeControl"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="会员账号:" prop="userName">
            <el-input
              v-model="queryData.userName"
              size="medium"
              placeholder="请输入"
              clearable
              style="width: 180px"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="realName">
            <el-input
              v-model="queryData.realName"
              size="medium"
              placeholder="请输入"
              clearable
              style="width: 180px"
              maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级代理:" prop="parentProxyName">
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
              v-model="queryData.accountTypeList"
              size="medium"
              placeholder="默认选择全部"
              clearable
              multiple
              style="width: 300px"
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
              v-model="queryData.accountStatusList"
              size="medium"
              placeholder="默认选择全部"
              clearable
              multiple
              style="width: 300px"
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
                v-for="item in windControlList"
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
              style="width: 100px"
              name="vipSerialNumMin"
              maxlength="3"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.vipSerialNumMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="3"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="vipSerialNumMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="注单量:">
            <el-input
              v-model="queryData.betCountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              maxlength="10"
              name="betCountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.betCountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              maxlength="10"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="betCountMax"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="投注金额:" class="numberBox">
            <el-input-number
              v-model="queryData.betAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :min="0"
              :max="999999999999999.99"
              :precision="2"
              name="betAmountMin"
              @blur="checkValue($event)"
            ></el-input-number>
            -
            <el-input-number
              v-model="queryData.betAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :min="0"
              :max="999999999999999.99"
              :precision="2"
              name="betAmountMax"
              @blur="checkValue($event)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="有效投注:" class="numberBox">
            <el-input-number
              v-model="queryData.validBetAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :min="0"
              :max="999999999999999.99"
              :precision="2"
              name="validBetAmountMin"
              @blur="checkValue($event)"
            ></el-input-number>
            -
            <el-input-number
              v-model="queryData.validBetAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :min="0"
              :max="999999999999999.99"
              :precision="2"
              name="validBetAmountMax"
              @blur="checkValue($event)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="投注盈亏:" class="numberBox">
            <el-input-number
              v-model="queryData.netAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :min="-999999999999999.99"
              :max="999999999999999.99"
              :precision="2"
              name="netAmountMin"
              @blur="checkValue($event)"
            ></el-input-number>
            -
            <el-input-number
              v-model="queryData.netAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :min="-999999999999999.99"
              :max="999999999999999.99"
              :precision="2"
              name="netAmountMax"
              @blur="checkValue($event)"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              :disabled="flag"
              size="medium"
              @click="search"
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
              v-if="hasPermission('342')"
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
              size="medium"
              :disabled="loading"
              @click="openSetting"
            >
              列设置
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
          :data="dataList"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            v-if="memberProfitAndLoss['会员账号']"
            prop="userName"
            align="center"
            label="会员账号"
          >
            <template slot-scope="scope">
              <el-link
                class="lightBlueColor"
                type="primary"
                @click="dialogData(scope.row)"
              >
                {{ scope.row.userName }}
              </el-link>
              <i class="el-icon-document-copy" @click="copy(scope.row.userName)" />
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['姓名']"
            prop="realName"
            align="center"
            label="姓名"
          >
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.realName" :title="scope.row.realName" :copy="copy">
                {{ scope.row.realName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['账号类型']"
            prop="accountType"
            align="center"
            label="账号类型"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.accountType">
                {{ typeFilter(scope.row.accountType, "accountType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['上级代理']"
            prop="parentProxyName"
            align="center"
            label="上级代理"
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
            v-if="memberProfitAndLoss['VIP等级']"
            prop="vipSerialNum"
            align="center"
            label="VIP等级"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.vipSerialNum || scope.row.vipSerialNum === 0">
                {{ scope.row.vipSerialNum }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['账号状态']"
            prop="accountStatus"
            align="center"
            label="账号状态"
          >
            <template slot-scope="scope">
              <span
                v-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2"
                class="yellowColor"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span
                v-else-if="!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4"
                class="disableColor"
              >
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else-if="!!scope.row.accountStatus">
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['会员标签']"
            prop="labelName"
            align="center"
            label="会员标签"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.labelName">
                {{ scope.row.labelName }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="memberProfitAndLoss['风控层级']"
            prop="windControlName"
            align="center"
            label="风控层级"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.windControlName">
                {{ scope.row.windControlName }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['注单量']"
            prop="betCount"
            align="center"
            label="注单量"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.betCount">
                {{ scope.row.betCount }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['投注金额']"
            prop="betAmount"
            align="center"
            label="投注金额"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.betAmount">
                {{ scope.row.betAmount | filterDecimals }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['有效投注']"
            prop="validBetAmount"
            align="center"
            label="有效投注"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-if="!!scope.row.validBetAmount">
                {{ scope.row.validBetAmount | filterDecimals }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="memberProfitAndLoss['投注盈亏']"
            prop="netAmount"
            align="center"
            label="投注盈亏"
            sortable="custom"
          >
            <template slot="header">
              <span>投注盈亏</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question" style="position: absolute; right: 10px"></i>
                <div slot="content">盈亏金额指游戏输赢金额<br />负数表示会员输</div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.netAmount > 0" class="enableColor">
                {{ scope.row.netAmount | filterDecimals }}
              </span>
              <span v-else-if="scope.row.netAmount < 0" class="redColor">
                {{ scope.row.netAmount | filterDecimals }}
              </span>
              <span v-else-if="scope.row.netAmount === 0">{{
                scope.row.netAmount | filterDecimals
              }}</span>
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
    </div>
    <el-dialog :visible.sync="tableVisible" :destroy-on-close="true" class="rempadding">
      <div slot="title" class="dialog-title">
        <span class="title-text" style="margin-right: 15px">会员账号:{{ userName }}</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        border
        class="small-size-table"
        :data="memberDetails"
        style="margin-bottom: 15px"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="staticsDate" align="center" label="日期">
        </el-table-column>
        <el-table-column prop="betCount" align="center" label="注单量"></el-table-column>
        <el-table-column prop="betAmount" align="center" label="投注金额">
          <template slot-scope="scope">
            {{ scope.row.betAmount | filterDecimals }}
          </template>
        </el-table-column>
        <el-table-column prop="validBetAmount" align="center" label="有效投注">
          <template slot-scope="scope">
            {{ scope.row.validBetAmount | filterDecimals }}
          </template>
        </el-table-column>
        <el-table-column prop="netAmount" align="center" label="投注盈亏">
          <template slot-scope="scope">
            <span v-if="scope.row.netAmount > 0" class="enableColor">
              {{ scope.row.netAmount | filterDecimals }}
            </span>
            <span v-else-if="scope.row.netAmount < 0" class="redColor">
              {{ scope.row.netAmount | filterDecimals }}
            </span>
            <span v-else-if="scope.row.netAmount === 0">{{
              scope.row.netAmount | filterDecimals
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page.sync="pageR"
        background
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="sizeR"
        :page-sizes="[10, 20, 50]"
        :total="dialogTotal"
        @current-change="handleCurrentChangeDialog"
        @size-change="handleSizeChangeDialog"
      ></el-pagination>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="tableVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="列设置"
      center
      :visible.sync="visible"
      width="300px"
      class="col-setting"
    >
      <el-link type="primary" @click="clickDel">复原缺省</el-link>
      <div v-for="(value, name) in memberProfitAndLoss" :key="name" class="setting-div">
        <el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">{{
          name
        }}</el-checkbox>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm"> 提交 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  filters: {
    filterDecimals: function (val) {
      if (typeof val === 'number') {
        const newVal = (Math.floor(val * 100) / 100).toFixed(2)
        return newVal
      } else {
        return '-'
      }
    }
  },
  mixins: [list],
  data() {
    return {
      queryData: {},
      searchTime: [startTime, endTime],
      day31: 30 * 24 * 3600 * 1000,
      // 日期使用
      timeControl: {
        onPick: ({ maxDate, minDate }) => {
          console.log(maxDate, minDate)
          if (maxDate - minDate > this.day31) {
            this.flag = true
            this.$message.warning('请缩小搜索范围至31天')
          }
          if (
            maxDate !== null &&
            minDate !== null &&
            maxDate - minDate <= this.day31 &&
            this.queryText === '查询'
          ) {
            this.flag = false
          } else {
            this.flag = true
          }
        },
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
      memberProfitAndLoss: {
        会员账号: true,
        姓名: true,
        账号类型: true,
        上级代理: true,
        VIP等级: true,
        账号状态: true,
        会员标签: true,
        风控层级: true,
        注单量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true
      },
      queryText: '查询',
      flag: false,
      tableVisible: false,
      visible: false,
      newList: [],
      userName: '',
      dataList: [],
      windControlList: [],
      userLabel: [],
      memberDetails: [],
      playerId: '',
      pageR: 1,
      sizeR: 10,
      dialogTotal: 0,
      summary: {},
      myName: ''
    }
  },
  computed: {
    accountStatusArr() {
      return this.globalDics.accountStatusType
    },
    deviceTypeArr() {
      return this.globalDics.deviceType
    },
    accountTypeArr() {
      const arr = this.globalDics.accountType
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]
        if (ele.code !== '1' && ele.code !== '4') {
          newArr.push(ele)
        }
      }
      return newArr
    }
  },
  created() {
    this.getWindControllerLevelDict()
    this.getMemberLabelDict()
  },
  mounted() {
    this.myName = localStorage.getItem('username')
    this.initDB()
  },
  methods: {
    // 列设置
    openSetting() {
      this.getList()
      this.visible = true
    },
    initDB() {
      const request = indexedDB.open('memberProfitAndLoss')
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        this.db = db
        // 建表 名为person,主键为id
        db.createObjectStore('memberProfitAndLoss', {
          keyPath: 'id',
          autoIncrement: true
        })
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        console.log('数据库打开/创建成功', event)
        this.clickAdd()
        this.getList()
      }
    },
    clickAdd() {
      const request = this.db
        .transaction(['memberProfitAndLoss'], 'readwrite')
        .objectStore('memberProfitAndLoss')
        .add({
          id: this.myName,
          会员账号: true,
          姓名: true,
          账号类型: true,
          上级代理: true,
          VIP等级: true,
          账号状态: true,
          会员标签: true,
          风控层级: true,
          注单量: true,
          投注金额: true,
          有效投注: true,
          投注盈亏: true
        })
      request.onsuccess = (event) => {
        this.getList()
      }
    },
    getList() {
      this.newList = []
      var transaction = this.db.transaction(['memberProfitAndLoss'])
      const objectStore = transaction.objectStore('memberProfitAndLoss')
      const list = []
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          console.log(list, 4654564)
          for (let i = 0; i < list.length; i++) {
            const ele = list[i]
            if (ele.id === this.myName) {
              this.newList.push(ele)
              this.memberProfitAndLoss = { ...ele }
              delete this.memberProfitAndLoss.id
            }
          }
          console.log(this.newList, 4645655465)
        }
      }
    },
    confirm() {
      const arr = []
      for (let i = 0; i < this.newList.length; i++) {
        const ele = this.newList[i]
        if (ele.id === this.myName) {
          arr.push(ele)
        }
      }
      console.log(arr, 'arr')
      const request = this.db
        .transaction(['memberProfitAndLoss'], 'readwrite')
        .objectStore('memberProfitAndLoss')
        .put({
          id: this.myName,
          会员账号: arr[0]['会员账号'],
          姓名: arr[0]['姓名'],
          账号类型: arr[0]['账号类型'],
          上级代理: arr[0]['上级代理'],
          VIP等级: arr[0]['VIP等级'],
          账号状态: arr[0]['账号状态'],
          会员标签: arr[0]['会员标签'],
          风控层级: arr[0]['风控层级'],
          注单量: arr[0]['注单量'],
          投注金额: arr[0]['投注金额'],
          有效投注: arr[0]['有效投注'],
          投注盈亏: arr[0]['投注盈亏']
        })
      request.onsuccess = (event) => {
        this.visible = false
        this.getList()
        console.log('数据更新成功')
      }

      request.onerror = (event) => {
        console.log('数据更新失败')
      }
    },
    clickDel(id) {
      this.newList = []
      this.newList.push({
        id: this.myName,
        会员账号: true,
        姓名: true,
        账号类型: true,
        上级代理: true,
        VIP等级: true,
        账号状态: true,
        会员标签: true,
        风控层级: true,
        注单量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true
      })
    },
    loadData() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        accountTypeList: this.queryData.accountTypeList
          ? this.queryData.accountTypeList.join(',')
          : [],
        accountStatusList: this.queryData.accountStatusList
          ? this.queryData.accountStatusList.join(',')
          : [],
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
      if (endTime - startTime > this.day31) {
        this.$message.warning('请缩小搜索范围至31天')
      } else {
        this.loading = true
        this.$api
          .getReportMembernetamountList(params)
          .then((res) => {
            if (res.code === 200 && res.data !== null) {
              this.loading = false
              this.dataList = res.data.record
              this.total = res.data.totalRecord
            } else {
              this.dataList = []
              this.total = 0
              this.loading = false
            }
          })
          .catch(() => (this.loading = false))
        this.$api
          .getReportMembernetamountAggregation(params)
          .then((res) => {
            if (res.code === 200) {
              this.loading = false
              this.summary = res.data
              console.log(res)
            }
          })
          .catch(() => (this.loading = false))
      }
    },
    search() {
      this.flag = true
      let t = 10
      const timecount = setInterval(() => {
        t--
        this.queryText = t + 's'
        if (t < 0) {
          clearInterval(timecount)
          this.queryText = '查询'
          this.flag = false
        }
      }, 1000)
      this.loadData()
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
          this.windControlList = res.data
        }
      })
    },
    dialogData(val) {
      this.userName = val.userName
      this.pageR = 1
      this.sizeR = 10
      this.playerId = val.playerId
      this.getReportMembernetamountDetail(val.playerId)
      this.tableVisible = true
    },
    getReportMembernetamountDetail(val) {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      const params = {
        pageNum: this.pageR,
        pageSize: this.sizeR,
        playerId: val,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      this.$api
        .getReportMembernetamountDetail(params)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.memberDetails = res.data.record
            this.dialogTotal = res.data.totalRecord
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    filterDecimals: function (val) {
      if (typeof val === 'number') {
        const newVal = (Math.floor(val * 100) / 100).toFixed(2)
        return newVal
      } else {
        return '-'
      }
    },
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
        } else if (index >= 8 && this.summary !== null) {
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
            const num = sums[index]
            switch (index) {
              case 8:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num}</p>
                    <p>{this.summary.betCountTotal}</p>
                  </div>
                )
                break
              case 9:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.betAmountTotal)}</p>
                  </div>
                )
                break
              case 10:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.validBetAmountTotal)}</p>
                  </div>
                )
                break
              case 11:
                sums[index] = (
                  <div class='count_row'>
                    {num > 0 ? (
                      <p class='enableColor'>{this.filterDecimals(num)}</p>
                    ) : (
                      <p class='redColor'>{this.filterDecimals(num)}</p>
                    )}
                    {this.summary.netAmountTotal > 0 ? (
                      <p class='enableColor'>
                        {this.filterDecimals(this.summary.netAmountTotal)}
                      </p>
                    ) : this.summary.netAmountTotal === 0 ? (
                      <p>{this.filterDecimals(this.summary.netAmountTotal)}</p>
                    ) : (
                      <p class='redColor'>
                        {this.filterDecimals(this.summary.netAmountTotal)}
                      </p>
                    )}
                  </div>
                )
                break
            }
          } else {
            sums[index] = ''
          }
        }
      })

      return sums
    },
    reset() {
      this.pageNum = 1
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.$refs['form'].resetFields()
      this.search()
    },
    _changeTableSort({ column, prop, order }) {
      switch (prop) {
        case 'betCount':
          prop = 1
          break
        case 'betAmount':
          prop = 2
          break
        case 'validBetAmount':
          prop = 3
          break
        case 'netAmount':
          prop = 4
          break
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
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.pageR = val
      this.getReportMembernetamountDetail(this.playerId)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.sizeR = val
      this.getReportMembernetamountDetail(this.playerId)
    },
    checkValue(e) {
      const { name, value } = e.target
      console.log(value)
      switch (name) {
        case 'vipSerialNumMin':
          if (
            !!this.queryData.vipSerialNumMax &&
            value &&
            value * 1 > this.queryData.vipSerialNumMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `VIP等级最小值不能大于最大值`
            })
            this.queryData.vipSerialNumMin = ''
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
              message: `VIP等级最大值不能小于最小值`
            })
            this.queryData.vipSerialNumMax = ''
          } else {
            this.queryData.vipSerialNumMax = value
          }
          break
        case 'betCountMin':
          if (
            !!this.queryData.betCountMax &&
            value &&
            value * 1 > this.queryData.betCountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `注单量最小值不能大于最大值`
            })
            this.queryData.betCountMin = ''
          } else {
            this.queryData.betCountMin = value
          }
          break
        case 'betCountMax':
          if (
            !!this.queryData.betCountMin &&
            value &&
            value * 1 < this.queryData.betCountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `注单量最大值不能小于最小值`
            })
            this.queryData.betCountMax = ''
          } else {
            this.queryData.betCountMax = value
          }
          break
        case 'betAmountMin':
          if (
            !!this.queryData.betAmountMax &&
            value &&
            value * 1 > this.queryData.betAmountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额最小值不能大于最大值`
            })
            this.queryData.betAmountMin = undefined
          } else if (value !== '' && value * 1 > 0) {
            console.log('6465456464', value * 1)
            this.queryData.betAmountMin = value
          } else {
            this.queryData.betAmountMin = undefined
          }
          break
        case 'betAmountMax':
          if (
            !!this.queryData.betAmountMin &&
            value &&
            value * 1 < this.queryData.betAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额最大值不能小于最小值`
            })
            this.queryData.betAmountMax = undefined
          } else if (value !== '' && value * 1 > 0) {
            this.queryData.betAmountMax = value
          } else {
            this.queryData.betAmountMax = undefined
          }
          break

        case 'validBetAmountMin':
          if (
            !!this.queryData.validBetAmountMax &&
            value &&
            value * 1 > this.queryData.validBetAmountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `有效投注最小值不能大于最大值`
            })
            this.queryData.validBetAmountMin = undefined
          } else if (value !== '' && value * 1 > 0) {
            this.queryData.validBetAmountMin = value
          } else {
            this.queryData.validBetAmountMin = undefined
          }
          break
        case 'validBetAmountMax':
          if (
            !!this.queryData.validBetAmountMin &&
            value &&
            value * 1 < this.queryData.validBetAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `有效投注最大值不能小于最小值`
            })
            this.queryData.validBetAmountMax = undefined
          } else if (value !== '' && value * 1 > 0) {
            this.queryData.validBetAmountMax = value
          } else {
            this.queryData.validBetAmountMax = undefined
          }
          break
        case 'netAmountMin':
          if (
            !!this.queryData.netAmountMax &&
            value &&
            value * 1 > this.queryData.netAmountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注盈亏最小值不能大于最大值`
            })
            this.queryData.netAmountMin = undefined
          } else if (value !== '') {
            this.queryData.netAmountMin = value
          } else {
            this.queryData.netAmountMin = undefined
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
              message: `投注盈亏最大值不能小于最小值`
            })
            this.queryData.netAmountMax = undefined
          } else if (value !== '') {
            this.queryData.netAmountMax = value
          } else {
            this.queryData.netAmountMax = undefined
          }
          break
      }
    },
    exportExcel() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      params = {
        ...this.getParams(params)
      }
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
          this.$api
            .getGameRecordDownload(params)
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  color: #909399;
  font-weight: 700;
}
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
  display: none;
}
.numberBox /deep/.el-input__inner {
  padding: 0 15px;
  text-align: left;
}
/deep/ .el-table__footer-wrapper .cell::after {
  border: 1px solid #ebeef5;
  content: "";
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
}

/deep/ .el-table__fixed-footer-wrapper tr::after {
  border: 1px solid #ebeef5;
  content: "";
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
}
.count_row {
  height: 80px;
  color: #5c5c5c;
  p {
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
  }
}
.fenye {
  text-align: center;
}
</style>
