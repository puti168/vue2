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
				<el-form label-width="auto">
					<strong>反馈会员信息</strong>
					<el-row>
						<el-col class="space" :span="7">
							会员账号：{{ rowData.userName || '-' }}
						</el-col>
						<el-col class="space" :span="7">
							账号类型：
							<span v-if="!!rowData.accountType">
								{{ typeFilter(rowData.accountType, 'accountType') }}
							</span>
						</el-col>
						<el-col class="space" :span="6">
							会员标签：{{ rowData.labelName || '-' }}
						</el-col>
						<el-col class="space" :span="6">
							VIP等级：{{
								rowData.levelId || rowData.levelId === 0 ? rowData.levelId : '-'
							}}
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<strong>反馈内容</strong>
					<el-row>
						<el-col class="space" :span="12">
							反馈类型：
							<span>{{ problemType }}</span>
						</el-col>
						<el-col class="space" :span="12">
							反馈时间：{{ rowData.createDt || '-' }}
						</el-col>
						<el-col class="space" :span="16">
							反馈内容：{{ rowData.problemDescribe || '-' }}
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<div class="review-flex">
						<div class="img-div">
							<span>上传的图片：</span>
							<img
								v-for="(url, k) in imgUrlArr"
								:key="k"
								:src="url"
								class="detail-img text-link"
								@click="lookGame(url)"
							/>
						</div>
					</div>
				</el-form>
			</div>
		</div>
		<el-dialog
			title="图片"
			:visible.sync="imgdDialogVisible"
			:destroy-on-close="true"
			width="750px"
			class="imgCenter"
		>
			<div class="img-box">
				<img v-lazy="bigImage" />
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	components: {},
	mixins: [list],
	props: {
		problemType: {
			type: String,
			default: ''
		},
		rowData: { type: Object, default: () => ({}) }
	},

	data() {
		return {
			backEnumsList: [],
			imgdDialogVisible: false,
			imgUrlArr: [],
			bigImage: undefined
		}
	},
	computed: {},
	watch: {
		rowData: {
			handler(val) {
				const arr = JSON.parse(JSON.stringify(val))
				if (arr.url) {
					this.imgUrlArr = this.handleImagUrl(arr.url)
				}
			},
			immediate: true,
			deep: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		lookGame(val) {
			this.imgdDialogVisible = true
			this.bigImage = val
		},
		goBack() {
			this.$emit('back')
		},
		handleImagUrl(url) {
			return typeof url === 'string' ? url.split(',') : []
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
	.imgCenter {
		.img-box {
			height: 500px;
			img {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
