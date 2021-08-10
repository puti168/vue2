<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="教程名称:">
						<el-select
							v-model="queryData.tutorId"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 300px"
							@change="getMerchantDict($event)"
						>
							<el-option
								v-for="item in tutorNameList"
								:key="item.code"
								:label="item.tutorName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="页签名称:">
						<el-select
							v-model="queryData.bookmarkId"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 300px"
						>
							<el-option
								v-for="item in bookmarkQueryList"
								:key="item.code"
								:label="item.bookmarkName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容状态:">
						<el-select
							v-model="queryData.contentStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 300px"
						>
							<el-option
								v-for="item in gameAssortStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容名称:">
						<el-input
							v-model="queryData.contentName"
							clearable
							maxlength="12"
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
							v-if="hasPermission('462')"
							type="primary"
							:disabled="loading"
							size="medium"
							@click="addLabel('新增')"
						>
							新增内容
						</el-button>
						<el-button
							v-if="hasPermission('466')"
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
					<draggable v-model="configTutorList" @start="onStart" @end="onEnd">
						<transition-group>
							<div v-for="item in configTutorList" :key="item.id" class="reach">
								{{ item.contentName }}
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
					<el-table-column prop="tutorName" align="center" label="教程名称">
						<template slot-scope="scope">
							{{ scope.row.tutorName || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="bookmarkName" align="center" label="页签名称">
						<template slot-scope="scope">
							{{ scope.row.bookmarkName || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="contentName" align="center" label="内容名称">
						<template slot-scope="scope">
							{{ scope.row.contentName || '-' }}
						</template>
					</el-table-column>
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
					<el-table-column prop="contentStatus" align="center" label="内容状态">
						<template slot-scope="scope">
							<span
								v-if="scope.row.contentStatus + '' === '0'"
								class="disableRgba"
							>
								{{
									typeFilter(scope.row.contentStatus, 'gameAssortStatusType')
								}}
							</span>
							<span v-else-if="!!scope.row.contentStatus" class="normalRgba">
								{{
									typeFilter(scope.row.contentStatus, 'gameAssortStatusType')
								}}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="270px"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('465') && scope.row.contentStatus === 0"
								type="success"
								size="medium"
								@click="changeStatus(scope.row)"
							>
								开启
							</el-button>

							<el-button
								v-if="hasPermission('465') && scope.row.contentStatus !== 0"
								type="danger"
								size="medium"
								@click="changeStatus(scope.row)"
							>
								禁用
							</el-button>
							<el-button
								v-if="hasPermission('463')"
								type="primary"
								icon="el-icon-edit"
								size="medium"
								@click="openEdit(scope.row)"
							>
								编辑信息
							</el-button>

							<el-button
								v-if="hasPermission('464')"
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
						:rules="rules"
						:model="dialogForm"
						label-width="220px"
					>
						<el-form-item label="教程名称:" prop="tutorId">
							<el-select
								v-model="dialogForm.tutorId"
								size="medium"
								placeholder="默认选择全部"
								clearable
								style="width: 500px"
								@change="getBookmarkId($event)"
							>
								<el-option
									v-for="item in tutorNameList"
									:key="item.code"
									:label="item.tutorName"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							v-if="firstStatusShow"
							label="页签名称:"
							prop="bookmarkId"
						>
							<el-select
								v-model="dialogForm.bookmarkId"
								size="medium"
								placeholder="默认选择全部"
								clearable
								style="width: 500px"
							>
								<el-option
									v-for="item in popBookmarkQueryList"
									:key="item.code"
									:label="item.bookmarkName"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="内容名称:"
							prop="contentName"
							:rules="[
								{ required: true, message: '内容名称不能为空', trigger: 'blur' }
							]"
						>
							<el-input
								v-model="dialogForm.contentName"
								:maxlength="20"
								show-word-limit
								autocomplete="off"
								style="width: 500px"
								placeholder="请输入"
							></el-input>
						</el-form-item>
						<el-form-item
							label="描述:"
							prop="contentDesc"
							:rules="[
								{ required: true, message: '描述不能为空', trigger: 'blur' }
							]"
						>
							<el-input
								v-model="dialogForm.contentDesc"
								type="textarea"
								:maxlength="100"
								autocomplete="off"
								style="width: 500px"
								placeholder="请输入"
								show-word-limit
							></el-input>
						</el-form-item>
						<el-form-item
							label="教程图片:"
							prop="contentPicture"
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
								:img-urls="dialogForm.contentPicture"
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
								图片大小不能超过2MB
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

export default {
	name: routerNames.courseContentConfig,
	components: {
		draggable: () => import('vuedraggable'),
		UploadItem: () => import('../components/uploadItem.vue')
	},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.lookGame = this.throttle(this.lookGame, 1000)
		this.deleteLabel = this.throttle(this.deleteLabel, 1000)
		this.subAddOrEidt = this.throttle(this.subAddOrEidt, 1000)
		this.getProxyProxyInfoByLabelId = this.throttle(
			this.getProxyProxyInfoByLabelId,
			1000
		)
		return {
			firstStatusShow: false,
			queryData: {},
			tutorNameList: [],
			bookmarkQueryList: [],
			popBookmarkQueryList: [],
			configTutorList: [],
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
		gameAssortStatusType() {
			return this.globalDics.gameAssortStatusType || []
		},
		rules() {
			const tutorId = [
				{ required: true, message: '请输入教程名称', trigger: 'blur' }
			]
			const bookmarkId = [
				{ required: true, message: '请输入页签名称', trigger: 'blur' }
			]
			return {
				tutorId,
				bookmarkId
			}
		}
	},
	created() {
		this.getTutorNameList()
	},
	mounted() {
		this.getMerchantDict(this.tutorId)
	},
	methods: {
		getMerchantDict(val) {
			const tutorId = val
			this.$api.bookmarkQuerySortedNames({ tutorId }).then((res) => {
				if (res && res.code === 200) {
					this.bookmarkQueryList = res.data || []
				} else {
					this.bookmarkQueryList = []
				}
			})
		},
		getTutorNameList() {
			this.$api.operateConfigTutorNameQueryTypeList().then((res) => {
				if (res && res.code === 200) {
					this.tutorNameList = res.data || []
				} else {
					this.tutorNameList = []
				}
			})
		},
		getBookmarkId(val) {
			const tutorId = val
			this.firstStatusShow = false
			this.popBookmarkQueryList = []
			this.$api.bookmarkQuerySortedNames({ tutorId }).then((res) => {
				if (res && res.code === 200) {
					if (res.data && res.data.length) {
						this.popBookmarkQueryList = res.data
						this.firstStatusShow = true
					} else {
						this.popBookmarkQueryList = []
						this.firstStatusShow = false
					}
				}
			})
		},
		loadData() {
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getConfigTutorContentQueryList(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { records, total },
						msg
					} = res
					if (res && code && code === 200) {
						this.tableData =
							(res.data && records.length && Object.freeze(records)) || []
						this.total = (res.data && total) || 0
					} else {
						this.$message({
							message: (res && msg) || '接口异常',
							type: 'error'
						})
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
				if (res && res.code === 200) {
					this.gameList = res.data.record || []
					this.dialogGameVisible = true
				}
			})
		},
		changeStatus(val) {
			const status = val.contentStatus === 0 ? 1 : 0
			this.$confirm(
				`<strong>是否对该配置进行${
					val.contentStatus === 0 ? '启用' : '禁用'
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
						.getConfigTutorContentUse({ id: val.id, status: status })
						.then((res) => {
							if (res && res.code === 200) {
								this.loadData()
							}
						})
				})
				.catch(() => {})
		},
		lookGame(val) {
			this.labelName = val.memberLabelName
			this.summary = val.peopleNum * 1
			this.id = val.id
			this.getProxyProxyInfoByLabelId(val.id)
		},
		addLabel() {
			this.title = '新增'
			this.dialogForm = {}
			this.dialogFormVisible = true
		},
		openEdit(row) {
			this.dialogForm = {}
			if (row) {
				this.title = '编辑'
				this.dialogForm = { ...row }
			}
			this.dialogFormVisible = true
			console.log(this.dialogForm, '1')
			if (this.dialogForm.contentPicture) {
				this.$nextTick(() => {
					this.$refs.imgUpload.state = 'image'
					this.$refs.imgUpload.fileUrl = this.dialogForm.contentPicture
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
					this.$api.getConfigTutorContentDelete({ id: val.id }).then((res) => {
						if (res && res.code === 200) {
							this.$message.success('删除成功')
							this.loadData()
						}
					})
				})
				.catch(() => {})
		},
		subAddOrEidt() {
			const data = {}
			data.description = this.dialogForm.description
			data.memberLabelName = this.dialogForm.memberLabelName
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					if (this.title === '新增') {
						console.log('新增')
						const params = { ...this.dialogForm }
						this.$api.getConfigTutorContentInsert(params).then((res) => {
							if (res.code === 200) {
								this.$message.success('新增成功')
								this.pageNum = 1
								this.loadData()
							}
							this.dialogFormVisible = false
						})
					} else {
						const params = { ...this.dialogForm }
						this.$api.getConfigTutorContentUpdate(params).then((res) => {
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
		_changeTableSort({ prop, order }) {
			const obj = {
				createdAt: 0,
				updatedAt: 1
			}
			this.pageNum = 1
			this.queryData.orderKey = prop && obj[prop]
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
			const sortIds = this.sortIds
			this.$api.configTutorContentQuerySortedNames({ sortIds }).then((res) => {
				if (res && res.code === 200) {
					this.configTutorList = res.data
					console.log(this.configTutorList, 'this.configTutorList112')
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
			const arr = this.configTutorList

			const newArr = []
			for (let i = 0; i < arr.length; i++) {
				const ele = arr[i]
				console.log(ele, '66')
				newArr.push(ele.id)
			}
			console.log(this.configTutorList)
			const sortIds = newArr.join(',')
			this.$api.getConfigTutorContentSort({ sortIds: sortIds }).then((res) => {
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
			this.dialogForm.contentPicture = file.imgUrl
		},
		handleUploadDefeat() {
			this.dialogForm.contentPicture = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.dialogForm.contentPicture = ''
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
	color: rgb(245, 235, 235);
	font-size: 15px;
	background-color: #1abc9c;
	border: solid 1px #eee;
	margin-bottom: 10px;
	cursor: move;
	line-height: 20px;
	width: 130px;
	display: inline-block;
	text-align: center;
}
</style>
