<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="操作类型:">
					<el-select
						v-model="queryData.operateType"
						style="width: 180px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value></el-option>
							<el-option
							v-for="item in bindType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作时间:">
					<el-date-picker
						v-model="formTime.time"
						size="medium"
						:picker-options="pickerOptions"
						format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						clearable
						:default-time="defaultTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="会员账号:">
					<el-input
						v-model="queryData.userName"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="上级代理:">
					<el-input
						v-model="queryData.parentProxyName"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="虚拟币种类:">
					<el-input
						v-model="queryData.virtualKind"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="虚拟币协议:">
					<el-input
						v-model="queryData.virtualProtocol"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="账号类型:">
					<el-select
						v-model="queryData.accountType"
						style="width: 180px"
						multiple
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option v-for="item in accountType" :key="item.code" :label="item.description" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="虚拟币账户地址:">
					<el-input
						v-model="queryData.virtualAddress"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 30px">
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
				</el-form-item>
			</el-form>
		</div>
		<div class="view-container dealer-container">
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
						v-slot="scope"
						prop="userName"
						align="center"
						label="会员账号"
					>
						<Copy :title="scope.row.userName" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="账号类型"
					></el-table-column>
					<el-table-column
						v-slot="scope"
						prop="parentProxyName"
						align="center"
						label="上级代理"
					>
						<Copy :title="scope.row.parentProxyName" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="virtualAddress"
						align="center"
						label="虚拟币账户地址"
					></el-table-column>
					<el-table-column
						prop="virtualKind"
						align="center"
						label="虚拟币种类"
					></el-table-column>
					<el-table-column
						prop="virtualProtocol"
						align="center"
						label="虚拟币协议"
					></el-table-column>
					<el-table-column
						prop="operateType"
						align="center"
						label="操作类型"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="操作时间"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
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
const end = dayjs()
			.endOf('day')
			.valueOf()
		const start = dayjs()
			.startOf('day')
			.valueOf()
export default {
	name: '',
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				accountType: [],
				bankName: '',
				dataType: 2,
				operateType: '',
				orderType: '',
				parentProxyName: '',
				userName: '',
				virtualAddress: '',
				virtualKind: '',
				virtualProtocol: ''
			},
			formTime: {
				time: [start, end]
			},
			dataList: [],
			title: ''
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		bindType() {
			return this.globalDics.bindType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api.bankRecordListAPI(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.dataList = response.records
					this.total = response.total
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		reset() {
			this.queryData = {
				accountType: [],
				bankName: '',
				dataType: 2,
				operateType: '',
				orderType: '',
				parentProxyName: '',
				userName: '',
				virtualAddress: '',
				virtualKind: '',
				virtualProtocol: ''
			}
			this.formTime.time = [start, end]
			this.loadData()
		},
		handleCurrentChange() {
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
