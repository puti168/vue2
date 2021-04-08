<template>
	<!-- 未完成校对局 -->
	<div>
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">未完成校对局</h2>
		</div>
		<div class="use-dynamic">
			<div class="content">
				<div class="list list1">
					<template v-if="list1 && list1.length > 0">
						<div v-for="(item, index) in list1" :key="index" class="list-two">
							<div :class="getColor(Number(item.checkNum ))">
								<div class="list-header">游戏名称:{{ item.gameTypeName }}</div>
								<div class="list-header">局号:{{ item.roundNo }}</div>
								<div class="list-header">注单数据量:{{ item.bettingCounter }}</div>
								<div class="list-header">重试次数:{{ item.checkNum }}</div>
								<div class="list-header">派彩单量:{{ item.payoutCounter }}</div>
								<div class="list-header">b2b单量:{{ item.b2bCounter }}</div>
								<div class="list-header">es单量:{{ item.esCounter }}</div>
								<div class="list-header">耗时:{{ item.consuming }}ms</div>
								<div class="list-header">Next TIme:{{ item.nextCheckAt }}</div>
							</div>
						</div>
					</template>
					<div v-else class="el-table__empty-text" style="width:100%;text-align:center;">暂无数据</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { listBettingRecordCountChecker } from '@/api/dealer'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.dealer,
	mixins: [list],
	data() {
		return {
			dialogVisible: false,
			timestamp: +new Date(),
			isCreated: false,
			drawer: false,
			drawer2: false,
			dialog: false,
			dealerStatus: {},
			dialogForm: {},
			form: {},
			agentid: 0,
			listQuery: {
				type: undefined,
				status: undefined,
				createTime: undefined,
				logoutTime: undefined,
				dealerName: undefined
			},
			dealData: {},
			list: [
				{
					a: 1,
					b: 2,
					c: 3,
					d: 4,
					e: 5
				}
			],
			list1: [],
			list3: []
		}
	},
	created() {
		this.timer = setInterval(() => {
			this.loadList1()
		}, 1500)
	},
	destroyed() {
		window.clearInterval(this.timer)
	},
	methods: {
		loadData() {
			this.loadList1()
		},
		loadList1() {
			// 未完成校对局
			listBettingRecordCountChecker({ status: 0 }).then((list1) => {
				this.list1 = list1.data
			})
		},
		addDealer() {
			this.$router.push('/dealerDetail')
		},
		change({ id, status, dealerAccount }) {
			this.dialogVisible = true
			this.dealerStatus = {
				...this.dealerStatus,
				id,
				status: status === '1' ? '0' : '1',
				dealerAccount
			}
		},
		getRequestParam(params = {}) {
			const create = this.listQuery.createTime || []
			const logout = this.listQuery.logoutTime || []
			const [createStart, createEnd] = create
			const [logoutStart, logoutEnd] = logout
			params = {
				...this.listQuery,
				...params,
				createStart: createStart && createStart + '',
				createEnd: createEnd && createEnd + '',
				logoutStart: logoutStart && logoutStart + '',
				logoutEnd: logoutEnd && logoutEnd + ''
			}
			return params
		},
		handleCurrentChange() {
			this.loadData()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.loadData()
		},
		getColor(num) {
			if (num < 2) return 'color-0'
			if (num === 2) return 'color-1'
			if (num > 2) return 'color-2'
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	margin: 0 30px;
	border-bottom: 1px solid rgb(231, 223, 223);
}

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

$width: 230px;
$height: 220px;
$bg-list: (0 #1a87ba), (1 #f6a137), (2 #dc1330);

.list {
	display: grid;
}

.list1 {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax($width, 0fr));
	grid-auto-rows: $height;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
	font-size: 14px;
}

.list-two {
	width: $width;
}

@each $label, $color1 in $bg-list {
	.color-#{$label} {
		background: $color1;
		height: $height;
		width: $width;
		border: 1px solid #f1f1f1;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
		color: #fff;
		border-radius: 8px;

		.list-header {
			width: $width;
			line-height: 22px;
			padding: 0 5px;
		}
	}
}
</style>
