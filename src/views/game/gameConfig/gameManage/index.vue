<template>
	<div class="game-container report-container">
		<div v-if="!showDetail" class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="80px"
				>
					<el-form-item label="游戏ID:">
						<el-input
							v-model="queryData.gameId"
							clearable
							:maxlength="5"
							oninput="value=value.replace(/[^\d]/g,'')"
							size="medium"
							style="width: 310px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="游戏名称:">
						<el-input
							v-model="queryData.gameName"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 310px;"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="显示状态:" class="tagheight">
						<el-select
							v-model="queryData.gameStatusList"
							style="width: 310px"
							multiple
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="支持终端:" class="tagheight">
						<el-select
							v-model="queryData.supportTerminalList"
							style="width: 310px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in betDeviceType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图标状态:" class="tagheight">
						<el-select
							v-model="queryData.gameIconList"
							style="width: 310px"
							multiple
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameIconType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="关联推荐游戏:"
						class="tagheight"
						label-width="108px"
					>
						<el-select
							v-model="queryData.relationOtherGameIdList"
							style="width: 281px"
							multiple
							collapse-tags
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameManageList"
								:key="item.gameId"
								:label="item.gameName"
								:value="item.gameId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="游戏平台:" class="tagheight">
						<el-select
							v-model="queryData.gamePlatformList"
							style="width: 310px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gamePlantList"
								:key="item.gameCode"
								:label="item.gameName"
								:value="item.gameCode"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="游戏标签:" class="tagheight">
						<el-select
							v-model="queryData.gameLabelIdList"
							style="width: 310px"
							multiple
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in labelList"
								:key="item.gameLabelId"
								:label="item.gameLabelName"
								:value="item.gameLabelId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="配置返水:" class="tagheight">
						<el-select
							v-model="queryData.configRebateStatus"
							clearable
							style="width: 310px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in configRebateStatus"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
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
							v-if="hasPermission('1020111')"
							type="warning"
							icon="el-icon-folder"
							:disabled="loading"
							size="medium"
							@click="openEdit()"
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
					:data="list"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="gameId"
						align="center"
						label="游戏ID"
						sortable="custom"
						width="100px"
					></el-table-column>
					<el-table-column align="center" label="游戏平台" width="120px">
						<template slot-scope="scope">
							{{ gamePlantFilter(scope.row.gamePlatform) }}
						</template>
					</el-table-column>
					<el-table-column
						prop="gameName"
						align="center"
						label="游戏名称"
						width="120px"
					></el-table-column>
					<el-table-column align="center" label="显示状态" width="90px">
						<template slot-scope="scope">
							<span
								:class="
									Number(scope.row.gameStatus) === 0
										? 'disableRgba'
										: Number(scope.row.gameStatus) === 1
										? 'normalRgba'
										: 'deleteRgba'
								"
							>
								{{ typeFilter(scope.row.gameStatus, 'gameStatusType') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="支持终端" width="200">
						<template slot-scope="scope">
							{{ supportTerminalFilter(scope.row.supportTerminal) }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="图标状态">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.gameIcon, 'gameIconType') }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="游戏图片" width="80px">
						<template slot-scope="scope">
							<span class="text-link" @click="lookGame(scope.row.imageAddress)">
								点击预览
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="description"
						align="center"
						label="游戏描述"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.description || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="relationOtherGameId"
						align="center"
						label="关联推荐游戏"
						width="200px"
					>
						<template slot-scope="scope">
							{{ gameManageListFilter(scope.row.relationOtherGameId) }}
						</template>
					</el-table-column>
					<el-table-column
						prop="relationGameModuleId"
						align="center"
						label="关联游戏模块"
						width="160px"
					>
						<template slot-scope="scope">
							{{ moduleFilter(scope.row.relationGameModuleId) }}
						</template>
					</el-table-column>
					<el-table-column
						prop="gameLabelName"
						align="center"
						label="游戏标签"
						width="100px"
					>
						<template slot-scope="scope">
							{{ scope.row.label1 ? scope.row.label1.gameLabelName : '-' }}/
							{{ scope.row.label2 ? scope.row.label2.gameLabelName : '-' }}/
							{{ scope.row.label3 ? scope.row.label3.gameLabelName : '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="备注信息"
						width="160px"
					>
						<template slot-scope="scope">
							{{ scope.row.remark || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="initFavoritesNum"
						align="center"
						label="初始收藏数额"
						width="160px"
					></el-table-column>
					<el-table-column
						prop="increaseAmountOneTime"
						align="center"
						label="随机增加收藏数"
						width="160px"
					>
						<template slot-scope="scope">
							{{ scope.row.increaseAmountOneTime || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="configRebateStatus"
						align="center"
						label="配置返水"
					>
						<template slot-scope="scope">
							{{
								typeFilter(scope.row.configRebateStatus, 'configRebateStatus')
							}}
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
						width="160px"
					>
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="最近操作人"
						width="120px"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedBy || '-' }}
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
							{{ scope.row.updatedAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="240px"
					>
						<template slot-scope="scope">
							<el-button
								v-if="
									Number(scope.row.gameStatus) !== 0 && hasPermission('1020113')
								"
								:disabled="loading"
								type="danger"
								size="medium"
								class="noicon"
								@click="changeStatus(scope.row.id, 0)"
							>
								禁用
							</el-button>
							<el-button
								v-if="
									Number(scope.row.gameStatus) !== 1 && hasPermission('1020112')
								"
								:disabled="loading"
								type="success"
								size="medium"
								class="noicon"
								@click="changeStatus(scope.row.id, 1)"
							>
								开启
							</el-button>
							<el-button
								v-if="
									Number(scope.row.gameStatus) !== 2 && hasPermission('1020112')
								"
								:disabled="loading"
								type="warning"
								size="medium"
								class="noicon"
								@click="changeStatus(scope.row.id, 2)"
							>
								维护
							</el-button>
							<el-button
								v-if="hasPermission('1020114')"
								type="primary"
								icon="el-icon-edit"
								:disabled="loading || Number(scope.row.gameStatus) === 1"
								size="medium"
								@click="openEdit(scope.row)"
							>
								编辑信息
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
				title="图片"
				:visible.sync="dialogGameVisible"
				:destroy-on-close="true"
				width="750px"
				class="imgCenter"
			>
				<div class="img-box">
					<img v-lazy="bigImage" />
				</div>
			</el-dialog>
		</div>
		<gameManagementEdit
			v-else
			:rowData="rowData"
			:editType="editType"
			:labelList="labelList"
			:gameModuleNameList="gameModuleNameList"
			:gameManageList="gameManageList"
			:gamePlantList="gamePlantList"
			@closeEdit="closeEdit"
			@refresh="search"
		></gameManagementEdit>
	</div>
</template>

<script>
import list from '@/mixins/list'
import gameManagementEdit from './components/gameManagementEdit'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
export default {
	name: routerNames.gameManagement,
	components: { gameManagementEdit },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {
				gameId: undefined,
				gameName: undefined,
				accountType: [],
				gameLabelIdList: [],
				gamePlatformList: [],
				gameIconList: [],
				relationOtherGameIdList: [],
				supportTerminalList: [],
				gameStatusList: []
			},
			rowData: {},
			showDetail: false,
			labelList: [],
			gameModuleNameList: [],
			gameManageList: [],
			gamePlantList: [],
			bigImage: '',
			editType: '',
			now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			dialogGameVisible: false
		}
	},
	computed: {
		gameStatusType() {
			return this.globalDics.gameStatusType || []
		},
		betDeviceType() {
			return this.globalDics.betDeviceType || []
		},
		gameIconType() {
			return this.globalDics.gameIconType || []
		},
		configRebateStatus() {
			return this.globalDics.configRebateStatus || []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		loadData() {
			const params = {
				...this.getParams(this.queryData)
			}
			this.loading = true
			this.$api
				.gameList(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res || {}
					if (code && code === 200) {
						this.loading = false
						this.list = (record && record.length && Object.freeze(record)) || []
						this.total = totalRecord || 0
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		getList() {
			// 游戏标签
			this.$api
				.gameLabelList()
				.then((res) => {
					if (res && res.code === 200) {
						this.labelList = res.data || []
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {})
			// 关联游戏模块
			this.$api
				.gameModuleNameList()
				.then((res) => {
					if (res && res.code === 200) {
						this.gameModuleNameList = res.data || []
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {})
			// 游戏平台
			this.$api
				.gamePlant()
				.then((res) => {
					if (res && res.code === 200) {
						this.gamePlantList = res.data || []
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {})
			// 关联推荐游戏
			this.$api
				.gameManageList()
				.then((res) => {
					if (res && res.code === 200) {
						this.gameManageList = res.data || []
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {})
		},
		gamePlantFilter(val) {
			if (!this.gamePlantList.length) return
			let name = '-'
			this.gamePlantList.forEach((item) => {
				if (item.gameCode === val) {
					name = item.gameName
				}
			})
			return name
		},
		gameManageListFilter(val) {
			if (!this.gameManageList.length) return
			const arr = val.split(',')
			let name = ''
			this.gameManageList.forEach((item) => {
				arr.forEach((data) => {
					if (item.gameId + '' === data + '') {
						name = name + item.gameName + '/'
					}
				})
			})
			return name.slice(0, -1) || '-'
		},
		supportTerminalFilter(val) {
			if (!this.betDeviceType.length) return
			const arr = val.split(',')
			let name = ''
			this.betDeviceType.forEach((item) => {
				arr.forEach((data) => {
					if (item.code + '' === data + '') {
						name = name + item.description + '/'
					}
				})
			})
			return name.slice(0, -1) || '-'
		},
		_changeTableSort({ column, prop, order }) {
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
				} else {
					delete this.queryData.orderType
				}
				this.loadData()
			}
		},
		moduleFilter(val) {
			if (!this.gameModuleNameList.length) return
			const arr = val.split(',')
			let name = ''
			this.gameModuleNameList.forEach((item) => {
				arr.forEach((data) => {
					if (item.moduleId + '' === data + '') {
						name = name + item.moduleName + '/'
					}
				})
			})
			return name.slice(0, -1) || '-'
		},
		labelListFilter(val) {
			if (!this.labelList.length) return
			const arr = val.split(',')
			let name = ''
			this.labelList.forEach((item) => {
				arr.forEach((data) => {
					if (item.gameLabelId + '' === data + '') {
						name = name + item.gameLabelName + '/'
					}
				})
			})
			return name.slice(0, -1) || '-'
		},
		lookGame(val) {
			this.dialogGameVisible = true
			this.bigImage = val
		},
		openEdit(row) {
			this.showDetail = true
			if (row) {
				this.rowData = JSON.parse(JSON.stringify(row))
				this.editType = 'edit'
			} else {
				this.rowData = {}
				this.editType = 'add'
			}
		},
		closeEdit() {
			this.showDetail = false
		},
		changeStatus(id, type) {
			this.$confirm(
				`<strong>是否对子游戏进行${
					Number(type) === 0 ? '禁用' : Number(type) === 1 ? '开启' : '维护'
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
						.editGameStatus({
							id: id,
							gameStatus: type
						})
						.then((res) => {
							if (res && res.code === 200) {
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
			this.queryData = {
				gameId: undefined,
				gameName: undefined,
				accountType: [],
				gameLabelIdList: [],
				gamePlatformList: [],
				gameIconList: [],
				relationOtherGameIdList: [],
				supportTerminalList: [],
				gameStatusList: []
			}
			this.pageNum = 1
			this.loadData()
		},
		enterSubmit() {
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
