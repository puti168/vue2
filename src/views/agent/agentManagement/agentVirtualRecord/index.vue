<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="80px"
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
							style="width: 270px"
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
							style="width: 270px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="风控层级:">
                        <el-select
                            v-model="queryData.windControlId"
                            size="medium"
                            placeholder="全部"
                            clearable
                            multiple
                            style="width: 270px"
                        >
                            <el-option
                                v-for="item in vipDict"
                                :key="item.windControlId"
                                :label="item.windControlName"
                                :value="item.windControlId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
					<el-form-item label="虚拟币账户地址:" label-width="120px">
						<el-input
							v-model="queryData.virtualAddress"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 360px"
							maxlength="50"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="虚拟币类型:" label-width="95px">
						<el-select
							v-model="queryData.virtualKind"
							size="medium"
							placeholder="请选择"
							clearable
							style="width: 255px"
						>
							<el-option
								v-for="item in virtualTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="虚拟币协议:" label-width="95px">
						<el-select
							v-model="queryData.virtualProtocol"
							size="medium"
							placeholder="请选择"
							clearable
							style="width: 255px"
						>
							<el-option
								v-for="item in virtualProtocolTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-left: 8px">
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
					<el-table-column
						prop="virtualAddress"
						align="center"
						label="虚拟币账号地址"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.virtualAddress"
								:title="scope.row.virtualAddress"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="virtualKind" align="center" label="虚拟币种类">
						<template slot-scope="scope">
							<span v-if="!!scope.row.virtualKind">
								{{ scope.row.virtualKind }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="virtualProtocol"
						align="center"
						label="虚拟币协议"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.virtualProtocol">
								{{ scope.row.virtualProtocol }}
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
						prop="withdrawalTime"
						align="center"
						label="提款时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.withdrawalTime">
								{{ scope.row.withdrawalTime }}
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
	name: routerNames.agentVirtualRecord,
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				createDt: [start, end],
				userName: undefined,
				accountType: [],
				virtualAddress: undefined,
				virtualKind: undefined,
				virtualProtocol: undefined,
                windControlId: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
            vipDict: [],
            userLabel: []
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType
		},
		virtualProtocolTypeArr() {
			return this.globalDics.virtualProtocolType
		},
		virtualTypeArr() {
			return this.globalDics.virtualType
		}
	},
	mounted() {
	    this.getWindControllerLevelDict()
    },
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
			this.$api
				.agentVirtualRecordAPI(params)
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
        // 获取风控层级
        getWindControllerLevelDict() {
            this.$api
                .getWindControllerLevelDict({ windControlType: 4 })
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
				virtualAddress: undefined,
				virtualKind: undefined,
                windControlId: undefined,
				virtualProtocol: undefined,
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
