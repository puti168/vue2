<template>
	<div class="game-container">
		<div class="flex-h flex-bc">
			<h2 class="h2-line">{{ $t('navbar.dashboard') }}</h2>
		</div>
		<el-row class="content">
			欢迎使用, 多交流, 多联系
		</el-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Index',
	computed: {
		...mapGetters(['name'])
	}
}
</script>

<style lang="scss" scoped>
.content {
	text-align: center;
	padding: 120px 0;
}
.welcome-info {
	margin-top: 20%;
	font-size: 20px;
	color: #333;
}
.logo {
	width: 300px;
	height: 300px;
}
</style>
