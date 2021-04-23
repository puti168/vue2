<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">角色管理</h2>
      <div class="head flex-h-end">
        <el-button
          type="primary"
          icon="el-icon-search"
          :disabled="loading"
          size="medium"
          @click="query"
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
          <el-form-item label="角色名称">
            <el-input
              v-model="queryData.roleName"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入角色名称"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色ID">
            <el-input
              v-model="queryData.id"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入角色ID"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input
              v-model="queryData.createBy"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入创建人"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="编辑人">
            <el-input
              v-model="queryData.updatedBy"
              clearable
              size="medium"
              style="width: 280px"
              placeholder="请输入编辑人"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色状态">
            <el-select
              v-model="queryData.status"
              style="width: 280px"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
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
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column
            prop="roleName"
            align="center"
            label="角色名称"
          ></el-table-column>
          <el-table-column prop="id" align="center" label="角色ID"></el-table-column>
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
          <el-table-column
            prop="createBy"
            align="center"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="updatedBy"
            align="center"
            label="编辑人"
          ></el-table-column>
          <el-table-column prop="status" align="center" label="角色状态">
            <template slot-scope="scope">
              <span v-show="scope.row.status === '1'" class="blueColor">启用</span>
              <span v-show="scope.row.status === '2'" class="redColor"> 禁用</span>
              <el-switch
                style="margin-left: 10px"
                :value="scope.row.status === '1'"
                @change="handSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="角色描述"
          ></el-table-column>

          <el-table-column align="center" label="操作" width="160px">
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
        <el-dialog
          :title="moduleBox"
          center
          width="835px"
          :visible.sync="editVisible"
          :before-close="closeFormDialog"
        >
          <editForm
            v-if="moduleBox == '新增角色'"
            ref="addForm"
            :control="control"
          ></editForm>
          <editForm
            v-else
            ref="editForm"
            :control="!control"
            :editFormData="editFormData"
          ></editForm>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button
v-if="moduleBox == '新增角色'"
type="primary"
@click="submitAdd"
>确 定</el-button>
            <el-button v-else type="primary" @click="submitEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import editForm from './components/editForm'
import { getRolePermission, getRoleListPage } from '@/api/roleController'
//  setDeleteRole,
// setSaveRoleInfo,
// setUpdateRoleInfo,
// setUpdateRoleStatus
export default {
  name: '',
  components: {
    editForm
  },
  mixins: [list],
  data() {
    return {
      queryData: {
        status: '',
        systemType: ''
      },
      formTime: {
        time: []
      },
      dataList: [],
      moduleBox: '',
      showForm: '',
      editVisible: false,
      control: false,
      editFormData: {}
    }
  },
  computed: {},
  mounted() {
    // for (let i = 0; i < 10; i++) {
    //   this.dataList[i] = {
    //     roleName: "darcy",
    //     id: "165416416464654",
    //     systemType: "超级管理",
    //     agentCode: "666666",
    //     createBy: "darcy",
    //     updatedBy: "darcy",
    //     createDt: "2021-02-13 20:28:54",
    //     updateDt: "2021-02-13 20:28:54",
    //     status: "1",
    //     remark: "这是备注信息",
    //   };
    // }
    this.initRolePermission()
  },
  methods: {
    initRolePermission() {
      getRolePermission({}).then((res) => {
        console.log('permission', res)
      })
    },
    loadData(params) {
      params = {
        ...this.getParams(params)
      }
      getRoleListPage(params).then((res) => {
        console.log('res:', res)
        if (res.code === 200) {
          this.loading = false
          this.dataList = res.data.records
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
      const create = this.formTime.time || []
      const [startTime, endTime] = create
      const params = {
        ...this.queryData,
        pageNum: 1,
        startTime: startTime && startTime + '',
        endTime: endTime && endTime + ''
      }
      console.log(params)
      this.loadData(params)
    },
    reset() {
      this.queryData = {}
      this.formTime.time = []
      // this.loadData()
    },

    add() {
      this.moduleBox = '新增角色'
      this.editVisible = true
    },
    submitAdd() {
      console.log(this.$refs.addForm.editData)
      //   setSaveRoleInfo(this.queryData).then((res) => {
      //     console.log(res);
      //   });
    },
    deleteUp(val) {
      console.log(val)
      this.$confirm('确定删除此角色吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // setDeleteRole(val).then((res) => {
          //   console.log(res);
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editUp(val) {
      this.moduleBox = '修改角色'
      this.editVisible = true
      this.editFormData = val
    },
    submitEdit() {
      console.log(this.$refs.editForm.editData)
      // setUpdateRoleInfo().then((res) => {
      //   console.log(res);
      // });
    },
    handleCurrentChange() {
      this.loadData()
    },
    closeFormDialog() {
      this.editVisible = false
    },
    handSwitch(val) {
      console.log(val)
      const isSwitch = val.status
      let text = ''
      if (isSwitch === '1') {
        text = '禁用'
      } else {
        text = '启用'
      }
      this.$confirm(`确定${text}此角色吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: `${text}成功!`
          })
          // setUpdateRoleStatus(val).then((res) => {
          //   console.log(res);
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: `已取消${text}`
          })
        })
    },
    enterSubmit() {
      this.query()
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
