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
              v-if="hasPermission('348')"
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
            v-if="dailyProfitAndLoss['日期']"
            prop="staticsDate"
            align="center"
            label="日期"
          ></el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['总优惠']"
            prop="discountAmount"
            align="center"
            label="总优惠"
          >
            <template slot="header">
              <span>总优惠</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question"></i>
                <div slot="content">
                  会员活动+会员人工加减额+VIP福利
                  <br />
                  加额为正
                  <br />
                  减额为负
                </div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              {{ scope.row.discountAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['总返水']"
            prop="rebateAmount"
            align="center"
            label="总返水"
          >
            <template slot="header">
              <span>总返水</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question"></i>
                <div slot="content">
                  会员返水+会员返水人工加减额
                  <br />
                  加额为正
                </div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              {{ scope.row.rebateAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['其他调整']"
            prop="artificialPatchAmount"
            align="center"
            label="其他调整"
          >
            <template slot="header">
              <span>其他调整</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question"></i>
                <div slot="content">
                  其他调整金额
                  <br />
                  加额为正
                  <br />
                  减额为负
                </div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              {{ scope.row.artificialPatchAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['投注人数']"
            prop="memberCount"
            align="center"
            label="投注人数"
          ></el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['投注量']"
            prop="betCount"
            align="center"
            label="投注量"
          ></el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['投注金额']"
            prop="betAmount"
            align="center"
            label="投注金额"
          >
            <template slot-scope="scope">
              {{ scope.row.betAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['有效投注']"
            prop="validBetAmount"
            align="center"
            label="有效投注 "
          >
            <template slot-scope="scope">
              {{ scope.row.validBetAmount | filterDecimals }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="dailyProfitAndLoss['投注盈亏']"
            prop="netAmount"
            align="center"
            label="投注盈亏"
          >
            <template slot="header">
              <span>投注盈亏</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question"></i>
                <div slot="content">
                  盈亏金额指游戏输赢金额
                  <br />
                  负数表示会员输
                </div>
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
          <el-table-column
            v-if="dailyProfitAndLoss['净盈亏']"
            prop="net"
            align="center"
            label="净盈亏"
          >
            <template slot="header">
              <span>净盈亏</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question"></i>
                <div slot="content">净盈亏：投注盈亏+总优惠+总返水+其他调整</div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.net > 0" class="enableColor">
                {{ scope.row.net | filterDecimals }}
              </span>
              <span v-else-if="scope.row.net < 0" class="redColor">
                {{ scope.row.net | filterDecimals }}
              </span>
              <span v-else-if="scope.row.net === 0">{{
                scope.row.net | filterDecimals
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
      <el-dialog
        title="列设置"
        center
        :visible.sync="visible"
        width="300px"
        class="col-setting"
      >
        <el-link type="primary" @click="clickDel">复原缺省</el-link>
        <div v-for="(value, name) in dailyProfitAndLoss" :key="name" class="setting-div">
          <el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">{{
            name
          }}</el-checkbox>
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
const startTime = dayjs().subtract(6, 'day').format()
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
      dataList: {},
      isIndeterminate: true,
      gameList: [],
      page: 1,
      size: 10,
      summary: {},
      visible: false,
      tableVisible: false,
      dailyProfitAndLoss: {
        日期: true,
        总优惠: true,
        总返水: true,
        其他调整: true,
        投注人数: true,
        投注量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true,
        净盈亏: true
      },
      myName: '',
      newList: []
    }
  },
  computed: {},
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
      const request = indexedDB.open('dailyProfitAndLoss')
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        this.db = db
        // 建表 名为person,主键为id
        db.createObjectStore('dailyProfitAndLoss', {
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
        .transaction(['dailyProfitAndLoss'], 'readwrite')
        .objectStore('dailyProfitAndLoss')
        .add({
          id: this.myName,
          日期: true,
          总优惠: true,
          总返水: true,
          其他调整: true,
          投注人数: true,
          投注量: true,
          投注金额: true,
          有效投注: true,
          投注盈亏: true,
          净盈亏: true
        })
      request.onsuccess = (event) => {
        this.getList()
      }
    },
    getList() {
      this.newList = []
      var transaction = this.db.transaction(['dailyProfitAndLoss'])
      const objectStore = transaction.objectStore('dailyProfitAndLoss')
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
              this.dailyProfitAndLoss = { ...ele }
              delete this.dailyProfitAndLoss.id
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
        .transaction(['dailyProfitAndLoss'], 'readwrite')
        .objectStore('dailyProfitAndLoss')
        .put({
          id: this.myName,
          日期: arr[0]['日期'],
          总优惠: arr[0]['总优惠'],
          总返水: arr[0]['总返水'],
          其他调整: arr[0]['其他调整'],
          投注人数: arr[0]['投注人数'],
          投注量: arr[0]['投注量'],
          投注金额: arr[0]['投注金额'],
          有效投注: arr[0]['有效投注'],
          投注盈亏: arr[0]['投注盈亏'],
          净盈亏: arr[0]['净盈亏']
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
        日期: true,
        总优惠: true,
        总返水: true,
        其他调整: true,
        投注人数: true,
        投注量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true,
        净盈亏: true
      })
    },
    loadData() {
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
      if (endTime - startTime > this.day31) {
        this.$message.warning('请缩小搜索范围至31天')
      } else {
        this.loading = true
        this.$api
          .getReportDaynetamountList(params)
          .then((res) => {
            if (res.code === 200 && res.data !== null) {
              this.tableData = res.data.record
              this.total = res.data.totalRecord
              console.log(res)
            } else {
              this.tableData = []
              this.total = 0
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
        this.$api
          .getReportDaynetamountAggregation(params)
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
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.search()
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
        } else {
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
              case 1:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.discountAmount)}</p>
                  </div>
                )
                break
              case 2:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.rebateAmount)}</p>
                  </div>
                )
                break
              case 3:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.artificialPatchAmount)}</p>
                  </div>
                )
                break
              case 4:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num}</p>
                    <p>{this.summary.memberCount}</p>
                  </div>
                )
                break
              case 5:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num}</p>
                    <p>{this.summary.betCount}</p>
                  </div>
                )
                break
              case 6:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.betAmount)}</p>
                  </div>
                )

                break
              case 7:
                sums[index] = (
                  <div class='count_row'>
                    <p>{this.filterDecimals(num)}</p>
                    <p>{this.filterDecimals(this.summary.validBetAmount)}</p>
                  </div>
                )
                break
              case 8:
                sums[index] = (
                  <div class='count_row'>
                    {num > 0 ? (
                      <p class='enableColor'>{this.filterDecimals(num)}</p>
                    ) : (
                      <p class='redColor'>{this.filterDecimals(num)}</p>
                    )}
                    {this.summary.netAmount > 0 ? (
                      <p class='enableColor'>
                        {this.filterDecimals(this.summary.netAmount)}
                      </p>
                    ) : this.summary.netAmount === 0 ? (
                      <p>{this.filterDecimals(this.summary.netAmount)}</p>
                    ) : (
                      <p class='redColor'>
                        {this.filterDecimals(this.summary.netAmount)}
                      </p>
                    )}
                  </div>
                )
                break
              case 9:
                sums[index] = (
                  <div class='count_row'>
                    {num > 0 ? (
                      <p class='enableColor'>{this.filterDecimals(num)}</p>
                    ) : (
                      <p class='redColor'>{this.filterDecimals(num)}</p>
                    )}
                    {this.summary.net > 0 ? (
                      <p class='enableColor'>{this.filterDecimals(this.summary.net)}</p>
                    ) : this.summary.net === 0 ? (
                      <p>{this.filterDecimals(this.summary.net)}</p>
                    ) : (
                      <p class='redColor'>{this.filterDecimals(this.summary.net)}</p>
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
.params {
  padding-bottom: 15px;
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
