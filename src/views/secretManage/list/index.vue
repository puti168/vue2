<template>
	<div class="game-container">
		<!-- 标题 -->
		<div class="flex-h flex-bc">
			<h2 class="h2-line">{{ $t('route.secretManage') }}</h2>
		</div>
		<!-- 内容部分 -->
		<div class="content">
			<div class="head flex-h-end">
				<el-button
					v-if="hasPermission('5211')"
					type="primary"
					size="small"
					icon="el-icon-circle-plus-outline"
					@click="addSecret"
				>
					{{ $t('btn.addSecret') }}
				</el-button>
			</div>
			<el-divider></el-divider>
			<el-table
				v-loading="loading"
				:data="list"
				:header-cell-style="getRowClass"
				border
				style="width: 100%"
			>
				<el-table-column
					align="center"
					prop="platformName"
					:label="$t('label.platform')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="applicationName"
					:label="$t('label.application')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="version"
					:label="$t('label.version')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createTime"
					:label="$t('label.creationTime')"
				>
					<template v-if="scope.row.createTime" slot-scope="scope">
						<span>
							{{ scope.row.createTime | dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="lastAccess"
					:label="$t('label.lastAccessTime')"
				>
					<template v-if="scope.row.lastAccess" slot-scope="scope">
						<span>{{ scope.row.createTime | dateformat('{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="userName"
					:label="$t('label.user')"
				></el-table-column>
				<el-table-column
					prop="status"
					align="center"
					:label="$t('system_component_account_264')"
				>
					<template slot-scope="scope">
						<span
							:class="{
								'active-color': scope.row.status + '' === '1',
								'stop-color': scope.row.status + '' === '0',
							}"
						>
							{{
								scope.row.status + '' === '1'
									? $t('system_component_account_266')
									: $t('system_component_account_267')
							}}
						</span>
						<el-switch
							:value="scope.row.status + '' === '1'"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="change(scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column
					v-if="hasPermission('5212')"
					align="center"
					fixed="right"
					:label="$t('tableColumn.operating')"
					width="120"
				>
					<template slot-scope="scope">
						<el-button
							type="text"
							@click.native.prevent="showSecretDetail(scope.$index, scope.row)"
						>
							{{ $t('btn.view') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total"
				:current-page="pageIndex"
				:total="total"
				:layout="layout"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
			<!-- 添加秘钥 -->
			<addSecret
				v-if="drawer"
				:drawer.sync="drawer"
				:secretdata="secretdata"
				@close="closeDialog"
			/>
			<el-dialog
				v-if="dialogVisible"
				width="500px"
				:close-on-click-modal="false"
				center
				:visible.sync="dialogVisible"
				@close="status"
			>
				<div class="center">
					<span>是否确认</span>
					<span :class="[status + '' === 1 ? 'stop-color' : 'active-color']">
						{{ status + '' === '1' ? '启用' : '停用' }}
					</span>
					<span>该功能？</span>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="requestChange">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import addSecret from './components/addSecret'

export default {
	name: 'SecretManage',
	components: { addSecret },
	mixins: [list],
	data() {
		return {
			drawer: false,
			dialogVisible: false,
			secretdata: {},
			list: [],
			total: 0,
			dealerStatus: {}
		}
	},
	computed: {
		...mapGetters(['buttonPermissions'])
	},
	methods: {
		loadData() {
			this.loading = true
			const params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}
			// console.log('params', params)
			this.$api.getSecretList(params).then(
				(res) => {
					// console.log('res', res)
					this.loading = false
					this.list = res.data.securityKeyBOs
					this.total = res.data.totalRecord
				},
				() => {
					this.loading = false
				}
			)
		},
		addSecret() {
			this.drawer = true
		},
		showSecretDetail(index, row) {
			const { keyId } = row
			this.$api.getSecretDetail({ keyId }).then(
				(res) => {
					this.drawer = true
					this.secretdata = res.data
					// console.log(res.data)
				},
				() => {
					this.drawer = false
					this.$message({
						message: this.$t('message.getSecretDetailFailed'),
						type: 'error'
					})
				}
			)
		},
		closeDialog() {
			this.drawer = false
			this.secretdata = {}
		},
		change(row) {
			const { keyId, status } = row
			this.dialogVisible = true
			this.dealerStatus = {
				keyId: keyId,
				status: status + '' === '1' ? '0' : '1'
			}
		},
		requestChange() {
			this.$api
				.editKeyStatus({ ...this.dealerStatus })
				.then((response) => {
					this.loadData()
				})
				.then((_) => {
					this.dialogVisible = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.active-color {
	color: #70b603;
}
.not-color {
	color: #02a7f0;
}
.stop-color {
	color: #d9001b;
}
</style>
