<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
				>
					<el-form-item label="月份:" prop="registerTime">
						<el-date-picker
							v-model="queryData.registerTime"
							size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              clearable
              style="width: 240px"
            ></el-date-picker>
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
							v-if="hasPermission('353')"
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							:disabled="loading"
							@click="exportExcel"
						>
							导出
						</el-button>
						<el-button
							type="success"
							size="medium"
							:disabled="loading"
							@click="openSetting"
						>
							列设置
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
						v-if="settingList['月份']"
						prop="realName"
						align="center"
						label="月份"
						width="150px"
					>
					</el-table-column>
					<el-table-column
						v-if="settingList['返佣人数']"
						prop="userName"
						align="center"
						label="返佣人数"
						width="150px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							>
								<el-link
									class="lightBlueColor"
									type="primary"
									@click="dialogData(scope.row)"
								>
									{{ scope.row.userName }}
								</el-link>
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总返佣']"
						prop="firstDepositAmount"
						align="center"
						label="总返佣"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['等级福利']"
						prop="firstDepositAmount"
						align="center"
						label="等级福利"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总投注人数']"
						prop="firstDepositAmount"
						align="center"
						label="总投注人数"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总注单量']"
						prop="firstDepositAmount"
						align="center"
						label="总投注人数"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总投注金额']"
						prop="firstDepositAmount"
						align="center"
						label="总投注金额"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总有效投注']"
						prop="firstDepositAmount"
						align="center"
						label="总有效投注"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
          v-if="settingList['总投注盈亏']"
						prop="firstDepositAmount"
						align="center"
						label="总有效投注"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
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
		 <el-dialog :visible.sync="tableVisible" :destroy-on-close="true" class="rempadding">
        <div slot="title" class="dialog-title">
          <span class="title-text" style="margin-right: 15px">月份:{{ userName }}</span>
        </div>
        <el-table
          v-loading="loading"
          size="mini"
          border
          class="small-size-table"
          :data="gameList"
          style="margin-bottom: 15px"
          :header-cell-style="getRowClass"
        >
          <el-table-column prop="userName" align="center" label="代理账号"> </el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="代理类型"
          ></el-table-column>
          <el-table-column
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 1
								"
								class="normalRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2
								"
								class="disableRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 3
								"
								class="lockingRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4
								"
								class="deleteRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
        <el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="代理等级"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="等级福利"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="accountTypeName"
            align="center"
            label="返佣金额"
            sortable="custom"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="page"
          background
          class="fenye"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="size"
          :page-sizes="[10, 20, 50]"
          :total="summary"
          @current-change="handleCurrentChangeDialog"
          @size-change="handleSizeChangeDialog"
        ></el-pagination>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="tableVisible = false">关闭</el-button>
        </div>
      </el-dialog>
		<el-dialog
			title="列设置"
			center
			:visible.sync="visible"
			width="610px"
			class="col-setting"
		>
			<el-button type="primary" @click="setAll">复原缺省</el-button>
			<div v-for="(value, name) in settingList" :key="name" class="setting-div">
				<el-checkbox v-model="newList[name]">{{ name }}</el-checkbox>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
// import { mapGetters } from 'vuex'
// import { UTable } from 'umy-ui'
import { routerNames } from '@/utils/consts'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.memberList,
	mixins: [list],
	data() {
		return {
			queryData: {
				registerTime: [start, end],
				userName: undefined,
				realName: undefined,
				accountStatus: [],
				windControlId: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				lastLoginTime: [],
				vipSerialNumMax: undefined,
				vipSerialNumMin: undefined,
				transforNumMin: undefined,
				transforNumMax: undefined,
				accountType: [],
				deviceType: [],
				firstDepositAmountMin: undefined,
				firstDepositAmountMax: undefined,
				firstSaveTime: [],
				labelId: undefined,
				parentProxyName: undefined,
				orderKey: undefined,
				orderType: undefined
			},
			settingList: {
				会员账号: true,
				姓名: true
			},
			tableVisible: false,
			newList: [],
			visible: false,
			userName: '',
			dataList: [],
			total: 0,
			vipDict: [],
			userLabel: []
		}
	},
	computed: {
		// ...mapGetters(['vipDict', 'userLabel']),
		accountStatusArr() {
			return this.globalDics.accountStatusType
		},
		accountTypeArr() {
			return this.globalDics.accountType
		},
		deviceTypeArr() {
			return this.globalDics.deviceType
		}
	},
	created() {
		this.getMemberLabelDict()
	},
	mounted() {
		if (localStorage.getItem('memberProfitAndLoss')) {
			this.settingList = JSON.parse(localStorage.getItem('memberProfitAndLoss'))
		}
		this.getWindControllerLevelDict()
	},
	methods: {
		dialogData(val) {
      this.tableVisible = true
    },
		// 列设置
		openSetting() {
			this.visible = true
			this.newList = JSON.parse(JSON.stringify(this.settingList))
		},
		confirm() {
			localStorage.setItem('memberProfitAndLoss', JSON.stringify(this.newList))
			this.settingList = this.newList
			this.visible = false
		},
		setAll() {
			Object.keys(this.newList).forEach((item) => {
				this.newList[item] = true
			})
		},
		loadData() {
			const create = this.queryData.registerTime || []
			const lastLoginTime = this.queryData.lastLoginTime || []
			const firstSaveTime = this.queryData.firstSaveTime || []
			const [startTime, endTime] = create
			const [loginTimeStart, loginTimeEnd] = lastLoginTime
			const [firstDepositTimeStart, firstDepositTimeEnd] = firstSaveTime
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: loginTimeStart
					? dayjs(loginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: loginTimeEnd
					? dayjs(loginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeStart: firstDepositTimeStart
					? dayjs(firstDepositTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeEnd: firstDepositTimeEnd
					? dayjs(firstDepositTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			if (
				!startTime &&
				!endTime &&
				!loginTimeStart &&
				!loginTimeEnd &&
				!firstDepositTimeStart &&
				!firstDepositTimeEnd
			) {
				this.$message({
					type: 'warning',
					message: `请选择注册时间, 最后登录时间,首存时间任意其中一个时间维度`
				})
				return false
			}
			this.dataList = []
			this.loading = true
			delete params.registerTime
			delete params.lastLoginTime
			delete params.firstSaveTime
			this.$api
				.memberListAPI(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = record
						this.total = totalRecord
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
		// 获取会员标签
		getMemberLabelDict() {
			this.$api.getMemberLabelDict().then((res) => {
				const { code, data, msg } = res
				if (code === 200) {
					this.userLabel = data || []
				} else {
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		// 获取风控层级
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 1 })
				.then((res) => {
					if (res.code === 200) {
						this.vipDict = res.data
					}
				})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				registerTime: [start, end],
				userName: undefined,
				realName: undefined,
				accountStatus: undefined,
				windControlId: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				lastLoginTime: [],
				vipSerialNumMax: undefined,
				vipSerialNumMin: undefined,
				transforNumMin: undefined,
				transforNumMax: undefined,
				accountType: undefined,
				deviceType: undefined,
				firstDepositAmountMin: undefined,
				firstDepositAmountMax: undefined,
				firstSaveTime: [],
				labelId: undefined,
				parentProxyName: undefined,
				orderKey: undefined,
				orderType: undefined
			}
			this.$refs['form'].resetFields()
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'vipSerialNum') {
				prop = 1
			}
			if (prop === 'createDt') {
				prop = 2
			}
			if (prop === 'firstDepositTime') {
				prop = 3
			}
			if (prop === 'firstDepositAmount') {
				prop = 4
			}
			if (prop === 'lastLoginTime') {
				prop = 5
			}
			if (prop === 'offLineDays') {
				prop = 6
			}
			this.queryData.orderKey = prop
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
				case 'offLineDaysStart':
					if (
						!!this.queryData.offLineDaysEnd &&
						value &&
						value * 1 > this.queryData.offLineDaysEnd * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.offLineDaysEnd}天数`
						})
					} else {
						this.queryData.offLineDaysStart = value
					}
					break
				case 'offLineDaysEnd':
					if (
						!!this.queryData.offLineDaysStart &&
						value &&
						value * 1 < this.queryData.offLineDaysStart * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.offLineDaysStart}天数`
						})
					} else {
						this.queryData.offLineDaysEnd = value
					}
					break
				case 'vipSerialNumMin':
					if (
						!!this.queryData.vipSerialNumMax &&
						value &&
						value * 1 > this.queryData.vipSerialNumMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.vipSerialNumMax}等级`
						})
					} else {
						this.queryData.vipSerialNumMin = value
					}
					break
				case 'vipSerialNumMax':
					if (
						!!this.queryData.vipSerialNumMin &&
						value &&
						value * 1 < this.queryData.vipSerialNumMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.vipSerialNumMin}等级`
						})
					} else {
						this.queryData.vipSerialNumMax = value
					}
					break
				case 'firstDepositAmountMin':
					if (
						!!this.queryData.firstDepositAmountMax &&
						value &&
						value * 1 > this.queryData.firstDepositAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.firstDepositAmountMax}金额`
						})
					} else {
						this.queryData.firstDepositAmountMin = value
					}
					break
				case 'firstDepositAmountMax':
					if (
						!!this.queryData.firstDepositAmountMin &&
						value &&
						value * 1 < this.queryData.firstDepositAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.firstDepositAmountMin}金额`
						})
					} else {
						this.queryData.firstDepositAmountMax = value
					}
					break
				case 'transforNumMin':
					if (
						!!this.queryData.transforNumMax &&
						value &&
						value * 1 > this.queryData.transforNumMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.transforNumMax}次数`
						})
					} else {
						this.queryData.transforNumMin = value
					}
					break
				case 'transforNumMax':
					if (
						!!this.queryData.transforNumMin &&
						value &&
						value * 1 < this.queryData.transforNumMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.transforNumMin}次数`
						})
					} else {
						this.queryData.transforNumMin = value
					}
					break
			}
		},
		exportExcel() {
			const create = this.queryData.registerTime || []
			const lastLoginTime = this.queryData.lastLoginTime || []
			const firstSaveTime = this.queryData.firstSaveTime || []
			const [startTime, endTime] = create
			const [loginTimeStart, loginTimeEnd] = lastLoginTime
			const [firstDepositTimeStart, firstDepositTimeEnd] = firstSaveTime
			this.loading = true
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: loginTimeStart
					? dayjs(loginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: loginTimeEnd
					? dayjs(loginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeStart: firstDepositTimeStart
					? dayjs(firstDepositTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeEnd: firstDepositTimeEnd
					? dayjs(firstDepositTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			delete params.lastLoginTime
			delete params.firstSaveTime
			params.accountStatus =
				params.accountStatus && params.accountStatus.length
					? params.accountStatus
					: undefined
			params.deviceType =
				params.deviceType && params.deviceType.length
					? params.deviceType
					: undefined
			params.accountType =
				params.accountType && params.accountType.length
					? params.accountType
					: undefined
			this.$api
				.exportExcelAPI(params)
				.then((res) => {
					this.loading = false
					const { data, status } = res
					if (res && status === 200) {
						const { type } = data
						if (type.includes('application/json')) {
							const reader = new FileReader()
							reader.onload = (evt) => {
								if (evt.target.readyState === 2) {
									const {
										target: { result }
									} = evt
									const ret = JSON.parse(result)
									if (ret.code !== 200) {
										this.$message({
											type: 'error',
											message: ret.msg,
											duration: 1500
										})
									}
								}
							}
							reader.readAsText(data)
						} else {
							const result = res.data
							const disposition = res.headers['content-disposition']
							const fileNames = disposition && disposition.split("''")
							let fileName = fileNames[1]
							fileName = decodeURIComponent(fileName)
							const blob = new Blob([result], {
								type: 'application/octet-stream'
							})
							if ('download' in document.createElement('a')) {
								const downloadLink = document.createElement('a')
								downloadLink.download = fileName || ''
								downloadLink.style.display = 'none'
								downloadLink.href = URL.createObjectURL(blob)
								document.body.appendChild(downloadLink)
								downloadLink.click()
								URL.revokeObjectURL(downloadLink.href)
								document.body.removeChild(downloadLink)
							} else {
								window.navigator.msSaveBlob(blob, fileName)
							}
							this.$message({
								type: 'success',
								message: '导出成功',
								duration: 1500
							})
						}
					}
				})
				.catch(() => {
					this.loading = false
					this.$message({
						type: 'error',
						message: '导出失败',
						duration: 1500
					})
				})

			setTimeout(() => {
				this.loading = false
			}, 1500)
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
