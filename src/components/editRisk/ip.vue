<template>
	<div>
		<div class="info-content">
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>注册IP地址：</span>
					<span>
						{{ showInfoData.registerIp ? showInfoData.registerIp : '-' }}
					</span>
				</el-col>
				<el-col :span="6">
					<span>ip归属地：</span>
					<span v-if="showInfoData.ipAttribution">
						{{ showInfoData.ipAttribution }}
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="6">
					<span>风控层级：</span>
					<span>
						{{
							showInfoData.windControlName ? showInfoData.windControlName : '-'
						}}
					</span>
				</el-col>
				<el-col :span="6">
					<span>风控原因：</span>
					<span>
						{{ showInfoData.windReason ? showInfoData.windReason : '-' }}
					</span>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Ip',
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
