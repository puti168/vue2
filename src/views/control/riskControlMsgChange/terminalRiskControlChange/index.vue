<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="终端设备号:" prop="userName">
            <el-input
              v-model="queryData.userName"
              clearable
              :maxlength="11"
              size="medium"
              style="width: 180px;"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="变更前风控等级:" class="tagheight" prop="accountType">
            <el-select
              v-model="queryData.accountType"
              style="width: 300px"
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
          <el-form-item label="变更后风控等级:" class="tagheight" prop="loginStatus">
            <el-select
              v-model="queryData.loginStatus"
              style="width: 280px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in loginStatusType"
                :key="item.description"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作人:" prop="loginIp">
            <el-input
              v-model="queryData.loginIp"
              clearable
              :maxlength="15"
              size="medium"
              style="width: 180px"
              placeholder="请输入内容"
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
          <el-table-column prop="userName" align="center" label="终端设备号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="blevel" align="center" label="变更前风控层级">
            <template slot-scope="scope">
              <el-tooltip content="该风控层级为刷流水" placement="top">
                <p>{{ scope.row.blevel }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="alevel" align="center" label="变更后风控层级">
            <template slot-scope="scope">
              <el-tooltip content="该风控层级为刷流水" placement="top">
                <p>{{ scope.row.alevel }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="ipAttribution"
            align="center"
            label="风控原因"
          ></el-table-column>
          <el-table-column
            prop="Operator"
            align="center"
            label="操作人"
          ></el-table-column>
          <el-table-column
            prop="times"
            align="center"
            label="操作时间"
            sortable="custom"
          ></el-table-column>
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
import { routerNames } from '@/utils/consts'

export default {
  name: routerNames.proxyRiskControlChange,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      tableData: []
    }
  },
  computed: {
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    },
    loginStatusType() {
      return this.globalDics.loginStatusType
    },
    accountType() {
      return this.globalDics.accountType
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        userName: 'darcy',
        blevel: '一级',
        alevel: '二级',
        ipAttribution: '无',
        Operator: 'darcy',
        times: '2021-05-25'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      // let params = {
      //   ...this.queryData
      // }
      // params = {
      //   ...this.getParams(params)
      // }
      // this.$api
      //   .getProxyDetailProxyLoginLog(params)
      //   .then((res) => {
      //     if (res.code === 200) {
      //       this.tableData = res.data.record;
      //       this.total = res.data.totalRecord;
      //     }
      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'loginTime') {
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
</style>
