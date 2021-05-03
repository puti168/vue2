<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="85px"
				>
					<el-form-item label="注册时间:" prop="registerTime">
						<el-date-picker
							v-model="queryData.registerTime"
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
					<el-form-item label="会员账号:" prop="userName">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:" prop="realName">
						<el-input
							v-model="queryData.realName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="账号状态:" prop="accountStatus">
						<el-select
							v-model="queryData.accountStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in accountStatusArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:" prop="windControlId">
						<el-select
							v-model="queryData.windControlId"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in vipDict"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="离线天数:" prop="offLineDaysEnd">
						<el-input
							v-model="queryData.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="queryData.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="最后登录时间:" label-width="110px">
						<el-date-picker
							v-model="queryData.lastLoginTime"
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
					<el-form-item label="VIP等级:" prop="vipExperenceValue">
						<el-input
							v-model="queryData.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="queryData.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:">
						<el-select
							v-model="queryData.accountType"
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
							v-model="queryData.deviceType"
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
							v-model="queryData.SaveMoneyMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
						></el-input>
						-
						<el-input
							v-model="queryData.SaveMoneyMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
						></el-input>
					</el-form-item>
					<el-form-item label="首存时间:" label-width="100px">
						<el-date-picker
							v-model="queryData.firstSaveTime"
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
					<el-form-item label="会员标签:" prop="labelId">
						<el-select
							v-model="queryData.labelId"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
                            <el-option
                                v-for="item in userLabel"
                                :key="item.labelId"
                                :label="item.labelName"
                                :value="item.labelId"
                            ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="queryData.supAgent"
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
						prop="userName"
						align="center"
						label="会员账号"
					></el-table-column>
					<el-table-column
						prop="realName"
						align="center"
						label="会员姓名"
					></el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="代理上级"
					></el-table-column>
					<el-table-column prop="updateDt" align="center" label="账号类型">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="labelName"
						align="center"
						label="会员标签"
					></el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
					></el-table-column>
					<el-table-column prop="status" align="center" label="账号状态">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="vipSerialNum"
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
						prop="firstDepositTime"
						align="center"
						width="150px"
						label="首存时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="firstDepositAmount	"
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
						prop="lastLoginTime"
						align="center"
						label="最后登录时间"
						width="150px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="offLineDays"
						align="center"
						label="离线天数"
						width="150px"
						sortable="custom"
					></el-table-column>
					<!--					<el-table-column align="center" label="操作" width="200px">-->
					<!--						<template slot-scope="scope">-->
					<!--							<el-button-->
					<!--								type="danger"-->
					<!--								icon="el-icon-delete"-->
					<!--								size="medium"-->
					<!--								@click="deleteUp(scope.row)"-->
					<!--							>-->
					<!--								删除-->
					<!--							</el-button>-->
					<!--							<el-button-->
					<!--								type="warning"-->
					<!--								icon="el-icon-edit"-->
					<!--								size="medium"-->
					<!--								@click.stop="editUp(scope.row)"-->
					<!--							>-->
					<!--								修改-->
					<!--							</el-button>-->
					<!--						</template>-->
					<!--					</el-table-column>-->
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
import dayjs from 'dayjs'
// import { UTable } from 'umy-ui'

const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
export default {
	name: 'MemberList',
	components: {
		editForm
	},
	mixins: [list],
	data() {
		return {
			queryData: {
				registerTime: [start, end],
				userName: '',
				realName: '',
				accountStatus: '',
                windControlId: '',
                offLineDaysEnd: '',
				lastLoginTime: '',
				vipRank: '',
				accountType: '',
                labelId: '',
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
			editFormData: {},
			vipDict: [],
            userLabel: []
		}
	},
	computed: {
		accountStatusArr() {
			return [...this.globalDics.accountStatusType]
		},
		accountTypeArr() {
			return this.globalDics.accountType
		},
		deviceTypeArr() {
			return this.globalDics.deviceType
		}
	},
	created() {
		this.getMerchantDict()
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
		// 获取风控层级
		getMerchantDict() {
			this.$api.merchantDictAPI().then((res) => {
				const {
					code,
					data: { windControl, userLabel },
					msg
				} = res
				if (code === 200) {
					this.vipDict = windControl || []
					this.userLabel = userLabel || []
				} else {
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
