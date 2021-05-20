<template>
  <div class="view-container dealer-container">
    <el-button
      type="warning"
      icon="el-icon-folder"
      :disabled="loading"
      size="medium"
      class="fr"
      @click="addLevelConfig"
    >
      创建
    </el-button>
    <agentEditFrom v-if="edit" :editRowData="editRowData" @back="back" />
    <div v-else class="content">
      <el-table
        v-loading="loading"
        border
        size="mini"
        class="small-size-table"
        :data="agentDataList"
        style="width: 100%"
        :header-cell-style="getRowClass"
        @sort-change="changeTableSort"
      >
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column
          prop="proxyGradeName"
          align="center"
          label="代理等级"
        ></el-table-column>
        <el-table-column
          prop="monthActiveNum"
          align="center"
          label="本月活跃人数"
        ></el-table-column>
        <el-table-column
          prop="monthNewNum"
          align="center"
          label="本月新增活跃人数"
        ></el-table-column>
        <el-table-column align="center" label="等级福利">
          <template slot-scope="scope">
            {{ scope.row.additionalCommission }}
            {{ scope.row.additionalCommissionLimit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="giveJackpot"
          align="center"
          label="游戏彩金"
        ></el-table-column>
        <el-table-column prop="createdBy" align="center" label="创建人"></el-table-column>
        <el-table-column
          prop="createdAt"
          align="center"
          label="创建时间"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="updatedBy"
          align="center"
          label="最近操作人"
        ></el-table-column>
        <el-table-column
          prop="updatedAt"
          align="center"
          label="最近操作时间"
          sortable="custom"
        ></el-table-column>
        <el-table-column prop="operating" align="center" label="操作" width="240px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              :disabled="loading"
              size="medium"
              @click="openEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              :disabled="loading"
              type="danger"
              size="medium"
              class="noicon"
              @click="confined(scope.row)"
            >
              删除
            </el-button>
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
</template>

<script>
import list from '@/mixins/list'
import agentEditFrom from './agentEditForm'

export default {
  components: { agentEditFrom },
  mixins: [list],
  data() {
    return {
      queryData: {},
      edit: false,
      agentDataList: [],
      editRowData: {}
    }
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getProxyGradesSelect(params)
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.total = res.data.totalRecord
            this.agentDataList = res.data.record
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
    addLevelConfig() {
      console.log(1111111)
      this.editRowData = {}
      this.edit = true
    },
    openEdit(val) {
      this.editRowData = val
      this.edit = true
    },
    back() {
      this.edit = false
    },
    // 删除
    confined() {
      this.$confirm(
        `<strong>是否删除该条配置?</strong></br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          // this.getOneKeyWithdraw({ userId: this.parentData.userId }) // 一键下分
        })
        .catch(() => {})
    },
    changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
      }
      if (prop === 'updatedAt') {
        prop = 2
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
.fr {
  position: fixed;
  top: 126px;
  right: 20px;
}
</style>
