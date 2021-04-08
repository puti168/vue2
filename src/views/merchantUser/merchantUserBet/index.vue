<template>
	<div class="game-container report-container merchantUser">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">投注用户区域分析</h2>
			<div class="head flex-h-end">
				<el-button
					type="primary"
					icon="el-icon-search"
					size="medium"
					@click="handleSearch"
				>
					查询
				</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="listQuery">
					<SelectAgentTree v-model="listQuery.agentId" />
					<el-form-item label="投注日期">
						<el-date-picker
							v-model="listQuery.time"
							type="daterange"
							range-separator="-"
							value-format="timestamp"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="left"
							:clearable="false"
							:picker-options="pickerOptions"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="币种">
						<el-select v-model="listQuery.currencyId" style="width:120px">
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="(item, index) in currency"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					border
					class="small-size-table"
					:data="list"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						type="index"
						align="center"
						label="序号"
						width="80"
					></el-table-column>
					<el-table-column
						prop="agentName"
						align="center"
						label="商户名称"
						width="160"
					></el-table-column>
					<el-table-column
						prop="agentCode"
						align="center"
						label="商户编码"
						width="80"
					></el-table-column>
					<el-table-column
						prop="currencyName"
						align="center"
						label="币种"
						width="160"
					></el-table-column>
					<el-table-column
						prop="betNumber"
						align="center"
						label="投注总人数"
						width="160"
					></el-table-column>
					<el-table-column
						prop="betCountry"
						align="center"
						label="国家总数量"
						width="160"
					></el-table-column>
					<el-table-column
						align="center"
						label="投注用户区域分布"
						width="700"
					>
						<template slot-scope="scope">
							<template v-for="(item,index) in scope.row.betCountryList">
							<span v-if="index < 5" :key="item.countryName" class="area">
								{{ item.countryName }}({{ item.betNumber }})
							</span>
							</template>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						label="操作"
					>
						<template slot-scope="scope">
							<span class="more" @click="showDetail(scope.row)">查看更多</span>
						</template>
					</el-table-column>
				</el-table>
				<el-dialog
					width="700"
					:close-on-click-modal="false"
					center
					title="查看更多"
					:visible.sync="dialogVisible"
					:destroy-on-close="true"
					@close="beforeDialogClose"
				>
					<div class="center">
						<p>
							商户名称:{{ agentName }}
							<span style="margin-left: 150px">币种:{{ currencyName }}</span>
						</p>
						<p>商户编码: {{ agentCode }}</p>
						<el-table
							border
							class="small-size-table"
							:data="list2"
							style="width: 100%"
						>
							<el-table-column
								align="center"
								prop="countryName"
								label="国家"
							></el-table-column>
							<el-table-column
								align="center"
								prop="betNumber"
								label="投注人数"
							></el-table-column>
						</el-table>
					</div>
				</el-dialog>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageIndex"
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
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import { region, listAll } from '@/api/waterSign'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import dayjs from 'dayjs'
import SelectAgentTree from '@/components/SelectAgentTree'

export default {
	name: '',
	components: { SelectAgentTree },
	mixins: [list],
	data() {
		const end = dayjs().endOf('day').subtract(1, 'd')
		const start = dayjs().startOf('day').subtract(1, 'd')

		return {
			scrapStatus: false,
			dialogVisible: false,
			isCreated: false,
			dialog: false,
			dealerStatus: {},
			dialogForm: {},
			form: { },
			listQuery: {
				time: [start, end],
				currencyId: '',
				agentId: ''
			},
			agentName: '',
			currencyName: '',
			agentCode: '',
			timestamp: +new Date(),
			dealData: {},
			currency: {},
			showList: [],
			list: [],
			list2: [],
			showTable: false,
			pageSize2: 20,
			total2: 20,
			pageIndex2: 1,
			currentRow: {}
		}
	},
	computed: {
		...mapGetters(['name', 'countryType']),
		countries() {
			const types = this.countryType || []
			return types.map((item) => {
				return {
					value: item.value,
					label: item.text,
					zh: item.text,
					en: item.englishText
				}
			})
		}
	},
	mounted() {
		this.getCurrencyList()
	},
	methods: {
		loadData() {
			this.loading = true
			const params = {
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				currencyId: this.listQuery.currencyId,
				agentId: this.listQuery.agentId,
				startDate: dayjs(this.listQuery.time[0]).format('YYYYMMDD'),
				endDate: dayjs(this.listQuery.time[1]).format('YYYYMMDD')
			}

			region({
				...params
			})
				.then((res) => {
					this.loading = false
					this.list = res.data.record
					this.total = res.data.totalRecord
				})
				.catch(() => {
					this.loading = false
				})
		},
		showDetail(item) {
			this.agentName = item.agentName
			this.currencyName = item.currencyName
			this.agentCode = item.agentCode
			this.list2 = item.betCountryList
			this.dialogVisible = true
		},
		// 获取货币类型
		getCurrency() {
			const index = this.currency.findIndex(
				(val) => Number(val.id) === Number(this.form.currency)
			)
			if (index > -1) {
				return this.currency[index].name
			}
		},
		getCurrencyList(val) {
			listAll({
				pageIndex: 1,
				pageSize: 100
			}).then((_) => {
				const data = _.data
				this.currency = data.record
				console.log(this.currency)
			})
			this.drawer = val
		},
		handleCurrentChange() {
			this.loadData()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.pageIndex = 1
			this.loadData()
		},
		beforeDialogClose() {
			this.$refs.dialogForm.resetFields()
		},
		handleSearch() {
			this.pageIndex = 1
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
.dealer-container {
	.more {
		text-align: center;
		cursor: pointer;
		color: #409EFF;
	}
	.el-icon-zoom-in {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.5);
		font-weight: 900;
		// transform: scale(1.5);
	}
	.handle {
		margin-bottom: 22px;
	}
	.profile {
		opacity: 0.3;
	}
}
.small-size-table {
	font-size: 13px !important;
}

.use-dynamic {
	.el-radio__input.is-checked + .el-radio__label {
		color: inherit;
	}
	.blue {
		color: blue;
	}

	.el-divider {
		margin: 0;
	}
	.add-del {
		padding-left: 24px;
	}

	.content {
		padding: 30px;
	}
}

$width: 160px;
$height: 160px;
$bg-list: (0 #ccffcc), (1 #ff6666), (2 rgba(215, 221, 32, 1)),
	(3 rgba(121, 121, 117, 1));

.list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax($width, 0fr));
	grid-auto-rows: $height;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}

.list-one {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ccffcc;
	color: #666;

	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.list-two {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ff6666;
	color: #666;
	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.title {
	font-size: 18px;
	line-height: 60px;
	font-weight: bold;
}

.colors {
	display: flex;
	margin-top: 30px;

	> div {
		flex: 0 0 160px;
		display: flex;
	}

	.color {
		flex: 0 0 50px;
		height: 50px;
	}

	@each $label, $color1 in $bg-list {
		.color-#{$label} {
			background: $color1;
		}
	}

	.text {
		flex: 1;
		line-height: 50px;
		text-align: center;
	}
}

.detail-dialog {
	div {
		line-height: 30px;
	}
	.label {
		float: right;
		padding: 0 3px;
	}
}

.my-chart {
	width: 1300px;
	height: 600px;
}
</style>
