<template>
  <gameHomeRecommendEdit
    v-if="isEdit"
    :recommendDetails="recommendDetails"
    @back="back"
  />

  <div v-else class="game-container report-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="APP端" name="first"></el-tab-pane>
      <el-tab-pane label="H5端" name="second"></el-tab-pane>
      <el-tab-pane label="PC端" name="third"></el-tab-pane>
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="轮播图区域:">
            <el-select
              v-model="queryData.areaType"
              style="width: 180px"
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
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateValidityType "
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
              @click="addLabel"
            >
              新增
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-sort"
              :disabled="loading"
              size="medium"
              @click="sortLabel = true"
            >
              排序
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog
        title="轮播图区域排序"
        :visible.sync="sortLabel"
        width="970px"
        :destroy-on-close="true"
      >
        <draggable v-model="options" @start="onStart" @end="onEnd">
          <transition-group>
            <div v-for="tiem in options" :key="tiem.value" class="reach">
              {{ tiem.label }}
            </div>
          </transition-group>
        </draggable>
        <el-button @click="sortLabel = false">取消</el-button>
        <el-button type="primary" @click="subAddOrEidt">确定</el-button>
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
            ></el-table-column>
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
              {{ typeFilter(scope.row.bannerValidity, "operateValidityType") }}
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
            <el-table-column
              prop="isLink"
              align="center"
              label="是否跳转"
              width="120px"
            >
			 <template slot-scope="scope">
              {{ typeFilter(scope.row.isLink, "operateYesNo") }}
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
                <p :class="scope.row.status === 1 ? 'normalRgba' : 'disableRgba'">
                  {{ scope.row.status === 1 ? "开启中" : "已禁用" }}
                </p>
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
            <el-table-column prop="operating" align="center" label="操作" width="240px">
              <template slot-scope="scope">
                <el-button
                  v-if="Number(scope.row.gameStatus) !== 0"
                  :disabled="loading"
                  type="danger"
                  size="medium"
                  class="noicon"
                  @click="changeStatus(scope.row.id, 0)"
                >
                  禁用
                </el-button>
                <el-button
                  v-if="Number(scope.row.gameStatus) !== 1"
                  :disabled="loading"
                  type="success"
                  size="medium"
                  class="noicon"
                  @click="changeStatus(scope.row.id, 1)"
                >
                  开启
                </el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  :disabled="loading || Number(scope.row.gameStatus) === 1"
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
        >
          <el-form ref="formSub" :inline="true" :model="dialogForm" label-width="135px">
            <el-form-item
              label="轮播图区域:"
              prop="memberLabelName"
              :rules="[{ required: true, message: '请输入轮播图名称', trigger: 'blur' }]"
            >
              <el-select
                v-model="dialogForm.aaaaa"
                class="region"
                placeholder="请选择活动区域"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="el-form-item__error">
                *首页轮播图从左至右排列依次为：1.2.3.4.5.6.7.8.9.10区
              </span>
            </el-form-item>
            <el-form-item
              label="轮播图名称:"
              prop="description"
              :rules="[
                {
                  required: true,
                  message: '请输入轮播图名称',
                  trigger: 'blur',
                },
                {
                  message: '长度在 2 到 20 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="dialogForm.description"
                class="region"
                placeholder="请输入"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              label="轮播图时效:"
              prop="memberLabelName"
              :rules="[
                {
                  required: true,
                  message: '请选择轮播图时效',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.mregionAging"
                class="region"
                placeholder="1区"
              >
                <el-option label="1区" value="shanghai"></el-option>
                <el-option label="2区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item
              label="上架时间:"
              label-width="112px"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                v-model="onlineTime"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateNow"
                type="datetime"
                align="right"
                @change="changeTime"
              ></el-date-picker>
              <span v-show="errTime" class="el-form-item__error">
                公告上架时间不能大于公告下架时间
              </span>
            </el-form-item>
            <el-form-item
              label="下架时间:"
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
            <el-form-item
              label="是否跳转:"
              prop="memberLabelName"
              :rules="[
                {
                  required: true,
                  message: '是否跳转',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.mregionAging"
                class="region"
                placeholder="1区"
              >
                <el-option label="1区" value="shanghai"></el-option>
                <el-option label="2区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="跳转目标:"
              prop="memberLabelName"
              :rules="[
                {
                  required: true,
                  message: '请选择选择跳转目标',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.mregionAging"
                class="region"
                placeholder="1区"
              >
                <el-option label="1区" value="shanghai"></el-option>
                <el-option label="2区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="游戏:" prop="memberLabelName" :rules="[]">
              <el-select
                v-model="dialogForm.mregionAging"
                class="region"
                placeholder="1区"
              >
                <el-option label="1区" value="shanghai"></el-option>
                <el-option label="2区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="图片上传"
              :rules="[
                {
                  required: true,
                  trigger: 'blur',
                },
              ]"
              prop="image"
            >
              <Upload :nowImage="nowImage" @uploadSuccess="uploadSuccess"></Upload>
              <p class="imgTip">请上传图片！图片格式仅支持png,jpg 图片大小不超过2MB</p>
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
import Upload from '@/components/Upload'
import dayjs from 'dayjs'
import list from '@/mixins/list'
import draggable from 'vuedraggable'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()
export default {
  components: { draggable, Upload },
  mixins: [list],
  data() {
    return {
      onlineTime: Date.now(),
      offlineTime: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {},
      errTime: false,
	  tableData: [],
      drag: false,
      sortLabel: false,
      options: [
        { value: '1', label: '1区' },
        { value: '2', label: '2区' },
        { value: '3', label: '3区' },
        { value: '4', label: '4区' },
        { value: '5', label: '5区' },
        { value: '6', label: '6区' },
        { value: '7', label: '7区' },
        { value: '8', label: '8区' },
        { value: '9', label: '9区' },
        { value: '10', label: '10区' }
      ],

      form: {
        status: '1'
      },
	  imgVisible: false,
      nowImage: '',
      dialogFormVisible: false,
      dialogForm: { aaaaa: '1' },
      isEdit: false,
      dataList: [],
      title: '',
      // 终端类型
      terminalType: 1,
      recommendDetails: {},
      queryData: {
        terminalType: 1
      },
      activeName: 'first'
    }
  },
  computed: {
    imageSize() {
      return {
        width: 1920,
        height: 400
      }
    },
    rules() {
      const valiIMG = (rule, value, callback) => {
        // 图片验证
        callback()
      }
      return {
        image: [
          {
            required: true,
            validator: valiIMG,
            message: '请选择图片上传',
            trigger: ['blur', 'change']
          }
        ]
      }
    },

    operateValidityType() {
      return this.globalDics.operateValidityType
    },
	accountType() {
      return this.globalDics.accountType
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
  mounted() {},
  methods: {
    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    },
    uploadSuccess(data) {
      this.$set(this.form, 'imageAddress', data)
    },
    addLabel() {
      this.title = '新增'
      this.dialogForm = { aaaaa: '1' }
      this.dialogFormVisible = true
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
      this.onlineTime = Date.now()
      this.offlineTime = endTime
    },
    subAddOrEidt() {
      console.log(this.title)
      const data = {}
      data.description = this.dialogForm.description
      data.memberLabelName = this.dialogForm.memberLabelName
      data.mregionAging = this.dialogForm.mregionAging

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

    // 切换导航
    handleClick(tab) {
      const name = tab.name
      if (name === 'first') {
        this.queryData.terminalType = 1
      } else if (name === 'second') {
        this.queryData.terminalType = 2
      } else {
        this.queryData.terminalType = 2
      }
      this.loadData()
    },
    loadData() {
      this.loading = true
      const params = {
        ...this.getParams(params)
      }

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
            .getOperateConfigBannerUse({
              id: id,
              status: type
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
	 lookGame(val) {
      this.imgVisible = true
      this.bigImage = val
    },

    changeTableSort({ column, prop, order }) {
      this.pageNum = 1
      const orderParams = this.checkOrderParams.get(prop)
      this.queryData.orderProperty = prop
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
    reset() {
      this.pageNum = 1
      this.queryData = {
        terminalType: 1
      }
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
</style>
