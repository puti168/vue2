<template>
	<div class="game-container report-container gameCreatePage-container">
		<div class="gameCreatePage-content">
			<div class="form-header">
				<span>页签创建</span>
				<span>
					<el-button type="info" @click="back">返回</el-button>
					<el-button type="success" @click="save">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<p class="part-title">分类名称</p>
				<el-form
					ref="form"
					:model="queryData"
					:inline="true"
					label-width="100px"
					:rules="rules"
					class="form-content"
				>
					<el-form-item label="分类名称:" prop="assortName">
						<el-input
							v-model="queryData.assortName"
							size="medium"
							maxlength="10"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="分类顺序:" prop="assortSort">
						<el-input
							v-model="queryData.assortSort"
							size="medium"
							maxlength="11"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="支持终端:">
						<el-select
							v-model="queryData.supportTerminal"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in terminalTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.description"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="页签备注:">
						<el-input
							v-model="queryData.remark"
							size="medium"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item
						label="客户端分类显示:"
						label-width="130px"
						prop="clientDisplay"
					>
						<el-select
							v-model="queryData.clientDisplay"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in gameDisplayArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-part3">
				<div class="content">
					<div class="game-page left-page">
						<p class="hotConfig">分类包含游戏</p>
						<p class="left-word">已包含： {{ leftList.length }}</p>
						<el-button type="primary" class="clear-list" @click="deleteAll">
							列表清空
						</el-button>
						<div class="page-main">
							<div v-for="item in leftList" :key="item.id" class="page-data">
								<el-input
									v-model="item.assortSort"
									:maxlength="12"
									size="medium"
									style="width: 90px"
									class="left-input"
									placeholder="序号"
									@focus="getOld(item.assortSort)"
									@change="changeInput(item.assortSort)"
								></el-input>
								{{ item.gameName }}
								<span
									class="right-span"
									:class="
										Number(item.gameStatus) === 1
											? 'infoState'
											: Number(item.gameStatus) === 2
											? 'successState'
											: 'dangerState'
									"
								>
									{{ typeFilter(item.gameStatus, 'gameStatusType') }}
								</span>
								<i class="el-icon-close" @click="deleteItem(item)"></i>
							</div>
						</div>
					</div>
					<span class="mid-word">
						<i class="el-icon-d-arrow-left"></i>
						勾选游戏移入分类列表
					</span>
					<div class="game-page right-page">
						<div class="platform">
							游戏平台：
							<el-select
								v-model="gameCode"
								size="medium"
								placeholder="全部"
								clearable
								style="width: 180px"
								@change="changeSelect"
							>
								<el-option
									v-for="item in gamePlantList"
									:key="item.gameCode"
									:label="item.gameName"
									:value="item.gameCode"
								></el-option>
							</el-select>
						</div>
						<div class="page-main">
							<div v-for="item in gameList" :key="item.id" class="page-data">
								<el-checkbox
									v-model="item.check"
									class="page-check"
									@change="lockChange(item)"
								></el-checkbox>
								{{ item.gameName }}
								<span
									class="right-span"
									:class="
										Number(item.gameStatus) === 1
											? 'infoState'
											: Number(item.gameStatus) === 2
											? 'successState'
											: 'dangerState'
									"
								>
									{{ typeFilter(item.gameStatus, 'gameStatusType') }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import Sortable from 'sortablejs'

export default {
	name: 'CreatePage',
	components: {},
	mixins: [list],
	props: {
		rowAssortId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loading: false,
			queryData: {
				assortName: undefined,
				assortSort: undefined,
				supportTerminal: undefined,
				remark: undefined,
				clientDisplay: undefined
			},
			gamePlantList: [],
			gameList: [],
			leftList: [],
			childGameNameList: [],
			data: {},
			oldValue: '',
			gameCode: '',
			value: [4, 2, 1]
		}
	},
	computed: {
		terminalTypeArr() {
			return this.globalDics.terminalnType
		},
		gameDisplayArr() {
			return this.globalDics.gameDisplayType
		},
		rules() {
			return {
				assortName: [
					{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}
				],
				assortSort: [
					{
						required: true,
						message: '请输入分类顺序',
						trigger: 'blur'
					}
				],
				clientDisplay: [
					{
						required: true,
						message: '请选择客户端分类显示',
						trigger: 'blur'
					}
				]
			}
		}
	},
	created() {
		this.getPlatform()
		if (this.rowAssortId) {
			this.queryChildGame()
		}
		this.queryChildGameConfig()
	},
	mounted() {},
	updated() {},
	methods: {
		back() {
			this.$emit('back')
		},
		changeInput(value) {
			// 与旧值相同就互换
			this.leftList.forEach((item, index) => {
				if (item.assortSort === Number(value)) {
					item.assortSort = this.oldValue
				}
			})
		},
		deleteItem(item) {
			const index = this.leftList.indexOf(item)
			if (index > -1) {
				this.leftList.splice(index, 1)
			}
			this.gameList.forEach((val) => {
				if (val.id === item.id) {
					val.check = false
				}
			})
		},
		getOld(oldValue) {
			this.oldValue = oldValue
		},
		lockChange(item) {
			let includes = false
			this.leftList.forEach((data) => {
				if (data.id === item.id) {
					includes = true
				}
			})
			// 勾选并且左边不包含。插入一个
			if (item.check && !includes) {
				if (this.leftList.length > 0) {
					const arr = []
					this.leftList.forEach((val) => {
						arr.push(val.assortSort)
					})
					item.assortSort = Math.max(...arr) + 1
				} else {
					item.assortSort = 0
				}
				this.leftList.push(item)
			} else {
				// 否则删除一个
				const index = this.leftList.indexOf(item)
				if (index > -1) {
					this.leftList.splice(index, 1)
				}
			}
		},
		// 游戏平台
		getPlatform() {
			this.$api
				.gamePlant()
				.then((res) => {
					if (res.code === 200) {
						this.gamePlantList = res.data
						this.gameCode = res.data[0].gameCode
						this.gameName = res.data[0].gameName
						this.queryGame()
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {})
		},
		changeSelect() {
			// 更换后为check重新赋值
			this.gameList = []
			const params = {
				gameCode: this.gameCode
			}
			this.$api.queryGameAPI(params).then((res) => {
				const { code, data, msg } = res
				if (code === 200) {
					data.forEach((item, index) => {
						item.check = false
						item.assortSort = Number(index + 1)
						item.gameCode = this.gameCode
					})
					this.gameList = data
					// 判断右边是否勾选
					this.gameList.forEach((item) => {
						this.leftList.forEach((val) => {
							if (val.id === item.id) {
								item.check = true
							}
						})
					})
				} else {
					this.loading = false
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		// 游戏平台对应玩法查询
		queryGame() {
			this.gameList = []
			const params = {
				gameCode: this.gameCode
			}
			this.$api.queryGameAPI(params).then((res) => {
				const { code, data, msg } = res
				if (code === 200) {
					data.forEach((item, index) => {
						item.check = false
						item.assortSort = Number(index + 1)
						item.gameCode = this.gameCode
					})
					this.gameList = data
				} else {
					this.loading = false
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},

		// 子游戏查询
		queryChildGame() {
			this.leftList = []
			console.log('this.rowAssortId', this.rowAssortId)
			const params = {
				assortId: this.rowAssortId
			}
			this.$api.queryChildGameAPI(params).then((res) => {
				const { code, data, msg } = res
				if (code === 200) {
					this.leftList = data
					// 判断右边是否勾选
					this.gameList.forEach((item) => {
						this.leftList.forEach((val) => {
							if (val.id === item.id) {
								item.check = true
							}
						})
					})
				} else {
					this.loading = false
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		// 子游戏配置查询
		queryChildGameConfig() {
			this.childGameNameList = []
			if (this.rowAssortId) {
				const params = {
					id: this.rowAssortId
				}
				this.$api.queryChildGameConfigAPI(params).then((res) => {
					const { code, data, msg } = res
					if (code === 200) {
						const {
							assortName,
							assortSort,
							remark,
							clientDisplay,
							supportTerminal
						} = data
						this.queryData.assortName = assortName
						this.queryData.assortSort = assortSort
						this.queryData.remark = remark

						this.gameDisplayArr.forEach((item) => {
							if (!!(item.code * 1) === clientDisplay) {
								this.queryData.clientDisplay = item.code
							}
						})
						this.terminalTypeArr.forEach((item) => {
							if (item.description === supportTerminal) {
								this.queryData.supportTerminal.push(item.description)
							}
						})
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
			}
		},
		// 保存
		save() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const arr = []
					this.leftList.forEach((item) => {
						arr.push({
							assortSort: item.assortSort,
							gameId: item.id,
							gameName: item.gameName
						})
					})
					const params = {
						...this.queryData,
						relationParams: arr,
						clientDisplay: Number(this.queryData.clientDisplay) === 1,
						id: this.rowAssortId
					}
					params.supportTerminal =
						params.supportTerminal && params.supportTerminal.length
							? params.supportTerminal.join(',')
							: undefined
					// 后端说都用update const url = this.rowAssortId ? 'gameUpdateAPI' : 'gameCreateAPI'
					this.$api.gameUpdateAPI(params)
						.then((res) => {
							const { code, msg } = res
							console.log('res', res)
							if (code === 200) {
								this.$message({
									message: '保存成功!',
									type: 'success'
								})
								this.back()
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
				}
			})
		},
		deleteAll() {
			this.leftList = []
			this.gameList.forEach((val) => {
				val.check = false
			})
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				assortName: undefined,
				assortSort: undefined,
				supportTerminal: undefined,
				remark: undefined,
				clientDisplay: undefined
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
/deep/ .el-button--info {
	background-color: #fff;
	color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
	background-color: #eeeded;
}
/deep/ .el-transfer__buttons {
	/deep/ button {
		display: block;
		margin: 0;
		&:first-child {
			margin-bottom: 12px;
		}
	}
}
.transfer-wrapper {
	text-align: left;
	height: 450px;
}
.game-page {
	width: 300px;
	height: 500px;
	position: relative;
	.left-word {
		margin-left: 5px;
	}
	.clear-list {
		position: absolute;
		right: 20px;
		top: 42px;
	}
	.page-main {
		height: 400px;
		overflow-y: scroll;
		margin-top: 35px;
		border: 1px solid #ababab;
		.page-data {
			width: 100%;
			border-bottom: 1px solid #ababab;
			height: 40px;
			line-height: 40px;
			text-align: center;
			position: relative;
		}
	}
}
.left-page {
	display: inline-block;
	.right-span {
		margin-left: 50px;
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translate(0, -50%);
	}
	.left-input {
		position: absolute;
		left: 10px;
	}
	.el-icon-close {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translate(0, -50%);
		cursor: pointer;
	}
}
.mid-word {
	position: absolute;
	left: 40%;
	top: 50%;
	font-weight: 600;
	color: #0291ce;
}
.right-page {
	display: block;
	float: right;
	margin-right: 100px;
	.platform {
		margin-top: 26px;
		text-align: center;
	}
	.right-span {
		margin-left: 50px;
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translate(0, -50%);
	}
	.page-check {
		position: absolute;
		left: 35px;
	}
}
.gameCreatePage-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.gameCreatePage-content {
		width: 70%;
		margin: 0 auto;
		background-color: #fff;
		position: relative;
		padding-bottom: 30px;
		.form-header {
			height: 55px;
			line-height: 55px;
			width: 100%;
			background-color: rgba(0, 0, 0, 1);
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: rgba(255, 255, 255, 0.847058823529412);
				font-size: 16px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				top: 0;
				color: #999;
				font-weight: 400;
				font-size: 14px;
			}
		}
		.form-header:after {
			content: '.';
			height: 0;
			display: table;
			clear: both;
		}
		.content-part2 {
			width: 100%;
			padding: 25px 35px 20px;
			position: relative;
			.part-title {
				color: rgba(0, 0, 0, 0.847058823529412);
				font-size: 14px;
				font-weight: 650;
			}
			.form-content {
				margin-top: 20px;
			}
		}
		.content-part2::after {
			position: absolute;
			content: '';
			width: 100%;
			background-color: rgba(233, 233, 233, 1);
			height: 1px;
			left: 0;
			bottom: 0;
		}
		.content-part3 {
			width: 100%;
			padding: 25px 35px 20px;
			.content {
				position: relative;
				margin: 0 auto;
				width: 100%;
				padding-left: 100px;
				padding-bottom: 50px;
				overflow-x: scroll;
				//overflow-y: hidden;
				.hotConfig {
					color: rgba(0, 0, 0, 0.847058823529412);
					font-size: 14px;
					font-weight: 650;
					margin-left: 82px;
					margin-top: 10px;
					margin-bottom: 18px;
				}
			}
		}
	}
}
</style>
