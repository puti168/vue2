<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu flex">
			<lang-select v-if="env" class="right-menu-item hover-effect" />

			<div class="avatar-wrapper flex flex-cc">
				<img :src="myavatar" class="user-avatar" />
				<div class="name flex-cc">{{ name }}</div>
			</div>
			<div class="login-out" @click="loginOut"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
import { getNickName} from '@/utils/auth'
export default {
	components: {
		Breadcrumb,
		Hamburger,
		LangSelect
	},
	data() {
		return {
			name: ''
		}
	},
	computed: {
		...mapGetters(['sidebar', 'avatar']),
		myavatar() {
			return this.avatar || require('@/assets/img/avatar.png')
		},
		env() {
			return process.env.NODE_ENV === 'development'
		}
	},
	mounted() {
    	this.name = getNickName()
  	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		},
		async loginOut() {
			await this.$store.dispatch('user/logout')
			await this.$store.dispatch('permission/clearRoutes')
			this.$router.push(`/login`)
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
