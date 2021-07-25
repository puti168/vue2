<template>
  <div class="game-container report-container">
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
        <el-form-item label="操作页面:">
          <el-select
            v-model="queryData.pageName"
            style="width: 350px"
            multiple
            clearable
            placeholder="默认选择全部"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in operatePage"
              :key="item.value"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ID:">
          <el-input
            v-model="queryData.pageId"
            clearable
            size="medium"
            :maxlength="20"
            style="width: 180px"
            placeholder="请输入"
            oninput="value=value.replace(/[^\d]/g,'')"
            @blur="checkValue($event)"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="变更类型:">
          <el-select
            v-model="queryData.changeType"
            style="width: 300px"
            multiple
            collapse-tags
            placeholder="默认选择全部"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in changeType"
              :key="item.codein"
              :label="item.value"
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
            style="width: 180px"
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
          <el-table-column prop="pageName" align="center" label="操作页面">
            <template slot-scope="scope">
              <span v-for="item in operatePage" :key="item.value">
                {{ scope.row.pageName === item.code ? item.value : "" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="pageId" align="center" label="ID">
          </el-table-column>
          <el-table-column prop="changeType" align="center" label="变更类型">
            <template slot-scope="scope">
							<span v-for="item in changeType" :key="item.value">
								{{ scope.row.changeType === item.code ? item.value : '' }}
							</span>
						</template>
          </el-table-column>
          <el-table-column align="center" label="变更前" prop="beforeValue">
            <template slot-scope="scope">
              <span v-if="scope.row.changeType === 16">
                {{ typeFilter(scope.row.beforeValue, "gameStatusType") }}
              </span>
              <span v-else>
                {{ scope.row.beforeValue }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="变更后" prop="afterValue">
            <template slot-scope="scope">
              <span v-if="scope.row.changeType === 16 ">
                {{ typeFilter(scope.row.afterValue, "gameStatusType") }}
              </span>
              <span v-else>
                {{ scope.row.afterValue }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remark">
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
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()

export default {
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      changeType: [],
      operatePage: [],
      searchTime: [start, end],
      dataList: []
    }
  },
  created() {
    this.getEnums()
  },
  mounted() {},
  methods: {
    loadData() {
      const [startTime, endTime] = this.searchTime || []
      let params = {
        ...this.queryData,
        startAt: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.time
      this.loading = true

      this.$api
				.getOperateGameConfigOperateRecordQueryRecordList(params)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.dataList = res.data.records
						this.total = res.data.total
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
        .catch(() => {
          this.loading = false
        })
    },
    getEnums() {
      this.$api.OperateGameConfigOperateRecordQueryEnumsAPI().then((res) => {
        if (res.code === 200) {
          this.changeType = res.data.changeType
          this.operatePage = res.data.operatePage
        }
      })
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
				prop = 1
			}
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
    },
    checkValue(e) {
      const { value } = e.target
      console.log(value)
      this.queryData.announcementTitel = value
    }
  }
}
</script>

<style lang="scss" scoped></style>
