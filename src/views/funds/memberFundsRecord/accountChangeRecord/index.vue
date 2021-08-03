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
              :clearable="false"
              :default-time="defaultTime"
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="关联订单号:">
            <el-input
              v-model="queryData.eventId"
              clearable
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
              :maxlength="15"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号状态:" class="tagheight">
            <el-select
              v-model="queryData.accountStatus"
              style="width: 300px"
              multiple
              clearable
              collapse-tags
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
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in windControlLevelList"
                :key="item.windControlId"
                :label="item.windControlName"
                :value="item.windControlId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VIP等级:">
            <el-input
              v-model="queryData.vipSerialNumMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="3"
              name="vipSerialNumMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.vipSerialNumMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="3"
              name="vipSerialNumMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="钱包类型:" class="tagheight">
            <el-select
              v-model="queryData.walletType"
              style="width: 300px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in walletTypeList"
                :key="item.gameId"
                :label="item.gameName"
                :value="item.gameId"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="业务类型:" class="tagheight">
            <el-select
              v-model="queryData.bizType"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
              @change="getMerchantDict($event)"
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
              v-model="queryData.type"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
>
              <el-option
                v-for="item in AccountChangeDicList"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支类型:" class="tagheight">
            <el-select
              v-model="queryData.transType"
              clearable
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
          <el-form-item label="账变金额 :" class="numberBox">
            <el-input-number
              v-model="queryData.amountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :min="-9999999999.99"
              :max="9999999999.99"
              :precision="2"
              name="amountMin"
              @blur="checkValue($event)"
            ></el-input-number>
            -
            <el-input-number
              v-model="queryData.amountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :min="-9999999999.99"
              :max="9999999999.99"
              :precision="2"
              name="amountMax"
              @blur="checkValue($event)"
            ></el-input-number>
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
              v-if="hasPermission('260')"
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
      <div v-loading="loading" class="content">
        <el-table
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
          <el-table-column prop="eventId" align="center" width="240px" label="关联订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.eventId" :title="scope.row.eventId" :copy="copy">
                {{ scope.row.eventId }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="会员账号" width="120px">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="realName" align="center" label="会员姓名" width="120px">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.realName" :title="scope.row.realName" :copy="copy">
                {{ scope.row.realName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="上级代理"
            width="120px"
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
            prop="windControlName"
            align="center"
            label="风控等级"
            width="90px"
          >
            <template slot-scope="scope">
              {{ scope.row.windControlName !== null ? scope.row.windControlName : "-" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="accountStatus"
            align="center"
            label="账号状态"
            width="100px"
          >
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
          <el-table-column
            prop="vipIdName"
            align="center"
            label="VIP等级"
            width="90px"
            sortable="custom"
          >
            <template slot-scope="scope">
              {{ scope.row.vipIdName ? "VIP" + scope.row.vipIdName : "-" }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="parentProxyName"
            align="center"
            label="钱包类型"
            width="150px"
          >
          </el-table-column> -->
          <el-table-column prop="bizType" align="center" label="业务类型" width="120px">~
            <template slot-scope="scope">
              {{
                scope.row.bizType === 0
                  ? "-"
                  : typeFilter(scope.row.bizType, "memberAccountBizType")
              }}
            </template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="账变类型" width="120px">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.type, "memberAccountChangeType") }}
            </template>
          </el-table-column>
          <el-table-column prop="transType" align="center" label="收支类型" width="70px">
            <template slot-scope="scope">
              {{
                scope.row.transType === 0
                  ? "-"
                  : typeFilter(scope.row.transType, "accountBizType")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="changeBefore"
            align="center"
            label="账变前金额"
            width="200px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="账变金额"
            width="200px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="changeAfter"
            align="center"
            label="账变后金额"
            width="200px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="occurDt"
            align="center"
            label="账变时间"
            width="155px"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="remark" align="center" label="备注">
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
    this.loadData = this.throttle(this.loadData, 1000)
    this._changeTableSort = this.throttle(this._changeTableSort, 1000)
    return {
      queryData: {
        bizType: '0',
        type: ''
      },
      loading: true,
      searchTime: [startTime, endTime],
      windControlLevelList: [],
      AccountChangeDicList: '0',
      walletTypeList: [],
      tableData: [],
      summary: {}
    }
  },
  computed: {
    accountStatusType() {
      return this.globalDics.accountStatusType
    },
    memberAccountBizType() {
      return this.globalDics.memberAccountBizType
    },
    memberAccountChangeType() {
      return this.globalDics.memberAccountChangeType
    },
    accountBizType() {
      return this.globalDics.accountBizType
    }
  },
  created() {
    this.getWindControllerLevelDict()
    this.getMerchantDict()
    this.getMemberFundsRecordsAccountChangeDic()
  },
  methods: {
    getWindControllerLevelDict() {
      this.$api.getWindControllerLevelDict({ windControlType: 1 }).then((res) => {
        if (res.code === 200) {
          this.windControlLevelList = res.data
        }
      })
      // this.$api.getMerchantGameWalletDic({ windControlType: 3 }).then((res) => {
      //   if (res.code === 200) {
      //     this.walletTypeList = res.data
      //   }
      // })
    },
    getMerchantDict(val) {
       const bizCode = val
     this.$api.getMemberFundsRecordsAccountChangeDic({bizCode}).then((res) => {
        if (res.code === 200) {
          this.AccountChangeDicList = res.data || []
          console.log(this.AccountChangeDicList, '11')
        }
      })
      console.log(val, 'val')
    },
    getMemberFundsRecordsAccountChangeDic() {

      // this.$api.getMerchantGameWalletDic({ windControlType: 3 }).then((res) => {
      //   if (res.code === 200) {
      //     this.walletTypeList = res.data
      //   }
      // })
    },
    loadData() {
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
      this.loading = true
      this.$api
        .getMemberFundsRecordsAccountChange(params)
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
      switch (prop) {
        case 'vipIdName':
          prop = 1
          break
        case 'changeBefore':
          prop = 2
          break
        case 'amount':
          prop = 3
          break
        case 'changeAfter':
          prop = 4
          break
        case 'occurDt':
          prop = 5
          break
      }
      this.pageNum = 1
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (order === 'descending') {
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
        case 'vipSerialNumMax':
          if (
            !!this.queryData.vipSerialNumMin &&
            value &&
            value * 1 < this.queryData.vipSerialNumMin * 1
          ) {
            this.$message({
              type: 'warning',
              message: `VIP等级输入最大值不能小于最小值`
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
              message: `VIP等级输入最小值不能大于最大值`
            })
          } else {
            this.queryData.vipSerialNumMin = value
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
              message: `账变金额输入最小值不能大于最大值`
            })
          } else if (value !== '') {
            this.queryData.amountMin = value
          } else {
            this.queryData.amountMin = undefined
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
              message: `账变金额输入最大值不能小于最小值`
            })
          } else if (value !== '') {
            this.queryData.amountMax = value
          } else {
            this.queryData.amountMax = undefined
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
        occurDtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        occurDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
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
        })
        .catch(() => {})
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          const el = (
            <div class='count_row'>
              <p>小计</p>
              <p>合计</p>
            </div>
          )
          sums[index] = el
          return
        } else if (index === 10 && this.summary !== null) {
          const el = (
            <div class='count_row'>
              <p>{this.summary.subChangeBefore}</p>
              <p>{this.summary.totalChangeBefore}</p>
            </div>
          )
          sums[index] = el
          return
        } else if (index === 11 && this.summary !== null) {
          const el = (
            <div class='count_row'>
              <p>{this.summary.subChange}</p>
              <p>{this.summary.totalChange}</p>
            </div>
          )
          sums[index] = el
          return
        } else if (index === 12 && this.summary !== null) {
          const el = (
            <div class='count_row'>
              <p>{this.summary.subChangeAfter}</p>
              <p>{this.summary.totalChangeAfter}</p>
            </div>
          )
          sums[index] = el
          return
        } else {
          sums[index] = (
            <div class='count_row'>
              <p />
              <p />
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
.content{
  position: relative;
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
  p {
    height: 40px;
    line-height: 40px;
    color: #5c5c5c;
    font-weight: 700;
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
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
  display: none;
}
.numberBox /deep/.el-input__inner {
  padding: 0 15px;
  text-align: left;
}
</style>
