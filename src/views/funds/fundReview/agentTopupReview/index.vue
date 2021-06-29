<template>
  <div class="game-container report-container">
    <template v-if="!showDetail">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="申请时间:">
            <el-date-picker
              v-model="formTime.time"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :default-time="defaultTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="锁单状态:">
            <el-select
              v-model="queryData.lockOrder"
              style="width: 180px"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in lockOrderType"
                :key="item.code"
                :label="item.description"
                :value="Number(item.code)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input
              v-model="queryData.orderNo"
              clearable
              size="medium"
              :maxlength="50"
              style="width: 180px"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 30px">
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
          <p class="danger data-refresh">数据更新时间： {{ now }}</p>
        </el-form>
      </div>
      <div class="view-container dealer-container">
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待一审" name="0"></el-tab-pane>
            <el-tab-pane label="待二审" name="1"></el-tab-pane>
          </el-tabs>
          <el-table
            v-loading="loading"
            border
            size="mini"
            class="small-size-table"
            :data="dataList"
            style="width: 100%"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" label="锁单" width="60">
              <template slot-scope="scope">
                <el-checkbox
                  v-if="
                    scope.row.lockAccount === name ||
                    !scope.row.lockAccount ||
                    scope.row.orderStatus === 0
                  "
                  v-model="scope.row.lockOrder"
                  @change="lockChange(scope.row)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="auditStep" align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  :class="
                    scope.row.lockAccount !== name || !scope.row.lockAccount ? 'dis' : ''
                  "
                  type="primary"
                  size="medium"
                  @click="goDetail(scope.row)"
                >
                  {{ activeName === "0" ? "一审审核" : "二审审核" }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderNo"
              align="center"
              label="审核订单号"
            ></el-table-column>
            <el-table-column
              prop="userName"
              align="center"
              label="代理账号"
            ></el-table-column>
            <el-table-column
              prop="realName"
              align="center"
              label="代理姓名"
            ></el-table-column>
            <el-table-column
prop="applyTime"
align="center"
label="申请类型"
><template slot-scope="scope">
                {{ typeFilter(scope.row.adjustType, "memberPatchAddAdjustType") }}
              </template></el-table-column>
            <el-table-column
              prop="adjustAmount"
              align="center"
              label="增加金额"
            ></el-table-column>
            <el-table-column
              prop="operatorTime"
              align="center"
              label="申请时间"
            ></el-table-column>
            <el-table-column align="center" label="审核状态">
              <template slot-scope="scope">
                <span
                  :class="
                    Number(scope.row.orderStatus) === 11
                      ? 'normalRgba'
                      : '2467'.includes(Number(scope.row.orderStatus))
                      ? 'lockingRgba'
                      : 'disableRgba'
                  "
                >
                  {{ typeFilter(scope.row.orderStatus, "withdrawStatus") }}
                </span>
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
    </template>
    <detail
      v-else
      :type="type"
      :rowData="rowData"
      :activeName="activeName"
      @goBack="goBack"
    ></detail>
  </div>
</template>

<script>
import list from '@/mixins/list'
import detail from './components/detail'
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()
export default {
  name: 'MemberWithdrawalReview',
  components: { detail },
  mixins: [list],
  data() {
    return {
      queryData: {
        lockOrder: '',
        orderNo: ''
      },
      type: true,
      showDetail: false,
      formTime: {
        time: [start, end]
      },
      rowData: {},
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      name: '',
      activeName: '',
      dataList: []
    }
  },
  computed: {
    lockOrderType() {
      return this.globalDics.lockOrderType
    }
  },
  mounted() {
    this.name = getUsername()
  },
  methods: {
    handleClick() {
      this.loadData()
    },
    loadData() {
      this.loading = true
      const [startTime, endTime] = this.formTime.time || []
      let params = {
        ...this.queryData,
        operatorTimeStart: startTime
          ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
          : '',
        operatorTimeEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      const type =
        this.activeName === '0' ? 'firstAuditAddAuditProxy' : 'secondAddAuditProxy'
      this.$api[type](params)
        .then((res) => {
          if (res.code === 200) {
            this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
            const response = res.data
            this.loading = false
            this.dataList = response.record
            if (this.dataList) {
              this.dataList.forEach((item) => {
                if (Number(item.lockStatus) === 1) {
                  item.lockOrder = true
                } else {
                  item.lockOrder = false
                }
              })
            }
            this.total = response.totalRecord
          } else {
            this.loading = false
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    goDetail(row) {
      this.type = row.lockAccount === this.name
      this.rowData = row
      this.showDetail = true
    },
    goBack() {
      this.showDetail = false
      this.loadData()
    },
    reset() {
      this.queryData = {
        lockOrder: '',
        orderNo: ''
      }
      this.formTime = {
        time: [start, end]
      }
      this.loadData()
    },
    lockChange(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .proxyArtificialPatchAccountAddAuditlockRecord({
          id: val.id,
          lockStatus: Number(val.lockStatus) === 1 ? 0 : 1
        })
        .then((res) => {
          if (res.code === 200) {
            loading.close()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.loadData()
          } else {
            loading.close()
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          loading.close()
        })
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
/deep/ .caret-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.data-refresh {
  margin-top: 0;
  padding-bottom: 20px;
}
</style>
