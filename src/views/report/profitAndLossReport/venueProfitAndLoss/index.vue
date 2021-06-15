<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              style="width: 240px"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              :disabled="queryText !== '查询'"
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
            <h5>场馆：</h5>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选</el-checkbox>
          </div>
          <el-checkbox-group v-model="checkedVenue" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="itme in venueList"
              :key="itme.value"
              :label="itme.value"
              >{{ itme.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="content">
        <el-table
          ref="table"
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
          <el-table-column
            prop="gameName"
            align="center"
            label="场馆"
          >
            <template slot-scope="scope">
              <el-button
                class="lightBlueColor"
                style="border: none"
                @click="dialogData(scope.row)"
                >{{ scope.row.gameName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="settingList['项目']"
            prop="gameName"
            align="center"
            label="项目"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['投注人数']"
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="投注人数"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="注单量"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="投注金额"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="有效投注 "
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="投注盈亏"
          >
          </el-table-column>
          <div slot="append">
            <div ref="sum_heji" class="sum_footer">
              <div class="sum_footer_unit">合计</div>
              <div class="sum_footer_unit">50000000</div>
              <div class="sum_footer_unit">100</div>
              <div class="sum_footer_unit">200</div>
              <div class="sum_footer_unit">300</div>
              <div class="sum_footer_unit">400</div>
              <div class="sum_footer_unit">50000000</div>
            </div>
          </div>
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
      <el-dialog :visible.sync="tableVisible" :destroy-on-close="true" class="rempadding">
        <div slot="title" class="dialog-title">
          <span class="title-text" style="margin-right: 15px">场馆名称:{{ title }}</span>
          <span class="title-text">项目名称:{{ title1 }}</span>
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
          <el-table-column prop="userName" align="center" label="日期"> </el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="投注人数"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="注单量"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="投注金额"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="有效投注"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="投注盈亏"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="page"
          background
          class="fenye"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="size"
          :page-sizes="[10, 20, 50]"
          :total="summary"
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
        width="610px"
        class="col-setting"
      >
        <el-button type="primary" @click="setAll">复原缺省</el-button>
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
      searchTime: [startTime, endTime],
      queryText: '查询',
      t: 10,
      tableData: [],
      dataList: {},
      checkAll: false,
      checkedVenue: ['1', '2'],
      venueList: [
        { value: '1', label: '上海' },
        { value: '2', label: '北京' },
        { value: '3', label: '广州' },
        { value: '4', label: '深圳' }
      ],
      isIndeterminate: true,
      gameList: [],
      page: 1,
      size: 10,
      summary: 0,
      title: 'OB体育',
      title1: '游戏',
      visible: false,
      tableVisible: false,
      settingList: {
        '项目': true,
        '投注人数': true
      },
      newList: []
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem('venueProfitAndLoss')) {
      this.settingList = JSON.parse(localStorage.getItem('venueProfitAndLoss'))
    }
  },

  methods: {
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
        createAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .gameList(params)
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
    search() {
      let t = 10
      const timecount = setInterval(() => {
        t--
        this.queryText = t + 's'
        if (t < 0) {
          clearInterval(timecount)
          this.queryText = '查询'
        }
      }, 1000)
      this.loadData()
    },
    handleCheckAllChange(val) {
      console.log(val)
      const arr = []
      for (let i = 0; i < this.venueList.length; i++) {
        const ele = this.venueList[i].value
        arr.push(ele)
      }
      this.checkedVenue = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(val) {
      const checkedCount = val.length
      this.checkAll = checkedCount === this.venueList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.venueList.length
    },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.pageNum = 1
      this.loadData()
    },
    dialogData(val) {
      this.tableVisible = true
    },
    exportExcel() {
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
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
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.page = val
      // this.getMemberMemberInfoByLabelId(this.id)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.size = val
      // this.getMemberMemberInfoByLabelId(this.id)
    },
    // 列设置
    openSetting() {
      this.visible = true
      this.newList = JSON.parse(JSON.stringify(this.settingList))
    },
    confirm() {
      localStorage.setItem('venueProfitAndLoss', JSON.stringify(this.newList))
      this.settingList = this.newList
      this.visible = false
    },
    setAll() {
      Object.keys(this.newList).forEach((item) => {
        this.newList[item] = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sum_footer {
  display: flex;
  display: -webkit-flex;
  line-height: 45px;
  background: #f5f7fa;
  text-align: center;
  width: 100%;
  flex-direction: row;
}
.sum_footer_unit {
  flex-grow: 1;
  -webkit-flex-grow: 1;
  border-right: 1px solid #ebeef5;
}
/deep/.el-dialog__header {
  color: #5c5c5c;
  font-weight: 700;
}
.params {
  padding-bottom: 15px;
}
.checkBox {
  display: flex;
  padding: 10px;
  width: 70%;
  border: 1px solid #cccccc;

  .all {
    display: flex;
    margin-right: 30px;
    h5 {
      width: 40px;
      color: #606266;
      margin-top: 2px;
    }
  }
}
.fenye {
  text-align: center;
}
</style>
