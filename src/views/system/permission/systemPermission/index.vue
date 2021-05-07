<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="角色名称:">
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
          <el-form-item label="创建人:">
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
          <el-form-item label="编辑人:">
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
          <el-form-item label="角色状态:">
            <el-select
              v-model="queryData.status"
              style="width: 280px"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:">
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
              :default-time="defaultTime"
              style="width: 280px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left: 30px">
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
            <el-button
              type="success"
              icon="el-icon-folder-add"
              size="medium"
              @click="add"
            >
              新增
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
              <span
                v-show="scope.row.status === '0' && scope.row.id !== '1'"
                class="blueColor"
                >启用</span>
              <span
                v-show="scope.row.status === '1' && scope.row.id !== '1'"
                class="redColor"
                >停用</span>
              <el-switch
                v-if="scope.row.id !== '1'"
                style="margin-left: 10px"
                :value="scope.row.status === '0'"
                @change="handSwitch(scope.row)"
              >
              </el-switch>
              <span v-else>—</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="角色描述"
          ></el-table-column>

          <el-table-column align="center" label="操作" width="160px">
            <template slot-scope="scope">
              <div v-if="scope.row.id !== '1'">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="medium"
                  @click="deleteUp(scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="medium"
                  @click.stop="editUp(scope.row)"
                >
                  编辑
                </el-button>
              </div>
              <div v-else>—</div>
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
        <el-dialog
          v-if="editVisible"
          :title="moduleBox"
          center
          width="835px"
          :visible.sync="editVisible"
          :before-close="closeFormDialog"
        >
          <editForm
            v-if="moduleBox === '新增'"
            ref="addForm"
            :control="control"
            :treeData="treeData"
            :maxLength="maxLength"
            :checkedKeys="checkedKeys"
          ></editForm>
          <editForm
            v-else
            ref="editForm"
            :control="!control"
            :treeData="treeData"
            :maxLength="maxLength"
            :checkedKeys="checkedKeys"
            :editFormData="editFormData"
          ></editForm>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button
v-if="moduleBox === '新增'"
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
import dayjs from 'dayjs'
import editForm from './components/editForm'
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
      editFormData: {},
      treeData: [],
      checkedKeys: [],
      maxLength: 0,
      parentId: [],
      ChildId: []
    }
  },
  computed: {},
  mounted() {
    this.initRolePermissions()
  },
  methods: {
    initRolePermissions() {
      this.$api.getRolePermissions({}).then((res) => {
        if (res.code === 200) {
          this.treeData = res.data
          this.getMenuIdsArr(res.data)
        }
      })
    },
    loadData() {
      this.loading = true
      const create = this.formTime.time || []
      const [startTime, endTime] = create
      console.log(11111111, startTime && startTime + '')
      let params = {
        ...this.queryData,
        pageNum: this.pageNum,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getRoleListPage(params)
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
    query() {
      this.pageNum = 1
      this.loadData()
    },
    reset() {
      this.queryData = {}
      this.formTime.time = []
      this.loadData()
    },
    getMenuIdsArr(list) {
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        if (ele.id) {
          this.maxLength = this.maxLength + 1
        }
        if (ele.children && ele.children.length > 0) {
          this.getMenuIdsArr(ele.children)
        }
      }
      return this.maxLength
    },
    add() {
      this.moduleBox = '新增'
      this.editVisible = true
      this.checkedKeys = []
    },
    submitAdd() {
      this.$refs.addForm.submitForm(() => {
        this.editVisible = false
        this.loadData()
      })
    },
    deleteUp(val) {
      this.$confirm('确定删除此角色吗?', {
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
            .setDeleteRole('', val.id)
            .then((res) => {
              loading.close()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.loadData()
            })
            .catch(() => {
              loading.close()
            })
        })
        .catch(() => {})
    },
    getParentId(list) {
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        if (ele.children === null) {
          this.ChildId.push(ele.id)
        }
        if (ele.children && ele.children.length > 0) {
          this.getParentId(ele.children)
        }
      }
      return this.ChildId
    },
    setMenuIdsArr(list) {
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        if (ele.isExist === '1') {
          this.parentId.push(ele.id)
        }
        if (ele.children && ele.children.length > 0) {
          this.getMenuIdsArr(ele.children)
        }
      }
      return this.parentId
    },
    testFn(arr) {
      const tmp = []
      arr.sort().sort(function (a, b) {
        if (a === b && tmp.indexOf(a) === -1) {
          tmp.push(a)
        }
      })
      this.checkedKeys = tmp
    },
    editUp(val) {
      this.moduleBox = '修改角色'
      this.editFormData = val
      this.ChildId = []
      this.parentId = []
      this.checkedKeys = []
      this.getParentId(this.treeData)
      this.$api.getRoleDetailInfo({ id: val.id }).then((res) => {
        this.setMenuIdsArr(res.data.rolePermission)
        const arr = this.parentId.concat(this.ChildId)
        this.testFn(arr)
        this.editVisible = true
      })
    },
    submitEdit() {
      this.$refs.editForm.submitForm(() => {
        this.editVisible = false
        this.loadData()
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadData()
    },
    closeFormDialog() {
      this.editVisible = false
    },
    handSwitch(val) {
      const isSwitch = val.status
      let text = ''
      let status = ''
      if (isSwitch === '0') {
        text = '停用'
        status = 1
      } else {
        status = 0
        text = '启用'
      }
      this.$confirm(`确定${text}此角色吗?`, {
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
            .setUpdateRoleStatus({ status, id: val.id })
            .then((res) => {
              this.loadData()
              loading.close()
              this.$message({
                type: 'success',
                message: `${text}成功!`
              })
            })
            .catch(() => {
              loading.close()
            })
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
