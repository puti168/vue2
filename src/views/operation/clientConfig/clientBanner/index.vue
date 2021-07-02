<template>
  <div class="game-container report-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="APP端" name="first"></el-tab-pane>
      <el-tab-pane label="H5端" name="second"></el-tab-pane>
      <el-tab-pane label="PC端" name="third"></el-tab-pane>
      <div class="params">
        <el-form :inline="true" :model="queryData">
          <el-form-item label="轮播图区域:">
            <el-select
              v-model="queryData.areaType"
              clearable
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in QueryareaList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轮播图名称:">
            <el-input
              v-model="queryData.bannerName"
              clearable
              :maxlength="20"
              size="medium"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="轮播图时效:" class="tagheight">
            <el-select
              v-model="queryData.bannerValidity"
              clearable
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateValidityType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否跳转:" class="tagheight">
            <el-select
              v-model="queryData.isLink"
              style="width: 180px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateYesNo"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跳转目标:" class="tagheight">
            <el-select
              v-model="queryData.linkTarget"
              clearable
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateTargetType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" class="tagheight">
            <el-select
              v-model="queryData.status"
              clearable
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateStatus"
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
              style="width: 180px; margin-right: 20px"
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
              style="width: 180px; margin-right: 20px"
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
              @click="addLabel('新增')"
            >
              新增
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-sort"
              :disabled="loading"
              size="medium"
              @click="subSort"
            >
              排序
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog
        title="设置排序"
        :visible.sync="sortLabel"
        width="970px"
        :destroy-on-close="true"
      >

        <draggable v-model="QueryareaList" @start="onStart" @end="onEnd">
          <transition-group>
            <div v-for="tiem in QueryareaList" :key="tiem.value" class="reach">
              {{ tiem.value }}
            </div>
          </transition-group>
        </draggable>
         <div slot="footer" class="dialog-footer">
        <el-button @click="sortLabel = false">取消</el-button>
        <el-button type="primary" @click="setoperateConfigBannerSort">确定</el-button>
       </div>
      </el-dialog>
      <div class="view-container dealer-container">
        <div class="content">
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            size="mini"
            class="small-size-table"
            style="width: 100%"
            :header-cell-style="getRowClass"
            @sort-change="changeTableSort"
          >
            <el-table-column
              prop="areaType"
              align="center"
              label="轮播图区域"
              width="100px"
            >
              <template slot-scope="scope">
                <span v-for="item in QueryareaList" :key="item.code">
                  {{ scope.row.areaType === item.code ? item.value : "" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="轮播图名称" width="120px">
              <template slot-scope="scope">
                <span v-if="scope.row.bannerName === '0'">-</span>
                <span v-else>{{ scope.row.bannerName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="bannerValidity"
              align="center"
              label="轮播图时效"
              width="120px"
            >
              <template slot-scope="scope">
                <!-- {{ typeFilter(scope.row.bannerValidity, "operateValidityType") }} -->
                {{ scope.row.bannerValidity === 1 ? "限时" : "永久" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="upTime"
              align="center"
              label="轮播图上架时间"
              sortable="custom"
              width="130px"
            ></el-table-column>
            <el-table-column
              prop="downTime"
              align="center"
              sortable="custom"
              label="轮播图下架时间"
              width="130px"
            ></el-table-column>
            <el-table-column prop="isLink" align="center" label="是否跳转" width="120px">
              <template slot-scope="scope">
                {{ scope.row.isLink === 1 ? "是" : "否" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="linkTarget"
              align="center"
              label="跳转目标"
              width="120px"
            >
              <template slot-scope="scope">
                {{ typeFilter(scope.row.linkTarget, "operateTargetType") }}
              </template>
            </el-table-column>
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <div v-if="scope.row.status === 0" class="disableRgba">已禁用</div>
                <div v-else-if="scope.row.status === 1" class="normalRgba">开启中</div>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="游戏图片" width="80px">
              <template slot-scope="scope">
                <span class="text-link" @click="lookGame(scope.row.pictureUrl)">
                  点击预览
                </span>
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
              width="160px"
            ></el-table-column>
            <el-table-column
              prop="updatedBy"
              align="center"
              label="最近操作人"
              width="120px"
            ></el-table-column>
            <el-table-column
              prop="updatedAt"
              align="center"
              label="最近操作时间"
              sortable="custom"
              width="160px"
            ></el-table-column>
            <el-table-column prop="operating" align="center" label="操作" width="270px">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status === 0"
                  :disabled="loading"
                  type="success"
                  size="medium"
                  class="noicon"
                  @click="changeStatus(scope.row)"
                >
                  开启
                </el-button>
                <el-button
                  v-else
                  :disabled="loading"
                  type="danger"
                  size="medium"
                  class="noicon"
                  @click="changeStatus(scope.row)"
                >
                  禁用
                </el-button>

                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  :disabled="scope.row.status === 1"
                  size="medium"
                  @click="openEdit(scope.row)"
                >
                  编辑信息
                </el-button>
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  size="medium"
                  :disabled="scope.row.status === 1"
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
        <div v-if="imgVisible" class="imgCenter" @click="closeImage">
          <img :src="bigImage" />
        </div>
        <el-dialog
          title="新增/编辑"
          :visible.sync="dialogFormVisible"
          :destroy-on-close="true"
          width="738px"
          center
          class="rempadding"
        >
          <el-form ref="formSub" :inline="true" :model="dialogForm" label-width="135px">
            <el-form-item
              label="轮播图区域:"
              prop="areaType"
              :rules="[
                { required: true, message: '请选择轮播图名称', trigger: 'change' },
              ]"
            >
              <el-select
                v-model="dialogForm.areaType"
                class="region"
                placeholder="请选择活动区域"
              >
                <el-option
                  v-for="item in QueryareaList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code"
                ></el-option>
              </el-select>
              <span class="el-form-item__error">
                *首页轮播图从左至右排列依次为：1.2.3.4.5.6.7.8.9.10区
              </span>
            </el-form-item>
            <el-form-item
              label="轮播图名称:"
              prop="bannerName"
              :rules="[{ required: true, message: '请输入轮播图名称', trigger: 'blur' }]"
            >
              <el-input
                v-model="dialogForm.bannerName"
                class="region"
                placeholder="请输入"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              label="轮播图时效:"
              prop="bannerValidity"
              :rules="[
                {
                  required: true,
                  message: '请选择轮播图时效',
                  trigger: 'change',
                },
              ]"
            >
              <el-select v-model="dialogForm.bannerValidity" class="region">
                <el-option label="限时" :value="0"></el-option>
                <el-option label="永久" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item
              label="上架时间:"
              label-width="112px"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                v-model="upTime"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateNow"
                type="datetime"
                align="right"
                @change="changeTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-if="dialogForm.bannerValidity === 0"
              label="下架时间:"
              label-width="112px"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                v-model="downTime"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateEnd"
                type="datetime"
                align="right"
                :clearable="false"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="是否跳转:"
              prop="isLink"
              :rules="[
                {
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.isLink"
                :popper-append-to-body="false"
                class="region"
              >
                <el-option label="跳转" :value="1"></el-option>
                <el-option label="不跳转" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="dialogForm.isLink === 1"
              label="跳转目标:"
              prop="linkTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入跳转目标',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select v-model="dialogForm.linkTarget" class="region">
                <el-option label="游戏" :value="0"></el-option>
                <el-option label="现金网内部" :value="1"></el-option>
                <el-option label="外部地址" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="dialogForm.linkTarget === 0 && dialogForm.isLink === 1" label="游戏:" :rules="[]">
              <el-select v-model="dialogForm.targetUrl" class="region">
                <el-option
                  v-for="item in QueryGameList"
                  :key="item.gameId"
                  :label="item.gameName"
                  :value="item.gameId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else
              label="URL链接:"
              prop="targetUrl"
              :rules="[{ required: true }]"
            >
              <el-input
                v-model="dialogForm.targetUrl"
                class="region"
                placeholder="请输入"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图片上传"
              prop="pictureUrl"
              :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
            >
              <UploadItem
                ref="imgUpload1"
                :upload-file-type="'image'"
                :platform="'PC'"
                :img-urls="dialogForm.pictureUrl"
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="subAddOrEidt">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import UploadItem from '@/components/UploadItem'
import dayjs from 'dayjs'
import list from '@/mixins/list'
import draggable from 'vuedraggable'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()
export default {
  components: { draggable, UploadItem },
  mixins: [list],
  data() {
    return {
      QueryareaList: [],
      upTime: Date.now(),
      downTime: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {},
      QueryGameList: [],
      tableData: [],
      drag: false,
      sortLabel: false,
      imgVisible: false,
      dialogFormVisible: false,
      isEdit: false,
      clientType: 0,
      addOrEdit: 'add',
      queryData: {},
      dialogForm: {
        areaType: 0,
        bannerValidity: 1,
        isLink: 1,
        linkTarget: 0,
        status: 0,
        pictureUrl: null,
        gameName: ''
      },
      activeName: 'first'
    }
  },
  computed: {
    operateValidityType() {
      return this.globalDics.operateValidityType
    },
    operateYesNo() {
      return this.globalDics.operateYesNo
    },
    operateTargetType() {
      return this.globalDics.operateTargetType
    },
    operateStatus() {
      return this.globalDics.operateStatus
    }
  },
  watch: {
    upTime: {
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
  created() {
    this.getQueryarea()
    this.getQueryGameList()
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const params = {
        clientType: this.clientType,
        ...this.queryData,
        ...this.getParams()
      }
      console.log(params)
      this.$api
        .getQperateConfigBannerQueryBannerList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.records
            this.total = res.data.total
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getQueryarea() {
      this.$api.operateConfigBannerQueryBannerAreaAPI().then((res) => {
        if (res.code === 200) {
          this.QueryareaList = res.data
        }
      })
    },
    // 获取所有游戏
    getQueryGameList() {
      this.$api.operateConfigBannerQueryGameList().then((res) => {
        if (res.code === 200) {
          this.QueryGameList = res.data
        }
      })
    },
    addLabel(val) {
      this.dialogForm = {
        areaType: 0,
        bannerValidity: 1,
        isLink: 1,
        linkTarget: 0,
        status: 0,
        pictureUrl: null,
        gameName: ''

      }
      this.upTime = Date.now()
      this.downTime = endTime
      this.dialogFormVisible = true
    },

    clear() {
      this.upTime = Date.now()
      this.downTime = endTime
    },

    openEdit(row) {
      this.addOrEdit = 'edit'
      this.dialogForm = { ...row }
      console.log(this.dialogForm, '编辑的事')
      this.dialogForm.upTime = row.upTime
      this.dialogForm.downTime = row.downTime
      this.dialogForm.isLink = row.isLink
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.imgUpload1.state = 'image'
        this.$refs.imgUpload1.fileUrl = row.pictureUrl
      })
    },
    subAddOrEidt() {
      if (this.dialogForm.bannerValidity === 0) {
        this.dialogForm.upTime = dayjs(this.upTime).format('YYYY-MM-DD HH:mm:ss')
        this.dialogForm.downTime = dayjs(this.downTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.dialogForm.upTime = dayjs(this.downTime).format('YYYY-MM-DD HH:mm:ss')
        delete this.dialogForm.downTime
      }
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          const params = { ...this.dialogForm, clientType: this.clientType }
          console.log(params, '0000')
          if (this.addOrEdit === 'add') {
            this.setOperateConfigBannerAdd(params)
          } else {
            this.setBannerUpdate(params)
          }
        }
      })
    },
    setOperateConfigBannerAdd(val) {
      this.$api
        .getOperateConfigBannerAdd(val)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.$message.success('新增成功!')
            this.loadData()
          }
          this.dialogFormVisible = false
        })

        .catch(() => {})
    },

    // 切换导航
    handleClick(tab) {
      const name = tab.name
      if (name === 'first') {
        this.clientType = 0
      } else if (name === 'second') {
        this.clientType = 1
      } else {
        this.clientType = 2
      }
      console.log(this.clientType)
      this.loadData()
    },

    changeTime(val) {
      const Timestamp = new Date(new Date(val).toLocaleDateString()).getTime()
      if (Timestamp === startTime) {
        this.upTime = Date.now()
      } else {
        this.upTime = Timestamp
      }
    },
    setBannerUpdate(val) {
      this.$api.getPperateConfigBannerUpdate(val).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.loadData()
        }
      })
    },
    deleteBtn(val) {
      const { id } = val
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
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$api
            .getOperateConfigBannerDelete({ id })
            .then((res) => {
              loading.close()
              const { code } = res
              if (code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                })
              }
              this.loadData()
            })
            .catch(() => {
              loading.close()
            })
        })
        .catch(() => {})
    },
    changeStatus(val) {
      const status = val.status === 0 ? 1 : 0
      this.$confirm(
        `<strong>是否对该配置进行${
          val.status === 0 ? '启用' : '禁用'
        }操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
        `确认提示`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api
            .getOperateConfigBannerUse({ id: val.id, status: status })
            .then((res) => {
              if (res.code === 200) {
                this.loadData()
              }
            })
        })
        .catch(() => {})
    },

    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    },
    subSort() {
      this.sortLabel = true
    },

    setoperateConfigBannerSort() {
       const arr = this.QueryareaList
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]
        newArr.push(ele.code)
      }
      console.log(this.QueryareaList)
      const sortIds = newArr.join(',')
      console.log(sortIds, '21321')
      this.$api.setoperateConfigBannerSort({sortIds: sortIds}).then((res) => {
        if (res.code === 200) {
         this.$message({
            message: '操作成功！',
            type: 'success'
          })
        }
      })
      this.loadData()
    },
    closeImage() {
      this.imgVisible = false
    },
    lookGame(val) {
      this.imgVisible = true
      this.bigImage = val
    },
    handleUploadDefeatShare() {
      this.dialogForm.activitySharePicture = ''
      this.$message.error('图片上传失败')
    },
    handleDeleteUploadShare() {
      this.dialogForm.activitySharePicture = ''
      this.$message.warning('图片已被移除')
    },
    handleStartUploadShare() {
      this.$message.info('图片开始上传')
    },
    handleUploadSucessShare({ index, file, id }) {
      this.dialogForm.pictureUrl = file.imgUrl
      this.$refs['formSub'].validateField('pictureUrl')
    },

    changeTableSort({ column, prop, order }) {
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
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderType
        delete this.queryData.orderType
      }
      this.loadData()
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.reach {
  padding: 6px;
  background-color: #1abc9c;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
  line-height: 20px;
  width: 110px;
  display: inline-block;
  text-align: center;
}
.chosen {
  border: solid 2px #3089dc !important;
}
.region {
  width: 507px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
.remakeBox {
  width: 164px;
  position: absolute;
  left: 200px;
  bottom: 0;
  line-height: 20px;
}
</style>
