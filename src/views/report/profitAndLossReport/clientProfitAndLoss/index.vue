<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="日期:">
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
          <el-form-item label="客户端:">
            <el-select
              v-model="queryData.deviceType"
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
              v-if="hasPermission('347')"
              icon="el-icon-download"
              type="warning"
              :disabled="loading"
              size="medium"
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
          show-summary
          :summary-method="getSummaries"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            v-if="clientProfitAndLoss['客户端']"
            prop="deviceTypeDesc"
            align="center"
            label="客户端"
          >
            <template slot-scope="scope">
              <el-link
                class="lightBlueColor"
                type="primary"
                @click="dialogData(scope.row)"
                >{{ scope.row.deviceTypeDesc }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            v-if="clientProfitAndLoss['投注人数']"
            prop="memberCount"
            align="center"
            sortable="custom"
            label="投注人数"
          >
          </el-table-column>
          <el-table-column
            v-if="clientProfitAndLoss['注单量']"
            prop="betCount"
            align="center"
            sortable="custom"
            label="注单量"
          >
          </el-table-column>
          <el-table-column
            v-if="clientProfitAndLoss['投注金额']"
            prop="betAmount"
            align="center"
            sortable="custom"
            label="投注金额"
          >
            <template slot-scope="scope">
              {{ scope.row.betAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="clientProfitAndLoss['有效投注']"
            prop="validBetAmount"
            align="center"
            sortable="custom"
            label="有效投注 "
          >
            <template slot-scope="scope">
              {{ scope.row.validBetAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="clientProfitAndLoss['投注盈亏']"
            prop="netAmount"
            align="center"
            sortable="custom"
            label="投注盈亏"
          >
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
      </div>
      <el-dialog :visible.sync="tableVisible" :destroy-on-close="true" class="rempadding">
        <div slot="title" class="dialog-title">
          <span class="title-text">客户端:{{ title }}</span>
        </div>
        <el-table
          v-loading="loading"
          size="mini"
          border
          class="small-size-table"
          :data="dialogList"
          style="margin-bottom: 15px"
          :header-cell-style="getRowClass"
        >
          <el-table-column prop="staticsDate" align="center" label="日期">
          </el-table-column>
          <el-table-column
            prop="memberCount"
            align="center"
            label="投注人数"
          ></el-table-column>
          <el-table-column
            prop="betCount"
            align="center"
            label="注单量"
          ></el-table-column>
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
              <span v-else-if="scope.row.netAmount === 0">
                {{ scope.row.netAmount | filterDecimals }}
              </span>
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
        <div v-for="(value, name) in clientProfitAndLoss" :key="name" class="setting-div">
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
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  components: {},
  filters: {
    filterDecimals: function (val) {
      if (typeof val === 'number') {
        const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
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
      flag: false,
      queryText: '查询',
      tableData: [],
      dialogList: [],
      pageR: 1,
      sizeR: 10,
      dialogTotal: 0,
      deviceTypeCode: '',
      summary: {},
      title: '',
      visible: false,
      tableVisible: false,
      clientProfitAndLoss: {
        客户端: true,
        投注人数: true,
        注单量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true
      },
      myName: '',
      newList: []
    }
  },
  computed: {
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    }
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
      const request = indexedDB.open('clientProfitAndLoss')
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        this.db = db
        // 建表 名为person,主键为id
        db.createObjectStore('clientProfitAndLoss', {
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
        .transaction(['clientProfitAndLoss'], 'readwrite')
        .objectStore('clientProfitAndLoss')
        .add({
          id: this.myName,
          客户端: true,
          投注人数: true,
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
      var transaction = this.db.transaction(['clientProfitAndLoss'])
      const objectStore = transaction.objectStore('clientProfitAndLoss')
      const list = []
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          for (let i = 0; i < list.length; i++) {
            const ele = list[i]
            if (ele.id === this.myName) {
              this.newList.push(ele)
              this.clientProfitAndLoss = { ...ele }
              delete this.clientProfitAndLoss.id
            }
          }
        }
      }
    },
    confirm() {
      console.log(this.newList, 446464)
      const arr = []
      for (let i = 0; i < this.newList.length; i++) {
        const ele = this.newList[i]
        if (ele.id === this.myName) {
          arr.push(ele)
        }
      }
      const request = this.db
        .transaction(['clientProfitAndLoss'], 'readwrite')
        .objectStore('clientProfitAndLoss')
        .put({
          id: this.myName,
          客户端: arr[0]['客户端'],
          投注人数: arr[0]['投注人数'],
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
        客户端: true,
        投注人数: true,
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
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      params = {
        ...this.getParams(params)
      }
      if (endTime - startTime > this.day31) {
        this.$message.warning('请缩小搜索范围至31天')
      } else {
        this.loading = true
        this.$api
          .getDevicetypenetamountList(params)
          .then((res) => {
            if (res.code === 200 && res.data !== null) {
              this.tableData = res.data.record
            } else {
              this.tableData = []
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
        this.$api
          .getDevicetypenetamountAggregation(params)
          .then((res) => {
            if (res.code === 200) {
              this.summary = res.data
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    search() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      if (endTime - startTime <= this.day31) {
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
      } else {
        this.flag = true
        this.loadData()
      }
    },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.search()
    },
    dialogData(val) {
      this.pageR = 1
      this.sizeR = 10
      this.title = val.deviceTypeDesc
      this.deviceTypeCode = val.deviceTypeCode
      this.getDevicetypenetamountDetail(val.deviceTypeCode)
      this.tableVisible = true
    },
    getDevicetypenetamountDetail(val) {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      const params = {
        pageNum: this.pageR,
        pageSize: this.sizeR,
        deviceType: val,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      this.$api
        .getDevicetypenetamountDetail(params)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.dialogList = res.data.record
            this.dialogTotal = res.data.totalRecord
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCurrentChangeDialog(val) {
      this.pageR = val
      this.getDevicetypenetamountDetail(this.deviceTypeCode)
    },
    handleSizeChangeDialog(val) {
      this.sizeR = val
      this.getDevicetypenetamountDetail(this.deviceTypeCode)
    },
    filterDecimals: function (val) {
      if (typeof val === 'number') {
        const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
        return newVal
      } else {
        return '-'
      }
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          const el = (
            <div class='count_row'>
              <p>全部合计</p>
            </div>
          )
          sums[index] = el
          return
        } else if (index === 1 && this.summary !== null) {
          sums[index] = (
            <div class='count_row'>
              <p>{this.summary.memberCountTotal}</p>
            </div>
          )
          return
        } else if (index === 2 && this.summary !== null) {
          sums[index] = (
            <div class='count_row'>
              <p>{this.summary.betCountTotal}</p>
            </div>
          )
          return
        } else if (index === 3 && this.summary !== null) {
          sums[index] = (
            <div class='count_row'>
              <p>{this.filterDecimals(this.summary.betAmountTotal)}</p>
            </div>
          )
          return
        } else if (index === 4 && this.summary !== null) {
          sums[index] = (
            <div class='count_row'>
              <p>{this.filterDecimals(this.summary.validBetAmountTotal)}</p>
            </div>
          )
          return
        } else if (index === 5 && this.summary !== null) {
          sums[index] = (
            <div class='count_row'>
              {this.summary.netAmountTotal > 0 ? (
                <p class='enableColor'>
                  {this.filterDecimals(this.summary.netAmountTotal)}
                </p>
              ) : this.summary.netAmountTotal === 0 ? (
                <p>{this.filterDecimals(this.summary.netAmountTotal)}</p>
              ) : (
                <p class='redColor'>{this.filterDecimals(this.summary.netAmountTotal)}</p>
              )}
            </div>
          )
          return
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    _changeTableSort({ column, prop, order }) {
      switch (prop) {
        case 'memberCount':
          prop = 1
          break
        case 'betCount':
          prop = 2
          break
        case 'betAmount':
          prop = 3
          break
        case 'validBetAmount':
          prop = 4
          break
        case 'netAmount':
          prop = 5
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
  color: #5c5c5c;
  font-weight: 700;
}
.count_row {
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
