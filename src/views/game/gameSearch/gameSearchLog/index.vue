<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="搜索时间:">
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
          <el-form-item label="搜索内容:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="30"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号类型:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 280px"
              multiple
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
          <el-form-item label="会员账号:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入会员账号"
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
        <div class="msgList">
          <p style="line-height: 24px">
            <span>数据更新时间：</span><span>{{ now }}</span>
          </p>
          <p style="line-height: 24px">
            总登录次数：
            <span class="disableColor">{{ summary.count }}</span>
            次
          </p>
        </div>
        <div class="msgList">
          <p style="line-height: 24px">
            搜索词条top1：<span class="gray">{{ summary.successCount }}</span>
            次
          </p>
          <p style="line-height: 24px">
            搜索词条top2：<span class="gray">{{ summary.successCount }}</span>
            次
          </p>
          <p style="line-height: 24px">
            搜索词条top3：<span class="gray">{{ summary.successCount }}</span>
            次
          </p>
        </div>
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
          <el-table-column
            prop="vipSerialNum"
            align="center"
            label="搜索时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="搜索内容"
          ></el-table-column>
          <el-table-column prop="createDt" align="center" label="会员账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.createDt" :title="scope.row.createDt" :copy="copy">
                {{ scope.row.createDt }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="账号类型"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="pageNum"
          class="pageValue"
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
  name: routerNames.gamePlatform,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {
        accountType: []
      },
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
    accountType() {
      return this.globalDics.accountType
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        bankCode: '165416416464654',
        bankName: '中国银行',
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
    },
    reset() {
      this.queryData = {}
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'vipSerialNum') {
        prop = 1
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
    .gray {
      color: #909399;
    }
  }
  &:last-child p {
    margin-bottom: 15px;
  }
}
</style>
