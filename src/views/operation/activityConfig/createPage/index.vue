<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="活动页签:" class="tagheight">
						<el-select
							v-model="queryData.ids"
							style="width: 200px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameList"
								:key="item.id"
								:label="item.activityName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态:" class="tagheight">
						<el-select
							v-model="queryData.status"
							style="width: 200px"
							clearable
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
							style="width: 200px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="最近操作人:">
						<el-input
							v-model="queryData.updatedBy"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 200px"
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
							icon="el-icon-refresh-left"
							:disabled="loading"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							v-if="hasPermission('308')"
							type="warning"
							icon="el-icon-folder"
							:disabled="loading"
							size="medium"
							@click="addLabel"
						>
							新增
						</el-button>
						<el-button
							v-if="hasPermission('312')"
							type="warning"
							icon="el-icon-sort"
							:disabled="loading"
							size="medium"
							@click="activepage"
						>
							优惠活动页签排序
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
						prop="activityTagName"
						align="center"
						label="活动页签"
						width="180"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.activityTagName || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="activityTagRemark"
						align="center"
						label="备注"
						width="220"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.activityTagRemark || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="status"
						align="center"
						label="状态"
						width="160"
					>
						<template slot-scope="scope">
							<div v-if="scope.row.status === 0" class="disableRgba">
								已禁用
							</div>
							<div v-else-if="scope.row.status === 1" class="normalRgba">
								开启中
							</div>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						label="创建人"
						width="180"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.createdBy || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						width="220"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.createdAt || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="最近操作人"
						width="180"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.updatedBy || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						width="220"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.updatedAt || '-' }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						min-width="300"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('311') && scope.row.status === 0"
								:disabled="loading"
								type="success"
								size="medium"
								class="noicon"
								@click="switchClick(scope.row)"
							>
								开启
							</el-button>
							<el-button
								v-if="hasPermission('311') && scope.row.status !== 0"
								:disabled="loading"
								type="danger"
								size="medium"
								class="noicon"
								@click="switchClick(scope.row)"
							>
								禁用
							</el-button>
							<el-button
								v-if="hasPermission('309')"
								type="primary"
								icon="el-icon-edit"
								:disabled="scope.row.status === 1"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>

							<el-button
								v-if="hasPermission('310')"
								type="danger"
								icon="el-icon-delete"
								:disabled="scope.row.status === 1"
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
					v-show="tableData.length > 0"
					:current-page.sync="pageNum"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="[5, 10, 20]"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
			<el-dialog
				title="创建/编辑"
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="480px"
				class="rempadding"
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form ref="formSub" :model="dialogForm" label-width="90px">
					<el-form-item
						label="活动页签:"
						prop="activityTagName"
						:rules="[
							{ required: true, message: '请输入活动页签', trigger: 'blur' },
							{
								min: 1,
								max: 10,
								message: '长度在 1 到 10 个字符',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="dialogForm.activityTagName"
							:maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="备注:"
						prop="activityTagRemark"
						:rules="[
							{ required: true, message: '请输入备注内容', trigger: 'blur' },
							{
								min: 1,
								max: 50,
								message: '长度在 1 到 50 个字符',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="dialogForm.activityTagRemark"
							placeholder="请输入"
							maxlength="50"
							show-word-limit
							clearable
							type="textarea"
						></el-input>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="subAddOrEidt">保存</el-button>
				</div>
			</el-dialog>
			<el-dialog
				title="活动页签区域排序"
				:visible.sync="sortLabel"
				width="970px"
				:destroy-on-close="true"
			>
				<draggable v-model="carouselData" @start="onStart" @end="onEnd">
					<transition-group class="sortCss">
						<div
							v-for="itme in carouselData"
							:key="itme.id"
							:class="{ open: itme.status === 1, close: itme.status === 0 }"
						>
							{{ itme.activityName }}({{
								typeFilter(itme.status, 'operateStatus')
							}})
						</div>
					</transition-group>
				</draggable>
				<div slot="footer" class="dialog-footer">
					<el-button @click="sortLabel = false">取消</el-button>
					<el-button type="primary" @click="setoperateConfigDiscountTagSort">
						确定
					</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import draggable from 'vuedraggable'
export default {
	name: routerNames.gameLabel,
	components: { draggable },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.activepage = this.throttle(this.activepage, 1000)
		this.setoperateConfigDiscountTagSort = this.throttle(
			this.setoperateConfigDiscountTagSort,
			1000
		)
		this.switchClick = this.throttle(this.switchClick, 1000)
		this.deleteLabel = this.throttle(this.deleteLabel, 1000)
		this.subAddOrEidt = this.throttle(this.subAddOrEidt, 1000)
		return {
			carouselData: [],
			queryData: {
				ids: [],
				status: undefined,
				createdBy: undefined,
				orderAsc: undefined,
				orderDesc: undefined,
				updatedBy: undefined
			},
			sortLabel: false,
			tableData: [],
			gameList: [],
			dialogFormVisible: false,
			dialogForm: {},
			title: '',
			total: 0
		}
	},
	computed: {
		operateStatus() {
			return this.globalDics.operateStatus || []
		}
	},
	mounted() {
		this.loadGame()
	},
	methods: {
		// 开始拖拽事件
		onStart() {
			this.drag = true
		},
		// 拖拽结束事件
		onEnd() {
			this.drag = false
		},
		// 排序确定

		loadGame() {
			this.$api
				.configDiscountTagQueryNames()
				.then((res) => {
					if (res?.code === 200) {
						this.gameList = res.data || []
					}
				})
				.catch(() => {
					this.loading = false
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
				.configDiscountTagQueryList(params)
				.then((res) => {
					if (res?.code === 200) {
						const { records, total } = res.data || {}
						this.tableData = Array.isArray(records)
							? Object.freeze(records)
							: []
						this.total = total || 0
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		activepage() {
			this.$api.operateConfigDiscountTagQuerySortedNames().then((res) => {
				if (res?.code === 200) {
					this.carouselData = res.data || []
				}
			})
			this.sortLabel = true
		},
		setoperateConfigDiscountTagSort() {
			const arr = this.carouselData
			const newArr = []
			for (let i = 0; i < arr.length; i++) {
				const ele = arr[i]
				newArr.push(ele.id)
			}
			const sortIds = newArr.join(',')
			this.$api
				.setoperateConfigDiscountTagSort({ sortIds: sortIds })
				.then((res) => {
					this.sortLabel = false
					if (res?.code === 200) {
						this.$message({
							message: '操作成功！',
							type: 'success'
						})
					}
				})
			this.loadData()
		},
		reset() {
			this.queryData = {
				ids: [],
				status: undefined,
				createdBy: undefined,
				updatedBy: undefined,
				orderAsc: undefined,
				orderDesc: undefined
			}
			this.pageNum = 1
			this.loadData()
		},
		switchClick(val) {
			const status = val.status === 0 ? 1 : 0
			console.log(val)
			this.$confirm(
				`<strong>是否对 ${val.activityTagName} 进行${
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
						.configDiscountTagUse({ id: val.id, status: status })
						.then((res) => {
							if (res?.code === 200) {
								this.loadData()
							}
						})
				})
				.catch(() => {})
		},
		addLabel() {
			this.title = '新增'
			this.dialogForm = {}
			this.dialogFormVisible = true
		},
		edit(val) {
			this.title = '编辑'
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
		},
		deleteLabel(val) {
			const data = {}
			data.id = val.id
			this.$confirm(`<strong>确定删除此条标签类型吗?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api.configDiscountTagDelete(data).then((res) => {
						if (res?.code === 200) {
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
			data.id = this.dialogForm.id
			data.activityTagRemark = this.dialogForm.activityTagRemark
			data.activityTagName = this.dialogForm.activityTagName
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					if (this.title === '新增') {
						console.log('新增')
						this.$api.configDiscountTagAdd(data).then((res) => {
							if (res?.code === 200) {
								this.$message.success('创建成功')
								this.pageNum = 1
								this.loadData()
							}
						})
					} else {
						this.$api.configDiscountTagEdit(data).then((res) => {
							if (res?.code === 200) {
								this.$message.success('修改成功')
								this.loadData()
							}
						})
					}
					this.dialogFormVisible = false
				}
			})
		},
		_changeTableSort({ column, prop, order }) {
			const obj = {
				createdAt: 0,
				updatedAt: 1
			}
			this.queryData.orderKey = obj[prop]
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		enterSubmit() {
			this.loadData()
		},
		handleCurrentChange() {
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
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
