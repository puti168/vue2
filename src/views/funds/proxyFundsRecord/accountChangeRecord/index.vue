<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="账变时间:">
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
           <el-form-item label="代理账号:">
            <el-input
              v-model="queryData.realName"
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
          <el-form-item label="账号状态:" class="tagheight">
            <el-select
              v-model="queryData.accountStatusType"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountStatusType"
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
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in vipDict"
                :key="item.windControlId"
                :label="item.windControlName"
                :value="item.windControlId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型:" class="tagheight">
            <el-select
              v-model="queryData.memberAccountBizType"
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in memberAccountBizType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账变类型:" class="tagheight">
            <el-select
              v-model="queryData.proxyAccountChangeType"
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in proxyAccountChangeType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支类型:" class="tagheight">
            <el-select
              v-model="queryData.accountBizType"
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountBizType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账变金额 :">
            <el-input
              v-model="queryData.amountMin"
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
              v-model="queryData.amountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="10"
              name="netAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="medium"
              :disabled="loading"
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
          size="mini"
          show-summary
          :summary-method="getSummaries"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="eventId" fixed align="center" width="180px" label="关联订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.eventId" :title="scope.row.eventId" :copy="copy">
                {{ scope.row.eventId }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" width="180px" label="代理账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="realName" align="center" width="180px" label="代理姓名">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.realName" :title="scope.row.realName" :copy="copy">
                {{ scope.row.realName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="windControlName	"
            align="center"
            label="风控层级"
            width="130px"
          >
            <template slot-scope="scope">
              <Copy
                v-if="!!scope.row.windControlName"
                :title="scope.row.windControlName"
                :copy="copy"
              >
                {{ scope.row.windControlName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountStatus"
            align="center"
            label="账号状态"
            width="100px"
          >
           <template slot-scope="scope">
							<span
								v-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 1
								"
								class="normalRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2
								"
								class="disableRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 3
								"
								class="lockingRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4
								"
								class="deleteRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
          </el-table-column>
          <el-table-column
            prop="bizType"
            align="center"
            label="业务类型"
            width="180px"
          >
           <template slot-scope="scope">
              {{
                scope.row.bizType === 0
                  ? "-"
                  : typeFilter(scope.row.bizType, "memberAccountBizType")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            align="center"
            label="账变类型"
            width="150px"
          >
            <template slot-scope="scope">
              {{ typeFilter(scope.row.type, "memberAccountChangeType") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="transType"
            align="center"
            label="收支类型"
            width="150px"
          >
          <template slot-scope="scope">
              {{
                scope.row.transType === 0
                  ? "-"
                  : typeFilter(scope.row.transType, "accountBizType")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            width="130px"
            sortable="custom"
            label="账变金额"
          ></el-table-column>
         <el-table-column
            prop="occurDt"
            align="center"
            label="账变时间"
            width="150px"
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
              {{ scope.row.remark !== null ? scope.row.remark : "-" }}
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
      vipDict: [],
      summary: {},
      visible: false,
      tableVisible: false

    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountType
    },
     accountStatusType() {
      return this.globalDics.accountStatusType
    },
     memberAccountBizType() {
      return this.globalDics.memberAccountBizType
    },
     proxyAccountChangeType() {
      return this.globalDics.proxyAccountChangeType
    },
    accountBizType() {
      return this.globalDics.accountBizType
    }
  },
  created() {
		this.getWindControllerLevelDict()
	},
  mounted() {},

  methods: {
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        occurDtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        occurDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getProxyFundsRecordsAccountChange(params)
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
    // 获取风控层级
    getWindControllerLevelDict() {
            this.$api
                .getWindControllerLevelDict({ windControlType: 3 })
                .then((res) => {
                    if (res.code === 200) {
                        this.vipDict = res.data
                    }
                })
        },
         getDictgetAllDictList() {
            this.$api
                .getDictgetAllDictList()
                .then((res) => {
                    if (res.code === 200) {
                        this.accountStatusType = res.data
                    }
                })
        },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.loadData()
    },

    exportExcel() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        occurDtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        occurDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.registerTime
      delete params.lastLoginTime
      delete params.firstSaveTime
      delete params.accountStatus
      delete params.deviceType
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
            .getProxyFundsRecordsAssistDepositDownload(params)
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
    _changeTableSort({ column, prop, order }) {
      if (prop === 'amount') {
        prop = 1
      }
      if (prop === 'occurDt') {
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
    }
  },

    enterSearch() {
      this.loadData()
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
