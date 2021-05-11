<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">创建/编辑</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">保存</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<el-form ref="form" :model="form" label-width="auto" :rules="rules">
						<el-row>
							<el-col :span="12">
								<el-form-item label="游戏名称:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="图标状态:">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="支持终端:" prop="icon">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="备注信息:">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="50"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="接入参数:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="50"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="游戏描述:">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="50"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="关联推荐游戏:" prop="icon">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="关联游戏模块:" prop="icon">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="游戏返奖率:">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="50"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="游戏平台:">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="1级标签:">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="2级标签:">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="3级标签:">
									<el-select
										v-model="form.icon"
										size="medium"
										placeholder="全部"
										multiple
										clearable
										style="width: 365px"
									>
										<el-option
											v-for="item in accountType"
											:key="item.code"
											:label="item.description"
											:value="item.code"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider></el-divider>
						<span class="img-title">客户端图片上传</span>
						<el-form-item label="图片上传" prop="image">
							<!-- <el-upload
								:action="uploadUrl"
								:headers="{
									'X-Request-Sys': '0',
									'x-request-token': token
								}"
								:data="dataList"
								:show-file-list="false"
								accept="image/png"
								:on-success="
									(response, file, fileList) =>
										handleAvatarSuccess(response, file, fileList)
								"
								:before-upload="(file) => beforeAvatarUpload(file)"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<el-upload
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<el-dialog
			title="提交确认"
			center
			:visible.sync="visible"
			:before-close="closeFormDialog"
			width="610px"
		>
			<el-form ref="form" label-width="100px">
				<el-form-item label="提交审核信息">
					<el-input
						v-model="remark"
						clearable
						type="textarea"
						:max="50"
						:autosize="{ minRows: 4, maxRows: 4 }"
						size="medium"
						placeholder="请输入"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="auditOne">
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import { getToken } from '@/utils/auth'
// import dayjs from 'dayjs'
export default {
	name: routerNames.gameManagementEdit,
	components: { },
	mixins: [list],
	data() {
		return {
			list: {},
			form: {
				icon: '',
				gameName: ''
			},
			dataList: {},
			visible: false,
			remark: '',
			action: false,
			uploadUrl: process.env.VUE_APP_BASE_API + '/agents/uploadAgentLog',
			imageUrl: '',
			// 审核 true 仅返回 false
			type: true
		}
	},
	computed: {
		token() {
			return getToken()
		},
		accountType() {
			return this.globalDics.accountType
		},
		genderType() {
			return this.globalDics.genderType
		},
		rules() {
			return {
				icon: [{ required: true, message: '请选择支持终端', trigger: 'blur' }],
				image: [
					{
						required: true,
						message: '请选择图片上传',
						trigger: ['blur', 'change']
					}
				],
				gameName: [
					{
						required: true,
						message: '请输入游戏名称',
						trigger: 'blur'
					}
				]
			}
		}
	},
	created() {
		if (this.$route.name === 'addMemberReview') {
			this.getInfo()
			this.type = this.$route.query.type
		}
	},
	mounted() {},
	methods: {
		closeFormDialog() {
			this.visible = false
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
		beforeAvatarUpload(file, row) {
			// const isPNG = file.type === 'image/png'
			// if (!isPNG) {
			// 	this.$message.error(this.$t('new_2771'))
			// }
			// const isSize = new Promise(function(resolve, reject) {
			// 	const _URL = window.URL || window.webkitURL
			// 	const image = new Image()
			// 	// image.src = file.url
			// 	image.onload = () => {
			// 		const valid = image.width === 240 && image.height === 72
			// 		valid ? resolve() : reject()
			// 	}
			// 	image.src = _URL.createObjectURL(file)
			// }).then(
			// 	() => {
			// 		return file
			// 	},
			// 	() => {
			// 		this.$message({
			// 			message: this.$t('new_2771'),
			// 			type: 'error'
			// 		})
			// 		return Promise.reject()
			// 	}
			// )
			// this.dataList = {
			// 	textType: 4,
			// 	agentId: row.agentId.split('_')[1]
			// }
			// return isPNG && isSize
		},
		handleAvatarSuccess(response, file, fileList, row) {
			// if (response.code !== 200) {
			// 	this.$message({
			// 		message: this.$i18n.t(`backstage_${response.code}`),
			// 		type: 'error'
			// 	})
			// } else {
			// 	row.blogo = response.data
			// 	this.$message({
			// 		message: this.$t(`new_1111`),
			// 		type: 'success'
			// 	})
			// }
		},
		auditOne() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const params = {
				id: this.$route.query.id,
				userId: this.$route.query.userId,
				remark: this.remark,
				auditStatus: this.action ? 2 : 3
			}

			this.$api
				.updateMemberAuditRecord(params)
				.then((res) => {
					loading.close()
					if (res.code === 200) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
						this.visible = false
						this.goBack()
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					loading.close()
				})
		},
		goBack() {
			this.$router.go(-1)
		},
		getInfo() {
			const params = {
				id: this.$route.query.id
			}
			this.$api.memberAuditDetail(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.list = response
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF'
			} else {
				return ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
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
