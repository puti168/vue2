
<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">访问详情统计</h2>
			<div class="head flex-h-end">
				<el-button type="primary" icon="el-icon-search" size="medium" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="form">
					<el-row>
						<!-- 统计单位 -->
						<el-form-item label="统计单位" prop="reportType">
							<el-select v-model="form.reportType" style="width:120px">
								<el-option label="分钟" :value="1"></el-option>
								<el-option label="小时" :value="2"></el-option>
								<el-option label="天" :value="3"></el-option>
								<el-option label="周" :value="4"></el-option>
								<el-option label="月" :value="5"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="统计区间">
							<el-date-picker
								v-show="showHour==='datetimerange'"
								v-model="form.time"
								size="medium"
								:format="format"
								type="datetimerange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="right"
								value-format="timestamp"
								clearable
								style="width:500px"
							></el-date-picker>
							<el-date-picker
								v-show="showHour==='week'"
								v-model="form.time2"
								:format="format"
								align="left"
								type="week"
								placeholder="选择周"
								:clearable="false"
							></el-date-picker>
						</el-form-item>
					</el-row>
					<el-row>
						<!-- 接口名称 -->
						<el-form-item label="接口名称" prop="methodName">
							<el-select v-model="form.methodName" @change="selectChange">
								<el-option v-for="(face) in interfaceList" :key="face" :label="face" :value="face"></el-option>
							</el-select>
						</el-form-item>
						<span v-for="(tag,index) in dynamicTags" :key="index" class="translate-tag">
							<el-tag closable @close="handleClose(tag)">{{ tag }}</el-tag>
						</span>
					</el-row>
					<el-row>
						<el-col :span="24">
							<SelectAgentTree v-model="form.agentId" @getAgentName="getAgentName" />
							<span v-for="(tag,index) in dynamicTags2" :key="index" class="translate-tag2">
								<el-tag closable @close="handleClose2(tag)">{{ tag }}</el-tag>
							</span>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					class="small-size-table"
					border
					:data="list"
					:default-sort="defaultSort"
					:header-cell-style="getRowClass"
					:row-class-name="tableRowClassName"
					@sort-change="sortChange"
				>
					<el-table-column type="index" label="序号" align="center" width="90"></el-table-column>
					<el-table-column prop="agentName" align="center" label="商户"></el-table-column>
					<el-table-column prop="methodName" align="center" label="接口名称"></el-table-column>
					<el-table-column prop="itemName" align="center" label="统计时间" sortable="custom" width="170"></el-table-column>
					<el-table-column prop="counter" align="center" label="访问次数" sortable="custom" width="120"></el-table-column>
				</el-table>
				<!-- 分页 -->
				<!-- <el-pagination
					:current-page.sync="pageIndex"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>-->
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { listApiAccessCounterMulti, interfaceList } from '@/api/cardRepertory'
import dayjs from 'dayjs'
import SelectAgentTree from '@/components/SelectAgentTree2'

export default {
	name: 'Api',
	components: { SelectAgentTree },
	mixins: [list],
	data() {
		const start = dayjs().startOf('day').subtract(7, 'd')
		const end = dayjs().endOf('day')

		return {
			dynamicTags: [],
			dynamicTags2: [],
			dynamicTags3: [],
			timestamp: +new Date(),
			form: {
				time: [start, end],
				time2: '',
				agentId: '',
				orderProp: 'itemName',
				order: 'descending',
				reportType: 2,
				methodName: ''
			},
			list: [],
			defaultSort: { prop: 'itemName', order: 'descending' },
			format: 'yyyy-MM-dd HH时',
			showHour: 'datetimerange',
			agentName: '',
			interfaceList: []
		}
	},
	watch: {
		'form.reportType'(val) {
			if (val === 1) {
				this.format = 'yyyy-MM-dd HH:mm'
				this.showHour = 'datetimerange'
			}
			if (val === 2) {
				this.format = 'yyyy-MM-dd HH时'
				this.showHour = 'datetimerange'
			}
			if (val === 3) {
				this.format = 'yyyy-MM-dd'
				this.showHour = 'datetimerange'
			}
			if (val === 4) {
				this.format = 'yyyy-WW周'
				this.showHour = 'week'
			}
			if (val === 5) {
				this.format = 'yyyy-MM月'
				this.showHour = 'datetimerange'
			}
		},
		'form.agentId'(val) {
			this.getAgentId(val)
		}
	},
	methods: {
		loadData() {
			interfaceList().then((res) => {
				this.interfaceList = res.data || []
			})

			this.loadPage()
		},
		loadPage() {
			const params = {
				agentIds: this.dynamicTags3.join(','),
				methodNames: this.dynamicTags.join(','),
				pageSize: 100,
				pageIndex: 1,
				orderProp: this.form.orderProp,
				order: this.form.order,
				reportType: this.form.reportType
			}

			if (this.form.reportType === 4) {
				params.startTime = this.form.time2
					? dayjs(this.form.time2).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
					: ''
				params.endTime = this.form.time2
					? dayjs(this.form.time2)
							.add(5, 'days')
							.endOf('days')
							.format('YYYY-MM-DD HH:mm:ss')
					: ''
			} else {
				params.startTime = this.form.time
					? dayjs(this.form.time[0]).format('YYYY-MM-DD HH:mm:ss')
					: ''
				params.endTime = this.form.time
					? dayjs(this.form.time[1]).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}

			listApiAccessCounterMulti({
				...params
			}).then((res) => {
				this.list = res.data
				this.total = res.data.totalRecord
			})
		},
		handleCurrentChange() {
			this.loadPage()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.pageIndex = 1
			this.loadPage()
		},
		handleSearch() {
			this.loadPage()
		},
		// 失去焦点的时候重置
		onTimeBlur() {
			this.minDate = null
		},
		sortChange(val) {
			const { prop, order } = val
			if (order === null) {
				this.form.orderProp === 'descending'
					? (val.order = 'descending')
					: (val.order = 'ascending')
				val.column.order = val.order
				this.form.orderProp = prop
				this.form.order = val.order
				this.loadData()
				return val
			}
			this.form.orderProp = prop
			this.form.order = order
			this.defaultSort = { prop, order: order || 'descending' }
			this.loadData()
			return val
		},
		tableRowClassName({ row, rowIndex }) {
			const num = row.checkNum
			if (num < 2) return 'color-0'
			if (num === 2) return 'color-1'
			if (num > 2) return 'color-2'
		},
		handleClose(tag) {
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
		},
		handleClose2(tag) {
			const index = this.dynamicTags2.indexOf(tag)
			this.dynamicTags2.splice(index, 1)
			this.dynamicTags3.splice(index, 1)
		},
		getAgentName(name) {
			if (this.dynamicTags2.includes(name)) return
			this.dynamicTags2 = [...this.dynamicTags2.push(name)]
		},
		getAgentId(id) {
			if (this.dynamicTags3.includes(id)) return
			this.dynamicTags3 = [...this.dynamicTags3.push(id)]
		},
		selectChange(val) {
			if (this.dynamicTags.includes(val)) return
			this.dynamicTags = [...this.dynamicTags.push(val)]
		}
	}
}
</script>

<style lang="scss" scoped>
.dealer-container {
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

.translate-tag {
	display: inline-block;
	transform: translateY(10px);
	margin-right: 10px;
}
.translate-tag2 {
	display: inline-block;
	transform: translateY(15px);
	margin-right: 10px;
}
</style>
