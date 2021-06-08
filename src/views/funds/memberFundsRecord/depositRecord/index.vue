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
              v-model="queryData.ordernumber"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员账号:">
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
          <el-form-item label="订单来源：" class="tagheight">
            <el-select
              v-model="queryData.accountType1"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态：" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存款IP：">
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
          <el-form-item label="支付方式：" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountType"
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
          <el-table-column prop="id" align="center" width="240px" label="订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberName"
            align="center"
            label="会员账号"
            width="130px"
          >
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
          <el-table-column
            prop="memberName"
            align="center"
            label="会员姓名"
            width="130px"
          >
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
          <el-table-column
            prop="memberName"
            align="center"
            label="订单来源"
            width="130px"
          >
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
          <el-table-column
            prop="accountType"
            align="center"
            label="订单状态"
            width="100px"
          >
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款IP风控层级"
            width="150px"
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
            prop="playerName"
            align="center"
            label="风控层级"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款终端设备号"
            width="150px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.parentProxyName">{{
                scope.row.parentProxyName
              }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="支付方式"
            width="150px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款金额"
            width="150px"
          >
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款金额"
            width="150px"
          >
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="存款金额"
            width="150px"
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
import { routerNames } from '@/utils/consts'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.gameBetslipTable,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      gameTypeList: [],
      searchTime: [startTime, endTime],
      netTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      tableData: [],
      dataList: {}
    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountType
    },
    betDeviceType() {
      return this.globalDics.betDeviceType
    }
  },
  mounted() {
    this.getGameTypeList()
  },
  methods: {
    getGameTypeList() {
      this.$api.getMerchantGameGamePlant().then((res) => {
        if (res.code === 200) {
          this.gameTypeList = res.data
        }
      })
    },
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const net = this.netTime || []
      const [startTime, endTime] = create
      const [netAtStart, netAtEnd] = net
      let params = {
        ...this.queryData,
        createAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtStart: netAtStart ? dayjs(netAtStart).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtEnd: netAtEnd ? dayjs(netAtEnd).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(startTime, endTime, netAtStart, netAtEnd)
      if (startTime || endTime || netAtStart || netAtEnd) {
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
      } else {
        this.loading = false
        this.$message.warning('请选择一个下注时间或者结算时间')
      }
    },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.netTime = [startTime, endTime]
      this.pageNum = 1
      this.loadData()
    },
    lookMsg(val) {
      console.log(val)
      const data = {}
      data.createAt = val.createAt
      data.gameCode = val.gameCode
      data.thirdOrderId = val.thirdOrderId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .getGameRecordDetail(data)
        .then((res) => {
          if (res.code === 200 && res.data.record.length > 0) {
            this.dataList = res.data.record[0]
            loading.close()
          } else {
            this.dataList = {}
            loading.close()
          }
          console.log(res)
        })
        .catch(() => {
          loading.close()
        })
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
    exportExcel() {
      const create = this.searchTime || []
      const net = this.netTime || []
      const [startTime, endTime] = create
      const [netAtStart, netAtEnd] = net
      let params = {
        ...this.queryData,
        createAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtStart: netAtStart ? dayjs(netAtStart).format('YYYY-MM-DD HH:mm:ss') : '',
        netAtEnd: netAtEnd ? dayjs(netAtEnd).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.registerTime
      delete params.lastLoginTime
      delete params.firstSaveTime
      delete params.accountStatus
      delete params.deviceType
      delete params.accountType
      if (startTime || endTime || netAtStart || netAtEnd) {
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
      } else {
        this.$message.warning('请选择一个下注时间或者结算时间')
      }
    },
    enterSubmit() {
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
.msgList {
  font-size: 14px;
  display: flex;
  line-height: 24px;
  text-align: center;
  p {
    margin-right: 20px;
  }
  &:last-child p {
    margin-bottom: 15px;
  }
}
.view-container {
  border: 1px solid #dcdfe6;
  font-size: 14px;
}
.review-content {
  line-height: 30px;
}
.paddingLR {
  padding: 0 30px;
}
.head {
  height: 70px;
  line-height: 70px;
  width: 100%;
  background: #000;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: rgb(192, 190, 190);
  }
  .right-btn {
    float: right;
  }
}
.strong {
  height: 70px;
  line-height: 80px;
}
.paddingB {
  padding-bottom: 30px;
}
</style>
