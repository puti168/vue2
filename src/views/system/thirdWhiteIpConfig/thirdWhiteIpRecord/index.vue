<template>
  <div class="game-container report-container">
    <div class="params">
      <el-form ref="form" :inline="true" :model="queryData">
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
        <el-form-item label="状态:">
          <el-select
								v-model="queryData.status"
								size="medium"
								placeholder="默认选择全部"
								clearable
								style="width: 300px"
          >
            	<el-option label="全部"></el-option>
							<el-option label="关闭" :value="0"></el-option>
							<el-option label="开启" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方支付渠道id:">
          <el-input
            v-model="queryData.channelId"
            clearable
            size="medium"
            :maxlength="12"
            style="width: 180px"
            placeholder="请输入"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="第三方回调ip:">
          <el-input
            v-model="queryData.ip"
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
          <el-button
            type="warning"
            icon="el-icon-folder"
            :disabled="loading"
            size="medium"
            class="fr"
            @click="addThirdWhileIp"
          >
            创建
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
          <el-table-column prop="createDt" align="center" label="创建时间">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.createDt+'')">
                {{ scope.row.createDt }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请人" prop="applyBy">
            <template slot-scope="scope">
              <span v-if="scope.row.applyBy">
                {{ scope.row.applyBy }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" prop="updateDt">
            <template slot-scope="scope">
              <span v-if="scope.row.updateDt">
                {{ scope.row.updateDt }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" align="center" width="120" label="操作人">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.operator+'')">
                {{ scope.row.operator }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="status">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.status+'')">
                {{ scope.row.status }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="第三方支付渠道id" prop="channelId">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.channelId+'')">
                {{ scope.row.channelId }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="三方回调IP白名单管理主键id" prop="id">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.id+'')">
                {{ scope.row.id }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商户号id" prop="merchantId">
            <template slot-scope="scope">
              <span v-if="!!(scope.row.merchantId+'')">
                {{ scope.row.merchantId }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <span>删除</span>
            <span>修改</span>
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
      queryData: {
        status: undefined,
        channelId: undefined,
        ip: undefined,
        orderType: undefined
      },
      searchTime: [start, end],
      dataList: []
    }
  },
	computed: {
	},
  mounted() {},
  methods: {
    loadData() {
      const [beginTime, endTime] = this.searchTime || []
      let params = {
        ...this.queryData,
        beginTime: beginTime ? dayjs(beginTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.time
      this.loading = true

      this.$api
        .getCallbackIpWhiteList(params)
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
    addThirdWhileIp() {

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

<style lang="scss" scoped>
  .imgCenter {
    img {
      max-width: 100%;
    }
  }
</style>
