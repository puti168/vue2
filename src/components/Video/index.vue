<template>
	<el-dialog
		width="60%"
		:title="$t('btn.videoView')"
		:visible.sync="visible"
		:close-on-click-modal="false"
		@close="handleClose"
	>
		<video controls loop autoplay width="100%">
			<source :src="src" type="video/mp4" />
			<source :src="src" type="video/webm" />
			<object
				id="flowplayer"
				width="704"
				height="400"
				:data="src"
				type="application/x-shockwave-flash"
			>
				<param name="movie" :value="src" />
				<p>{{ this.$t('page.notSupport') }}</p>
			</object>
		</video>
	</el-dialog>
</template>

<script>
export default {
	name: 'Video',
	props: {
		value: { type: Boolean, default: false },
		src: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			visible: false
		}
	},
	watch: {
		value(val) {
			this.visible = val
		}
	},
	methods: {
		handleClose() {
			this.$emit('update:value', false)
		}
	}
}
</script>
