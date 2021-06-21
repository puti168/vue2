<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="存款时间:">
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
          <el-form-item label="会员姓名:">
            <el-input
              v-model="queryData.realName"
              clearable
              :maxlength="6"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单来源：" class="tagheight">
            <el-select
              v-model="queryData.deviceType"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in loginDeviceType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态：" class="tagheight">
            <el-select
              v-model="queryData.orderStatus"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in depositStatus"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存款IP：">
            <el-input
              v-model="queryData.customerIp"
              clearable
              :maxlength="15"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付方式：" class="tagheight">
            <el-select
              v-model="queryData.payType"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in payType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
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
            <el-button
              icon="el-icon-download"
              type="warning"
              :disabled="loading"
              size="medium"
              @click="exportExcel"
            >
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          show-summary
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="id" align="center" label="订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="memberName" align="center" label="会员账号">
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
          <el-table-column prop="memberName" align="center" label="会员姓名">
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
          <el-table-column prop="memberName" align="center" label="订单来源">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column prop="accountType" align="center" label="订单状态">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center">
            <template slot="header">
              存款IP <br />
              风控层级
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.parentProxyName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="playerName" align="center">
            <template slot="header">
              存款终端设备号
              <br />风控层级
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.parentProxyName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="支付方式">
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="存款金额">
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款时间"
            sortable="custom"
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
      tableData: [],
      summary: {}
    }
  },
  computed: {
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    },
    depositStatus() {
      return this.globalDics.depositStatus
    },
    payType() {
      return this.globalDics.payType
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
        .getMemberFundsRecordsDeposit(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
            this.summary = res.data.summary
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
      if (prop === 'vipIdName') {
        prop = 1
      }
      if (prop === 'amount') {
        prop = 2
      }
      if (prop === 'occurDt') {
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
    checkValue(e) {
      const { name, value } = e.target
      switch (name) {
        case 'vipSerialNumMax':
          if (
            !!this.queryData.vipSerialNumMin &&
            value &&
            value * 1 < this.queryData.vipSerialNumMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额输入最大值不能小于最小值`
            })
          } else {
            this.queryData.vipSerialNumMax = value
          }
          break
        case 'vipSerialNumMin':
          if (
            !!this.queryData.vipSerialNumMax &&
            value &&
            value * 1 > this.queryData.vipSerialNumMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员输赢输入最小值不能大于最大值`
            })
          } else {
            this.queryData.vipSerialNumMin = value
          }
          break
        case 'amountMax':
          if (
            !!this.queryData.amountMin &&
            value &&
            value * 1 < this.queryData.amountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `投注金额输入最大值不能小于最小值`
            })
          } else {
            this.queryData.amountMax = value
          }
          break
        case 'amountMin':
          if (
            !!this.queryData.amountMax &&
            value &&
            value * 1 > this.queryData.amountMax * 1
          ) {
            this.$message({
              type: 'warning',
              message: `会员输赢输入最小值不能大于最大值`
            })
          } else {
            this.queryData.amountMin = value
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
        createdAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createdAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getMemberFundsRecordsAccountChangeDownload(params)
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
          // this.$message({
          //   type: "error",
          //   message: "导出失败",
          //   duration: 1500,
          // });
        })
    },
    getSummaries(param) {
      const { columns } = param
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
        } else if (index === 10) {
          const el = (
            <div class='count_row'>
              <p>{this.summary.subtotal}</p>
              <p>{this.summary.total}</p>
            </div>
          )
          sums[index] = el
          return
        } else {
          sums[index] = (
            <div class='count_row'>
              <p>-</p>
              <p>-</p>
            </div>
          )
        }
      })

      return sums
    },
    enterSearch() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
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
/deep/.el-table {
  overflow: auto;
}
/deep/.el-table__body-wrapper,
/deep/.el-table__header-wrapper,
/deep/.el-table__footer-wrapper {
  overflow: visible;
}
/deep/.el-table::after {
  position: relative !important;
}
</style>
