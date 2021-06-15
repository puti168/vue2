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
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              :default-time="defaultTime"
              style="width: 240px"
            ></el-date-picker>
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
            <el-button
              type="success"
              icon="el-icon-setting"
              :disabled="loading"
              size="medium"
              @click="reset"
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
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
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
          <el-table-column prop="id" align="center" label="订单号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
                {{ scope.row.memberName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="memberName" align="center" label="会员账号">
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
          <el-table-column prop="memberName" align="center" label="会员姓名">
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
          <el-table-column prop="playerName" align="center" label="场馆名称">
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="订单状态">
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="有效金额 ">
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="返水比例">
          </el-table-column>
          <el-table-column prop="parentProxyName" align="center" label="返水金额">
          </el-table-column>
          <el-table-column
            prop="parentProxyName"
            align="center"
            label="返水时间"
            sortable="custom"
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
      searchTime: [startTime, endTime],
      tableData: [],
      dataList: {},
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: [
        '上海',
        '北京',
        '广州',
        '深圳',
        '上海1',
        '北京2',
        '广州3',
        '深圳4',
        '上海5',
        '北京6',
        '广州7',
        '深圳8',
        '上海9',
        '北京11',
        '广州12',
        '深圳13',
        '上海14',
        '北京15',
        '广州16',
        '深圳17',
        '上海18',
        '北京19',
        '广州20',
        '深圳10',
        '上海21',
        '北京22',
        '广州23',
        '深圳24',
        '上海25',
        '北京26',
        '广州27',
        '深圳28'
      ],
      isIndeterminate: true
    }
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
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
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    reset() {
      this.queryData = {}
      this.searchTime = [startTime, endTime]
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
    margin-top: 2px;
  }
  }
}
</style>
