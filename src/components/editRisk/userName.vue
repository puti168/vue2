<template>
	<div>
		<div class="info-content">
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>会员账号：</span>
					<span>
						{{ showInfoData.username ? showInfoData.username : '-' }}
					</span>
				</el-col>
				<el-col :span="6">
					<span>账户类型：</span>
					<span v-if="showInfoData.accountType">
						{{ typeFilter(showInfoData.accountType, 'accountType') }}
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="6">
					<span>会员姓名：</span>
					<span v-if="showInfoData.realName">
						{{ showInfoData.realName }}
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="6">
					<span>离线天数：</span>
					<span v-if="showInfoData.leaveLineDays">
						{{ showInfoData.leaveLineDays }}
					</span>
					<span v-else>-</span>
				</el-col>
			</el-row>
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>风控层级：</span>
					<span>
						{{
							showInfoData.windControlName ? showInfoData.windControlName : '无'
						}}
					</span>
				</el-col>
				<el-col :span="8">
					<span>风控原因：</span>
					<span>
						{{ showInfoData.windReason ? showInfoData.windReason : '无' }}
					</span>
				</el-col>
				<el-col :span="6"></el-col>
				<el-col :span="6"></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	name: 'UserName',
	mixins: [list],
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
