<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu flex">
			<i class="el-icon-date"></i>
			<span class="time">(GMT+8): {{ nowMonth }} {{ week }} {{ nowSecond }}</span>
			<div class="avatar-wrapper flex flex-cc">
				<img :src="myavatar" class="user-avatar" />
				<div class="name flex-cc">{{ name }}</div>
			</div>
			<div class="login-out" @click="loginOut"></div>
		</div>
		<div v-if="showMemberInfo" class="user-wrapper">
			<h2>账户信息</h2>
			<div class="flex-h flex-wrap flex-bc">
				<div class="flex flex-1">
					<span class="span-label">商户名称：</span>
					<span>{{ userInfo.agentName }}</span>
				</div>
				<div class="flex flex-1">
					<span class="span-label">商户编码：</span>
					<span>{{ userInfo.agentCode }}</span>
				</div>
			</div>
			<div class="flex-h flex-wrap flex-bc">
				<div class="flex flex-1">
					<span class="span-label">登录账号：</span>
					<span>{{ userInfo.username }}</span>
				</div>
				<div class="flex flex-1">
					<span class="span-label">剩余点数：</span>
					<span>
						{{
						userInfo.id === 1
						? '-'
						: (userInfo.balance
						? formatCurrency(Number(userInfo.balance))
						: '-')
						}}
					</span>
				</div>
			</div>
			<div class="flex-h flex-wrap flex-bc">
				<div class="flex flex-1">
					<span class="span-label">币种：</span>
					<span>{{ userInfo.id === 1 ? '-' : userInfo.currencyName }}</span>
				</div>
				<div class="flex flex-1">
					<span class="span-label">上次登录时间：</span>
					<span>{{ userInfo.lastLoginTime }}</span>
				</div>
			</div>
			<el-button size="small" class="modify-btn" @click="onModify">修改密码</el-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getNickName} from '@/utils/auth'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { formatCurrency } from '@/utils'
export default {
	components: {
		Breadcrumb,
		Hamburger
	},
	data() {
		return {
			showMemberInfo: false,
			nowMonth: '',
			nowSecond: '',
			week: '',
			timer2: '',
			timer: '',
			weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			name: ''
		}
	},
	computed: {
		...mapGetters(['sidebar', 'avatar', 'userInfo']),
		myavatar() {
			return this.avatar || require('@/assets/img/avatar.png')
		},
		env() {
			return process.env.NODE_ENV === 'development'
		}
	},
	mounted() {
		dayjs.extend(utc)
		this.timer = setInterval(this.refresh, 1000)
    	this.name = getNickName()
  	},
	methods: {
		formatCurrency,
		getBeijingtime() {
			// 获得当前运行环境时间
			const d = new Date()
			const currentDate = new Date()
			const tmpHours = currentDate.getHours()
			// 算得时区
			let time_zone = -d.getTimezoneOffset() / 60
			if (time_zone < 0) {
				time_zone = Math.abs(time_zone) + 8
				currentDate.setHours(tmpHours + time_zone)
			} else {
				time_zone -= 8
				currentDate.setHours(tmpHours - time_zone)
			}
			return currentDate
		},
		refresh() {
			this.nowMonth = dayjs()
				.utc()
				.utcOffset(8)
				.format('YYYY-MM-DD')
			this.nowSecond = dayjs()
				.utc()
				.utcOffset(8)
				.format('HH:mm:ss')
			const day = this.getBeijingtime().getDay()
			this.week = this.weeks[day]
		},
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		},
		async loginOut() {
			await this.$store.dispatch('user/logout')
			await this.$store.dispatch('permission/clearRoutes')
			this.$store.dispatch('tree/setTree', [])
			this.$store.dispatch('tree/setTreeData', [])
			this.$router.push(`/login?redirect=${this.$route.fullPath}`)
		},
		onModify() {
			this.$store.dispatch('app/setModify', true)
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		margin-right: 15px;
		float: right;
		height: 100%;
		line-height: 50px;
		.time {
			margin-right: 20px;
		}
		.el-icon-date {
			line-height: 50px;
			margin-right: 10px;
			font-size: 20px;
		}
		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-wrapper {
			margin-right: 15px;
			padding-right: 15px;
			position: relative;
			border-right: 1px solid #eee;
			position: relative;

			.user-avatar {
				margin-top: 5px;
				margin-right: 10px;
				cursor: pointer;
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}

			.name {
				font-size: 14px;
				color: #303133;
			}
		}
		.login-out {
			margin-top: 10px;
			width: 40px;
			height: 30px;
			display: inline-block;
			background: url('../../assets/img/bb_bt_logout.png') no-repeat;
			cursor: pointer;
		}
		.login-out:active {
			background: url('../../assets/img/bb_bt_logout_pre.png') no-repeat;
		}
	}
}
</style>
