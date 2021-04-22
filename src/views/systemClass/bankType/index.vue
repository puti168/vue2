<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">门票记录</h2>
      <div class="head flex-h-end">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="query">
          查询
        </el-button>
        <el-button icon="el-icon-refresh-left" size="medium" @click="reset">
          重置
        </el-button>
        <el-button type="primary" icon="el-icon-folder-add" size="medium" @click="add">
          新增
        </el-button>
      </div>
    </div>
    <div class="view-container dealer-container">
      <div class="params">
        <query-form ref="queryForm"></query-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="dataList"
          style="width: 100%"
          :header-cell-style="getRowClass"
        >
          <el-table-column
            prop="bankCode"
            align="center"
            label="银行卡号"
          ></el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="银行名称"
          ></el-table-column>
          <el-table-column
            prop="createDt"
            align="center"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="更新时间"
          ></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="deleteUp(scope.row)"
              >
                删除
              </el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="medium"
                @click="editUp(scope.row)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-show="dataList.length > 0"
          :current-page.sync="pageNum"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="$store.getters.pageSizes"
          :total="15"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
        <el-dialog title="修改银行信息" center :visible.sync="editVisible" width="410px">
          <editForm ref="editForm" :editFormData="editFormData"></editForm>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import queryForm from './components/queryForm'
import editForm from './components/editForm'
import {
  getQueryBank,
  setAddBank,
  setDeleteBank,
  setEidteBank
} from '@/api/bankController'
export default {
  name: '',
  components: {
    queryForm,
    editForm
  },
  mixins: [list],
  data() {
    return {
      dataList: [],
      editVisible: false,
      editFormData: {}
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        bankCode: '165416416464654',
        bankName: '中国银行',
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54'
      }
    }
  },
  methods: {
    loadData(params) {
      params = {
        ...this.getParams(params)
      }
      getQueryBank(params).then((res) => {
        console.log('res:', res)
        if (res.code === 200) {
          this.loading = false
          this.dataList = res.data
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    query() {
      this.loading = true
      const queryData = this.$refs.queryForm.queryData
      const formTime = this.$refs.queryForm.formTime
      const create = formTime.time || []
      const [startTime, endTime] = create
      const params = {
        ...queryData,
        pageNum: 1,
        startTime: startTime && startTime + '',
        endTime: endTime && endTime + ''
      }
      this.loadData(params)
    },
    reset() {
      this.$refs.queryForm.queryData = {}
      this.$refs.queryForm.formTime.time = []
      // this.loadData()
    },

    add() {
      const queryData = this.$refs.queryForm.queryData
      setAddBank(queryData).then((res) => {
        console.log(res)
      })
    },
    deleteUp(val) {
      console.log(val)
      this.$confirm('确定删除此账号吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
            setDeleteBank(val).then((res) => {
              console.log(res)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editUp(val) {
      this.editVisible = true
      this.editFormData = val
      console.log(val)
    },
    submitEdit() {
      setEidteBank().then((res) => {
        console.log(res)
      })
    },
    handleCurrentChange() {
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
