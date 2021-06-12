<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="显示终端:">
						<el-select
							v-model="queryData.supportTerminal"
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
							v-model="queryData.startPageName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 200px"
							maxlength="20"
							oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						></el-input>
					</el-form-item>
					<el-form-item label="是否预加载:">
						<el-select
							v-model="queryData.preLoad"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
						>
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
							v-model="queryData.createBy"
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
							<span v-if="!!scope.row.supportTerminal">
								{{ scope.row.supportTerminal }}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlLevelName"
						align="center"
						label="启动页名称"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlLevelName">
								{{ scope.row.windControlLevelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="是否预加载">
						<template slot-scope="scope">
							<span v-if="!!scope.row.description">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="备注">
						<template slot-scope="scope">
							<span v-if="!!scope.row.description">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="状态">
						<template slot-scope="scope">
							<span v-if="!!scope.row.description">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="图片">
						<template slot-scope="scope">
							<div
								v-if="!!scope.row.description"
								class="blueColor decoration"
								@click="preViewPicture(scope.row)"
							>
								{{ scope.row.description }}
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
						width="160px"
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
						width="160px"
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
						width="300px"
					>
						<template slot-scope="scope">
							<el-button
								:type="scope.row.assortStatus ? 'danger' : 'success'"
								size="medium"
								@click="recycle(scope.row)"
							>
								<div v-if="scope.row.assortStatus">
									禁用
								</div>
								<div v-else>
									开启
								</div>
							</el-button>
							<el-button
								type="primary"
								icon="el-icon-edit"
								:disabled="loading"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>
							<el-button
								type="danger"
								icon="el-icon-delete"
								:disabled="loading"
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
				title="新增/编辑"
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
					<el-form-item label="启动页名称:" prop="startPageName">
						<el-input
							v-model="dialogForm.startPageName"
							:maxlength="20"
							autocomplete="off"
							style="width: 330px"
							placeholder="请输入"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="显示终端:" prop="supportTerminal">
						<el-select
							v-model="dialogForm.supportTerminal"
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
					<el-form-item label="是否预加载:" prop="preLoad">
						<el-select
							v-model="dialogForm.preLoad"
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
					<el-form-item label="启动页上传:" prop="imageAddress">
						<UploadItem
							ref="imgUpload"
							:upload-file-type="'image'"
							:platform="'PC'"
							:img-urls="queryData.imageAddress"
							@upoladItemSucess="handleUploadSucess"
							@startUpoladItem="handleStartUpload"
							@deleteUpoladItem="handleDeleteUpload"
							@upoladItemDefeat="handleUploadDefeat"
						></UploadItem>
					</el-form-item>
					<el-form-item label="备注:" prop="description">
						<el-input
							v-model="dialogForm.description"
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
				width="650px"
				class="imgCenter"
			>
				<img :src="imageAddress" />
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import UploadItem from '@/components/UploadItem'
// import { isHaveEmoji, notSpecial2 } from '@/utils/validate'

export default {
	name: routerNames.createRiskRank,
	components: { UploadItem },
	mixins: [list],
	data() {
		return {
			queryData: {
				supportTerminal: undefined,
				startPageName: undefined,
				preLoad: '1',
				status: '1',
				createdBy: undefined,
				updatedBy: undefined
			},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {
				supportTerminal: undefined,
				startPageName: undefined,
				preLoad: undefined,
				imageAddress: null,
				description: undefined
			},
			total: 0,
			title: '',
			imageAddress: null,
			dialogPictureVisible: false
		}
	},
	computed: {
		terminalTypeArr() {
			return this.globalDics.terminalnType
		},
		preLoadArr() {
			return [
				{ description: '全部', code: '1' },
				{ description: '是', code: '2' },
				{ description: '否', code: '3' }
			]
		},
		statusArr() {
			return [
				{ description: '全部', code: '1' },
				{ description: '已开启', code: '2' },
				{ description: '禁用', code: '3' }
			]
		},
		rules() {
			const startPageName = [
				{ required: true, message: '请填入风控层级', trigger: 'blur' }
			]
			const supportTerminal = [
				{ required: true, message: '请选择显示终端', trigger: 'change' }
			]
			const preLoad = [
				{ required: true, message: '请选择是否预加载', trigger: 'change' }
			]
			const imageAddress = [
				{ required: true, message: '请上传图片', trigger: 'change' }
			]
			const description = [
				{ required: true, message: '请填写备注', trigger: 'blur' },
				{ min: 2, max: 50, message: '请填写备注', trigger: 'blur' }
			]
			return {
				startPageName,
				supportTerminal,
				preLoad,
				imageAddress,
				description
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
			// const idx = params.windControlLevelName.findIndex(
			// 	(item) => item === 'all'
			// )
			// params.windControlLevelName.splice(idx, 1)
			this.$api
				.riskRankListAPI(params)
				.then((res) => {
					const { code, data } = res
					if (code === 200) {
						this.tableData = data.record
						this.total = data.totalRecord
						this.loading = false
					} else {
						this.loading = false
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
			this.$refs['form'].resetFields()
			this.queryData = {
				supportTerminal: undefined,
				startPageName: undefined,
				preLoad: '1',
				status: '1',
				createdBy: undefined,
				updatedBy: undefined
			}
			this.loadData()
		},
		switchClick(val) {
			const status = val.labelStatus === 0 ? 1 : 0
			console.log(val)
			this.$confirm(
				`<strong>是否对 ${val.gameLabelName} 进行${
					val.labelStatus === 1 ? '启用' : '禁用'
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
						.setUpdateStatus({ id: val.id, status: status })
						.then((res) => {
							if (res.code === 200) {
								this.loadData()
							}
						})
				})
				.catch(() => {})
		},
		addLabel() {
			this.dialogFormVisible = true
			this.$refs['form'].resetFields()
			this.title = '新增'
			this.dialogForm = {
                supportTerminal: undefined,
                startPageName: undefined,
                preLoad: undefined,
                imageAddress: null,
                description: undefined
			}
		},
		edit(val) {
			this.title = '编辑'
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
		},
		deleteLabel(val) {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const { id } = val
			this.$confirm(`<strong>确定删除此条配置?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api
						.deleteRiskRankAPI({ id })
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
				})
				.catch(() => {
					loading.close()
				})

			setTimeout(() => {
				loading.close()
			}, 1000)
		},
		subAddOrEdit() {
			const params = {
				...this.dialogForm
			}
			const handleClick =
				this.title !== '编辑'
					? this.$api.createRiskRankAPI
					: this.$api.updateRiskRankAPI
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					handleClick(params).then((res) => {
						const { code, msg } = res
						if (code === 200) {
							this.$message({
								message: `${this.title !== '编辑' ? '新增' : '更新'}成功`,
								type: 'success'
							})
							this.reset()
						} else {
							this.$message({
								message: msg,
								type: 'error'
							})
						}
					})
					this.dialogFormVisible = false
				}
			})
		},
		checkValue(e) {
			// const { value } = e.target
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
				prop = 1
			}
			if (prop === 'updatedAt') {
				prop = 2
			}
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			}
			this.loadData()
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		preViewPicture(val) {
			const { imageAddress } = val
			this.imageAddress = imageAddress
			this.dialogPictureVisible = true
		},
		recycle(val) {
			const { id, assortStatus } = val
			const status = !assortStatus
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
					this.$api
						.gameUpdateStatusAPI({ assortId: id, status })
						.then((res) => {
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
			this.queryData.imageAddress = file.imgUrl
		},
		handleUploadDefeat() {
			this.queryData.imageAddress = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.queryData.imageAddress = ''
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
</style>
