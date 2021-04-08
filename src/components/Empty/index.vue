<template>
	<div class="empty flex-vcc">
		<svg-icon icon-class="empty" />
		<span class="text">{{ $t('tip') }}</span>
	</div>
</template>

<script>
</script>
<style lang="scss" scoped>
.empty {
	svg {
		width: 120px;
		height: 100px;
	}
	.text {
		color: rgba(0, 0, 0, 0.65);
	}
}
</style>
