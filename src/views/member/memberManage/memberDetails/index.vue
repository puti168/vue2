<template>
	<div class="allmargin report-container">
		<div class="bg"></div>
		<div class="ps">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="会员账号:">
					<el-input
						v-model="queryData.userid"
						clearable
						size="medium"
						style="width: 280px"
						placeholder="请输入会员账号"
						:disabled="loading"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 30px">
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="query"
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
			<el-tabs
				v-if="reload"
				v-model="activeName"
				class="tabsBox"
				@tab-click="handleClick"
			>
				<el-tab-pane
					v-if="tabs[0].isShow"
					:label="tabs[0].title"
					name="0"
				></el-tab-pane>
				<el-tab-pane
					v-if="tabs[1].isShow"
					:label="tabs[1].title"
					name="1"
				></el-tab-pane>
				<el-tab-pane
					v-if="tabs[2].isShow"
					:label="tabs[2].title"
					name="2"
				></el-tab-pane>
				<el-tab-pane
					v-if="tabs[3].isShow"
					:label="tabs[3].title"
					name="3"
				></el-tab-pane>
			</el-tabs>
		</div>
		<div class="marginTb"></div>
		<div
			class="scroll-content"
			:style="
				'overflow-x: hidden; overflow-y: auto;height:' + contentStyleObj.height
			"
			@scroll="onScroll"
		>
			<first
				ref="first"
				class="floor-item"
				:memberRemarkList="memberRemarkList"
			></first>
			<second class="floor-item" :balanceList="balanceList"></second>
			<third class="floor-item"></third>
			<fourth class="floor-item"></fourth>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import first from './components/first'
import second from './components/second'
import third from './components/third'
import fourth from './components/fourth'
export default {
	name: 'IFloor',
	components: { first, second, third, fourth },
	mixins: [list],
	data() {
		return {
			queryData: { userid: 587597733479145472 },
			element: {
				nav_item: null,
				floor_item: null
			},
			timer: null,
			memberRemarkList: {},
			balanceList: { freezeBalance: '' },
			activeName: '0',
			reload: true,
			contentStyleObj: {
				height: '100px'
			},
			tabs: [
				{
					isShow: true,
					title: '基本信息',
					refName: 'oneTab'
				},
				{
					isShow: true,
					title: '财务信息',
					refName: 'TwoTab'
				},
				{
					isShow: true,
					title: '登录信息',
					refName: 'threeTab'
				},
				{
					isShow: true,
					title: '银行卡/虚拟币账号信息',
					refName: 'fourthTab'
				}
			]
		}
	},
	computed: {
		num: {
			get() {
				return this.$refs.first.page
			}
		},
		size: {
			get() {
				return this.$refs.first.size
			}
		}
	},
	mounted() {
		this.getBaseHg()
		window.addEventListener('resize', this.getBaseHg)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getBaseHg)
	},
	methods: {
		refresh() {
			this.reload = false
			this.$nextTick(() => (this.reload = true))
		},
		handleClick(index) {
			const target = document.querySelector('.scroll-content')
			const scrollItems = document.querySelectorAll('.floor-item')
			// console.log('target', target.scrollHeight, target.scrollTop, target.clientHeight)
			if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
				this.activeName = index.index.toString()
				console.log('index', index)
			}
			const totalY =
				scrollItems[index.index].offsetTop - scrollItems[0].offsetTop
			let distance = document.querySelector('.scroll-content').scrollTop
			let step = totalY / 50
			if (totalY > distance) {
				smoothDown(document.querySelector('.scroll-content'))
			} else {
				const newTotal = distance - totalY
				step = newTotal / 50
				smoothUp(document.querySelector('.scroll-content'))
			}
			function smoothDown(element) {
				if (distance < totalY) {
					distance += step
					element.scrollTop = distance
					setTimeout(smoothDown.bind(this, element), 10)
				} else {
					element.scrollTop = totalY
				}
			}
			function smoothUp(element) {
				if (distance > totalY) {
					distance -= step
					element.scrollTop = distance
					setTimeout(smoothUp.bind(this, element), 10)
				} else {
					element.scrollTop = totalY
				}
			}
		},
		onScroll($event) {
			const scrollItems = document.querySelectorAll('.floor-item')
			for (let i = scrollItems.length - 1; i >= 0; i--) {
				const judge =
					$event.target.scrollTop >=
					scrollItems[i].offsetTop - scrollItems[0].offsetTop - 120
				if (judge) {
					this.activeName = i.toString()
					break
				}
			}
		},
		getBaseHg() {
		    console.log('window.innerHeight', window.innerHeight)
			this.contentStyleObj.height = (window.innerHeight - 500) + 'px'
		},
		// vip信息
		getVipInfo(val) {
			this.$api.getVipInfo(val).then((res) => {
				console.log(res)
			})
		},
		// 备注信息
		getMemberRemarkList(val) {
			const params = { ...val, pageNum: this.num, pageSize: this.size }
			this.$api.getMemberRemarkList(params).then((res) => {
				if (res.code === 200) {
					this.memberRemarkList = res.data
				}
				console.log(res)
			})
		},
		// 查询中心钱包余额
		getAccountCashAccount(val) {
			this.$api.getAccountCashAccount(val).then((res) => {
				console.log(res)
			})
		},
		// 提现冻结余额
		getWithdrawalFreeze(val) {
			this.$api.getWithdrawalFreeze(val).then((res) => {
				if (res.code === 200) {
					console.log(res, 'freezeBalance')
					this.balanceList.freezeBalance = res.data.freezeBalance
				}
			})
		},
		// 银行卡/虚拟币
		getBankCardBank(val) {
			this.$api.getBankCardBank(val).then((res) => {
				console.log(res)
			})
		},
		query() {
			const params = this.queryData
			// this.getVipInfo(params);
			this.getMemberRemarkList(params)
			// this.getAccountCashAccount(params);
			this.getWithdrawalFreeze(params)
			// this.getBankCardBank(params);
		},
		reset() {
			this.queryData = {}
		},

		/**
		 * 设置楼层导航事件驱动方法
		 * @param {Number} index  楼层下标
		 */
		setFloorNavMountClick(index) {
			const { floor_item } = this.element
			const floor_offsetTop =
				floor_item[index].offsetTop - floor_item[0].offsetTop
			const window_scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop
			const timer = {
				step: 60,
				times: 20,
				FLOOR_OFFSETTOP: floor_offsetTop
			}
			if (window_scrollTop > floor_offsetTop) {
				this.setFloorScrollArrowUp(timer)
			} else if (window_scrollTop === floor_offsetTop) {
				return false
			} else {
				this.setFloorScrollArrowDown(timer)
			}
		},
		/**
		 * 设置楼层向上滚动
		 * @param {Object} timer 定时器配置
		 */
		setFloorScrollArrowUp(timer) {
			clearInterval(this.timer)
			this.timer = setInterval(() => {
				const window_scrollTop =
					document.documentElement.scrollTop || document.body.scrollTop
				if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
					document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
					document.body.scrollTop = timer.FLOOR_OFFSETTOP
					clearInterval(this.timer)
				} else {
					document.documentElement.scrollTop = window_scrollTop - timer.step
					document.body.scrollTop = window_scrollTop - timer.step
				}
			}, timer.times)
		},
		/**
		 * 设置楼层向下滚动
		 * @param {Object} timer 定时器配置
		 */
		setFloorScrollArrowDown(timer) {
			clearInterval(this.timer)
			this.timer = setInterval(() => {
				const window_scrollTop =
					document.documentElement.scrollTop || document.body.scrollTop
				if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
					document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
					document.body.scrollTop = timer.FLOOR_OFFSETTOP
					clearInterval(this.timer)
				} else {
					document.documentElement.scrollTop = window_scrollTop + timer.step
					document.body.scrollTop = window_scrollTop - timer.step
				}
			}, timer.times)
		},
		/**
		 * 监听窗口滚动楼层导航动态定位
		 */
		floorSrcollEventListener() {
			const { nav_item, floor_item } = this.element
			const window_scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop
			for (let i = 0, len = floor_item.length; i < len; i++) {
				const floor_offsetTop =
					floor_item[i].offsetTop - floor_item[0].offsetTop
				if (window_scrollTop >= floor_offsetTop) {
					for (let n = 0, len = nav_item.length; n < len; n++) {
						i === n
							? (this.activeName = this.tabList[i])
							: (this.activeName = this.tabList[i])
					}
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.allmargin {
	margin: 9px 15px 15px 15px;
}
.ps {
	position: fixed;
	height: 125px;
	width: 100%;
	background: #fff;
	padding: 15px 0;
	z-index: 100;
	border-bottom: 1px solid #dcdfe6;
}
.bg {
	width: 100%;
	height: 15px;
	background: #ffffff;
	position: fixed;
	top: 100px;
	z-index: 1;
}

/deep/ .tabsBox .el-tabs__nav-wrap::after {
	display: none;
}
/deep/ .tabsBox .el-tabs__content {
	display: none;
}
/deep/ .tabsBox .el-tabs__item {
	font-weight: bold;
}
.floor-item {
	// width: 100%;
	// min-height: 500px;
	// text-align: center;
	// color: #fff;
	// background-color: #404040;
}
.marginTb {
	height: 125px;
}
</style>
