<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="100px"
				>
					<el-form-item label="使用时间:">
						<el-date-picker
							v-model="queryData.createDt"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							:clearable="false"
							value-format="timestamp"
							style="width: 382px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="代理账号:" prop="userName">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							maxlength="11"
							style="width: 180px"
							@keyup.enter.native="enterSearch"
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
							style="width: 300px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="银行卡号:">
						<el-input
							v-model="queryData.cardNumber"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="30"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="风控层级:">
						<el-select
							v-model="queryData.windControlId"
							size="medium"
							placeholder="全部"
							clearable
                            multiple
                            style="width: 300px"
						>
							<el-option
								v-for="item in vipDict"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="银行名称:">
						<el-input
							v-model="queryData.bankName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="20"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="持卡人姓名:">
						<el-input
							v-model="queryData.cnName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
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
					@sort-change="changeTableSort"
				>
					<el-table-column prop="userName" align="center" label="代理账号">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="accountType" align="center" label="代理类型">
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="cardNumber" align="center" label="银行卡号">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.cardNumber"
								:title="scope.row.cardNumber"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="bankName" align="center" label="银行名称">
						<template slot="header">
							银行名称
							<br />
							银行支行
						</template>
						<template slot-scope="scope">
							<span v-if="!!scope.row.bankName">
								{{ scope.row.bankName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="cnName" align="center" label="持卡人">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.cnName"
								:title="scope.row.cnName"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="bankAddress" align="center" label="开户地址">
						<template slot-scope="scope">
							<span v-if="!!scope.row.bankAddress">
								{{ scope.row.bankAddress }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="operateType" align="center" label="风控层级">
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="提款时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createDt">
								{{ scope.row.createDt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					:current-page.sync="pageNum"
					class="pageValue"
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
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
// import { UTable } from 'umy-ui'

export default {
	name: routerNames.agentBankCard,
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				createDt: [start, end],
				userName: undefined,
				accountType: [],
				cardNumber: undefined,
				bankName: undefined,
				cnName: undefined,
				windControlId: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
			vipDict: []
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType
		}
	},
	created() {
		this.getWindControllerLevelDict()
	},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			this.loading = true
			const create = this.queryData.createDt || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				beginDate: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				endDate: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.createDt
			params.accountType = params.accountType.length
				? params.accountType
				: undefined
			this.$api
				.agentBankRecordAPI(params)
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
		// 获取风控层级
        getWindControllerLevelDict() {
            this.$api
                .getWindControllerLevelDict({ windControlType: 3 })
                .then((res) => {
                    if (res.code === 200) {
                        this.vipDict = res.data
                    }
                })
        },
		reset() {
			this.pageNum = 1
			this.$refs['form'].resetFields()
			this.queryData = {
				createDt: [start, end],
				userName: undefined,
				accountType: [],
                windControlId: undefined,
				cardNumber: undefined,
				bankName: undefined,
				cnName: undefined,
				orderType: undefined
			}
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
