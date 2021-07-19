<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>编辑</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="120px">
				<el-form-item label="活动类型:" prop="activityType">
					<el-select
						v-model="queryData.activityType"
						size="medium"
						placeholder="请选择"
						clearable
						style="width: 365px"
						@change="changeType($event)"
					>
						<el-option
							v-for="item in activityTypeArr"
							:key="item.code"
							:label="item.description"
							:value="item.description"
						></el-option>
					</el-select>
					<el-button
						type="warning"
						style="margin-left: 20px;padding: 0 5px"
						icon="el-icon-sort"
						@click="sortLabel = true"
					>
						活动优惠排序
					</el-button>
				</el-form-item>
				<el-form-item label="优惠类型名称" prop="activityName">
					<el-input
						v-model="queryData.activityName"
						size="medium"
						maxlength="10"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loadingT"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button icon="el-icon-refresh-left" size="medium" @click="reset">
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-if="showInfoData" class="info-show">
			<div class="info-header">
				<span>基本信息</span>
			</div>
			<div class="info-content">
				<el-row class="info-content-row">
					<el-col :span="6">
						<p>
							<span>优惠活动：</span>
							<span>
								{{
									showInfoData &&
									(showInfoData.activityType || showInfoData.activityType === 0)
										? typeFilter(
												showInfoData.activityType,
												'operateActivityNameType'
										  )
										: '-'
								}}
							</span>
						</p>
					</el-col>
					<el-col :span="6">
						<span>优惠类型名称：</span>
						<span>
							{{
								showInfoData && showInfoData.activityName
									? showInfoData.activityName
									: '-'
							}}
						</span>
					</el-col>
					<el-col :span="5">
						<span>最近操作人：</span>
						<span>
							{{
								showInfoData && showInfoData.updatedBy
									? showInfoData.updatedBy
									: '-'
							}}
						</span>
					</el-col>
					<el-col :span="7">
						<span>最近操作时间：</span>
						<span>
							{{ updateTime }}
						</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div v-else class="info-show"></div>
		<el-dialog title="活动类型区域排序" :visible.sync="sortLabel" width="650px">
			<draggable v-model="cloneActivityArr" @start="onStart" @end="onEnd">
				<transition-group>
					<div v-for="item in cloneActivityArr" :key="item.code" class="reach">
						{{ item.description }}
					</div>
				</transition-group>
			</draggable>
			<el-button @click="sortLabel = false">取消</el-button>
			<el-button type="primary" @click="handleClickSort">确定</el-button>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: 'PlatformRate',
	components: { draggable },
	mixins: [list],
	data() {
		return {
			loadingT: false,
			queryData: {
				activityType: undefined,
				activityCode: undefined,
				activityName: undefined,
				id: undefined
			},
			showInfoData: undefined,
			sortLabel: false,
			drag: false,
			newActivityTypeArr: []
		}
	},
	computed: {
		activityTypeArr() {
			return this.globalDics.operateActivityNameType
		},
		cloneActivityArr: {
			get() {
				return this.newActivityTypeArr
			},
			set(newVal) {
				console.log('newVal', newVal)
				this.newActivityTypeArr = newVal
			}
		},
		updateTime() {
			return this.showInfoData && this.showInfoData.updatedAt
				? dayjs(this.showInfoData.updatedAt).format('YYYY-MM-DD HH:mm:ss')
				: '-'
		},
		rules() {
			const activityType = [
				{ required: true, message: '请选择活动类型', trigger: 'change' }
			]
			const activityName = [
				{ required: true, message: '优惠类型名称', trigger: 'blur' }
			]
			return {
				activityType,
				activityName
			}
		}
	},
	mounted() {
		this.queryTypeList()
	},
	methods: {
		// 查询详情
		queryDetails(type) {
			this.$api.activityTypeDetailAPI({ type }).then((res) => {
				const { code, data } = res
				console.log('res', res)
				if (code === 200) {
					const { id } = data
					this.showInfoData = data
					this.queryData.id = id
				} else {
					this.showInfoData = undefined
					this.queryData.id = undefined
				}
			})
		},
		// 查询弹框列表
		queryTypeList(type) {
			this.$api.activityQueryTypeListAPI({ type }).then((res) => {
				const { code, data } = res
				const arr = JSON.stringify(this.globalDics.operateActivityNameType)
				const newArr = JSON.parse(arr)
				if (code === 200) {
					newArr.forEach((item, idx) => {
						this.newActivityTypeArr.push({
							code: data[idx] + '',
							description: newArr[data[idx]].description
						})
					})
				} else {
					this.newActivityTypeArr = []
				}
			})
		},
		add() {
			this.loadingT = true
			const params = {
				...this.queryData
			}
			let lock = true
			params.activityType = params.activityCode * 1
			delete params.activityCode
			this.$refs['form'].validate((valid) => {
				if (valid && lock) {
					lock = false
					this.$api
						.activityUpdateAPI(params)
						.then((res) => {
							this.loadingT = false
							lock = true
							const { code, msg } = res
							if (code === 200) {
								this.$confirm(`提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loadingT = false
							lock = true
						})
				}
			})

			setTimeout(() => {
				this.loadingT = false
				lock = true
			}, 1000)
		},
		reset() {
			this.$refs['form'] && this.$refs['form'].resetFields()
			this.showInfoData = undefined
			this.queryData = {
				activityType: undefined,
				activityCode: undefined,
				activityTypeName: undefined
			}
		},
		changeType(evt) {
			this.$refs['form'] && this.$refs['form'].resetFields()
			this.showInfoData = undefined
            const item = this.activityTypeArr.find((item) => item.description === evt)
			this.queryData = {
				activityType: item && item.description,
				activityCode: item && item.code
			}
			this.queryDetails(item.code)
		},
		// 开始拖拽事件
		onStart() {
			this.drag = true
		},
		// 拖拽结束事件
		onEnd() {
			this.drag = false
		},
		handleClickSort() {
			let sortIds = this.newActivityTypeArr.map((item) => item.code)
			sortIds = sortIds.join(',')
			this.$api.activitySortAPI({ sortIds }).then((res) => {
				const { code } = res
				if (code === 200) {
					this.$message({
						message: '操作成功',
						type: 'success'
					})
					this.sortLabel = false
				}
			})
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
.reach {
	padding: 6px;
	background-color: #1abc9c;
	border: solid 1px #eee;
	margin-bottom: 10px;
	cursor: move;
	line-height: 40px;
	width: 110px;
	display: inline-block;
	text-align: center;
}
.addAgent-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addAgent-content {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		position: relative;
		padding-top: 65px;
		padding-bottom: 65px;
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
	.addAgent-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}
	.info-show {
		width: 1000px;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		margin: 0 auto;
		position: relative;
		min-height: 300px;
		padding-left: 40px;
		padding-right: 40px;
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
	}

	.tips {
		color: #f56c6c;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 100%;
		left: 0;
	}
}
</style>
