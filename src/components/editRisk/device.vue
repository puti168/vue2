<template>
	<div>
		<div class="info-content">
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>终端设备号：</span>
					<span>
						{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
					</span>
				</el-col>
				<el-col :span="6">
					<span>风控层级：</span>
					<span>
						{{
							showInfoData.windControlName ? showInfoData.windControlName : '无'
						}}
					</span>
				</el-col>
				<el-col :span="6">
					<span>风控原因：</span>
					<span>
						{{ showInfoData.windReason ? showInfoData.windReason : '无' }}
					</span>
				</el-col>
				<el-col :span="6"></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Device',
	props: {
		showInfoData: {
			type: Object,
			default: () => {}
		}
	}
}
</script>

<style lang="scss" scoped>
.info-header {
	border-top: 1px rgba(233, 233, 233, 1) solid;
	span {
		margin-top: 45px;
		display: inline-block;
		width: 188px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #000;
		color: rgb(255, 255, 255);
	}
}
.info-content {
	margin-top: 30px;
	font-size: 14px;
	.info-content-row {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
</style>
