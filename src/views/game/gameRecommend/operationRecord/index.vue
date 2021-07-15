<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="操作时间:">
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
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="模块名称:">
            <el-select
              v-model="queryData.moduleId"
              clearable
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in moduleType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="终端:">
            <el-select
              v-model="queryData.terminalType"
              clearable
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in terminalType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更类型:">
            <el-select
              v-model="queryData.applyType"
              clearable
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in gameModuleApplyType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作人:">
            <el-input
              v-model="queryData.createdBy"
              clearable
              :maxlength="12"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
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
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column prop="terminalType" align="center" label="终端">
            <template slot-scope="scope">
              <span v-if="!!scope.row.terminalType">
                {{ typeFilter(scope.row.terminalType, "terminalType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="moduleId" align="center" label="模块名称">
            <template slot-scope="scope">
              <span v-if="!!scope.row.terminalType">
                {{ typeFilter(scope.row.terminalType, "moduleType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyType" align="center" label="变更类型">
            <template slot-scope="scope">
              <span v-if="!!scope.row.applyType">
                {{ typeFilter(scope.row.applyType, "gameModuleApplyType") }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="变更前" prop="beforeModify">
			  <template slot-scope="scope">
              <span v-if="scope.row.applyType === '4'">
                {{ typeFilter(scope.row.beforeModify, "gameStatusType") }}
              </span>
              <span v-else>
                {{ scope.row.beforeModify }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="变更后" prop="afterModify">
			  <template slot-scope="scope">
              <span v-if="scope.row.applyType === '4'">
                {{ typeFilter(scope.row.afterModify, "gameStatusType") }}
              </span>
              <span v-else>
                {{ scope.row.afterModify }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" align="center" width="120" label="操作人">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="操作时间"
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
  name: routerNames.vipChangeRecord,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      searchTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      summary: {
        count: 0,
        failCount: 0,
        successCount: 0
      },
      tableData: []
    }
  },
  computed: {
    moduleType() {
      return this.globalDics.moduleType
    },
    terminalType() {
      return this.globalDics.terminalType
    },
    gameModuleApplyType() {
      return this.globalDics.gameModuleApplyType
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        createdAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createdAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .GameCommonModuleOperateRecord(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    reset() {
      this.pageNum = 1
      this.queryData = {}
      this.searchTime = [startTime, endTime]
      this.loadData()
    },
    _changeTableSort({ column, prop, order }) {
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderType
      }
      this.loadData()
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
  p {
    margin-right: 20px;
    line-height: 24px;
  }
  &:last-child p {
    margin-bottom: 15px;
  }
}
</style>
