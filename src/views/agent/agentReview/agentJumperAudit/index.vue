<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">三方支付白名单</h2>
      <div class="head flex-h-end">
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
        <el-button type="primary" icon="el-icon-folder-add" size="medium" @click="add">
          新增
        </el-button>
      </div>
    </div>
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData" label-width="100px">
          <el-form-item label="渠道编号">
            <el-input
              v-model="queryData.channelId"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入渠道编号"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input
              v-model="queryData.ip"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入IP地址"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formTime.time"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              value-format="timestamp"
              style="width: 280px"
            ></el-date-picker>
          </el-form-item>
        </el-form>
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
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="ip" align="center" label="Ip地址"></el-table-column>
          <el-table-column
            prop="createdDt"
            align="center"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            prop="updateDt"
            align="center"
            label="更新时间"
          ></el-table-column>
          <el-table-column
            prop="operator"
            align="center"
            label="操作人"
          ></el-table-column>
          <el-table-column prop="status" align="center" label="IP状态">
            <template slot-scope="scope">
              <span v-show="scope.row.status === 0" class="redColor">关闭</span>
              <span v-show="scope.row.status === 1" class="blueColor">开启</span>
              <el-switch
                style="margin-left: 10px"
                :value="scope.row.status === 1"
                @change="handSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="remark" align="center" label="备注"></el-table-column>

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
                @click.stop="editUp(scope.row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
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
    <el-dialog
      :title="title"
      center
      :visible.sync="editVisible"
      :before-close="closeFormDialog"
      width="835px"
    >
      <editForm
        ref="editForm"
        :type="title"
        :editFormData="editFormData"
        @refresh="search"
      ></editForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button @click="submit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/mixins/list'
import editForm from './components/editForm'
export default {
  name: '',
  components: {
    editForm
  },
  mixins: [list],
  data() {
    return {
      queryData: {},
      formTime: {
        time: []
      },
      dataList: [],
      title: '',
      showForm: '',
      editVisible: false,
      editFormData: {}
    }
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const [startTime, endTime] = this.formTime.time || []
      let params = {
        ...this.queryData,
        pageNum: this.pageNum,
        startTime: startTime && startTime + '',
        endTime: endTime && endTime + ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .thirdPayWhiteList(params)
        .then((res) => {
          if (res.code === 200) {
            console.log(111111111111)
            this.loading = false
            this.dataList = res.data
            // this.total = response.total;
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
    search() {
      this.pageNum = 1
      this.loadData()
    },
    reset() {
      this.queryData = {}
      this.formTime.time = []
      this.loadData()
    },

    add() {
      this.title = '新增'
      this.editVisible = true
      this.editFormData = {}
    },
    deleteUp(val) {
      this.$confirm('确定删除此IP吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$api
            .thirdPayWhiteDelete({
              id: val.id
            })
            .then(() => {
              loading.close()
              this.search()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              loading.close()
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
      this.title = '编辑'
      this.editVisible = true
      this.editFormData = val
      console.log(val)
    },
    submit() {
      this.$refs.editForm.submit(() => {
        this.editVisible = false
      })
    },
    handleCurrentChange() {
      this.loadData()
    },
    closeFormDialog() {
      this.editVisible = false
    },
    handSwitch(val) {
      console.log(val)
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
