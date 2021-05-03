<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="form" label-width="100px">
					<el-form-item label="注册时间:">
						<el-date-picker
							v-model="form.registerTime"
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
					<el-form-item label="账号类型:">
						<el-select
							v-model="form.accountType"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 150px"
						>
							<el-option label="全部" value></el-option>
							<el-option label="试玩" value="1"></el-option>
							<el-option label="商务" value="2"></el-option>
							<el-option label="正式" value="3"></el-option>
							<el-option label="测试" value="4"></el-option>
							<el-option label="置换" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="会员账号:">
						<el-input
							v-model="form.userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:">
						<el-input
							v-model="form.nickName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="form.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="注册手机号:">
						<el-input
							v-model="form.registerPhone"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="注册IP:">
						<el-input
							v-model="form.ipAttribution"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="IP归属地:">
						<el-input
							v-model="form.registration"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="注册终端:">
						<el-select
							v-model="form.deviceType"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 150px"
						>
							<el-option label="全部" value></el-option>
							<el-option label="PC" value="PC"></el-option>
							<el-option label="IOS_APP" value="IOS_APP"></el-option>
							<el-option label="IOS_H5" value="IOS_H5"></el-option>
							<el-option label="Android_H5" value="Android_H5"></el-option>
							<el-option label="Android_APP" value="Android_APP"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="handleSearch"
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
						prop="registerDt"
						align="center"
						label="注册时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="userType"
						align="center"
						label="会员类型"
					></el-table-column>
					<el-table-column
						prop="username"
						align="center"
						label="会员账号"
					></el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="上级代理"
					></el-table-column>
					<el-table-column
						prop="phone"
						align="center"
						label="注册手机号"
					></el-table-column>
					<el-table-column
						prop="IP"
						align="center"
						label="注册IP"
					></el-table-column>
					<el-table-column
						prop="ipAttribution"
						align="center"
						label="IP归属地"
					></el-table-column>
					<el-table-column
						prop="deviceType"
						align="center"
						label="注册终端"
					></el-table-column>
					<el-table-column
						prop="terminal"
						align="center"
						label="终端设备号"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					:current-page.sync="pageNum"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
// import editForm from './components/editForm'
// import { UTable } from 'umy-ui'
export default {
	name: 'RegisterInfo',
	mixins: [list],
	data() {
		return {
			form: {
				registerTime: [start, end],
                accountType: '',
                userName: '',
                parentProxyName: '',
                registerPhone: '',
                ipAttribution: '',
                deviceType: '',
				nickName: ''
			},
            pageIndex: 1,
			dataList: [],
			total: 0
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			const create = this.form.registerTime || []
			const [startTime, endTime] = create
			const params = {
				...this.form,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				createDtStart: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') || '',
				createDtEnd: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') || ''
			}
			delete params.registerTime
			this.$api.memberRegisterInfoListAPI(params).then((res) => {
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
			// this.loadData()
		},

		handleSearch() {
			this.loading = true
			this.pageIndex = 1
			this.loadData()
		},
		handleCurrentChange(val) {
			this.pageIndex = val
			this.loadData()
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
