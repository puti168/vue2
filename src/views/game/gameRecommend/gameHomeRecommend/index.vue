<template>
	<div class="game-container report-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="APP端" name="first"></el-tab-pane>
			<el-tab-pane label="H5端" name="second"></el-tab-pane>
			<el-tab-pane label="PC端" name="third"></el-tab-pane>
		</el-tabs>
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
					@sort-change="changeTableSort"
				>
					<el-table-column
						prop="moduleId"
						align="center"
						label="模块顺序"
					></el-table-column>
					<el-table-column
						prop="moduleName"
						align="center"
						label="模块名称"
					></el-table-column>
					<el-table-column prop="moduleStatus" align="center" label="状态">
						<template slot-scope="scope">
							<p
								:class="
									scope.row.moduleStatus === 1 ? 'successState' : 'dangerState'
								"
							>
								{{ scope.row.moduleStatus===1 ? '开启中' : '已禁用' }}
							</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="description"
						align="center"
						label="模块描述"
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
								@click="confrim"
							>
								禁用
							</el-button>
							<el-button
								type="primary"
								icon="el-icon-edit"
								:disabled="loading"
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
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: routerNames.gameHomeRecommend,
	components: {},
	mixins: [list],
	data() {
		return {
            searchParams: {
                pageSize: 10,
                pageNum: 1,
                terminalType: 1
            },
            searchData: {
                allGameNum: 0,
                assortId: 0,
                bodyTitle: '',
                contentInfor: '',
                currentUserName: '',
                description: '',
                gameId: 0,
                iconAddress: '',
                mainTitleInfo: '',
                moduleCaption: '',
                moduleId: 0,
                moduleStatus: 0,
                pageNum: 0,
                pageSize: 0,
                pictureHome: '',
                pictureOne: '',
                pictureTwo: '',
                scrollingNum: 0,
                subTitleInfo: '',
                terminalType: 0,
                videoSourceAddress: ''
            },
			activeName: 'second',
			formTime: {
				time: [start, end]
			},
			dataList: [],
			title: '',
            // 终端类型
            terminalType: 1
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		virtualType() {
			return this.globalDics.virtualType
		},
		virtualProtocolType() {
			return this.globalDics.virtualProtocolType
		},
		bindType() {
			return this.globalDics.bindType
		}
	},
	mounted() {
        this.loadData()
	},
	methods: {
		handleClick(value) {
        },
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.searchData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			if (!params.createDtStart || !params.createDtEnd) {
				this.$message({
					message: '操作时间参数必传',
					type: 'info'
				})
				return
			}
			params = {
			    ...this.searchParams
            }
			params = {
				...this.getParams(params)
			}
			this.loading = true

			this.$api
				.gameHomeRecommendListAPI(params)
				.then((res) => {
				    debugger
					if (res.code === 200) {
						const response = res.data
						this.loading = false
						this.dataList = response.record
						this.total = response.totalRecord
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch((res) => {
				    debugger
					this.loading = false
				})
		},
		openEdit(row) {
			this.$router.push({
				path: '/game/gameConfig/gameHomeRecommendEdit',
				query: { id: row.id, userId: row.userId }
			})
		},
		confrim() {
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
					// this.getOneKeyWithdraw({ userId: this.parentData.userId }) // 一键下分
				})
				.catch(() => {})
		},
		changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			const orderParams = this.checkOrderParams.get(prop)
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
			this.queryData = {
				accountType: [],
				bankName: '',
				dataType: 2,
				operateType: '',
				orderType: '',
				parentProxyName: '',
				userName: '',
				virtualAddress: '',
				virtualKind: [],
				virtualProtocol: []
			}
			this.formTime.time = [start, end]
			this.loadData()
		},
		handleCurrentChange() {
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
</style>
