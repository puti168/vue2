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
          <el-form-item label="游戏名称:">
            <el-input
              v-model="queryData.gameName"
              clearable
              maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
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
        <div class="checkBox">
          <div class="all">
            <h5>游戏：</h5>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选</el-checkbox>
          </div>
          <div class="game" @click="gameOfChoice">自选游戏</div>
        </div>
      </div>
      <div class="content">
        <el-table
          ref="tables"
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            v-if="settingList['游戏']"
            prop="gameTypeName"
            align="center"
            label="游戏"
          >
            <template slot-scope="scope">
              <el-link
                class="lightBlueColor"
                type="primary"
                @click="dialogData(scope.row)"
                >{{ scope.row.gameTypeName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['场馆']"
            prop="venueName"
            align="center"
            label="场馆"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['投注人数']"
            prop="memberCount"
            align="center"
            sortable="custom"
            label="投注人数"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['注单量']"
            prop="betCount"
            align="center"
            sortable="custom"
            label="注单量"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['投注金额']"
            prop="betAmount"
            align="center"
            sortable="custom"
            label="投注金额"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['有效投注']"
            prop="validBetAmount"
            align="center"
            sortable="custom"
            label="有效投注 "
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['投注盈亏']"
            prop="netAmount"
            align="center"
            sortable="custom"
            label="投注盈亏"
          >
            <template slot="header">
              <span>投注盈亏</span>
              <el-tooltip class="item" effect="dark">
                <i class="el-icon-question" style="position: absolute; right: 10px"></i>
                <div slot="content">盈亏金额指游戏输赢金额<br />负数表示会员输</div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span
                v-if="!!scope.row.netAmount && scope.row.netAmount > 0"
                class="enableColor"
              >
                {{ scope.row.netAmount }}
              </span>
              <span
                v-else-if="!!scope.row.netAmount && scope.row.netAmount < 0"
                class="redColor"
              >
                {{ scope.row.netAmount }}
              </span>
              <span v-else-if="!!scope.row.netAmount && scope.row.netAmount === 0"></span>
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
        title="选择游戏"
        class="gameBgm"
        :visible.sync="gameVisible"
        :destroy-on-close="true"
      >
        <el-row type="flex">
          <el-col class="gameConten mar">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >场馆全选</el-checkbox>
            <el-divider></el-divider>
            <el-checkbox-group v-model="gameCodeList" @change="handleCheckedVenueChange">
              <el-checkbox
                v-for="itme in gameTypeList"
                :key="itme.gameCode"
                :label="itme.gameCode"
                >{{ itme.gameName }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col class="gameConten">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >游戏全选</el-checkbox>
            <el-divider></el-divider>
            <el-checkbox-group v-model="gameTypeIdList" @change="handleCheckedGameChange">
              <el-checkbox
                v-for="itme in gameCheckList"
                :key="itme.gameId"
                :label="itme.gameId"
                >{{ itme.gameName }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="gameVisible = false">关闭</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="flag"
            size="medium"
            @click="gameCheckSub"
          >
            {{ queryText }}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="tableVisible" :destroy-on-close="true">
        <div slot="title" class="dialog-title">
          <span
class="title-text"
style="margin-right: 15px"
>游戏名称:{{ gameTypeName }}</span>
          <span class="title-text">所属场馆:{{ venueName }}</span>
        </div>
        <el-table
          v-loading="loading"
          size="mini"
          border
          class="small-size-table"
          :data="gameList"
          style="margin-bottom: 15px"
          :header-cell-style="getRowClass"
        >
          <el-table-column prop="staticDate" align="center" label="日期">
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
          <el-table-column
            prop="betAmount"
            align="center"
            label="投注金额"
          ></el-table-column>
          <el-table-column
            prop="validBetAmount"
            align="center"
            label="有效投注"
          ></el-table-column>
          <el-table-column prop="netAmount" align="center" label="投注盈亏">
            <template slot-scope="scope">
              <span
                v-if="!!scope.row.netAmount && scope.row.netAmount > 0"
                class="enableColor"
              >
                {{ scope.row.netAmount }}
              </span>
              <span
                v-else-if="!!scope.row.netAmount && scope.row.netAmount < 0"
                class="redColor"
              >
                {{ scope.row.netAmount }}
              </span>
              <span v-else-if="!!scope.row.netAmount && scope.row.netAmount === 0"></span>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="page"
          background
          class="fenye"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="size"
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
        <el-link type="primary" @click="setAll">复原缺省</el-link>
        <div v-for="(value, name) in settingList" :key="name" class="setting-div">
          <el-checkbox v-model="newList[name]">{{ name }}</el-checkbox>
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
          if (maxDate !== null && minDate !== null && maxDate - minDate <= this.day31) {
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
      checkAll: true,
      isIndeterminate: false,
      venueCheckAll: false,
      venueIsIndeterminate: true,
      gameCheckAll: false,
      gameIsIndeterminate: true,

      gameTypeList: [],
      gameCodeList: [],
      gameCheckList: [],
      gameTypeIdList: [],
      gameVisible: false,
      gameList: [],
      page: 1,
      size: 10,
      dialogTotal: 0,
      summary: {},
      gameTypeName: '',
      venueName: '',
      gameTypeId: '',
      visible: false,
      tableVisible: false,
      settingList: {
        游戏: true,
        场馆: true,
        投注人数: true,
        注单量: true,
        投注金额: true,
        有效投注: true,
        投注盈亏: true
      },
      newList: []
    }
  },
  computed: {},
  created() {
    this.seleceInit()
  },
  mounted() {
    if (localStorage.getItem('gameProfitAndLoss')) {
      this.settingList = JSON.parse(localStorage.getItem('gameProfitAndLoss'))
    }
  },

  methods: {
    seleceInit() {
      this.$api.getMerchantGameGamePlant().then((res) => {
        if (res.code === 200) {
          this.gameTypeList = res.data
          const venueCode = []
          for (let i = 0; i < res.data.length; i++) {
            const ele = res.data[i]
            venueCode.push(ele.gameCode)
            this.gameCodeList.push(ele.gameCode)
          }
          const params = venueCode.join(',')
          this.$api
            .getGameManagerSelectGameByPlatform({ platforms: params })
            .then((res) => {
              if (res.code === 200) {
                this.gameCheckList = res.data
                for (let i = 0; i < res.data.length; i++) {
                  const ele = res.data[i]
                  this.gameTypeIdList.push(ele.gameId)
                }
                console.log(res)
                this.initData()
              }
            })
        }
      })
    },
    initData() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        gameCodeList: this.gameCodeList,
        gameTypeIdList: this.gameTypeIdList,
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
          .getReportGameProfitListPage(params)
          .then((res) => {
            if (res.code === 200) {
              this.tableData = res.data.record || []
              this.total = res.data.totalRecord
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
        this.$api
          .getReportGameProfitSummary(params)
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
      this.initData()
    },
    handleCheckAllChange(val) {
      console.log(val)
      const venue = []
      for (let i = 0; i < this.gameTypeList.length; i++) {
        const ele = this.gameTypeList[i].gameCode
        venue.push(ele)
      }
      const game = []
      for (let i = 0; i < this.gameCheckList.length; i++) {
        const ele = this.gameCheckList[i].gameId
        game.push(ele)
      }
      this.checkAll = val
      this.isIndeterminate = false
      this.venueCheckAll = val
      this.gameCodeList = val ? venue : []
      this.venueIsIndeterminate = false
      this.gameCheckAll = val
      this.gameTypeIdList = val ? game : []
      this.gameIsIndeterminate = false
    },
    venueHandleCheckAllChange(val) {
      console.log(val)
      const venue = []
      for (let i = 0; i < this.gameTypeList.length; i++) {
        const ele = this.gameTypeList[i].gameCode
        venue.push(ele)
      }
      this.venueCheckAll = val
      this.gameCodeList = val ? venue : []
      this.venueIsIndeterminate = false
      const vLength = this.gameTypeList.length
      const gLength = this.gameCheckList.length
      const venueCheckLength = this.gameCodeList.length
      const gameCheckLength = this.gameTypeIdList.length
      this.checkAll = venueCheckLength + gameCheckLength === vLength + gLength
      this.isIndeterminate =
        venueCheckLength + gameCheckLength > 0 &&
        venueCheckLength + gameCheckLength < vLength + gLength
    },
    gameHandleCheckAllChange(val) {
      console.log(val)
      const game = []
      for (let i = 0; i < this.gameCheckList.length; i++) {
        const ele = this.gameCheckList[i].gameId
        game.push(ele)
      }
      this.gameCheckAll = val
      this.gameTypeIdList = val ? game : []
      this.gameIsIndeterminate = false
      const vLength = this.gameTypeList.length
      const gLength = this.gameCheckList.length
      const venueCheckLength = this.gameCodeList.length
      const gameCheckLength = this.gameTypeIdList.length
      this.checkAll = venueCheckLength + gameCheckLength === vLength + gLength
      this.isIndeterminate =
        venueCheckLength + gameCheckLength > 0 &&
        venueCheckLength + gameCheckLength < vLength + gLength
    },
    handleCheckedVenueChange(val) {
      console.log(val)
      const checkedCount = val.length
      this.venueCheckAll = checkedCount === this.gameTypeList.length
      this.venueIsIndeterminate =
        checkedCount > 0 && checkedCount < this.gameTypeList.length
      const vLength = this.gameTypeList.length
      const gLength = this.gameCheckList.length
      const venueCheckLength = this.gameCodeList.length
      const gameCheckLength = this.gameTypeIdList.length
      this.checkAll = venueCheckLength + gameCheckLength === vLength + gLength
      this.isIndeterminate =
        venueCheckLength + gameCheckLength > 0 &&
        venueCheckLength + gameCheckLength < vLength + gLength
    },
    handleCheckedGameChange(val) {
      console.log(val)
      const checkedCount = val.length
      this.gameCheckAll = checkedCount === this.gameCheckList.length
      this.gameIsIndeterminate =
        checkedCount > 0 && checkedCount < this.gameCheckList.length
      const vLength = this.gameTypeList.length
      const gLength = this.gameCheckList.length
      const venueCheckLength = this.gameCodeList.length
      const gameCheckLength = this.gameTypeIdList.length
      this.checkAll = venueCheckLength + gameCheckLength === vLength + gLength
      this.isIndeterminate =
        venueCheckLength + gameCheckLength > 0 &&
        venueCheckLength + gameCheckLength < vLength + gLength
    },
    gameOfChoice() {
      this.gameVisible = true
    },
    gameCheckSub() {
      this.search()
      this.gameVisible = false
    },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.initData()
    },
    dialogData(val) {
      this.venueName = val.venueName
      this.gameTypeName = val.gameTypeName
      this.gameTypeName = val.gameTypeName
      this.gameTypeId = val.gameTypeId
      this.getReportGameProfitDetailListPage(val.gameTypeId)
      this.tableVisible = true
    },
    getReportGameProfitDetailListPage(val) {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      const params = {
        pageNum: this.page,
        pageSize: this.size,
        gameTypeId: val,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      this.$api
        .getReportGameProfitDetailListPage(params)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.gameList = res.data.records
            this.dialogTotal = res.data.total
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
      this.initData()
    },
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.page = val
      this.getReportGameProfitDetailListPage(this.gameTypeId)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.size = val
      this.getReportGameProfitDetailListPage(this.gameTypeId)
    },
    // 列设置
    openSetting() {
      this.visible = true
      this.newList = JSON.parse(JSON.stringify(this.settingList))
    },
    confirm() {
      localStorage.setItem('gameProfitAndLoss', JSON.stringify(this.newList))
      this.settingList = this.newList
      this.visible = false
    },
    setAll() {
      Object.keys(this.newList).forEach((item) => {
        this.newList[item] = true
      })
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
        } else if (index >= 2) {
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
              case 2:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num.toFixed(2)}</p>
                    <p>{this.summary.totalMemberCount}</p>
                  </div>
                )
                break
              case 3:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num.toFixed(2)}</p>
                    <p>{this.summary.totalBetCount}</p>
                  </div>
                )
                break
              case 4:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num.toFixed(2)}</p>
                    <p>{this.summary.totalBetAmount}</p>
                  </div>
                )
                break
              case 5:
                sums[index] = (
                  <div class='count_row'>
                    <p>{num.toFixed(2)}</p>
                    <p>{this.summary.totalValidBetAmount}</p>
                  </div>
                )
                break
              case 6:
                sums[index] = (
                  <div class='count_row'>
                    {num > 0 ? (
                      <p class='enableColor'>{num.toFixed(2)}</p>
                    ) : (
                      <p class='redColor'>{num.toFixed(2)}</p>
                    )}
                    {this.summary.totalNetAmount > 0 ? (
                      <p class='enableColor'>{this.summary.totalNetAmount}</p>
                    ) : (
                      <p class='redColor'>{this.summary.totalNetAmount}</p>
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
    handleSizeChange(value) {
      this.pageNum = 1
      this.pageSize = value
      this.initData()
    },
    handleCurrentChange(value) {
      this.pageNum = value
      this.initData()
    },
    exportExcel() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        gameCodeList: this.gameCodeList,
        gameTypeIdList: this.gameTypeIdList,
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
.gameBgm /deep/.el-dialog {
  background: #f2f2f2;
}
.gameConten {
  background: #ffffff;
  padding: 15px;
  /deep/.el-checkbox-group {
    max-height: 400px;
    overflow: auto;
  }
}
.mar {
  margin-right: 15px;
}
.checkBox {
  display: flex;
  .all {
    display: flex;
    height: 16px;
    margin-right: 30px;
    h5 {
      width: 40px;
      color: #606266;
      margin-top: 2px;
    }
  }
  .game {
    color: #0000ffd8;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
  }
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
