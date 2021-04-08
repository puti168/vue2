<template>
	<!-- 拉单服务器监控 -->
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="content">
				<iframe
					id="iframeContain"
					name="iframeContain"
					seamless
					scrolling="yes"
					src="http://grafana.act-prod.xpiritsink.com/d/UA28gl1Zz/linuxxi-tong-ying-yong-zi-yuan-jian-kong?orgId=1&refresh=5s&from=now-5m&to=now&var-group=game-api-record&var-host=172.17.0.115&var-host=172.17.0.67"
				>您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面</iframe>
			</div>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.rateServerMonitor,
	data() {
		return {}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
#iframeContain {
	width: 100%;
	height: 800px;
}
</style>
