<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="显示终端:">
						<el-select
							v-model="queryData.clientType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in terminalTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="启动页名称:">
						<el-input
							v-model="queryData.pageName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 200px"
							maxlength="20"
						></el-input>
					</el-form-item>
					<el-form-item label="是否预加载:">
						<el-select
							v-model="queryData.loadStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in preLoadArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态:">
						<el-select
							v-model="queryData.status"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in statusArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建人:">
						<el-input
							v-model="queryData.createdBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
						></el-input>
					</el-form-item>
					<el-form-item label="最近操作人:">
						<el-input
							v-model="queryData.updatedBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
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
							v-if="hasPermission('330')"
							type="warning"
							icon="el-icon-folder"
							:disabled="loading"
							size="medium"
							@click="addLabel"
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
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="supportTerminal"
						align="center"
						label="显示终端"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.clientType || scope.row.clientType + '' === '0'
								"
							>
								{{ typeFilter(scope.row.clientType, 'operateClient') }}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column prop="pageName" align="center" label="启动页名称">
						<template slot-scope="scope">
							<span v-if="!!scope.row.pageName">
								{{ scope.row.pageName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="loadStatus" align="center" label="是否预加载">
						<template slot-scope="scope">
							<span v-if="scope.row.loadStatus + '' === '1'" class="normalRgba">
								是
							</span>
							<span
								v-else-if="scope.row.loadStatus + '' === '0'"
								class="disableRgba"
							>
								否
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="remark" align="center" label="备注">
						<template slot-scope="scope">
							<span v-if="!!scope.row.remark">
								{{ scope.row.remark }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" align="center" label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status + '' === '0'" class="disableRgba">
								{{ typeFilter(scope.row.status, 'operateStatus') }}
							</span>
							<span v-else-if="!!scope.row.status" class="normalRgba">
								{{ typeFilter(scope.row.status, 'operateStatus') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="pictureUrl" align="center" label="图片">
						<template slot-scope="scope">
							<div
								v-if="!!scope.row.pictureUrl"
								class="blueColor decoration"
								@click="preViewPicture(scope.row)"
							>
								点击预览
							</div>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="createdBy" align="center" label="创建人">
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdBy">
								{{ scope.row.createdBy }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdAt">
								{{ scope.row.createdAt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="updatedBy" align="center" label="最近操作人">
						<template slot-scope="scope">
							<span v-if="!!scope.row.updatedBy">
								{{ scope.row.updatedBy }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.updatedAt">
								{{ scope.row.updatedAt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="300"
					>
						<template slot-scope="scope">
							<el-button
								:type="scope.row.status + '' === '0' ? 'success' : 'danger'"
								size="medium"
								@click="recycle(scope.row)"
							>
								<div
									v-if="hasPermission('333') && scope.row.status + '' === '1'"
								>
									禁用
								</div>
								<div
									v-if="hasPermission('333') && scope.row.status + '' !== '1'"
								>
									开启
								</div>
							</el-button>
							<el-button
								v-if="hasPermission('331')"
								type="primary"
								icon="el-icon-edit"
								:disabled="scope.row.status === 1"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>
							<el-button
								v-if="hasPermission('332')"
								type="danger"
								icon="el-icon-delete"
								size="medium"
								:disabled="scope.row.status === 1"
								@click="deleteLabel(scope.row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:total="total"
					:current-page.sync="pageNum"
					class="pageValue"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
			<el-dialog
				:title="title"
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="520px"
				class="rempadding"
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form
					ref="formSub"
					:model="dialogForm"
					label-width="120px"
					:rules="rules"
				>
					<el-form-item label="启动页名称:" prop="pageName">
						<el-input
							v-model="dialogForm.pageName"
							:maxlength="20"
							autocomplete="off"
							style="width: 330px"
							placeholder="请输入"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="显示终端:" prop="clientType">
						<el-select
							v-model="dialogForm.clientType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 330px"
						>
							<el-option
								v-for="item in terminalTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否预加载:" prop="loadStatus">
						<el-select
							v-model="dialogForm.loadStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 330px"
						>
							<el-option
								v-for="item in preLoadArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="启动页上传:" prop="pictureUrl">
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
					</el-form-item>
					<el-form-item label="备注:" prop="remark">
						<el-input
							v-model="dialogForm.remark"
							type="textarea"
							style="width: 330px"
							:maxlength="50"
							show-word-limit
						></el-input>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="subAddOrEdit">保存</el-button>
				</div>
			</el-dialog>
			<el-dialog
				title="图片"
				:visible.sync="dialogPictureVisible"
				:destroy-on-close="true"
				width="750px"
				class="imgCenter"
			>
				<div class="img-box">
					<img v-lazy="pictureUrl" />
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import UploadItem from './components/uploadItem'
// import { isHaveEmoji, notSpecial2 } from '@/utils/validate'

export default {
	name: routerNames.createRiskRank,
	components: { UploadItem },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.deleteLabel = this.throttle(this.deleteLabel, 1000)
		this.subAddOrEdit = this.throttle(this.subAddOrEdit, 1000)
		this.recycle = this.throttle(this.recycle, 1000)
		return {
			queryData: {
				clientType: undefined,
				pageName: undefined,
				loadStatus: '',
				status: '',
				createdBy: undefined,
				updatedBy: undefined,
				configType: 0
			},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {
				clientType: undefined,
				pageName: undefined,
				loadStatus: undefined,
				pictureUrl: null,
				remark: undefined,
				configType: 0
			},
			total: 0,
			title: '',
			pictureUrl: null,
			dialogPictureVisible: false
		}
	},
	computed: {
		terminalTypeArr() {
			return this.globalDics.operateClient
		},
		preLoadArr() {
			return this.globalDics.operateYesNo
		},
		statusArr() {
			return this.globalDics.operateStatus
		},
		rules() {
			const pageName = [
				{ required: true, message: '请输入启动页名称', trigger: 'blur' }
			]
			const clientType = [
				{ required: true, message: '请选择显示终端', trigger: 'change' }
			]
			const loadStatus = [
				{ required: true, message: '请选择是否预加载', trigger: 'change' }
			]
			const pictureUrl = [
				{ required: true, message: '请上传图片', trigger: 'change' }
			]
			const remark = [
				{ required: true, message: '请填写备注', trigger: 'blur' },
				{ min: 2, max: 50, message: '请填写备注', trigger: 'blur' }
			]
			return {
				pageName,
				clientType,
				loadStatus,
				pictureUrl,
				remark
			}
		}
	},
	watch: {},
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
				.clientStartListAPI(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { records, total },
						msg
					} = res
					if (code === 200) {
						this.tableData = records || []
						this.total = total || 0
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				clientType: undefined,
				pageName: undefined,
				loadStatus: '',
				status: '',
				createdBy: undefined,
				updatedBy: undefined,
				configType: 0
			}
			this.loadData()
		},
		addLabel() {
			this.dialogFormVisible = true
			this.$refs['form'].resetFields()
			this.title = '新增'
			this.dialogForm = {
				clientType: undefined,
				pageName: undefined,
				loadStatus: undefined,
				pictureUrl: null,
				remark: undefined,
				configType: 0
			}
		},
		edit(val) {
			this.title = '编辑'
			val.clientType = val.clientType + ''
			val.loadStatus = val.loadStatus + ''
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
			if (this.dialogForm.pictureUrl) {
				this.$nextTick(() => {
					this.$refs.imgUpload.state = 'image'
					this.$refs.imgUpload.fileUrl = val.pictureUrl
				})
			}
		},
		deleteLabel(val) {
			const { id } = val
			this.$confirm(`<strong>确定删除此条配置?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					this.$api
						.clientStartDeleteAPI({ id })
						.then((res) => {
							loading.close()
							const { code } = res
							if (code === 200) {
								this.$message.success('删除成功')
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
					setTimeout(() => {
						loading.close()
					}, 1000)
				})
				.catch(() => {})
		},
		subAddOrEdit() {
			const params = {
				...this.dialogForm
			}
			const handleClick =
				this.title !== '编辑'
					? this.$api.clientStartAddAPI
					: this.$api.clientStartUpdateAPI
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					handleClick(params).then((res) => {
						const { code, msg } = res
						if (code === 200) {
							this.$message({
								message: `${this.title !== '编辑' ? '新增' : '更新'}成功`,
								type: 'success'
							})
						} else {
							this.$message({
								message: msg,
								type: 'error'
							})
						}
					})
					this.dialogFormVisible = false
					setTimeout(() => {
						this.loadData()
					}, 1000)
				}
			})
		},
		checkValue(e) {
			// const { value } = e.target
		},
		_changeTableSort({ column, prop, order }) {
			if (order) {
				if (prop === 'createdAt') {
					prop = 0
				}
				if (prop === 'updatedAt') {
					prop = 1
				}
				this.queryData.orderKey = prop
				if (order === 'ascending') {
					// 升序
					this.queryData.orderType = 'asc'
				} else if (column.order === 'descending') {
					// 降序
					this.queryData.orderType = 'desc'
				}
			} else {
				this.queryData.orderKey = undefined
				this.queryData.orderType = undefined
			}
			this.loadData()
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		preViewPicture(val) {
			const { pictureUrl } = val
			this.pictureUrl = pictureUrl
			this.dialogPictureVisible = true
		},
		recycle(val) {
			const { id } = val
			const status = val.status === 0 ? 1 : 0
			this.$confirm(
				`<strong>是否对该配置进行开启/禁用操作</strong></br>
                 <span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api.clientStartUseAPI({ id, status }).then((res) => {
						const { code, msg } = res
						if (code === 200) {
							this.$message({
								message: '操作成功',
								type: 'success'
							})
						} else {
							this.$message({
								message: msg,
								type: 'error'
							})
						}
						this.loadData()
					})
				})
				.catch(() => {})
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
/deep/.el-dialog__header {
	text-align: center;
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
.bodyBox {
	max-height: 400px;
	overflow: auto;
}
p {
	display: flex;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #e8e8e8;
	justify-content: space-around;
	span {
		display: inline-block;
		width: 50%;
		text-align: center;
	}
}
.headerBox {
	color: #000000d8;
	background: #fafafa;
	font-family: 'PingFang SC ', 'PingFang SC', sans-serif;
	font-weight: 650;
	border-top: 1px solid #e8e8e8;
	margin-top: 15px;
}
.imgCenter {
	.img-box {
		height: 500px;
		img {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
