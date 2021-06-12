<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="活动消息标题:">
            <el-input
              v-model="queryData.gameId"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="发送对象:">
            <el-select
              v-model="queryData.obj"
              clearable
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="会员" value="0"></el-option>
              <el-option label="终端" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.gameName"
              clearable
              :maxlength="15"
              size="medium"
              placeholder="请输入"
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
              @click="dialogFormVisible = true"
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
          :data="list"
          :header-cell-style="getRowClass"
          @sort-change="changeTableSort"
        >
          <el-table-column
            prop="gameId"
            align="center"
            label="活动消息标题"
          ></el-table-column>
          <el-table-column align="center" label="活动消息内容" prop="description">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.description" placement="top">
                <p>{{ scope.row.description }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="gameName"
            align="center"
            label="发送对象"
          ></el-table-column>
          <el-table-column align="center" label="发送对象详情" prop="description">
            <template slot-scope="scope">
              <div class="decoration" @click="lookGame(scope.row)">
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="relationOtherGameId" align="center" label="创建人">
          </el-table-column>
          <el-table-column
            prop="relationGameModuleId"
            align="center"
            label="创建时间"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="medium" @click="withdraw(scope.row)">
                撤回
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
        width="738px"
        center
        class="rempadding"
        @close="clear"
      >
        <el-form ref="formSub" :inline="true" :model="dialogForm" label-width="140px">
          <el-form-item
            label="活动消息标题:"
            class="tagheight"
            prop="memberLabelName"
            :rules="[
              { required: true, message: '请输入公告标题', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.memberLabelName"
              placeholder="请输入"
              maxlength="20"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动消息内容:"
            class="tagheight"
            prop="description"
            :rules="[
              { required: true, message: '请输入公告内容', trigger: 'blur' },
              { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.description"
              placeholder="请输入 提交时不能为空"
              maxlength="300"
              clearable
              type="textarea"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="发送对象:"
            class="tagheight"
            prop="logo"
            :show-message="true"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.logo"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
              @change="sendObj"
            >
              <el-option label="会员" value="0"></el-option>
              <el-option label="终端" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="dialogForm.logo === '0'"
            label="会员账号:"
            class="tagheight"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.timeTab"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="特定会员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="dialogForm.logo === '1'"
            label="发送终端:"
            class="tagheight"
            :rules="[
              {
                required: true,
                message: '',
              },
            ]"
          >
            <el-select
              v-model="dialogForm.deviceType"
              placeholder="默认选择全部"
              multiple
              clearable
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in loginDeviceType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.logo === '0' && dialogForm.timeTab === '1'"
            label="会员账号:"
            class="tagheight"
            prop="userNameList"
            :rules="[
              { required: true, message: '请输入会员账号', trigger: 'blur' },
              { min: 1, message: '请输入会员账号', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.userNameList"
              placeholder="请输入会员账号，会员账号之间用英文“,'隔开'"
              clearable
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
        title="查看"
        :visible.sync="lookVisible"
        :destroy-on-close="true"
        width="480px"
        class="rempadding"
      >
        <el-table
          v-loading="loading"
          size="mini"
          class="small-size-table"
          :data="userList"
          style="width: 100%; margin: 15px 0"
          :header-cell-style="getRowClass"
        >
          <el-table-column type="index" align="center" label="序号"> </el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="发送会员账号"
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
export default {
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: { obj: [] },
      dialogFormVisible: false,
      dialogForm: { logo: '0', deviceType: [], timeTab: '0' },
      lookVisible: false,
      userList: [],
      page: 1,
      size: 5,
      summary: 0
    }
  },
  computed: {
    blackStatusType() {
      return this.globalDics.blackStatusType
    },
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    }
  },
  created() {},
  methods: {
    loadData() {
      const params = {
        ...this.getParams(this.queryData)
      }
      this.loading = true
      this.$api
        .gameList(params)
        .then((res) => {
          if (res.code === 200) {
            const response = res.data
            this.loading = false
            this.list = response.record
            this.total = response.totalRecord
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

    reset() {
      this.queryData = { obj: [] }
      this.pageNum = 1
      this.loadData()
    },
    sendObj(val) {
      if (val === '1') {
        this.dialogForm = { logo: '1', deviceType: [], timeTab: '0' }
      } else {
        this.dialogForm = { logo: '0', deviceType: [], timeTab: '0' }
      }
      console.log(val)
    },
    subAddOrEidt() {
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          console.log(this.dialogForm)
        }
      })
    },
    withdraw(row) {
      this.$confirm(
        `<strong>是否对未读用户撤回该条消息?</strong></br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {})
        .catch(() => {})
    },
    clear() {
      this.dialogForm = { logo: '0', deviceType: [], timeTab: '0' }
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
          this.lookVisible = true
        }
      })
    },
    lookGame(val) {
      this.id = val.id
      this.lookVisible = true
      // this.getMemberMemberInfoByLabelId(val.id)
    },
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.page = val
      // this.getMemberMemberInfoByLabelId(this.id)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.size = val
      // this.getMemberMemberInfoByLabelId(this.id)
    },
    changeTableSort({ column, prop, order }) {
      this.pageNum = 1
      this.queryData.orderProperty = prop
      const orderParams = this.checkOrderParams.get(prop)
      if (orderParams) {
        if (order === 'ascending') {
          // 升序
          this.queryData.orderType = 'asc'
        } else if (column.order === 'descending') {
          // 降序
          this.queryData.orderType = 'desc'
        }
        this.loadData()
      }
    },

    enterSearch() {
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
/deep/ .tagheight {
  .el-form-item__content,
  .el-select {
    width: 480px;
  }
}
.decoration {
  // text-decoration: underline;
  cursor: pointer;
  color: #4b7902;
}
// /deep/ .rempadding .el-dialog__body {
//   padding: 0;
//   padding-bottom: 30px;
//   .contentBox,
//   form {
//     padding: 0 20px;
//   }
// }
</style>
