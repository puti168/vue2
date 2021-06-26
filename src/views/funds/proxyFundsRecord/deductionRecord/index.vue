<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="操作时间:">
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
              v-model="queryData.memberName"
              clearable
              :maxlength="19"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="代理账号:">
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
          <el-form-item label="代理姓名:">
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
          <el-form-item label="状态：" class="tagheight">
            <el-select
              v-model="queryData.orderStatus"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in successOrFail"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整类型：" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in proxyPatchSubAdjustType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整金额:">
            <el-input
              v-model="queryData.adjustAmountMin"
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
              v-model="queryData.adjustAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="betAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
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
          ref="tables"
          v-loading="loading"
          border
          show-summary
          :summary-method="getSummaries"
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="id	" align="center" label="订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.id }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="代理账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="realName" align="center" label="代理姓名">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.realName" :title="scope.row.realName" :copy="copy">
                {{ scope.row.realName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="adjustStyle"
            align="center"
            label="调整方式"
            width="130px"
          >
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            align="center"
            label="状态"
            width="100px"
          >
             <template slot-scope="scope">
              {{ typeFilter(scope.row.orderStatus, "successOrFail") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="adjustType"
            align="center"
            label="调整类型"
            width="150px"
          >
          <template slot-scope="scope">
              {{ typeFilter(scope.row.adjustType, "proxyPatchSubAdjustType") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="adjustAmount"
            align="center"
            width="130px"
            label="调整金额"
          ></el-table-column>
		  <el-table-column
            prop="operator"
            align="center"
            label="操作人"
            width="150px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.operator">{{
                scope.row.operator
              }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="operatorTime"
            align="center"
            label="操作时间"
            width="160px"
            sortable="custom"
          >
          </el-table-column>
		  <el-table-column
            prop="remark"
            align="center"
            label="备注"
            width="150px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.remark">{{
                scope.row.remark
              }}</span>
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
      tableData: [],
      dataList: {},
      isIndeterminate: true,
      gameList: [],
      page: 1,
      size: 10,
      summary: 0,
      visible: false,
      tableVisible: false
    }
  },
  computed: {
    proxyPatchSubAdjustType() {
      return this.globalDics.proxyPatchSubAdjustType
    },
    successOrFail() {
      return this.globalDics.successOrFail
    }
  },
  mounted() { },

  methods: {
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        operatorTimeStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        operatorTimeEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getProxyFundsRecordsArtificialAccountSub(params)
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
     checkValue(e) {
      const { name, value } = e.target
      switch (name) {
        case 'betAmountMax':
          if (
            !!this.queryData.betAmountMin &&
            value &&
            value * 1 < this.queryData.betAmountMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `调整金额输入最大值不能小于最小值`
            })
          } else {
            this.queryData.betAmountMax = value
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
              message: `调整金额输入最小值不能大于最大值`
            })
          } else {
            this.queryData.betAmountMin = value
          }
          break
      }
    },

    exportExcel() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        operatorTimeStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        operatorTimeEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
          this.$api
            .getProxyFundsRecordsArtificialAccountSubDownload(params)
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
              //   type: 'error',
              //   message: '导出失败',
              //   duration: 1500
              // })
            })
    },
     getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          const el = (
            <div class='count_row'>
              <p>小计</p>
              <p>总计</p>
            </div>
          )
          sums[index] = el
          return
        } else if (index === 6 && this.summary !== null) {
          const el = (
            <div class='count_row'>
              <p>{this.summary.subtotal}</p>
              <p>{this.summary.total}</p>
            </div>
          )
          sums[index] = el
          return
        } else {
          // sums[index] = (
          //   <div class='count_row'>
          //     <p>-</p>
          //     <p>-</p>
          //   </div>
          // )
        }
      })

      return sums
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createAt') {
        prop = 1
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
    }

  }
}
</script>

<style lang="scss" scoped>
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
.sum_footer {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  line-height: 45px;
  background: #f5f7fa;
  text-align: center;
  width: 100%;
  font-size: 14px;
  // flex-direction: row;
  color: #5c5c5c;
  font-weight: 700;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
.sum_footer_unit {
  flex-grow: 1;
  -webkit-flex-grow: 1;
  box-sizing: border-box;
  border-right: 1px solid #ebeef5;
}
/deep/.el-dialog__header {
  color: #5c5c5c;
  font-weight: 700;
}
.params {
  padding-bottom: 15px;
}

.fenye {
  text-align: center;
}
</style>
