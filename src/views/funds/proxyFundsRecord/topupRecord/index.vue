<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="申请时间:">
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
          <el-form-item label="调整类型：" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
              clearable
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
          <el-form-item label="调整金额:">
            <el-input
              v-model="queryData.betAmountMin"
              size="medium"
              placeholder="最小数值"
              style="width: 100px"
              :maxlength="3"
              name="betAmountMin"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
            -
            <el-input
              v-model="queryData.betAmountMax"
              size="medium"
              placeholder="最大数值"
              style="width: 100px"
              :maxlength="3"
              name="betAmountMax"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkValue($event)"
            ></el-input>
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
          </el-form-item>
        </el-form>
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
          <el-table-column prop="gameName" align="center" label="订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="gameName" align="center" label="代理账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="gameName" align="center" label="代理姓名">
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
            label="调整方式"
            width="130px"
          >
          </el-table-column>
          <el-table-column
            prop="accountType"
            align="center"
            label="状态"
            width="100px"
          >
            <template slot-scope="scope">
              {{ typeFilter(scope.row.accountType, "accountType") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="调整类型"
            width="150px"
          >
          </el-table-column>
          <el-table-column
            prop="gameRebateRate"
            align="center"
            sortable="custom"
            label="调整金额"
          ></el-table-column>
		  <el-table-column
            prop="parentProxyName"
            align="center"
            label="申请人"
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
            label="申请时间"
            width="150px"
            sortable="custom"
          >
          </el-table-column>
		  <el-table-column
            prop="parentProxyName"
            align="center"
            label="备注"
            width="150px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.parentProxyName">{{
                scope.row.parentProxyName
              }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>

          <div slot="append">
            <div ref="sum_xiaoji" class="sum_footer">
              <div class="sum_footer_unit">小计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit">
                {{ getXiaoji("gameRebateRate") }}
              </div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
            </div>
            <div ref="sum_heji" class="sum_footer">
              <div class="sum_footer_unit">总计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
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
          <el-button type="primary" @click="confirm">提交</el-button>
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
      visible: false,
      tableVisible: false,
      settingList: {
        项目: true,
        投注人数: true
      },
      newList: []
    }
  },
  computed: {
    accountType() {
      return this.globalDics.accountType
    }
  },
  mounted() {
    if (localStorage.getItem('venueProfitAndLoss')) {
      this.settingList = JSON.parse(localStorage.getItem('venueProfitAndLoss'))
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
    confirm() {
      localStorage.setItem('venueProfitAndLoss', JSON.stringify(this.newList))
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
body .el-table th.gutter {
  display: table-cell !important;
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
