<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="85px"
				>
					<el-form-item label="统计日期:" prop="registerTime">
						<el-date-picker
							v-model="queryData.countTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 300px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="注册时间:" prop="registerTime">
						<el-date-picker
							v-model="queryData.registerTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 300px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							:maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item label="代理类型:">
						<el-select
							v-model="queryData.accountType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
                            collapse-tags
							style="width: 250px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="累计返佣:">
						<el-input
							v-model="queryData.totalRebateMin"
							size="medium"
							placeholder="最小数值"
							style="width: 135px"
							maxlength="15"
							name="totalRebateMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.totalRebateMax"
							size="medium"
							placeholder="最大数值"
							style="width: 135px"
							maxlength="15"
							name="totalRebateMax"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="queryText !== '查询'"
							size="medium"
							@click="_search"
						>
							{{ queryText }}
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
							v-if="hasPermission('350')"
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							:disabled="loading"
							@click="exportExcelPop = true"
						>
							导出
						</el-button>
						<el-button
							type="success"
							icon="el-icon-setting"
							:disabled="loading"
							size="medium"
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
					:summary-method="getSummaries"
					show-summary
					@sort-change="_changeTableSort"
				>
					<el-table-column
						v-if="settingList['代理账号']"
						prop="userName"
						align="center"
						label="代理账号"
						width="150"
						fixed
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							>
								{{ scope.row.userName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="settingList['姓名']"
						prop="realName"
						align="center"
						label="姓名"
						width="150"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.realName"
								:title="scope.row.realName"
								:copy="copy"
							>
								{{ scope.row.realName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="settingList['代理类型']"
						prop="accountType"
						align="center"
						label="代理类型"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="settingList['账号状态']"
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="120"
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
						width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="settingList['代理标签']"
						prop="labelName"
						align="center"
						label="代理标签"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="注册时间"
						width="180"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createDt">
								{{ scope.row.createDt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="累计返佣"
						width="100"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="总存款"
						width="100"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="存款次数"
						width="100"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="取款次数"
						width="100"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="大额取款次数"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="取款差"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="转给下级额度"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="转给下级人数"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="转给下级次数"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="转给下级次数"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="totalRebate" align="center" width="120">
						<template slot="header">
							转入中心
							<br />
							钱包总额
						</template>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="totalRebate" align="center" width="120">
						<template slot="header">
							转入中心
							<br />
							钱包次数
						</template>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="总优惠"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="佣金调整"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="其他调整"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="下级注单量"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="下级投注金额"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="下级有效投注"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="下级投注盈亏"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="subNum"
						align="center"
						label="下级人数"
						width="100"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.subNum || scope.row.subNum === 0">
								{{ scope.row.subNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="有效下级人数"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级首存人数"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级首存总额"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级总存款"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级总取款"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级存取差"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级总优惠"
						width="150px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级总反水"
						width="150"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="下级调整金额"
						width="150"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="转入会员人数"
						width="150"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="转出会员人数"
						width="150"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
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
			<el-dialog
				title="列设置"
				center
				:visible.sync="visible"
				width="610px"
				class="col-setting"
			>
				<el-button type="primary" @click="setAll">复原缺省</el-button>
				<div
					v-for="(value, name) in settingList"
					:key="name"
					class="setting-div"
				>
					<el-checkbox v-model="newList[name]">{{ name }}</el-checkbox>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="visible = false">取 消</el-button>
					<el-button type="primary" @click="confirm">提交</el-button>
				</div>
			</el-dialog>
			<el-dialog
				title="导出"
				center
				:visible.sync="exportExcelPop"
				width="610px"
				class="col-setting"
			>
				<el-form
					ref="form"
					:inline="true"
					:model="exportForm"
					label-width="85px"
				>
					<el-form-item label="选择日期:">
						<el-date-picker
							v-model="exportForm.time"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 300px"
						></el-date-picker>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="exportExcelPop = false">取 消</el-button>
					<el-button type="primary" @click="exportExcel">导出</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
// import { UTable } from 'umy-ui'
import { routerNames } from '@/utils/consts'
// const start = dayjs()
// 	.startOf('day')
// 	.valueOf()
// const end = dayjs()
// 	.endOf('day')
// 	.valueOf()

export default {
	name: routerNames.agentReport,
	mixins: [list],
	data() {
		return {
			queryData: {
                countTime: [],
				registerTime: [],
				userName: undefined,
				accountType: [],
				accountStatus: [],
				windControlId: undefined,
				labelId: undefined,
				totalRebateMin: undefined,
				totalRebateMax: undefined,
				orderKey: undefined,
				orderType: undefined
			},
			dataList: [],
			queryText: '查询',
			total: 0,
			vipDict: [],
			userLabel: [],
			visible: false,
			exportExcelPop: false,
			exportForm: {
				time: undefined
			},
			settingList: {
				代理账号: true,
				姓名: true,
				代理类型: true,
				上级代理: true,
				VIP等级: true,
				账号状态: true,
				代理标签: true
			},
			newList: []
		}
	},
	computed: {
		accountStatusArr() {
			return this.globalDics.accountStatusType
		},
		accountTypeArr() {
			return this.globalDics.accountType
		}
	},
	created() {
		this.getMerchantDict()
	},
	mounted() {
		this.getWindControllerLevelDict()
		if (localStorage.getItem('agentReport')) {
			this.settingList = JSON.parse(localStorage.getItem('agentReport'))
		}
	},
	methods: {
		_search() {
			let t = 10
			const timeCount = setInterval(() => {
				t--
				this.queryText = t + 's'
				if (t < 0) {
					clearInterval(timeCount)
					this.queryText = '查询'
				}
			}, 1000)
			this.loadData()
		},
		// 列设置
		openSetting() {
			this.visible = true
			this.newList = JSON.parse(JSON.stringify(this.settingList))
		},
		setAll() {
			Object.keys(this.newList).forEach((item) => {
				this.newList[item] = true
			})
		},
		confirm() {
			localStorage.setItem('agentReport', JSON.stringify(this.newList))
			this.settingList = this.newList
			this.visible = false
		},
		// 总计
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					const el = (
						<div class='count_row'>
							<p>本页合计</p>
							<p>全部合计</p>
						</div>
					)
					sums[index] = el
					return
				}
				const includeArr = new Map([
					['vipSerialNum', 'vipSerialNum'],
					['depositAmount', 'depositAmount'],
					['depositTotal', 'depositTotal'],
					['firstDepositAmount', 'firstDepositAmount'],
					['transforNum', 'transforNum'],
					['userBalance', 'userBalance']
				])

				if (includeArr.get(column.property)) {
					const values = data.map((item) => Number(item[column.property]))
					if (!values.every((value) => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						switch (column.property) {
							case 'vipSerialNum':
								// eslint-disable-next-line no-case-declarations
								let vipTotal
								if (!this.totalLoading) {
									vipTotal = (
										<div class='count_row'>
											<p>{sums[index]}</p>
											<p>
												<el-button icon='el-icon-loading' />
											</p>
										</div>
									)
								} else {
									vipTotal = (
										<div class='count_row'>
											<p>{sums[index]}</p>
											<p>10000</p>
										</div>
									)
								}
								return (sums[index] = vipTotal)
							case 'depositAmount':
								// eslint-disable-next-line no-case-declarations
								const depositTotal = (
									<div class='count_row'>
										<p>{sums[index]}</p>
										<p>200</p>
									</div>
								)
								return (sums[index] = depositTotal)
							case 'firstDepositAmount':
								// eslint-disable-next-line no-case-declarations
								const firstDepositTotal = (
									<div class='count_row'>
										<p>{sums[index]}</p>
										<p>200</p>
									</div>
								)
								return (sums[index] = firstDepositTotal)
							case 'transforNum':
								// eslint-disable-next-line no-case-declarations
								const transforTotal = (
									<div class='count_row'>
										<p>{sums[index]}</p>
										<p>200</p>
									</div>
								)
								return (sums[index] = transforTotal)
							case 'userBalance':
								// eslint-disable-next-line no-case-declarations
								const userBalanceTotal = (
									<div class='count_row'>
										<p>{sums[index]}</p>
										<p>200</p>
									</div>
								)
								return (sums[index] = userBalanceTotal)
						}
					} else {
						sums[index] = ''
					}
				}
			})

			return sums
		},
		loadData() {
			const create = this.queryData.registerTime || []
			const countTime = this.queryData.countTime || []
			const [startTime, endTime] = create
			const [timeStart, timeEnd] = countTime
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: timeStart
					? dayjs(timeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: timeEnd
					? dayjs(timeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			// if (!startTime && !endTime && !timeStart && !timeEnd) {
			// 	this.$message({
			// 		type: 'warning',
			// 		message: `请选择统计时间, 注册时间,任意其中一个时间维度`
			// 	})
			// 	return false
			// }
			this.dataList = []
			this.loading = true
			delete params.registerTime
			delete params.countTime
			this.$api
				.AgentListAPI(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = record || []
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
		// 获取代理标签
		getMerchantDict() {
			this.$api.agentDictAPI().then((res) => {
				const {
					code,
					data,
					msg
				} = res
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
		reset() {
			this.pageNum = 1
			this.queryData = {
                countTime: [],
                registerTime: [],
                userName: undefined,
                accountType: [],
                accountStatus: [],
                windControlId: undefined,
                labelId: undefined,
                totalRebateMin: undefined,
                totalRebateMax: undefined,
                orderKey: undefined,
                orderType: undefined
			}
			this.$refs['form'].resetFields()
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'subNum') {
				prop = 1
			}
			if (prop === 'validSubNum') {
				prop = 2
			}
			if (prop === 'createDt') {
				prop = 3
			}
			if (prop === 'lastLoginTime') {
				prop = 4
			}
			if (prop === 'offLineDays') {
				prop = 5
			}
			// if (prop === 'totalRebate') {
			//     prop = 6
			// }
			// if (prop === 'balance') {
			//     // prop = 7
			// }
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
				case 'totalRebateMin':
					if (
						!!this.queryData.totalRebateMax &&
						(value && value * 1 > this.queryData.totalRebateMax * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.totalRebateMax}金额`
						})
					} else {
						this.queryData.totalRebateMin = value
					}
					break
				case 'totalRebateMax':
					if (
						!!this.queryData.totalRebateMin &&
						(value && value * 1 < this.queryData.totalRebateMin * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.totalRebateMin}金额`
						})
					} else {
						this.queryData.totalRebateMax = value
					}
					break
			}
		},
		// 获取风控层级
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 2 })
				.then((res) => {
					if (res.code === 200) {
						this.vipDict = res.data
					}
				})
		},
		exportExcel() {
            const create = this.queryData.registerTime || []
            const countTime = this.queryData.countTime || []
            const [startTime, endTime] = create
            const [timeStart, timeEnd] = countTime
            let params = {
                ...this.queryData,
                createDtStart: startTime
                    ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
                    : undefined,
                createDtEnd: endTime
                    ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
                    : undefined,
                lastLoginTimeStart: timeStart
                    ? dayjs(timeStart).format('YYYY-MM-DD HH:mm:ss')
                    : undefined,
                lastLoginTimeEnd: timeEnd
                    ? dayjs(timeEnd).format('YYYY-MM-DD HH:mm:ss')
                    : undefined
            }
			this.loading = true
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			delete params.countTime
			delete params.pageNum
			delete params.pageSize
			this.$api
				.agentListExportAPI(params)
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
/deep/ .el-table__body-wrapper {
	z-index: 2;
}
/deep/ .el-table__footer-wrapper .cell::after {
	border: 0.5px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}
/deep/ .el-table__fixed-footer-wrapper tr::after {
	border: 0.5px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}
.count_row {
	height: 80px;
	p {
		height: 40px;
		line-height: 40px;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}
</style>
