<template>
	<div>
		<div class="info-content">
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>银行卡号：</span>
					<span>
						{{ showInfoData.cardNumber ? showInfoData.cardNumber : '-' }}
					</span>
				</el-col>
				<el-col :span="8">
					<span>银行名称：</span>
					<span>
						{{ showInfoData.cardNumber ? showInfoData.cardNumber : '-' }}
					</span>
				</el-col>
				<el-col :span="5">
					<span>黑名单状态：</span>
					<span
						v-if="
							showInfoData.blackStatus && showInfoData.blackStatus * 1 === 1
						"
						class="normalRgba"
					>
						启用中
					</span>
					<span
						v-else-if="showInfoData.blackStatus + '' === '0'"
						class="disableRgba"
					>
						禁用中
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="5">
					<span>绑定状态：</span>
					<span
						v-if="showInfoData.bindStatus && showInfoData.bindStatus * 1 === 1"
						class="normalRgba"
					>
						绑定中
					</span>
					<span
						v-else-if="showInfoData.bindStatus + '' === '0'"
						class="disableRgba"
					>
						待绑定
					</span>
					<span v-else>-</span>
				</el-col>
			</el-row>
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>绑定账号次数：</span>
					<span>{{ showInfoData.bindNum ? showInfoData.bindNum : '-' }}</span>
				</el-col>
				<el-col :span="8">
					<span>提款总额：</span>
					<span>
						{{
							showInfoData.withdrawalTotalAmount
								? showInfoData.withdrawalTotalAmount
								: '-'
						}}
					</span>
				</el-col>
				<el-col :span="5">
					<span>风控层级：</span>
					<span>
						{{
							showInfoData.windControlName ? showInfoData.windControlName : '-'
						}}
					</span>
				</el-col>
				<el-col :span="5">
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
	name: 'BankCard',
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
