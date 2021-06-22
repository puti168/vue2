<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="发放时间:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              :default-time="defaultTime"
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input
              v-model="queryData.id"
              clearable
              :maxlength="19"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="发放类型:" class="tagheight">
            <el-select
              v-model="queryData.provideType"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in vipRewardType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员账号:">
            <el-input
              v-model="queryData.userName"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
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
          <el-table-column prop="id" align="center" label="订单号" width="240px">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.id }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="发放时间"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="provideType" align="center" label="发放类型">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.provideType, "vipRewardType") }}
            </template>
          </el-table-column>
          <el-table-column prop="provideAmount" align="center" label="发放金额">
          </el-table-column>
          <el-table-column prop="userName" align="center" label="会员账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="vipName"
            align="center"
            label="VIP等级"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="accountType" align="center" label="账号类型">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column prop="labelName" align="center" label="会员标签">
          </el-table-column>
          <el-table-column prop="windControlName" align="center" label="风控层级">
            <template slot-scope="scope">
              {{ scope.row.windControlName !== null ? scope.row.windControlName : "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="accountStatus" align="center" label="账号状态">
            <template slot-scope="scope">
              <span v-if="scope.row.accountStatus === 1" class="normalRgba">
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else-if="scope.row.accountStatus === 2" class="disableRgba">
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else-if="scope.row.accountStatus === 3" class="lockingRgba">
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else-if="scope.row.accountStatus === 4" class="deleteRgba">
                {{ typeFilter(scope.row.accountStatus, "accountStatusType") }}
              </span>
              <span v-else>-</span>
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
import dayjs from 'dayjs'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      searchTime: [startTime, endTime],
      tableData: []
    }
  },
  computed: {
    vipRewardType() {
      return this.globalDics.vipRewardType
    }
  },
  created() {},
  methods: {
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createdAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createdAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getMemberFundsRecordsVipReward(params)
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
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.loadData()
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
      }
      if (prop === 'vipName') {
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
    enterSearch() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
