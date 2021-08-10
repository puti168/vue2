<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="教程状态:">
						<el-select
							v-model="queryData.tutorStatus"
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
					<el-form-item label="教程名称:">
						<el-input
							v-model="queryData.tutorName"
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
							v-if="hasPermission('449')"
							type="primary"
							:disabled="loading"
							size="medium"
							@click="edit"
						>
							新增教程
						</el-button>
						<el-button
							v-if="hasPermission('453')"
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
							<div v-for="tiem in sortareaList" :key="tiem.id" class="reach">
								{{ tiem.tutorName }}
							</div>
						</transition-group>
					</draggable>
					<div slot="footer" class="dialog-footer">
						<el-button @click="subSort = false">取消</el-button>
						<el-button type="primary" @click="setoperateConfigBannerSort">
							确定
						</el-button>
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
						prop="tutorName"
						align="center"
						label="教程名称"
					></el-table-column>
					<el-table-column prop="createdBy" align="center" label="创建人">
						<template slot-scope="scope">
							{{ scope.row.createdBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="updatedBy" align="center" label="最近操作人">
						<template slot-scope="scope">
							{{ scope.row.updatedBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="tutorStatus" align="center" label="教程状态">
						<template slot-scope="scope">
							<span v-if="scope.row.tutorStatus === 1" class="normalRgba">
								{{ typeFilter(scope.row.tutorStatus, 'gameAssortStatusType') }}
							</span>
							<span v-else class="disableRgba">
								{{ typeFilter(scope.row.tutorStatus, 'gameAssortStatusType') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						min-width="160"
					>
						<template slot-scope="scope">
							<el-button
								v-if="scope.row.tutorStatus === 0 && hasPermission('452')"
								type="success"
								size="medium"
								@click="switchStatus(scope.row)"
							>
								开启
							</el-button>
							<el-button
								v-if="scope.row.tutorStatus === 1 && hasPermission('452')"
								type="danger"
								size="medium"
								@click="switchStatus(scope.row)"
							>
								禁止
							</el-button>
							<el-button
								v-if="hasPermission('450')"
								type="primary"
								icon="el-icon-edit"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>
							<el-button
								v-if="hasPermission('451')"
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
					<el-form ref="formSub" :model="dialogForm" label-width="220px">
						<el-form-item
							label="教程名称:"
							prop="tutorName"
							:rules="[
								{ required: true, message: '教程名称不能为空', trigger: 'blur' }
							]"
						>
							<el-input
								v-model="dialogForm.tutorName"
								:maxlength="20"
								autocomplete="off"
								style="width: 500px"
								placeholder="请输入"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item
							label="教程描述:"
							prop="tutorDescribe"
							:rules="[
								{ required: true, message: '教程描述不能为空', trigger: 'blur' }
							]"
						>
							<el-input
								v-model="dialogForm.tutorDescribe"
								:maxlength="20"
								autocomplete="off"
								style="width: 500px"
								placeholder="请输入"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item
							label="教程图片:"
							prop="tutorPicture"
							:rules="[
								{
									required: true,
									message: '教程图片不能为空',
									trigger: 'change'
								}
							]"
						>
							<UploadItem
								ref="imgUpload"
								:upload-file-type="'image'"
								:platform="'PC'"
								:img-urls="dialogForm.tutorPicture"
								@upoladItemSucess="handleUploadSucess"
								@startUpoladItem="handleStartUpload"
								@deleteUpoladItem="handleDeleteUpload"
								@upoladItemDefeat="handleUploadDefeat"
							></UploadItem>
							<div class="remakeBox">
								<span class="danger">*</span>
								图片格式仅支持png，jpg
								<br />
								<span class="danger">*</span>
								图片大小不能超过5MB，尺寸大小80 X 80
							</div>
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
	name: routerNames.courseNameConfig,
	components: { draggable, UploadItem },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.lookGame = this.throttle(this.lookGame, 1000)
		this.deleteLabel = this.throttle(this.deleteLabel, 1000)
		this.subAddOrEidt = this.throttle(this.subAddOrEidt, 1000)
		return {
			queryData: {
				orderKey: undefined,
				orderType: undefined,
				tutorName: undefined,
				tutorStatus: undefined
			},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {},
			gameList: [],
			dialogGameVisible: false,
			title: '',
			labelName: '',
			id: '',
			page: 1,
			pageSize: 100,
			pageSizes: [100],
			summary: 0,
			drag: false,
			subSort: false,
			sortareaList: []
		}
	},
	computed: {
		entrAuthorityTypeArr() {
			return this.globalDics.entrAuthorityType || []
		}
	},
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
				.configTutorNameQueryTutorList(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code && code === 200) {
						this.$set(this, 'tableData', record || [])
						this.total = totalRecord || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		switchStatus(val) {
			let content = '禁用'
			let status = 0
			if (val.tutorStatus === 0) {
				status = 1
				content = '开启'
			}
			const params = {
				id: val.id,
				status: status
			}
			this.$confirm(
				`<strong>是否对该配置进行${content}操作?</strong>
        </br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
				`确认提示`,
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api.configTutorNameUse(params).then((res) => {
						this.loading = false
						const { code, msg } = res
						if (code && code === 200) {
							this.dialogGameVisible = true
							this.loadData()
						} else {
							this.$message({
								message: res && msg,
								type: 'error'
							})
						}
					})
				})
				.catch(() => {})
		},
		edit(val) {
			this.title = '新增'
			this.dialogForm = {}
			if (val) {
				this.title = '编辑'
				this.dialogForm = { ...val }
			}
			this.dialogFormVisible = true
			if (this.dialogForm.tutorPicture) {
				this.$nextTick(() => {
					this.$refs.imgUpload.state = 'image'
					this.$refs.imgUpload.fileUrl = this.dialogForm.tutorPicture
				})
			}
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
					this.$api.configTutorNameDelete({ id: val.id }).then((res) => {
						this.loading = false
						const { code, msg } = res
						if (code && code === 200) {
							this.$message.success('删除成功')
							this.loadData()
						} else {
							this.$message({
								message: res && msg,
								type: 'error'
							})
						}
					})
				})
				.catch(() => {
					this.loading = false
				})
		},
		subAddOrEidt() {
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					if (this.title === '新增') {
						this.$api.configTutorNameSave(this.dialogForm).then((res) => {
							this.loading = false
							const { code, msg } = res
							if (code && code === 200) {
								this.$message.success('新增成功')
								this.pageNum = 1
								this.loadData()
							} else {
								this.$message({
									message: res && msg,
									type: 'error'
								})
							}
							this.dialogFormVisible = false
						})
					} else {
						this.$api.configTutorNameSave(this.dialogForm).then((res) => {
							this.loading = false
							const { code, msg } = res
							if (code && code === 200) {
								this.$message.success('修改成功')
								this.loadData()
							} else {
								this.$message({
									message: res && msg,
									type: 'error'
								})
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
			this.$api
				.configTutorNameQueryTypeList({ clientType })
				.then((res) => {
					this.loading = false
					const { code, data, msg } = res
					if (code && code === 200) {
						this.sortareaList = data
						this.subSort = true
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
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
				newArr.push(ele.id)
			}
			const sortIds = newArr.join(',')
			const clientType = this.clientType
			this.$api
				.configTutorNameSort({ sortIds: sortIds, clientType })
				.then((res) => {
					const { code, msg } = res
					if (code && code === 200) {
						this.$message({
							message: '操作成功！',
							type: 'success'
						})
						this.subSort = false
						this.loadData()
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		handleStartUpload() {
			this.$message.info('图片开始上传')
		},
		handleUploadSucess({ index, file, id }) {
			this.dialogForm.tutorPicture = file.imgUrl
		},
		handleUploadDefeat() {
			this.dialogForm.tutorPicture = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.dialogForm.tutorPicture = ''
			this.$message.warning('图片已被移除')
		}
	}
}
</script>

<style lang="scss" scoped>
.remakeBox {
	width: 264px;
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
