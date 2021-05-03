<template>
	<div class="game-container report-container addMember-container">
		<div class="line-member"></div>
		<div class="addMember-content">
			<div class="form-header">
				<span>新增会员资料</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="账号类型:" prop="userType">
					<el-select
						v-model="form.userType"
						size="medium"
						placeholder="全部"
						clearable
						style="width: 365px"
					>
						<el-option label="全部" value="全部"></el-option>
						<el-option label="正式" value="1"></el-option>
						<el-option label="试玩" value="2"></el-option>
						<el-option label="商务" value="3"></el-option>
						<el-option label="测试" value="4"></el-option>
						<el-option label="置换" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="会员账号:" prop="userName">
					<el-input
						v-model="form.userName"
						size="medium"
						placeholder="4-11位，最少2个字母+数字组合，首位字母"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="登录密码:" prop="password">
					<el-input
						v-model="form.password"
						size="medium"
						placeholder="8-12位，字母+数字组合"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="手机号码:">
					<el-input
						v-model="form.phone"
						size="medium"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="上级代理:">
					<el-input
						v-model="form.supAgent"
						size="medium"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-select
						v-model="form.gender"
						size="medium"
						placeholder="全部"
						clearable
						style="width: 365px"
					>
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="VIP经验:">
					<el-input
						v-model="form.vipEx"
						size="medium"
						placeholder="请输入数字，不支持负数和小数点"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="邮箱:">
					<el-input
						v-model="form.mail"
						size="medium"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="姓名:">
					<el-input
						v-model="form.nickname"
						size="medium"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="审核信息:">
					<el-input
						v-model="form.checkMsg"
						size="medium"
						type="textarea"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button
						icon="el-icon-refresh-left"
						:disabled="loading"
						size="medium"
						@click="reset"
					>
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	name: 'AddMember',
	mixins: [list],
	data() {
		return {
			form: {
				userType: '',
				userName: '',
				password: '',
				phone: '',
				supAgent: '',
				gender: '',
				vipEx: '',
				mail: '',
				nickname: '',
				checkMsg: ''
			},
			dataList: []
		}
	},
	computed: {
		rules() {
			return {
				userType: [
					{ required: true, message: '请选择账号类型', trigger: 'change' }
				],
				userName: [
					{ required: true, message: '请输入会员账号', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入登录密码', trigger: 'blur' }
				]
			}
		}
	},
	mounted() {},
	methods: {
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			console.log(params)
            this.$api.addMemberAPI(params).then((res) => {
                const {
                    code,
                    data: { record, totalRecord },
                    msg
                } = res
                if (code === 200) {
                    this.loading = false
                    this.dataList = record || []
                    this.total = totalRecord || 0
                } else {
                    this.loading = false
                    this.$message({
                        message: msg,
                        type: 'error'
                    })
                }
            })
		},
		reset() {
            this.$refs['form'].resetFields()
			this.form = {
				userType: '',
				userName: '',
				password: '',
				phone: '',
				supAgent: '',
				gender: '',
				vipEx: '',
				mail: '',
				nickname: '',
				checkMsg: ''
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
.addMember-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addMember-content {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		position: relative;
		padding-top: 65px;
		.form-header {
			height: 45px;
			line-height: 45px;
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: #666;
				font-size: 14px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				color: #999;
				font-weight: 400;
				font-size: 14px;
				top: 0;
			}
		}
	}
	.addMember-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}
}
</style>
