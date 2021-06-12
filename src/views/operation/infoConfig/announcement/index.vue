<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="公告标题:">
            <el-input
              v-model="queryData.gameId"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="标识:">
            <el-select
              v-model="queryData.gameStatusList"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="重要" value="0"></el-option>
              <el-option label="无" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送终端:">
            <el-select
              v-model="queryData.aaaaa"
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
              v-model="queryData.gameStatusList"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="限时" value="0"></el-option>
              <el-option label="永久" value="1"></el-option>
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
              v-model="queryData.gameName"
              clearable
              :maxlength="15"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.gameName"
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
            label="公告标题"
          ></el-table-column>
          <el-table-column align="center" label="公告内容"> </el-table-column>
          <el-table-column prop="gameName" align="center" label="标识"></el-table-column>
          <el-table-column align="center" label="发送终端"> </el-table-column>
          <el-table-column align="center" label="公告时效"> </el-table-column>
          <el-table-column align="center" label="公告上架时间" sortable="custom">
          </el-table-column>
          <el-table-column align="center" label="公告下架时间" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="状态"
          ></el-table-column>
          <el-table-column prop="relationOtherGameId" align="center" label="创建人">
          </el-table-column>
          <el-table-column
            prop="relationGameModuleId"
            align="center"
            label="创建时间"
            sortable="custom"
          >
          </el-table-column>
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
                :disabled="loading"
                type="danger"
                size="medium"
                class="noicon"
                @click="changeStatus(scope.row)"
              >
                禁用
              </el-button>
              <el-button
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
                @click="openEdit(scope.row)"
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
            label="公告内容:"
            class="tagheight"
            prop="description"
            :rules="[
              { required: true, message: '请输入公告内容', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.description"
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
            >
              <el-option label="重要" value="0"></el-option>
              <el-option label="无" value="1"></el-option>
            </el-select>
            <span class="el-form-item__error">
              *标识为重要时，前端公告栏该公告展示前方会显示”重要“两字
            </span>
          </el-form-item>
          <el-form-item
            label="发送终端:"
            class="tagheight"
            prop="loginDeviceType"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-select
              v-model="dialogForm.loginDeviceType"
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
            prop="timeTab"
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
              <el-option label="限时" value="0"></el-option>
              <el-option label="永久" value="1"></el-option>
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
            v-if="dialogForm.timeTab === '0'"
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
      queryData: { aaaaa: [] },
      dialogFormVisible: false,
      dialogForm: { logo: '0', loginDeviceType: '2', timeTab: '0' },
      onlineTime: Date.now(),
      offlineTime: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {},
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
    subAddOrEidt() {
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.dialogForm.timeTab === '0' && this.onlineTime < this.offlineTime) {
            console.log(this.dialogForm, '00000')
            this.errTime = false
          } else if (this.dialogForm.timeTab === '1') {
            this.errTime = false
            console.log(this.dialogForm, '11111')
          } else {
            this.errTime = true
          }
        }
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
    clear() {
      this.$refs.formSub.resetFields()
      this.onlineTime = Date.now()
      this.offlineTime = endTime
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
    openEdit(row) {
      this.dialogFormVisible = true
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
        .then(() => {})
        .catch(() => {})
    },
    changeStatus(id, type) {
      this.$confirm(
        `<strong>是否对该配置进行${
          Number(type) === 0 ? '禁用' : '开启'
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
            .editGameStatus({
              id: id,
              gameStatus: type
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
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    enterSubmit() {
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
