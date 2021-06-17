<template>
	<div class="review-content">
		<div class="head">
			<span class="title">查看</span>
			<div class="right-btn">
				<el-button plain @click="goBack">返回</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="form" label-width="auto">
					<strong>反馈会员信息</strong>
					<el-row>
						<el-col class="space" :span="7">会员账号：{{ }}</el-col>
						<el-col class="space" :span="7">账号类型：{{ }}</el-col>
						<el-col class="space" :span="6">会员标签：{{ }}</el-col>
						<el-col class="space" :span="6">VIP等级：{{ }}</el-col>
					</el-row>
					<el-divider></el-divider>
					<strong>反馈内容</strong>
					<el-row>
						<el-col class="space" :span="12">反馈类型：{{ }}</el-col>
						<el-col class="space" :span="12">反馈时间：{{ }}</el-col>
						<el-col class="space" :span="6">反馈内容：{{ }}</el-col>
					</el-row>
					<el-divider></el-divider>
					<div class="review-flex">
						<div class="img-div">
							上传的图片：
							<img
								v-for="item in list.list"
								:key="item.imageAddress"
								:src="item.imageAddress"
								class="detail-img text-link"
								@click="lookGame(item.imageAddress)"
							/>
						</div>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'

import { getToken } from '@/utils/auth'
export default {
	components: {},
	mixins: [list],
	props: {
		rowAssortId: {
			type: String,
			default: ''
		},
		rowData: { type: Object, default: () => ({}) }
	},

	data() {
		return {
			gameLabelParam2: '',
			gameLabelParam3: ''
		}
	},
	computed: {
		token() {
			return getToken()
		},

		gameIconType() {
			return this.globalDics.gameIconType
		},
		betDeviceType() {
			return this.globalDics.betDeviceType
		}
	},
	watch: {
		rowData: {
			handler(val) {
				let arr = {}
				arr = JSON.parse(JSON.stringify(val))
				if (arr.supportTerminal) {
					arr.supportTerminal = arr.supportTerminal.split(',')
					arr.relationOtherGameId = arr.relationOtherGameId.split(',')
					arr.relationGameModuleId = arr.relationGameModuleId.split(',')
					if (arr.label1) {
						this.gameLabelParam1 = arr.label1.gameLabelId
					}
					if (arr.label2) {
						this.gameLabelParam2 = arr.label2.gameLabelId
					}
					if (arr.label3) {
						this.gameLabelParam3 = arr.label3.gameLabelId
					}
					if (arr.gameIcon) {
						arr.gameIcon = arr.gameIcon + ''
					}
				}
				this.nowImage = arr.imageAddress
				if (!arr.gameRebateRate) {
					delete arr.gameRebateRate
				}
				this.form = JSON.parse(JSON.stringify(arr))
				console.log(this.form)
				console.log(arr)
			},
			immediate: true,
			deep: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		lookGame(val) {
			this.dialogGameVisible = true
			this.bigImage = val
		},
		goBack() {
			this.$emit('back')
		},
		uploadSuccess(data) {
			this.$set(this.form, 'imageAddress', data)
		}
	}
}
</script>

<style lang="scss" scoped>
.review-flex {
	position: relative;
	width: 100%;
	margin-top: 15px;
	div {
		display: inline-block;
		width: 24%;
	}
}
.detail-img {
	width: 80px;
	height: 80px;
	margin-left: 20px;
	margin-right: 20px;
	display: inline-block;
}
.space {
	line-height: 60px;
}
.img-div {
	width: 100% !important;
}
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.review-content {
	width: 100%;
	.head {
		height: 70px;
		line-height: 70px;
		width: 100%;
		background: #000;
		border-radius: 2px;
		padding: 0 30px;
		.title {
			font-size: 16px;
			font-weight: 600;
			color: rgb(192, 190, 190);
		}
		.right-btn {
			float: right;
		}
	}
	.main-content {
		.review-content {
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0px;
			padding: 30px;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 10px;
				div {
					display: inline-block;
					width: 24%;
				}
			}
		}
		.more-height {
			height: 200px;
		}
	}
	.img-title {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.847058823529412);
	}
}
</style>
