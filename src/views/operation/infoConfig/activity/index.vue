<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="活动消息标题:">
            <el-input
              v-model="queryData.noticeTitle"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="发送对象:">
            <el-select
              v-model="queryData.sendObj"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="会员" value="1"></el-option>
              <el-option label="终端" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.createdBy"
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
              @click="Add"
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
            prop="noticeTitle"
            align="center"
            label="活动消息标题"
          ></el-table-column>
          <el-table-column align="center" label="活动消息内容" prop="noticeContent">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.noticeContent" placement="top">
                <p>{{ scope.row.noticeContent }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="sendObj" align="center" label="发送对象">
            <template slot-scope="scope">
              <span>
                {{ scope.row.sendObj === 1 ? "会员" : "终端" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发送对象详情" prop="sendObj">
            <template slot-scope="scope">
              <div v-if="scope.row.sendObj === 1">
                {{ scope.row.objDetail }}
              </div>
              <div
                v-else-if="scope.row.sendObj === 2 && scope.row.deviceType.length === 0"
              >
                <span v-for="(item, index) in loginDeviceType" :key="index">
                  {{ item.description + "，" }}
                </span>
              </div>
              <div v-else>
                <p v-for="(item, index) in scope.row.deviceType" :key="index">
                  <span v-for="(obj, index) in loginDeviceType" :key="index">
                    {{ item === obj.code ? obj.description + "，" : "" }}
                  </span>
                </p>
              </div>
              <div v-if="scope.row.userType === 0 && scope.row.sendObj === 1">全部</div>
              <div
                v-if="scope.row.userType === 1"
                class="decoration"
                @click="lookGame(scope.row)"
              >
                点击查看更多会员
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" align="center" label="创建人">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="创建时间"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.retract === 1"
                type="primary"
                size="medium"
                @click="withdraw(scope.row)"
              >
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
            prop="noticeTitle"
            :rules="[
              { required: true, message: '请输入公告标题', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.noticeTitle"
              placeholder="请输入"
              maxlength="20"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动消息内容:"
            class="tagheight"
            prop="noticeContent"
            :rules="[
              { required: true, message: '请输入公告内容', trigger: 'blur' },
              { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.noticeContent"
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
            prop="sendObj"
            :show-message="true"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.sendObj"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
              @change="sendObj"
            >
              <el-option label="会员" value="1"></el-option>
              <el-option label="终端" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="dialogForm.sendObj === '1'"
            label="会员类型:"
            class="tagheight"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.userType"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="特定会员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="dialogForm.sendObj === '2'"
            label="发送终端:"
            class="tagheight"
            :rules="[
              {
                required: true,
                message: '请选择发送终端',
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
            v-if="dialogForm.sendObj === '1' && dialogForm.userType === '1'"
            label="会员账号:"
            class="tagheight"
            prop="objDetail"
            :rules="[
              { required: true, message: '请输入会员账号', trigger: 'blur' },
              { min: 1, message: '请输入会员账号', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.objDetail"
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
          border
          class="small-size-table"
          :data="userList"
          style="width: 100%; margin-bottom: 15px"
          :header-cell-style="getRowClass"
        >
          <el-table-column type="index" align="center" label="序号"> </el-table-column>
          <el-table-column
            prop="userName"
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
      queryData: {},
      dialogFormVisible: false,
      dialogForm: { sendObj: '1', deviceType: [], userType: '0' },
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
        type: 2,
        ...this.getParams(this.queryData)
      }
      this.loading = true
      this.$api
        .getOperateObConfigNoticeSelectAll(params)
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
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    Add() {
      this.dialogForm = { sendObj: '1', deviceType: [], userType: '0' }
      this.dialogFormVisible = true
    },
    sendObj(val) {
      if (val === '1') {
        this.dialogForm = { sendObj: '1', deviceType: [], userType: '0' }
      } else {
        this.dialogForm = { sendObj: '2', deviceType: [], userType: '0' }
      }
      console.log(val)
    },
    subAddOrEidt() {
      const params = {
        type: 2,
        ...this.dialogForm
      }
      console.log(params)
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          this.$api.getOperateConfigNoticeSave(params).then((res) => {
            if (res.code === 200) {
              this.$message.success('保存成功')
              this.dialogFormVisible = false
              this.loadData()
            }
          })
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
        .then(() => {
          const params = {}
          params.noticeTitle = row.noticeTitle
          params.retract = 1
          params.type = 2
          params.id = row.id
          this.$api.getOperateConfigNoticeRetract(params).then((res) => {
            if (res.code === 200) {
              this.$message.success('成功撤回！')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },
    clear() {
      this.dialogForm = { sendObj: '1', deviceType: [], userType: '0' }
    },
    // 弹框标签添加人数
    getOperateConfigNoticeSelectDetail(val) {
      const params = {}
      params.noticeId = val
      params.configType = 2
      params.pageNum = this.page
      params.pageSize = this.size
      this.$api.getOperateConfigNoticeSelectDetail(params).then((res) => {
        if (res.code === 200) {
          this.userList = res.data.records
          this.lookVisible = true
        }
      })
    },
    lookGame(val) {
      this.id = val.id
      this.lookVisible = true
      this.getOperateConfigNoticeSelectDetail(val.id)
    },
    handleCurrentChangeDialog(val) {
      console.log(111, val)
      this.page = val
      this.getOperateConfigNoticeSelectDetail(this.id)
    },
    handleSizeChangeDialog(val) {
      console.log(222, val)
      this.size = val
      this.getOperateConfigNoticeSelectDetail(this.id)
    },
    changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
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
  border: 1px solid #dddddd;
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
