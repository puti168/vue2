<template>
	<transition name="fade-transform" mode="out-in">
		<div v-if="!createPage" class="game-container report-container">
			<div class="view-container dealer-container">
				<div class="params">
					<el-form
						ref="form"
						:inline="true"
						:model="queryData"
						label-width="80px"
					>
						<el-form-item label="分类顺序:">
							<el-input
								v-model="queryData.assortSortMin"
								size="medium"
								placeholder="最小数值"
								style="width: 110px"
								maxlength="5"
								name="assortSortMin"
								oninput="value=value.replace(/[^\d]/g,'')"
								@blur="checkValue($event)"
							></el-input>
							-
							<el-input
								v-model="queryData.assortSortMax"
								size="medium"
								placeholder="最大数值"
								style="width: 110px"
								maxlength="5"
								name="assortSortMax"
								oninput="value=value.replace(/[^\d]/g,'')"
								@blur="checkValue($event)"
							></el-input>
						</el-form-item>
						<el-form-item label="分类名称:">
							<el-input
								v-model="queryData.assortName"
								size="medium"
								placeholder="请输入"
								clearable
								style="width: 230px"
								maxlength="10"
							></el-input>
						</el-form-item>
						<el-form-item label="显示状态:">
							<el-select
								v-model="queryData.assortStatus"
								size="medium"
								placeholder="默认选择全部"
								clearable
								multiple
								style="width: 230px"
							>
								<el-option
									v-for="item in assortStatusArr"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="支持终端:">
							<el-select
								v-model="queryData.supportTerminal"
								size="medium"
								placeholder="默认选择全部"
								clearable
								multiple
								collapse-tags
								style="width: 230px"
							>
								<el-option
									v-for="item in terminalTypeArr"
									:key="item.code"
									:label="item.description"
									:value="item.description"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="客户端分类显示:"
							label-width="130px"
							prop="clientDisplay"
						>
							<el-select
								v-model="queryData.clientDisplay"
								size="medium"
								placeholder="全部"
								clearable
								style="width: 200px"
							>
								<el-option
									v-for="item in gameDisplayArr"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item style="margin-left: 5px">
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
								v-if="hasPermission('1020115')"
								type="warning"
								icon="el-icon-folder-add"
								size="medium"
								@click.native="openEdit('')"
							>
								创建
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
						:data="dataList"
						style="width: 100%"
						:header-cell-style="getRowClass"
						@sort-change="_changeTableSort"
					>
						<el-table-column
							prop="assortSort"
							align="center"
							label="分类顺序"
							width="100px"
							sortable="custom"
						>
							<template slot-scope="scope">
								{{ scope.row.assortSort || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="assortName"
							align="center"
							label="分类名称"
							width="150px"
						>
							<template slot-scope="scope">
								<Copy
									v-if="!!scope.row.assortName"
									:title="scope.row.assortName"
									:copy="copy"
								>
									{{ scope.row.assortName }}
								</Copy>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="assortStatus"
							align="center"
							label="使用状态"
							width="110px"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.assortStatus" class="normalRgba">
									开启中
								</div>
								<div v-else-if="!scope.row.assortStatus" class="disableRgba">
									已禁用
								</div>
								<div v-else>-</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="clientDisplay"
							align="center"
							label="客户端分类显示"
							width="150px"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.clientDisplay" class="normalRgba">
									显示
								</div>
								<div
									v-else-if="scope.row.clientDisplay === false"
									class="disableRgba"
								>
									不显示
								</div>
								<div v-else>-</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="supportTerminal"
							align="center"
							label="支持终端类型"
							width="150px"
						>
							<template slot-scope="scope">
								{{ scope.row.supportTerminal || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="gameNumber"
							align="center"
							label="包含子游戏"
							width="100px"
						>
							<template slot-scope="scope">
								<div
									v-if="scope.row.gameNumber"
									class="blueColor decoration"
									@click="lookGame(scope.row)"
								>
									{{ scope.row.gameNumber }} 款
								</div>
								<div v-else>-</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="remark"
							align="center"
							label="备注信息"
							width="180px"
						>
							<template slot-scope="scope">
								{{ scope.row.remark || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="createdBy"
							align="center"
							width="100px"
							label="创建人"
						>
							<template slot-scope="scope">
								{{ scope.row.createdBy || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="createdAt"
							align="center"
							label="创建时间"
							width="180px"
							sortable="custom"
						>
							<template slot-scope="scope">
								{{ scope.row.createdAt || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="updatedBy"
							align="center"
							label="最近操作人"
							width="100px"
						>
							<template slot-scope="scope">
								{{ scope.row.updatedBy || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="updatedAt"
							align="center"
							label="最近操作时间"
							width="180px"
							sortable="custom"
						>
							<template slot-scope="scope">
								{{ scope.row.updatedAt || '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="操作" width="300px">
							<template slot-scope="scope">
								<el-button
									v-if="hasPermission('1020116')"
									:type="scope.row.assortStatus ? 'danger' : 'success'"
									size="medium"
									@click="recycle(scope.row)"
								>
									{{ scope.row.assortStatus ? '禁用' : '开启' }}
								</el-button>
								<el-button
									v-if="hasPermission('1020117')"
									type="primary"
									icon="el-icon-edit"
									size="medium"
									:disabled="scope.row.assortStatus"
									@click="openEdit(scope.row)"
								>
									编辑信息
								</el-button>
								<el-button
									v-if="hasPermission('1020117')"
									type="warning"
									icon="el-icon-delete"
									size="medium"
									:disabled="scope.row.assortStatus"
									@click="deleteRow(scope.row)"
								>
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<el-pagination
						v-show="!!dataList.length"
						class="pageValue"
						:current-page.sync="pageNum"
						background
						layout="total, sizes,prev, pager, next, jumper"
						:page-size="pageSize"
						:page-sizes="$store.getters.pageSizes"
						:total="total"
						@current-change="handleCurrentChange"
						@size-change="handleSizeChange"
					></el-pagination>
				</div>
			</div>
			<el-dialog
				v-loading="loadingT"
				title="分类游戏"
				:visible.sync="dialogGameVisible"
				:destroy-on-close="true"
				width="650px"
				class="classify"
			>
				<p class="headerBox">
					<span>游戏名称</span>
					<span>添加时间</span>
				</p>
				<div
					v-for="(item, idx) in childDataList"
					:key="idx + 'index'"
					class="bodyBox"
				>
					<p>
						<span>{{ item.gameName }}</span>
						<span>{{ item.createAt }}</span>
					</p>
				</div>
				<el-pagination
					v-show="childTotal"
					:current-page.sync="pageChildNum"
					background
					class="pagePopValue"
					:pager-count="5"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageChildSize"
					:page-sizes="[5, 10, 15]"
					:total="childTotal"
					@current-change="handleChilldCurrentChange"
					@size-change="handleChildSizeChange"
				></el-pagination>
			</el-dialog>
		</div>
		<createPage
			v-else
			:rowData="rowData"
			:rowAssortId="rowAssortId"
			:editType="editType"
			@back="back"
		></createPage>
	</transition>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.gameClassification,
	components: {
		createPage: () => import('./components/createPage')
	},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {
				assortSortMin: undefined,
				assortSortMax: undefined,
				assortName: undefined,
				assortStatus: undefined,
				supportTerminal: undefined,
				clientDisplay: undefined,
				orderKey: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
			childDataList: [],
			childTotal: 0,
			pageChildNum: 1,
			pageChildSize: 10,
			currentGameId: undefined,
			loadingT: false,
			vipDict: [],
			userLabel: [],
			dialogGameVisible: false,
			createPage: false,
			rowAssortId: '',
			editType: 'add',
			rowData: {}
		}
	},
	computed: {
		assortStatusArr() {
			return this.globalDics.gameAssortStatusType || []
		},
		terminalTypeArr() {
			return this.globalDics.betDeviceType || []
		},
		gameDisplayArr() {
			return this.globalDics.gameDisplayType || []
		}
	},
	created() {},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			params.assortStatus =
				params.assortStatus && params.assortStatus.length
					? params.assortStatus.join(',')
					: undefined
			params.supportTerminal =
				params.supportTerminal && params.supportTerminal.length
					? params.supportTerminal.join(',')
					: undefined
			params.clientDisplay =
				params.clientDisplay && params.clientDisplay * 1 === 1
			this.$api
				.gameAssortListAPI(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res || {}
					if (code && code === 200) {
						this.loading = false
						this.dataList =
							(record && record.length && Object.freeze(record)) || []
						this.total = totalRecord || 0
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				assortSortMin: undefined,
				assortSortMax: undefined,
				assortName: undefined,
				assortStatus: [],
				supportTerminal: [],
				clientDisplay: '',
				orderKey: undefined,
				orderType: undefined
			}
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			const obj = {
				assortSort: 1,
				createdAt: 2,
				updatedAt: 3
			}
			this.queryData.orderKey = prop && obj[prop]
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
		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'assortSortMin':
					if (
						!!this.queryData.assortSortMax &&
						(value && value * 1 > this.queryData.assortSortMax * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.assortSortMax}天数`
						})
					} else {
						this.queryData.assortSortMin = value
					}
					break
				case 'assortSortMax':
					if (
						!!this.queryData.assortSortMin &&
						(value && value * 1 < this.queryData.assortSortMin * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.assortSortMin}天数`
						})
					} else {
						this.queryData.assortSortMax = value
					}
					break
			}
		},

		openEdit(val) {
			if (val) {
				const { id } = val
				this.rowData = val
				this.rowAssortId = id
				this.editType = 'edit'
			} else {
				this.rowData = {}
				this.editType = 'add'
			}
			this.createPage = true
		},
		back() {
			this.createPage = false
			this.loadData()
		},
		recycle(val) {
			const { id, assortStatus } = val
			const status = !assortStatus
			this.$confirm(
				`<strong>是否对子游戏进行开启/禁用操作</strong></br>
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
							const { code, msg } = res || {}
							if (code && code === 200) {
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
		lookGame(val) {
			this.dialogGameVisible = true
			const { id } = val
			this.currentGameId = id
			const params = {
				assortId: this.currentGameId,
				pageNum: this.pageChildNum,
				pageSize: 10
			}
			this.fetchGameChildList(params)
		},
		fetchGameChildList(params) {
			this.loadingT = true
			this.$api
				.queryChildGamePageAPI(params)
				.then((res) => {
					this.loadingT = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res || {}
					if (code && code === 200) {
						this.childDataList =
							(record && record.length && Object.freeze(record)) || []
						this.childTotal = totalRecord || 0
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loadingT = false
				})
		},
		deleteRow(val) {
			const { id } = val
			this.$confirm('确定删除此游戏吗?', {
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
						.gameDeleteAPI({ id })
						.then((res) => {
							loading.close()
							const { code } = res || {}
							if (code && code === 200) {
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
		handleChilldCurrentChange(value) {
			this.pageChildNum = value
			const params = {
				assortId: this.currentGameId,
				pageNum: this.pageChildNum,
				pageSize: this.pageChildSize
			}
			this.fetchGameChildList(params)
		},
		// 改变列表条数
		handleChildSizeChange(value) {
			console.log('value', value)
			this.pageChildNum = 1
			this.pageChildSize = value
			const params = {
				assortId: this.currentGameId,
				pageNum: this.pageChildNum,
				pageSize: this.pageChildSize
			}
			this.fetchGameChildList(params)
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
.decoration {
	text-decoration: underline;
	cursor: pointer;
}

/deep/ .classify .el-dialog__body {
	padding: 0 0 30px;
	.contentBox {
		padding: 0 20px;
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
}
</style>
