<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
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
          <h5>钱包类型：</h5>
          <div class="all">
            <div style="margin-right: 30px">
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
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="gameName" align="center" label="钱包中心">
          </el-table-column>
          <el-table-column
            v-if="settingList['转入人数']"
            prop="gameName"
            align="center"
            sortable="custom"
            label="转入人数"
          >
          </el-table-column>
          <el-table-column
            v-if="settingList['转入次数']"
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="转入次数"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="转入总额"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="转出人数"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="转出次数 "
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="转出总额"
          >
          </el-table-column>
          <div slot="append">
            <div ref="sum_xiaoji" class="sum_footer">
              <div class="sum_footer_unit">本页合计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit">{{ getXiaoji("gameRebateRate") }}</div>
              <div class="sum_footer_unit">{{ getXiaoji("gameIcon") }}</div>
              <div class="sum_footer_unit">{{ getXiaoji("gameId") }}</div>
              <div class="sum_footer_unit">{{ getXiaoji("gameStatus") }}</div>
              <div class="sum_footer_unit">{{ getXiaoji("gameStatus") }}</div>
            </div>
            <div ref="sum_heji" class="sum_footer">
              <div class="sum_footer_unit">全部合计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit">200</div>
              <div class="sum_footer_unit">200</div>
              <div class="sum_footer_unit">200</div>
              <div class="sum_footer_unit">200</div>
              <div class="sum_footer_unit">20000000</div>
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
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      searchTime: [startTime, endTime],
      queryText: '查询',
      tableData: [],
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
      visible: false,
      settingList: {
        转入人数: true,
        转入次数: true
      },
      newList: []
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem('transferReport')) {
      this.settingList = JSON.parse(localStorage.getItem('transferReport'))
    }
    this.adjustWidth()
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
    // 列设置
    openSetting() {
      this.visible = true
      this.newList = JSON.parse(JSON.stringify(this.settingList))
    },
    confirm() {
      localStorage.setItem('transferReport', JSON.stringify(this.newList))
      this.settingList = this.newList
      this.visible = false
    },
    setAll() {
      Object.keys(this.newList).forEach((item) => {
        this.newList[item] = true
      })
    },
    adjustWidth() {
      this.$nextTick(() => {
        const len = this.$refs.sum_xiaoji.children.length
        Array.from(this.$refs.tables.$refs.headerWrapper.querySelectorAll('col')).forEach(
          (n, i) => {
            console.log(n, i, n.width)
            if (i < len) {
              this.$refs.sum_xiaoji.children[i].style =
                'width:' + n.getAttribute('width') + 'px'
              this.$refs.sum_heji.children[i].style =
                'width:' + n.getAttribute('width') + 'px'
            }
          }
        )
      })
    },
    getXiaoji(name) {
      var sum = 0
      this.tableData.forEach((n, i) => {
        sum += parseFloat(n[name] * 1)
      })
      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
.sum_footer {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  line-height: 45px;
  background: #f5f7fa;
  text-align: center;
  width: 100%;
  font-size: 14px;
  flex-direction: row;
  color: #5c5c5c;
  font-weight: 700;
  border-bottom: 1px solid #ebeef5;
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
  h5 {
    color: #606266;
  }
  .all {
    display: flex;
    padding: 10px;
    width: 70%;
    border: 1px solid #cccccc;
  }
}
.fenye {
  text-align: center;
}
</style>
