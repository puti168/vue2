<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="标签名称:">
            <el-input
              v-model="queryData.memberLabelName"
              maxlength="10"
              clearable
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.createdBy"
              clearable
              maxlength="10"
              size="medium"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入"
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
            <el-button
              type="warning"
              icon="el-icon-folder"
              :disabled="loading"
              size="medium"
              @click="addLabel"
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
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            prop="memberLabelName"
            align="center"
            label="标签名称"
          ></el-table-column>
          <el-table-column prop="description" align="center" label="标签描述">
            <template slot-scope="scope">
              <span v-if="scope.row.description !== ''">{{ scope.row.description }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="peopleNum" align="center" label="标签人数">
            <template slot-scope="scope">
              <span v-if="scope.row.peopleNum === null">-</span>
              <div v-else class="blueColor decoration" @click="lookGame(scope.row)">
                {{ scope.row.peopleNum }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdBy"
            align="center"
            label="创建人"
          ></el-table-column>
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
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="edit(scope.row)"
              >
                编辑信息
              </el-button>

              <el-button
                type="warning"
                icon="el-icon-delete"
                size="medium"
                @click="deleteLabel(scope.row)"
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
      <el-dialog
        title="新增/编辑"
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
        width="480px"
        center
        class="rempadding"
        @close="clear"
      >
        <el-divider></el-divider>
        <el-form ref="formSub" :model="dialogForm" label-width="90px">
          <el-form-item
            label="标签名称:"
            prop="memberLabelName"
            :rules="[
              { required: true, message: '请输入2-10个字符', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.memberLabelName"
              placeholder="请输入2-10个字符"
              maxlength="10"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标签描述:"
            prop="description"
            :rules="[
              { required: true, message: '请输入描述内容', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.description"
              placeholder="请输入 提交时至少2个字符"
              maxlength="50"
              type="textarea"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="subAddOrEidt">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="标签添加人数"
        :visible.sync="dialogGameVisible"
        :destroy-on-close="true"
        width="480px"
        class="rempadding"
      >
        <el-divider></el-divider>
        <div class="contentBox disableColor">标签名称：{{ labelName }}</div>
        <el-table
          v-loading="loading"
          size="mini"
          class="small-size-table"
          :data="gameList"
          style="width: 100%; margin: 15px 0"
          :header-cell-style="getRowClass"
        >
          <el-table-column prop="userName" align="center" label="会员账号">
            <template slot-scope="scope">
              <Copy v-if="!!scope.row.userName" :title="scope.row.userName" :copy="copy">
                {{ scope.row.userName }}
              </Copy>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="账号类型"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="page"
          background
          class="fenye"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="size"
          :page-sizes="[5, 10, 15]"
          :total="summary"
          @current-change="handleCurrentChangeDialog"
          @size-change="handleSizeChangeDialog"
        ></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.memberLabelConfig,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {},
      gameList: [],
      dialogGameVisible: false,
      title: '',
      labelName: '',
      id: '',
      page: 1,
      size: 5,
      summary: 0
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
        .getMemberPageLabel(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 弹框标签添加人数
    getMemberMemberInfoByLabelId(val) {
      const params = {}
      params.id = val
      params.pageNum = this.page
      params.pageSize = this.size
      this.$api.getMemberMemberInfoByLabelId(params).then((res) => {
        if (res.code === 200) {
          this.gameList = res.data.record
          this.dialogGameVisible = true
        }
      })
    },
    lookGame(val) {
      this.labelName = val.memberLabelName
      this.summary = val.peopleNum * 1
      this.id = val.id
      this.getMemberMemberInfoByLabelId(val.id)
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    addLabel() {
      this.title = '新增'
      this.dialogForm = {}
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '编辑'
      this.dialogForm = { ...val }
      this.dialogFormVisible = true
    },
    deleteLabel(val) {
      this.$confirm(
        `<strong>是否删除该条配置?</strong>
        </br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
        `确认提示`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api.setMemberDeleteLabel({ id: val.id }).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },
    subAddOrEidt() {
      console.log(this.title)
      const data = {}
      data.description = this.dialogForm.description
      data.memberLabelName = this.dialogForm.memberLabelName
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            console.log('新增')

            this.$api.setMemberAddOrEditMemberLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                this.pageNum = 1
                this.loadData()
              }
              this.dialogFormVisible = false
            })
          } else {
            data.id = this.dialogForm.id
            this.$api.setMemberAddOrEditMemberLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.loadData()
              }
              this.dialogFormVisible = false
            })
          }
        }
      })
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
      }
      if (prop === 'updatedAt') {
        prop = 2
      }
      this.pageNum = 1
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderKey
        delete this.queryData.orderType
      }
      this.loadData()
    },
    clear() {
      this.$refs.formSub.resetFields()
    },
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.page = val
      this.getMemberMemberInfoByLabelId(this.id)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.size = val
      this.getMemberMemberInfoByLabelId(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  color: #909399;
  font-weight: 700;
}
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
}
/deep/ .rempadding .el-dialog__body {
  padding: 0;
  padding-bottom: 30px;

  .contentBox,
  form {
    padding: 0 20px;
  }
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number--medium .el-input__inner {
  padding: 0 15px;
  text-align: left;
}

.decoration {
  text-decoration: underline;
  cursor: pointer;
}
.fenye {
  text-align: center;
}
</style>
