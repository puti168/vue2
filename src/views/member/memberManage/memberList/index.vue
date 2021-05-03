<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="form" label-width="85px">
					<el-form-item label="注册时间:">
						<el-date-picker
							v-model="form.registerTime"
							prop="registerTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 388px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号:">
						<el-input
							v-model="form.userName"
							prop="userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:">
						<el-input
							v-model="form.nickName"
							prop="nickName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="账号状态:">
						<el-select
							v-model="form.status"
							prop="status"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option label="全部" value></el-option>
							<el-option label="启用" :value="1"></el-option>
							<el-option label="停用" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:">
						<el-select
							v-model="form.riskLevel"
							prop="status"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option label="全部" value></el-option>
							<el-option label="1" :value="1"></el-option>
							<el-option label="2" :value="2"></el-option>
							<el-option label="3" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="离线天数:">
						<el-input
							v-model="form.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="form.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="最后登录时间:" label-width="110px">
						<el-date-picker
							v-model="form.lastLoginTime"
							prop="lastLoginTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 388px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="VIP等级:">
						<el-input
							v-model="form.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="form.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:">
						<el-select
							v-model="form.accountType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 300px"
						>
                            <el-option
                                v-for="item in accountTypeArr"
                                :key="item.code"
                                :label="item.description"
                                :value="item.code"
                            ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册终端:">
						<el-select
							v-model="form.deviceType"
							size="medium"
							placeholder="默认选择全部"
							clearable
                            multiple
							style="width: 300px"
						>
                            <el-option
                                v-for="item in deviceTypeArr"
                                :key="item.code"
                                :label="item.description"
                                :value="item.code"
                            ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="首存金额:">
						<el-input
							v-model="form.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="form.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="首存时间:" label-width="100px">
						<el-date-picker
							v-model="form.firstSaveTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 388px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员标签:">
						<el-select
							v-model="form.userLabel"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option label="全部" value></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="form.supAgent"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="search"
						>
							查询
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="loading"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							@click="exportExcel"
						>
							导出
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="dataList"
					style="width: 100%"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						prop="username"
						align="center"
						label="会员账号"
					></el-table-column>
					<el-table-column
						prop="nickname"
						align="center"
						label="会员姓名"
					></el-table-column>
					<el-table-column
						prop="levelId"
						align="center"
						label="代理上级"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="账号类型"
					></el-table-column>
					<el-table-column
						prop="titleId"
						align="center"
						label="会员标签"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="风控层级"
					></el-table-column>
					<el-table-column
						prop="status"
						align="center"
						label="账号状态"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="VIP等级"
						width="100px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="注册时间"
						width="150px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						width="150px"
						label="首存时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="首存金额"
						sortable="custom"
						width="100px"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="中心钱包"
						width="100px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="最后登录时间"
						width="150px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="离线天数"
						width="150px"
						sortable="custom"
					></el-table-column>
					<el-table-column align="center" label="操作" width="200px">
						<template slot-scope="scope">
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="medium"
								@click="deleteUp(scope.row)"
							>
								删除
							</el-button>
							<el-button
								type="warning"
								icon="el-icon-edit"
								size="medium"
								@click.stop="editUp(scope.row)"
							>
								修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!dataList.length"
					:current-page.sync="pageNum"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
				<el-dialog
					:title="moduleBox"
					center
					:visible.sync="editVisible"
					:before-close="closeFormDialog"
					width="410px"
				>
					<editForm v-if="moduleBox == '新增银行信息'" ref="addForm"></editForm>
					<editForm
						v-else
						ref="editForm"
						:editFormData="editFormData"
					></editForm>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editVisible = false">取 消</el-button>
						<el-button
							v-if="moduleBox == '新增银行信息'"
							type="primary"
							@click="submitAdd"
						>
							确 定
						</el-button>
						<el-button v-else type="primary" @click="submitEdit">
							确 定
						</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import editForm from './components/editForm'
// import { UTable } from 'umy-ui'
export default {
	name: 'MemberList',
	components: {
		editForm
	},
	mixins: [list],
	data() {
		return {
			queryData: {},
			form: {
				registerTime: [],
				userName: '',
				nickName: '',
				status: '',
				riskLevel: '',
				levelDays: '',
				lastLoginTime: '',
				vipRank: '',
                accountType: '',
				userLabel: '',
                deviceType: '',
				supAgent: '',
				lastBetTime: '',
				firstSaveTime: '',
				SaveMoneyMin: '',
				SaveMoneyMax: '',
				wallet: ''
			},
			dataList: [],
			total: 0,
			moduleBox: '',
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {
        accountTypeArr() {
            return this.globalDics.accountType
        },
        deviceTypeArr() {
            return this.globalDics.deviceType
        }
    },
	created() {
		// this.loadData()
	},
	mounted() {},
	methods: {
		loadData(params) {
			params = {
				...this.getParams(params)
			}
			this.dataList = []
			this.$api.memberListAPI(params).then((res) => {
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
		query() {
			this.loading = true
			// const { registerTime, lastLoginTime, firstSaveTime } = this.form
			// const [registerStartTime, registerEndTime] = registerTime
			const params = {
				...this.queryData,
				pageNum: 1
				// startTime: registerStartTime && registerStartTime + '',
				// endTime: registerEndTime && registerEndTime + ''
			}
			console.log(params)
			this.loadData(params)
		},
		reset() {
			this.queryData = {}
			this.$refs['form'].resetFields()
			// this.loadData()
		},

		exportExcel() {
			const params = {
				accountStatus: 0,
				accountType: 0,
				applyInfo: '2021-04-29T06:03:31.794Z',
				applyName: 'string',
				birth: '2021-04-29T06:03:31.794Z',
				city: 'string',
				createDt: '2021-04-29T06:03:31.794Z',
				deviceNo: 'string',
				deviceType: 0,
				email: 'string',
				endTime: 0,
				firstDepositAmount: 0,
				firstDepositTime: '2021-04-29T06:03:31.795Z',
				gender: 0,
				ipAttribution: 'string',
				labelId: 0,
				labelName: 'string',
				lastLoginIp: 'string',
				lastLoginTime: '2021-04-29T06:03:31.795Z',
				levelId: 0,
				merchantId: 0,
				mobile: 'string',
				pageNum: 0,
				pageSize: 0,
				parentProxyId: 0,
				parentProxyName: 'string',
				password: 'string',
				realName: 'string',
				registerIp: 'string',
				registerPhone: 'string',
				registerReference: 'string',
				salt: 'string',
				startTime: 0,
				status: 0,
				titleId: 0,
				updateDt: '2021-04-29T06:03:31.795Z',
				username: 'string',
				vipId: 0,
				vipSerialNum: 0,
				windControlId: 0,
				windControlName: 'string'
			}
            this.$api.exportExcelAPI(params).then((res) => {
                const result = res.data
                const disposition = res.headers['content-disposition']
                const fileNames = disposition.split("''")
                let fileName = fileNames[1]
                fileName = decodeURIComponent(fileName)
                const blob = new Blob([result], { type: 'application/octet-stream' })
                if ('download' in document.createElement('a')) {
                    const elink = document.createElement('a')
                    elink.download = fileName || ''
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href)
                    document.body.removeChild(elink)
                } else {
                    window.navigator.msSaveBlob(blob, fileName)
                }
                this.$message({
                    type: 'success',
                    message: '导出成功',
                    duration: 1500
                })
            })
		},

		submitAdd() {
			console.log(this.$refs.addForm)
			//   setAddBank(this.queryData).then((res) => {
			//     console.log(res);
			//   });
		},
		deleteUp(val) {
			console.log(val)
			this.$confirm('确定删除此银行卡号吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					// setDeleteBank(val).then((res) => {
					//   console.log(res);
					// });
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		editUp(val) {
			this.moduleBox = '修改银行信息'
			this.editVisible = true
			this.editFormData = val
		},
		submitEdit() {
			// setEidteBank().then((res) => {
			//   console.log(res);
			// });
		},
		closeFormDialog() {
			this.editVisible = false
		},
		enterSubmit() {
			// this.query()
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
</style>
