<template>
	<el-dropdown trigger="click" class="international" @command="handleSetLanguage">
		<div>
			<svg-icon class-name="international-icon" icon-class="language" />
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
			<el-dropdown-item :disabled="language==='tw'" command="tw">繁体</el-dropdown-item>
			<el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	computed: {
		language() {
			return this.$store.getters.language
		}
	},
	methods: {
		handleSetLanguage(lang) {
			this.$i18n.locale = lang
			this.$store.dispatch('app/setLanguage', lang)
			this.$message({
				message:
					lang === 'zh'
						? '语言切换成功'
						: lang === 'tw'
						? '語言切換成功'
						: 'Switch Language Success',
				type: 'success',
				duration: 2000
			})
		}
	}
}
</script>
