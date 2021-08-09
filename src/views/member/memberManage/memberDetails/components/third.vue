<template>
	<div id="basicInformation">
		<el-row>
			<el-col :span="4" class="backgroundTitelBox">登录信息</el-col>
			<el-col :span="2" class="refrestBox">
				<el-button type="primary" icon="el-icon-refresh" @click="refresh">
					刷新
				</el-button>
			</el-col>
		</el-row>
		<div
			v-if="activeL"
			style="
        height: 350px;
        width: 400px;
        line-height: 350px;
        text-align: center;
        font-size: 28px;
      "
		>
			<i class="el-icon-loading"></i>
		</div>
		<div v-else style="width: 70%">
			<el-table
				border
				size="mini"
				class="small-size-table"
				:data="dataList"
				:header-row-style="{ height: '24px', lineHeight: '24px' }"
				style="margin: 10px 0 30px 0; z-index: 0"
				:header-cell-style="getRowClass"
			>
				<el-table-column
					align="center"
					prop="loginTime"
					width="160px"
					label="登录时间"
				></el-table-column>
				<el-table-column
					prop="loginStatus"
					width="80px"
					align="center"
					label="状态"
				>
					<template slot-scope="scope">
						<span v-if="scope.row.loginStatus === '1'">
							{{ typeFilter(scope.row.loginStatus, 'loginStatusType') }}
						</span>
						<span v-else class="redColor">
							{{ typeFilter(scope.row.loginStatus, 'loginStatusType') }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="loginIp"
					width="120px"
					align="center"
					label="IP地址"
				>
					<template slot="header">
						IP地址
						<br />
						风控层级
					</template>
					<template slot-scope="scope">
						<span v-if="scope.row.loginIp !== null">
							{{ scope.row.loginIp }}
						</span>
						<span v-else>-</span>
						<br />
						<span class="redColor">
							风控层级：{{
								scope.row.ipControlName === null
									? '无'
									: scope.row.ipControlName
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="ipAttribution" align="center" label="IP归属地">
					<template slot-scope="scope">
						<span v-if="scope.row.ipAttribution !== null">
							{{ scope.row.ipAttribution }}
						</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column prop="loginReference" align="center" label="登录网址">
					<template slot-scope="scope">
						<span v-if="scope.row.loginReference !== null">
							{{ scope.row.loginReference }}
						</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="deviceType"
					width="100px"
					align="center"
					label="登录终端"
				>
					<template slot-scope="scope">
						{{ typeFilter(scope.row.deviceType, 'deviceType') }}
					</template>
				</el-table-column>
				<el-table-column prop="deviceNo" align="center" label="设备号">
					<template slot="header">
						设备号
						<br />
						风控层级
					</template>
					<template slot-scope="scope">
						<span v-if="scope.row.deviceNo !== null">
							{{ scope.row.deviceNo }}
						</span>
						<span v-else>-</span>
						<br />
						<span class="redColor">
							风控层级：{{
								scope.row.deviceNoControlName === null
									? '无'
									: scope.row.deviceNoControlName
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="browseContent"
					align="center"
					label="设备版本"
				></el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page.sync="page"
				background
				layout="total, sizes,prev, pager, next, jumper"
				:page-size="size"
				:page-sizes="[5, 10, 20]"
				:total="total"
				:pager-count="5"
				style="float: right; padding-top: 10px"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
			<div class="clear"></div>
		</div>
		<el-divider></el-divider>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
	mixins: [list],
	props: {
		parentData: { type: Object, default: () => ({}) },
		lonRecord: { type: Object, default: () => ({}) }
	},
	data() {
		this.refresh = this.throttle(this.refresh, 1000)
		return {
			activeL: true,
			page: 1,
			size: 10,
			dataList: []
		}
	},
	computed: {
		lonRecordData() {
			return this.lonRecord
		}
	},
	watch: {
		lonRecordData: {
			handler(newV) {
				if (newV !== null) {
					this.total = newV.totalRecord
					this.dataList = newV.record
				} else {
					this.dataList = []
					this.total = 0
				}
			},
			deep: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		// 会员登录日志查询
		getLogMemberLoginLog(val) {
			const params = { userId: val, pageNum: this.page, pageSize: this.size }
			this.$api.getLogMemberLoginLog(params).then((res) => {
				if (res.code === 200 && res.data !== null) {
					this.dataList = res.data.record
					this.total = res.data.totalRecord
				} else {
					this.dataList = []
					this.total = 0
				}
			})
		},
		refresh() {
			this.page = 1
			this.size = 10
			this.getLogMemberLoginLog(this.parentData.userId)
		},
		handleCurrentChange(val) {
			this.page = val
			if (this.parentData.userId !== null) {
				this.getLogMemberLoginLog(this.parentData.userId)
			}
		},
		handleSizeChange(val) {
			this.size = val
			if (this.parentData.userId !== null) {
				this.getLogMemberLoginLog(this.parentData.userId)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#basicInformation {
	font-size: 14px;
	line-height: 40px;
	min-height: 400px;
	padding-top: 10px;
}
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.backgroundTitelBox {
	width: 188px;
	height: 40px;
	text-align: center;
	background: #000;
	color: rgb(255, 255, 255);
}
.refrestBox {
	text-align: center;
}
.clear {
	clear: both;
	height: 0;
	line-height: 0;
	font-size: 0;
}
</style>
