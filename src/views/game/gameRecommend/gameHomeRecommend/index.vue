<template>
	<gameHomeRecommendEdit
		v-if="isEdit"
		:recommendDetails="recommendDetails"
		@back="back"
	/>
	<div v-else class="game-container report-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="APP端" name="first">
				<div class="view-container dealer-container">
					<div class="content">
						<el-table
							v-loading="loading"
							border
							size="mini"
							class="small-size-table"
							:data="dataList"
							style="width: 100%"
							row-key="moduleId"
							:header-cell-style="getRowClass"
							@sort-change="_changeTableSort"
						>
							<el-table-column
								prop="displayOrder"
								align="center"
								label="模块顺序"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.displayOrder">
										{{ scope.row.displayOrder }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="moduleName"
								align="center"
								label="模块名称"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleName">
										{{ scope.row.moduleName }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="status" align="center" label="状态">
								<template slot-scope="scope">
									<p
										:class="
											scope.row.moduleStatus === 1
												? 'normalRgba'
												: 'disableRgba'
										"
									>
										{{ scope.row.moduleStatus === 1 ? '开启中' : '已禁用' }}
									</p>
								</template>
							</el-table-column>
							<el-table-column
								prop="description"
								align="center"
								label="模块描述"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleDesc">
										{{ scope.row.moduleDesc }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="updatedBy"
								align="center"
								label="最近操作人"
							>
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
								width="240px"
							>
								<template slot-scope="scope">
									<el-button
										v-if="hasPermission('1020211')"
										:disabled="loading"
										type="danger"
										size="medium"
										:class="
											scope.row.moduleStatus === 0
												? 'normalRgba noicon'
												: 'disableRgba noicon'
										"
										@click="disable(scope.row)"
									>
										{{ scope.row.moduleStatus === 0 ? '启用' : '禁用' }}
									</el-button>
									<el-button
										type="primary"
										icon="el-icon-edit"
										:disabled="scope.row.moduleStatus === 1"
										size="medium"
										@click="openDetails(scope.row)"
									>
										编辑信息
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="H5端" name="second">
				<div class="view-container dealer-container">
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
							<el-table-column prop="displayOrder" align="center" label="模块顺序">
								<template slot-scope="scope">
									<span v-if="!!scope.row.displayOrder">
										{{ scope.row.displayOrder }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="moduleName"
								align="center"
								label="模块名称"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleName">
										{{ scope.row.moduleName }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="moduleStatus" align="center" label="状态">
								<template slot-scope="scope">
									<p
										:class="
											scope.row.moduleStatus === 1
												? 'normalRgba'
												: 'disableRgba'
										"
									>
										{{ scope.row.moduleStatus === 1 ? '开启中' : '已禁用' }}
									</p>
								</template>
							</el-table-column>
							<el-table-column
								prop="description"
								align="center"
								label="模块描述"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleDesc">
										{{ scope.row.moduleDesc }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="updatedBy"
								align="center"
								label="最近操作人"
							>
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
								width="240px"
							>
								<template slot-scope="scope">
									<el-button
										:disabled="loading"
										type="danger"
										size="medium"
										class="noicon"
										@click="disable(scope.row)"
									>
										禁用
									</el-button>
									<el-button
										type="primary"
										icon="el-icon-edit"
                                        :disabled="scope.row.moduleStatus === 1"
										size="medium"
										@click="openDetails(scope.row)"
									>
										编辑信息
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="PC端" name="third">
				<div class="view-container dealer-container">
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
							<el-table-column prop="displayOrder" align="center" label="模块顺序">
								<template slot-scope="scope">
									<span v-if="!!scope.row.displayOrder">
										{{ scope.row.displayOrder }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="moduleName"
								align="center"
								label="模块名称"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleName">
										{{ scope.row.moduleName }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="status" align="center" label="状态">
								<template slot-scope="scope">
									<p
										:class="
											scope.row.moduleStatus === 1 ? 'normalRgba' : 'disableRgba'
										"
									>
										{{ scope.row.moduleStatus === 1 ? '开启中' : '已禁用' }}
									</p>
								</template>
							</el-table-column>
							<el-table-column
								prop="description"
								align="center"
								label="模块描述"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.moduleDesc">
										{{ scope.row.moduleDesc }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="updatedBy"
								align="center"
								label="最近操作人"
							>
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
								width="240px"
							>
								<template slot-scope="scope">
									<el-button
										:disabled="loading"
										type="danger"
										size="medium"
										class="noicon"
										@click="disable(scope.row)"
									>
										禁用
									</el-button>
									<el-button
										type="primary"
										icon="el-icon-edit"
                                        :disabled="scope.row.moduleStatus === 1"
										size="medium"
										@click="openDetails(scope.row)"
									>
										编辑信息
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import { routerNames } from '@/utils/consts'
import gameHomeRecommendEdit from './editPage/index'
import Sortable from 'sortablejs'

export default {
	name: 'GameHomeRecommend',
	components: { gameHomeRecommendEdit },
	mixins: [list],
	data() {
		return {
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
	computed: {},
	mounted() {
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}
		this.columnDrop()
	},
	methods: {
		openDetails(val) {
			this.recommendDetails = val
			this.isEdit = true
		},
		back() {
			this.isEdit = false
			this.loadData()
			this.$nextTick(() => {
				this.columnDrop()
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
		save() {
			const gameModuleVos =
				this.dataList.map((item) => {
					return {
						displayOrder: item.displayOrder,
						id: item.id
					}
				}) || []
			const params = {
				gameModuleVos
			}
			this.$api
				.gameModuleSortAPI(params)
				.then((res) => {
					this.loading = false
					const { code, msg } = res
					if (code === 200) {
						this.$message({
							message: '排序成功',
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
				.catch(() => {
					this.loading = false
				})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		loadData() {
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true
			this.$api
				.gameHomeRecommendListAPI(params)
				.then((res) => {
					const { code, data } = res
					if (code === 200) {
						// const response = res.data
						this.loading = false
						this.dataList = data
						// this.total = response.totalRecord
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		// openEdit(row) {
		// 	this.$router.push({
		// 		path: '/game/gameConfig/editPage',
		// 		query: { id: row.id, userId: row.userId }
		// 	})
		// },
		// 禁用
		disable(val) {
			const { moduleStatus, id } = val
			// const key = status === 1 ? 0 : 1
			this.$confirm(
				`<strong>是否对子游戏进行开启/禁用操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
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
						.recommendStatusChangeAPI({
							id,
							moduleStatus: moduleStatus === 1 ? 0 : 1
						})
						.then((res) => {
							const { code } = res
							loading.close()
							if (code === 200) {
								this.$message({
									type: 'success',
									message: '操作成功!'
								})
							} else {
								this.$message({
									type: 'error',
									message: '操作失败!'
								})
							}
							this.loadData()
						}) // 一键下分

					setTimeout(() => {
						loading.close()
					}, 1000)
				})
				.catch(() => {})
		},
		_changeTableSort({ column, prop, order }) {
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
				} else {
					delete this.queryData.orderType
					delete this.queryData.orderProperty
				}
				this.loadData()
			}
		},
		// 列拖动
		columnDrop() {
			const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
			const _this = this
			this.sortable =
				wrapperTr &&
				Sortable.create(wrapperTr, {
					ghostClass: 'droppable-area',
					animation: 300,
					delay: 0,
					onEnd: ({ newIndex, oldIndex }) => {
						console.log('newIndex', newIndex)
						console.log('oldIndex', oldIndex)
						const currRow = _this.dataList.splice(oldIndex, 1)[0]
						_this.dataList.splice(newIndex, 0, currRow)
						if (newIndex !== oldIndex) {
							this.$nextTick(() => {
								_this.dataList.forEach((item, idx) => {
									item.displayOrder = idx + 1
								})
							})
						}
						_this.save()
					}
				})
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
.droppable-area {
	background-color: #cb8727;
	opacity: 0.4;
}
</style>
