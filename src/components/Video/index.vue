<template>
	<el-dialog v-if="value" width="60%" :title="title" :visible="value" @close="handleClose">
		<div class="flex-bc">
			<div v-if="userName">
				<h3 style="display: inline-block">会员账号</h3>
				<span>{{ userName }}</span>
			</div>
			<div v-if="roundNo">
				<h3 style="display: inline-block">游戏局号</h3>
				<span>{{ roundNo }}</span>
			</div>
		</div>
		<video controls loop autoplay width="100%" :src="src">
			<object
				id="flowplayer"
				width="704"
				height="400"
				:data="src"
				type="application/x-shockwave-flash"
			>
				<param name="movie" :value="src" />
				<p>您的浏览器不支持此视频</p>
			</object>
		</video>
		<slot name="result"></slot>
	</el-dialog>
</template>

<script>
export default {
	name: 'Video',
	props: {
		title: {
			type: String,
			default: '查看视频'
		},
		userName: {
			type: String,
			default: ''
		},
		roundNo: {
			type: String,
			default: ''
		},
		value: { type: Boolean, default: false },
		src: {
			type: String,
			default: ''
		}
	},
	methods: {
		handleClose() {
			this.$emit('input', false)
		}
	}
}
</script>
<style lang="scss" scoped>
h3 {
	margin: 0;
}
video {
	margin: 10px 0;
}
</style>
