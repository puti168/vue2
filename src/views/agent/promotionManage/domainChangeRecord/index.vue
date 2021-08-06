<template>
  <div class="game-container report-container">
    <div class="params">
      <el-form ref="form" :inline="true" :model="queryData" label-width="80px">
        <el-form-item label="变更时间:">
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
        <el-form-item label="变更类型:">
          <el-select
            v-model="queryData.operateField"
            clearable
            placeholder="默认选择全部"
            style="width: 280px"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in enumProxyDomainoperate"
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
            size="medium"
            :maxlength="12"
            style="width: 280px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 30px">
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
    <div class="view-container dealer-container">
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="dataList"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            prop="createdAt"
            align="center"
            label="操作时间"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="operateField" align="center" label="变更类型">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.operateField, "enumProxyDomainoperate") }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="变更前" prop="beforeModify">
            <template slot-scope="scope">
              <div v-if="scope.row.operateField === 3 || scope.row.operateField === 4">
                <span
                  v-if="scope.row.operateField === 3 && scope.row.beforeModify === '0'"
                  class="disableRgba"
                >
                  {{ typeFilter(scope.row.beforeModify, "domainStatusType") }}
                </span>
                <span
                  v-else-if="
                    scope.row.operateField === 3 && scope.row.beforeModify === '1'
                  "
                  class="normalRgba"
                >
                  {{ typeFilter(scope.row.beforeModify, "domainStatusType") }}
                </span>
                <span v-else>{{
                  typeFilter(scope.row.beforeModify, "enumProxyDomainTypeOperate")
                }}</span>
              </div>
              <div v-else>{{ scope.row.beforeModify }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="变更后" prop="afterModify">
            <template slot-scope="scope">
              <div v-if="scope.row.operateField === 3 || scope.row.operateField === 4">
                <span
                  v-if="scope.row.operateField === 3 && scope.row.afterModify === '0'"
                  class="disableRgba"
                >
                  {{ typeFilter(scope.row.afterModify, "domainStatusType") }}
                </span>
                <span
                  v-else-if="
                    scope.row.operateField === 3 && scope.row.afterModify === '1'
                  "
                  class="normalRgba"
                >
                  {{ typeFilter(scope.row.afterModify, "domainStatusType") }}
                </span>
                <span v-else>{{
                  typeFilter(scope.row.afterModify, "enumProxyDomainTypeOperate")
                }}</span>
              </div>
              <div v-else>{{ scope.row.afterModify }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" align="center" width="120" label="操作人">
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remark">
            <template slot-scope="scope">
              {{ scope.row.remark ? scope.row.remark : "-" }}
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
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()

export default {
  components: {},
  mixins: [list],
  data() {
    this.loadData = this.throttle(this.loadData, 1000)
    return {
      queryData: {},
      searchTime: [start, end],
      dataList: []
    }
  },
  computed: {
    domainStatusType() {
      return this.globalDics.domainStatusType
    },
    enumProxyDomainoperate() {
      return this.globalDics.enumProxyDomainoperate
    },
    enumProxyDomainTypeOperate() {
      return this.globalDics.enumProxyDomainTypeOperate
    }
  },
  mounted() {},
  methods: {
    loadData() {
      const [startTime, endTime] = this.searchTime || []
      let params = {
        ...this.queryData,
        operateType: 2,
        beginTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.time
      this.loading = true

      this.$api
        .getProxyOperateSelect(params)
        .then((res) => {
          this.loading = false
          const {
            code,
            data: { record, totalRecord },
            msg
          } = res
          if (code === 200) {
            this.dataList = record || []
            this.total = totalRecord || 0
          } else {
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    _changeTableSort({ column, prop, order }) {
      this.pageNum = 1
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
    reset() {
      this.pageNum = 1
      this.queryData = {}
      this.searchTime = [start, end]
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
