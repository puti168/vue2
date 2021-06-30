<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="公告标题:">
            <el-input
              v-model="queryData.announcementTitle"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="标识:">
            <el-select
              v-model="queryData.tag"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="重要" :value="1"></el-option>
              <el-option label="无" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送终端:">
            <el-select
              v-model="queryData.terminal"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
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
          <el-form-item label="公告时效:">
            <el-select
              v-model="queryData.announcementAging"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="限时" :value="1"></el-option>
              <el-option label="永久" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select
              v-model="queryData.status"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in blackStatusType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
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
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.updateBy"
              clearable
              :maxlength="15"
              size="medium"
              style="margin-right: 20px"
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
              @click="Add('新增')"
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
            prop="announcementTitle"
            align="center"
            width="200px"
            label="公告标题"
          ></el-table-column>
          <el-table-column
            align="center"
            label="公告内容"
            width="200px"
            prop="announcementContent"
          >
          </el-table-column>
          <el-table-column prop="tag" align="center" label="标识">
            <template slot-scope="scope">
              {{ scope.row.tag === 0 ? "无" : "重要" }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="发送终端" width="120px" prop="terminal">
            <template slot-scope="scope">
              <div v-if="scope.row.terminal.length === 0">
                <span v-for="(item, index) in loginDeviceType" :key="index">
                  {{ item.description + "，" }}
                </span>
              </div>
              <div v-else>
                <p v-for="(item, index) in scope.row.terminal" :key="index">
                  <span v-for="(obj, index) in loginDeviceType" :key="index">
                    {{ item === obj.code ? obj.description + "，" : "" }}
                  </span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="公告时效" prop="announcementAging">
            <template slot-scope="scope">
              {{ scope.row.announcementAging === 1 ? "限时" : "永久" }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="公告上架时间"
            prop="upTime"
            width="155px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="公告下架时间"
            prop="downTime"
            width="155px"
            sortable="custom"
          >
            <template slot-scope="scope">
              {{ scope.row.announcementAging === 1 ? scope.row.downTime : "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" width="90px" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1" class="normalRgba">{{
                typeFilter(scope.row.status, "blackStatusType")
              }}</span>
              <span v-else class="disableRgba">{{
                typeFilter(scope.row.status, "blackStatusType")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" align="center" label="创建人">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="创建时间"
            width="155px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="updatedBy"
            align="center"
            label="最近操作人"
            width="120px"
          >
            <template slot-scope="scope">
              {{ scope.row.updatedBy ? scope.row.updatedBy : "-" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="最近操作时间"
            width="155px"
            sortable="custom"
          >
            <template slot-scope="scope">
              {{ scope.row.updatedAt ? scope.row.updatedAt : "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="operating" align="center" width="240px" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1"
                :disabled="loading"
                type="danger"
                size="medium"
                class="noicon"
                @click="changeStatus(scope.row)"
              >
                禁用
              </el-button>
              <el-button
                v-else
                :disabled="loading"
                type="success"
                size="medium"
                class="noicon"
                @click="changeStatus(scope.row)"
              >
                开启
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="openEdit('编辑', scope.row)"
              >
                编辑信息
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="deleteBtn(scope.row)"
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
        width="738px"
        center
        class="rempadding"
        @close="clear"
      >
        <el-form ref="formSub" :inline="true" :model="dialogForm" label-width="140px">
          <el-form-item
            label="公告标题:"
            class="tagheight"
            prop="announcementTitle"
            :rules="[
              { required: true, message: '请输入公告标题', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.announcementTitle"
              placeholder="请输入"
              maxlength="20"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="公告内容:"
            class="tagheight"
            prop="announcementContent"
            :rules="[
              { required: true, message: '请输入公告内容', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.announcementContent"
              placeholder="请输入 提交时不能为空"
              maxlength="50"
              clearable
              type="textarea"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标识:"
            class="tagheight"
            prop="tag"
            :show-message="true"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.tag"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="重要" :value="1"></el-option>
              <el-option label="无" :value="0"></el-option>
            </el-select>
            <span class="el-form-item__error">
              *标识为重要时，前端公告栏该公告展示前方会显示”重要“两字
            </span>
          </el-form-item>
          <el-form-item
            label="发送终端:"
            class="tagheight"
            :rules="[{ required: true, message: '请选择终端', trigger: 'change' }]"
          >
            <el-select
              v-model="dialogForm.terminal"
              multiple
              placeholder="默认选择全部"
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
            label="公告时效:"
            class="tagheight"
            prop="announcementAging"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.announcementAging"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="限时" :value="1"></el-option>
              <el-option label="永久" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="公告上架时间:"
            label-width="112px"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-date-picker
              v-model="onlineTime"
              size="medium"
              format="yyyy-MM-dd HH:mm:ss"
              :picker-options="dateNow"
              type="datetime"
              align="right"
              :clearable="false"
              @change="changeTime"
            ></el-date-picker>
            <span v-show="errTime" class="el-form-item__error">
              公告上架时间不能大于公告下架时间
            </span>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.announcementAging === 1"
            label="公告下架时间:"
            label-width="112px"
            :rules="[{ required: true }]"
          >
            <el-date-picker
              v-model="offlineTime"
              size="medium"
              format="yyyy-MM-dd HH:mm:ss"
              :picker-options="dateEnd"
              type="datetime"
              align="right"
              :clearable="false"
            ></el-date-picker>
            <span v-show="errTime" class="el-form-item__error">
              公告下架时间不能小于公告上架时间
            </span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="subAddOrEidt">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()
export default {
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: { terminal: [] },
      dialogFormVisible: false,
      dialogForm: { tag: 1, terminal: ['2'], status: 0, announcementAging: 1 },
      onlineTime: Date.now(),
      offlineTime: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {},
      flag: '',
      errTime: false
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
  watch: {
    onlineTime: {
      handler(newV, oldV) {
        this.dateEnd = {
          disabledDate(time) {
            return time.getTime() < newV
          }
        }
      },
      deep: true
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
        .getOperateConfigAnnouncementSelectAll(params)
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
    changeTime(val) {
      const Timestamp = new Date(new Date(val).toLocaleDateString()).getTime()
      if (Timestamp === startTime) {
        this.onlineTime = Date.now()
      } else {
        this.onlineTime = Timestamp
      }
    },
    Add(val) {
      this.flag = val
      this.dialogForm = { tag: 1, terminal: ['2'], status: 0, announcementAging: 1 }
      this.dialogFormVisible = true
    },
    openEdit(val, row) {
      this.flag = val
      this.$api.getOperateConfigAnnouncementSelect({ id: row.id }).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.dialogForm = res.data
          if (res.data.terminal.length === 0) {
            for (let i = 0; i < this.loginDeviceType.length; i++) {
              const ele = this.loginDeviceType[i]
              this.dialogForm.terminal.push(ele.code)
            }
          }
          this.dialogFormVisible = true
        }
      })
    },
    subAddOrEidt() {
      const startTime =
        typeof this.onlineTime === 'number'
          ? this.onlineTime
          : new Date(new Date(this.onlineTime).toLocaleDateString()).getTime()
      const endTime =
        typeof this.offlineTime === 'number'
          ? this.offlineTime
          : new Date(new Date(this.offlineTime).toLocaleDateString()).getTime()
      console.log(startTime, endTime)
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.dialogForm.announcementAging === 1 && startTime < endTime) {
            this.errTime = false
            const params = {
              ...this.dialogForm,
              upTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
              downTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
            }
            console.log(params, '000')
            this.getOperateConfigAnnouncementSave(params)
          } else if (this.dialogForm.announcementAging === 2) {
            this.errTime = false
            const params = {
              ...this.dialogForm,
              downTime: '',
              upTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : ''
            }
            console.log(params, '111')
            this.getOperateConfigAnnouncementSave(params)
          } else {
            this.errTime = true
          }
        }
      })
    },
    getOperateConfigAnnouncementSave(val) {
      this.loading = true
      this.$api.getOperateConfigAnnouncementSave(val).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.$message({
            message: this.flag === '新增' ? '新增成功！' : '编辑成功！',
            type: 'success'
          })
          this.loadData()
        }
        this.dialogFormVisible = false
      })
    },
    clear() {
      this.$refs.formSub.resetFields()
      this.onlineTime = Date.now()
      this.offlineTime = endTime
    },
    deleteBtn(row) {
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
          this.$api.getOperateConfigAnnouncementDelete({ id: row.id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },
    changeStatus(row) {
      const id = row.id
      const status = row.status === 0 ? 1 : 0
      this.$confirm(
        `<strong>是否对该配置进行${
          status === 1 ? '启用' : '禁用'
        }操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api
            .getOperateConfigAnnouncementStatus({
              id: id,
              status: status
            })
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })
                this.loadData()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    changeTableSort({ column, prop, order }) {
      console.log(column, prop, order)
      if (prop === 'upTime') {
        prop = 1
      }
      if (prop === 'downTime') {
        prop = 2
      }
      if (prop === 'createdAt') {
        prop = 3
      }
      if (prop === 'updatedAt') {
        prop = 4
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
    reset() {
      this.queryData = { terminal: [] }
      this.pageNum = 1
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
}
/deep/ .tagheight {
  .el-form-item__content,
  .el-select {
    width: 480px;
  }
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
