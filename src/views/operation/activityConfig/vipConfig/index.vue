<template>
  <div class="game-container report-container">
    <div v-if="!dialogFormVisible" class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="活动类型:">
            <el-select
              v-model="queryData.gameStatusList"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="赞助活动" value="0"></el-option>
              <el-option label="VIP活动" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动ID:">
            <el-input
              v-model="queryData.gameId"
              clearable
              :maxlength="10"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动名称:">
            <el-input
              v-model="queryData.gameId"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动主标题:">
            <el-input
              v-model="queryData.gameId"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>

          <el-form-item label="活动支持终端:">
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
          <el-form-item label="活动支持账户类型:">
            <el-select
              v-model="queryData.bbbbb"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in accountType"
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
            <el-button
              type="warning"
              icon="el-icon-sort"
              :disabled="loading"
              size="medium"
              style="padding: 0 10px"
              @click="sortVisible = true"
            >
              赞助活动排序
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
            label="活动类型"
          ></el-table-column>
          <el-table-column align="center" label="活动ID"> </el-table-column>
          <el-table-column
            prop="gameName"
            align="center"
            label="活动名称"
          ></el-table-column>
          <el-table-column align="center" label="活动主标题"> </el-table-column>
          <el-table-column align="center" label="活动支持终端"> </el-table-column>
          <el-table-column align="center" label="活动支持账户类型"> </el-table-column>
          <el-table-column align="center" label="活动时效"> </el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="活动图时间"
          ></el-table-column>
          <el-table-column prop="relationOtherGameId" align="center" label="状态">
          </el-table-column>
          <el-table-column prop="relationGameModuleId" align="center" label="入口图">
            <template slot-scope="scope">
              <span class="text-link" @click="lookImg(scope.row.relationGameModuleId)">
                点击预览
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="updatedBy" align="center" label="分享图">
            <template slot-scope="scope">
              <span class="text-link" @click="lookImg(scope.row.updatedBy)">
                点击预览
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="创建时间"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updatedAt"
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
    </div>
    <div v-else class="game-container report-container editPicturePage">
      <div class="editPicturePage-content">
        <div class="form-header">
          <span>创建/编辑</span>
          <span>
            <el-button type="info" @click="clear">取消</el-button>
            <el-button type="success" @click="subAddOrEidt">保存</el-button>
          </span>
        </div>
        <div class="content-part2">
          <el-form
            ref="formSub"
            class="agent-form"
            :inline="true"
            :model="dialogForm"
            label-width="154px"
          >
            <el-form-item
              label="活动类型:"
              class="tagheight"
              :rules="[{ required: true }]"
            >
              <el-select
                v-model="dialogForm.memberLabelName"
                clearable
                placeholder="默认选择全部"
                :popper-append-to-body="false"
              >
                <el-option label="赞助活动" value="0"></el-option>
                <el-option label="VIP活动" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动名称:"
              class="tagheight"
              prop="description"
              :rules="[
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dialogForm.description"
                placeholder="请输入"
                maxlength="20"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活动主标题:"
              class="tagheight"
              prop="description"
              :rules="[
                { required: true, message: '请输入活动主标题', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dialogForm.description"
                placeholder="请输入"
                maxlength="20"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活动支持终端:"
              class="tagheight"
              :rules="[
                {
                  required: true,
                  message: '请选择活动支持终端',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.loginDeviceType"
                placeholder="默认选择全部"
                multiple
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
              label="活动生效的账户类型:"
              class="tagheight"
              :rules="[
                {
                  required: true,
                  message: '请选择活动生效的账户类型',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.accountType"
                placeholder="默认选择全部"
                multiple
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in accountType"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动时效:"
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
                :picker-sortLabel="dateNow"
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
                :picker-sortLabel="dateEnd"
                type="datetime"
                align="right"
                :clearable="false"
              ></el-date-picker>
              <span v-show="errTime" class="el-form-item__error">
                公告下架时间不能小于公告上架时间
              </span>
            </el-form-item>
            <el-form-item
              label="入口图片上传:"
              prop="enterImg"
              style="width: 400px"
              :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
            >
              <UploadItem
                ref="imgUpload"
                :upload-file-type="'image'"
                :platform="'PC'"
                :img-urls="dialogForm.enterImg"
                @upoladItemSucess="handleUploadSucessEnter"
                @startUpoladItem="handleStartUploadEnter"
                @deleteUpoladItem="handleDeleteUploadEnter"
                @upoladItemDefeat="handleUploadDefeatEnter"
              ></UploadItem>
              <div class="remakeBox">
                <span class="danger">*</span>图片格式仅支持png，jpg <br />
                <span class="danger">*</span>图片大小不能超过2MB
              </div>
            </el-form-item>
            <el-form-item
              label="活动详情跳转地址:"
              class="tagheight"
              prop="description"
              :rules="[
                { required: true, message: '请输入活动详情跳转地址', trigger: 'blur' },
                {
                  min: 1,
                  max: 2038,
                  message: '长度在 1 到 2038 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="dialogForm.description"
                placeholder="请输入 "
                maxlength="2038"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="分享图片上传:"
              prop="shareImg"
              :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
            >
              <UploadItem
                ref="imgUpload"
                :upload-file-type="'image'"
                :platform="'PC'"
                :img-urls="dialogForm.shareImg"
                @upoladItemSucess="handleUploadSucessShare"
                @startUpoladItem="handleStartUploadShare"
                @deleteUpoladItem="handleDeleteUploadShare"
                @upoladItemDefeat="handleUploadDefeatShare"
              ></UploadItem>
              <div class="remakeBox">
                <span class="danger">*</span>图片格式仅支持png，jpg <br />
                <span class="danger">*</span>图片大小不能超过2MB
              </div>
            </el-form-item>
            <el-form-item
              label="分享链接:"
              class="tagheight"
              prop="description"
              :rules="[
                { required: true, message: '请输入活动详情跳转地址', trigger: 'blur' },
                {
                  min: 1,
                  max: 2038,
                  message: '长度在 1 到 2038 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="dialogForm.description"
                placeholder="请输入 "
                maxlength="2038"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="imgVisible" class="imgCenter" @click="closeImage">
      <img :src="bigImage" />
    </div>
    <el-dialog
      title="设置排序"
      :visible.sync="sortVisible"
      :destroy-on-close="true"
      center
      class="rempadding"
    >
      <el-table
        v-loading="loading"
        border
        size="mini"
        class="small-size-table"
        :data="sortList"
        :header-cell-style="getRowClass"
        @sort-change="changeTableSort"
      >
        <el-table-column align="center" prop="remake" width="90px"></el-table-column>
        <el-table-column align="center" prop="sortLabel" label="赞助活动区域排序">
          <template slot-scope="scope">
            <draggable
              v-model="scope.row.sortLabel"
              @start="startChange"
              @end="endChange"
            >
              <transition-group class="sortCss">
                <div
                  v-for="itme in scope.row.sortLabel"
                  :key="itme.value"
                  :class="{ open: itme.status === '1', close: itme.status === '2' }"
                >
                  {{ itme.label }}{{ itme.status === "1" ? "(启用中)" : "(已禁用)" }}
                </div>
              </transition-group>
            </draggable>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="sortVisible = false">取消</el-button>
        <el-button type="primary" @click="subSort">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import UploadItem from '@/components/UploadItem'
import draggable from 'vuedraggable'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()
export default {
  components: { UploadItem, draggable },
  mixins: [list],
  data() {
    return {
      queryData: { aaaaa: [], bbbbb: [] },
      dialogFormVisible: false,
      dialogForm: {
        memberLabelName: '0',
        loginDeviceType: '2',
        timeTab: '0',
        enterImg: null,
        shareImg: null,
        accountType: []
      },
      onlineTime: Date.now(),
      offlineTime: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {},
      errTime: false,
      bigImage: '',
      imgVisible: false,
      sortVisible: false,
      sortList: [
        {
          remake: '赞助活动',
          sortLabel: [
            { value: '1', status: '1', label: '获取新增的赞助活动一' },
            { value: '2', status: '1', label: '获取新增的赞助活动二' },
            { value: '3', status: '1', label: '获取新增的赞助活动三' },
            { value: '4', status: '2', label: '获取新增的赞助活动四' },
            { value: '5', status: '2', label: '获取新增的赞助活动五' },
            { value: '6', status: '2', label: '获取新增的赞助活动六' },
            { value: '7', status: '2', label: '获取新增的赞助活动七' },
            { value: '8', status: '2', label: '获取新增的赞助活动八' },
            { value: '9', status: '2', label: '获取新增的赞助活动九' },
            { value: '10', status: '2', label: '获取新增的赞助活动十' }
          ]
        }
      ]
    }
  },
  computed: {
    loginDeviceType() {
      return this.globalDics.loginDeviceType
    },
    accountType() {
      return this.globalDics.accountType
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
      this.dialogFormVisible = false
    },
    subSort() {
      console.log(this.sortList)
    },
    startChange() {
      this.drag = true
    },
    endChange() {
      this.drag = false
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
    changeStatus(val) {
      this.$confirm(
        `<strong>是否对该配置进行${
          Number(val.gameStatus) === 0 ? '禁用' : '开启'
        }操作?</strong></br><span>${val.supportTerminal}</span>`,
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
              id: val.id,
              gameStatus: val.gameStatus
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
    lookImg(val) {
      this.imgVisible = true
      this.bigImage = val
    },
    closeImage() {
      this.imgVisible = false
    },
    handleStartUploadEnter() {
      this.$message.info('图片开始上传')
    },
    handleUploadSucessEnter({ index, file, id }) {
      this.dialogForm.enterImg = file.imgUrl
      this.$refs['formSub'].validateField('enterImg')
    },
    handleUploadDefeatEnter() {
      this.dialogForm.enterImg = ''
      this.$message.error('图片上传失败')
    },
    handleDeleteUploadEnter() {
      this.dialogForm.enterImg = ''
      this.$message.warning('图片已被移除')
    },
    handleStartUploadShare() {
      this.$message.info('图片开始上传')
    },
    handleUploadSucessShare({ index, file, id }) {
      this.dialogForm.shareImg = file.imgUrl
      this.$refs['formSub'].validateField('shareImg')
    },
    handleUploadDefeatShare() {
      this.dialogForm.shareImg = ''
      this.$message.error('图片上传失败')
    },
    handleDeleteUploadShare() {
      this.dialogForm.shareImg = ''
      this.$message.warning('图片已被移除')
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
.editPicturePage {
  background-color: #f5f5f5;
  margin: 0;
  padding: 15px 0 20px;
  .editPicturePage-content {
    width: 800px;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    .form-header {
      height: 55px;
      line-height: 55px;
      width: 100%;
      background-color: rgba(0, 0, 0, 1);
      span:nth-child(1) {
        position: absolute;
        left: 30px;
        top: 0;
        color: rgba(255, 255, 255, 0.847058823529412);
        font-size: 16px;
        font-weight: 700;
      }
      span:nth-child(2) {
        position: absolute;
        right: 30px;
        top: 0;
        color: #999;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .form-header:after {
      content: ".";
      height: 0;
      display: table;
      clear: both;
    }
    .content-part2 {
      width: 100%;
      padding: 25px 35px 20px;
      position: relative;
      margin: 0 auto;
      /deep/.agent-form {
        padding: 20px;
        box-shadow: rgba(88, 88, 88, 0.35) 0px 0px 5px;
        .remakeBox {
          width: 164px;
          position: absolute;
          left: 200px;
          bottom: 0;
          line-height: 20px;
        }
      }
    }
  }
}
.sortCss {
  cursor: pointer;
  div {
    color: #ffffff;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    margin: 5px;
    border: solid 1px #eee;
    display: inline-block;
  }
  .open {
    background-color: #1abc9c;
  }
  .close {
    background-color: #d9001b;
  }
}
</style>
