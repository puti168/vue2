<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="教程名称:">
            <el-select
              v-model="queryData.status"
              size="medium"
              placeholder="默认选择全部"
              clearable
              style="width: 300px"
            >
              <el-option label="全部" :value="undefined"></el-option>
              <el-option
                v-for="item in entrAuthorityTypeArr"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页签状态:">
            <el-select
              v-model="queryData.status"
              size="medium"
              placeholder="默认选择全部"
              clearable
              style="width: 300px"
            >
              <el-option label="全部" :value="undefined"></el-option>
              <el-option
                v-for="item in entrAuthorityTypeArr"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页签名称:">
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
              v-if="hasPermission('294')"
              type="primary"
              :disabled="loading"
              size="medium"
              @click="edit"
            >
              新增页签
            </el-button>
            <el-button
              v-if="hasPermission('294')"
              type="warning"
              :disabled="loading"
              size="medium"
              @click="subSortadd"
            >
              排序
            </el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title="设置排序"
          :visible.sync="subSort"
          width="970px"
          :destroy-on-close="true"
        >
          <draggable v-model="sortareaList" @start="onStart" @end="onEnd">
            <transition-group>
              <div v-for="tiem in sortareaList" :key="tiem.value" class="reach">
                {{ tiem.value }}
              </div>
            </transition-group>
          </draggable>
          <div slot="footer" class="dialog-footer">
            <el-button @click="subSort = false">取消</el-button>
            <el-button type="primary" @click="setoperateConfigBannerSort">确定</el-button>
          </div>
        </el-dialog>
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
            label="教程名称"
          ></el-table-column>
          <el-table-column prop="description" align="center" label="创建人">
            <template slot-scope="scope">
              <span v-if="scope.row.description !== ''">
                {{ scope.row.description }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
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
          <el-table-column
            prop="updatedAt"
            align="center"
            label="页签状态"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-button
                v-if="hasPermission('295')"
                type="primary"
                size="medium"
                @click="edit(scope.row)"
              >
                开启中
              </el-button>

              <el-button
                v-if="hasPermission('296')"
                type="warning"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                已禁止
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="operating" align="center" label="操作">
            <template slot-scope="scope">
                            <el-button
                v-if="hasPermission('295')"
                type="primary"
                size="medium"
                @click="edit(scope.row)"
              >
                开启
              </el-button>

              <el-button
                v-if="hasPermission('296')"
                type="warning"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                禁止
              </el-button>
              <el-button
                v-if="hasPermission('295')"
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="edit(scope.row)"
              >
                编辑信息
              </el-button>

              <el-button
                v-if="hasPermission('296')"
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
      <el-dialog
				:title="title"
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="820px"
				class="rempadding"
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form
					ref="formSub"
					:model="dialogForm"
					label-width="220px"
				>
					<el-form-item
            label="教程名称:"
            prop="pageName"
            :rules="[
              { required: true, message: '教程名称不能为空', trigger: 'blur' },
            ]"
          >
						<el-select
              v-model="queryData.status"
              size="medium"
              placeholder="请选择"
              clearable
              style="width: 500px"
            >
              <el-option
                v-for="item in entrAuthorityTypeArr"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
					</el-form-item>
					<el-form-item
            label="页签图标:"
            prop="pictureUrl"
          >
						<UploadItem
							ref="imgUpload"
							:upload-file-type="'image'"
							:platform="'PC'"
							:img-urls="dialogForm.pictureUrl"
							@upoladItemSucess="handleUploadSucess"
							@startUpoladItem="handleStartUpload"
							@deleteUpoladItem="handleDeleteUpload"
							@upoladItemDefeat="handleUploadDefeat"
						></UploadItem>
            <div class="remakeBox">
              <span class="danger">*</span>图片格式仅支持png，jpg <br />
              <span class="danger">*</span>图片大小不能超过2MB
            </div>
					</el-form-item>
          <el-form-item
            label="页签名称:"
            prop="clientType"
            :rules="[
              { required: true, message: '页签名称不能为空', trigger: 'blur' },
            ]"
          >
						<el-input
							v-model="dialogForm.pagede"
							:maxlength="20"
							autocomplete="off"
							style="width: 500px"
							placeholder="请输入"
							clearable
						></el-input>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="subAddOrEidt">保存</el-button>
				</div>
			</el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import draggable from 'vuedraggable'
import UploadItem from '../components/uploadItem.vue'
export default {
  name: routerNames.memberLabelConfig,
  components: {draggable, UploadItem},
  mixins: [list],
  data() {
    this.loadData = this.throttle(this.loadData, 1000)
    this.lookGame = this.throttle(this.lookGame, 1000)
    this.deleteLabel = this.throttle(this.deleteLabel, 1000)
    this.subAddOrEidt = this.throttle(this.subAddOrEidt, 1000)
    this.getProxyProxyInfoByLabelId = this.throttle(this.getProxyProxyInfoByLabelId, 1000)
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
      summary: 0,
      drag: false,
      subSort: false,
      sortareaList: []
    }
  },
	computed: {
		entrAuthorityTypeArr() {
			return this.globalDics.entrAuthorityType
		}
	},
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
        .getProxyPageLabel(params)
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
    getProxyProxyInfoByLabelId(val) {
      const params = {}
      params.id = val
      params.pageNum = this.page
      params.pageSize = this.size
      this.$api.getProxyProxyInfoByLabelId(params).then((res) => {
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
      this.getProxyProxyInfoByLabelId(val.id)
    },
    addLabel() {

    },
    edit(val) {
      this.title = '新增'
      this.dialogForm = {}
      if (val) {
        this.title = '编辑'
        this.dialogForm = { ...val }
      }
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
          this.$api.setProxyDeleteLabel({ id: val.id }).then((res) => {
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

            this.$api.getProxyAddLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                this.pageNum = 1
                this.loadData()
              }
              this.dialogFormVisible = false
            })
          } else {
            data.id = this.dialogForm.id
            this.$api.getProxyAddLabel(data).then((res) => {
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
    subSortadd() {
      const clientType = this.clientType
      this.$api.operatecCnfigBannerQuerySortedBannerArea({ clientType }).then((res) => {
        if (res.code === 200) {
          this.sortareaList = res.data
          this.subSort = true
        }
      })
      this.subSort = false
    },
    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    },
    setoperateConfigBannerSort() {
      const arr = this.sortareaList
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]
        newArr.push(ele.code)
      }
      console.log(this.sortareaList)
      const sortIds = newArr.join(',')
      const clientType = this.clientType
      this.$api
        .setoperateConfigBannerSort({ sortIds: sortIds, clientType })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.subSort = false
          }
        })

      this.loadData()
    },
    clear() {
      this.$refs.formSub.resetFields()
    },
    handleStartUpload() {
			this.$message.info('图片开始上传')
		},
		handleUploadSucess({ index, file, id }) {
			this.dialogForm.pictureUrl = file.imgUrl
		},
		handleUploadDefeat() {
			this.dialogForm.pictureUrl = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.dialogForm.pictureUrl = ''
			this.$message.warning('图片已被移除')
		}
  }
}
</script>

<style lang="scss" scoped>
.remakeBox {
  width: 164px;
  position: absolute;
  left: 200px;
  bottom: 0;
  line-height: 20px;
}
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
</style>
