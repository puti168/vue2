<template>
	<div class="game-container notice-container">
		<div class="flex-h flex-bc">
			<h2 class="h2-line">{{ $t('route.noticeList') }}</h2>
			<div class="flex-h handle">
				<el-button
					type="primary"
					icon="el-icon-search"
					:disabled="loading"
					@click="handleSearch"
				>
					{{ $t('notice_notice_index_1226') }}
				</el-button>
				<el-button icon="el-icon-edit" @click="handleReset">
					{{ $t('notice_notice_index_1227') }}
				</el-button>
			</div>
		</div>
		<div class="params flex-vc flex-bc flex-wrap new-block">
			<el-form ref="form" :inline="true" :model="form">
				<el-row>
					<el-form-item :label="$t('notice_notice_index_1228')">
						<el-date-picker
							v-model="form.time"
							:picker-options="pickerOptions"
							:default-time="defaultTime"
							:type="dateType"
							range-separator="-"
							:start-placeholder="$t('notice_notice_index_1229')"
							:end-placeholder="$t('notice_notice_index_1230')"
							align="left"
							value-format="timestamp"
						></el-date-picker>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1231')">
						<el-date-picker
							v-model="form.sendTime"
							:type="dateType"
							:default-time="defaultTime"
							range-separator="-"
							:start-placeholder="$t('notice_notice_index_1229')"
							:end-placeholder="$t('notice_notice_index_1230')"
							align="left"
							value-format="timestamp"
						></el-date-picker>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1232')" prop="type">
						<el-select
							v-model="form.type"
							:placeholder="$t('systemmanagement_ipwhite_index_1440')"
						>
							<el-option
								:label="$t('notice_notice_index_1233')"
								:value="-1"
							></el-option>
							<el-option
								v-for="item in noticetype"
								:key="item.value"
								:label="filterNoticetype(item.value)"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<!-- 商户名称/编码 -->
					<SelectAgentTree v-model="form.agentId" />
					<el-form-item :label="$t('notice_notice_index_1234')">
						<el-select
							v-model="form.status"
							:placeholder="$t('systemmanagement_ipwhite_index_1440')"
						>
							<el-option
								:label="$t('notice_notice_index_1233')"
								:value="-1"
							></el-option>
							<el-option
								:label="$t('notice_notice_index_1235')"
								:value="1"
							></el-option>
							<el-option
								:label="$t('notice_notice_index_1236')"
								:value="0"
							></el-option>
						</el-select>
					</el-form-item>
				</el-row>
			</el-form>
			<div class="new-content">
				<el-button
					v-if="hasPermission(14101)"
					type="primary"
					size="small"
					icon="el-icon-circle-plus-outline"
					@click="handleNewNotice"
				>
					{{ $t('notice_notice_index_1237') }}
				</el-button>
			</div>
		</div>
		<!-- 内容部分 -->
		<div class="content">
			<el-table
				:data="list"
				style="width: 100%"
				border
				:header-cell-style="getRowClass"
			>
				<el-table-column
					align="center"
					type="index"
					width="60"
					:label="$t('notice_notice_index_1238')"
				></el-table-column>
				<!-- 商户名称 -->
				<el-table-column
					align="center"
					prop="agentName"
					:label="$t('notice_notice_index_1239')"
					width="130"
				>
					<template slot-scope="scope">
						<template v-if="scope.row.agentName && scope.row.agentName.length > 5">
							<el-popover
								popper-class="fix-break"
								placement="top"
								width="300"
								trigger="hover"
								:content="scope.row.agentName.replace(' ', '')"
							>
								<div slot="reference">
									{{ `${scope.row.agentName.slice(0, 5)}...` }}
								</div>
							</el-popover>
						</template>
						<template v-else>
							{{ scope.row.agentName }}
						</template>
					</template>
				</el-table-column>
				<!-- 公告类型 -->
				<el-table-column
					align="center"
					:label="$t('notice_notice_index_1232')"
					width="160"
					prop="type"
				>
					<template slot-scope="scope">
						{{ filterNoticetype(scope.row.type) }}
					</template>
				</el-table-column>
				<!-- 公告标题 -->
				<el-table-column
					align="center"
					prop="title"
					:label="$t('notice_notice_index_1240')"
					width="160"
				>
					<template slot-scope="scope">
						<template v-if="scope.row.title && scope.row.title.length > 10">
							<el-popover
								popper-class="fix-break"
								placement="top"
								width="300"
								trigger="hover"
								:content="scope.row.title.replace(' ', '')"
							>
								<div slot="reference">{{ `${scope.row.title.slice(0, 10)}...` }}</div>
							</el-popover>
						</template>
						<template v-else>
							{{ scope.row.title }}
						</template>
					</template>
				</el-table-column>
				<!-- 公告内容 -->
				<el-table-column
					align="center"
					prop="content"
					:label="$t('notice_notice_index_1241')"
				>
					<template slot-scope="scope">
						<template v-if="scope.row.content && scope.row.content.length > 20">
							<el-popover
								popper-class="fix-break"
								placement="top"
								width="300"
								trigger="hover"
								:content="scope.row.content"
							>
								<div slot="reference">{{ `${scope.row.content.slice(0, 20)}...` }}</div>
							</el-popover>
						</template>
						<template v-else>
							{{ scope.row.content }}
						</template>
					</template>
				</el-table-column>
				<!-- 开始播报时间 -->
				<el-table-column
					align="center"
					prop="publishStartTime"
					:label="$t('notice_notice_index_1242')"
					width="160"
				></el-table-column>
				<!-- 结束播报时间 -->
				<el-table-column
					align="center"
					prop="publishEndTime"
					:label="$t('notice_notice_index_1243')"
					width="160"
				></el-table-column>
				<!-- 是否启用 -->
				<el-table-column
					align="center"
					prop="status"
					:label="$t('merchant_merchantinfo_index_1109')"
					width="145"
				>
					<template slot-scope="scope">
						<span
							:class="{
								success: scope.row.status === 1,
								danger: scope.row.status !== 1
							}"
						>
							{{
								scope.row.status === 1
									? $t('notice_notice_index_1235')
									: $t('notice_notice_index_1236')
							}}
						</span>
						<el-switch
							v-if="hasPermission(14102)"
							:value="scope.row.status === 1 ? true : false"
							@change="editAccountStatus(scope.$index, scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<!-- 创建人 -->
				<el-table-column
					align="center"
					prop="createdBy"
					:label="$t('notice_notice_index_1244')"
					width="100"
					class-name="longText"
				></el-table-column>
				<!-- 创建时间 -->
				<el-table-column
					align="center"
					prop="createdAt"
					:label="$t('notice_notice_index_1245')"
					width="160"
				></el-table-column>
				<!-- 操作 -->
				<el-table-column
					align="center"
					fixed="right"
					width="110"
					:label="$t('notice_notice_index_1246')"
				>
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission(14103)"
							type="text"
							size="small"
							@click.native.prevent="editRow(scope.row)"
						>
							{{ $t('notice_notice_index_1247') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total"
				class="pageValue"
				:current-page.sync="pageIndex"
				:total="total"
				:layout="layout"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
			<!-- 新建和编辑公告 -->
			<el-dialog
				v-if="noticeDialogVisible"
				:close-on-click-modal="false"
				:visible="true"
				:title="
					noticeDialogForm.id
						? $t('notice_notice_index_1248')
						: $t('notice_notice_index_1249')
				"
				width="700px"
				center
				@close="afterDialogClose"
			>
				<el-form
					ref="noticeDialogForm"
					:model="noticeDialogForm"
					:rules="noticeRules"
					label-width="auto"
				>
					<el-form-item :label="$t('notice_notice_index_1239')">
						<span>
							{{
								noticeDialogForm.id ? noticeDialogForm.agentName : userInfo.agentName
							}}
						</span>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1250')">
						<span>
							{{
								noticeDialogForm.id ? noticeDialogForm.agentCode : userInfo.agentCode
							}}
						</span>
					</el-form-item>
					<!-- 公告类型 -->
					<el-form-item
						:label="$t('notice_notice_index_1232')"
						:prop="noticeDialogForm.id ? '' : 'type'"
					>
						<template v-if="noticeDialogForm.id">
							<span>{{ filterNoticetype(noticeDialogForm.type) }}</span>
						</template>
						<template v-else>
							<el-select
								v-model="noticeDialogForm.type"
								:placeholder="$t('systemmanagement_ipwhite_index_1440')"
							>
								<el-option
									v-for="item in noticetype"
									:key="item.value"
									:label="filterNoticetype(item.value)"
									:value="Number(item.value)"
								></el-option>
							</el-select>
							<el-tooltip
								class="item"
								effect="dark"
								:content="$t('notice_notice_index_1251')"
								placement="top"
							>
								<i class="el-icon-question icon-style"></i>
							</el-tooltip>
						</template>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1240')" prop="title" style="margin-bottom:20px">
						<el-input
							v-model="noticeDialogForm.title"
							:placeholder="$t('notice_notice_index_1252')"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1253')" prop="releaseTime" style="margin-bottom:20px">
						<el-date-picker
							v-model="noticeDialogForm.releaseTime"
							type="datetimerange"
							range-separator="-"
							:start-placeholder="$t('notice_notice_index_1254')"
							:end-placeholder="$t('notice_notice_index_1255')"
							:picker-options="startTimeOptions"
							value-format="timestamp"
						></el-date-picker>
					</el-form-item>
					<el-form-item :label="$t('notice_notice_index_1256')" prop="content">
						<el-input
							v-model="noticeDialogForm.content"
							type="textarea"
							:rows="4"
							:placeholder="$t('notice_notice_index_1257')"
							maxlength="100"
							show-word-limit
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="afterDialogClose">
						{{
							noticeDialogForm.id
								? $t('notice_notice_index_1258')
								: $t('notice_notice_index_1259')
						}}
					</el-button>
					<el-button type="primary" @click="commitNoticeDialog">
						{{
							noticeDialogForm.id
								? $t('notice_notice_index_1260')
								: $t('notice_notice_index_1261')
						}}
					</el-button>
				</span>
			</el-dialog>
			<!-- 启用，停用弹窗 -->
			<Modal
				:visible.sync="dialogVisible"
				:title="
					modalType === 1
						? $t('notice_notice_index_1262')
						: $t('notice_notice_index_1263')
				"
				@handle="updateStatus"
			>
				<template v-slot:content>
					<div v-if="modalType === 1">
						<div>{{ $t('notice_notice_index_1264') }}</div>
						<div class="aggravated">{{ noticeData.title }}</div>
						<p>{{ $t('notice_notice_index_1265') }}</p>
					</div>
					<div v-else>
						<div>{{ $t('notice_notice_index_1266') }}</div>
						<div class="aggravated">{{ noticeData.title }}</div>
						<p>{{ $t('notice_notice_index_1267') }}</p>
					</div>
				</template>
			</Modal>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import { message } from '@/utils/message'
import { routerNames } from '@/utils/consts'
import SelectAgentTree from '@/components/SelectAgentTree'
import Modal from '@/components/Modal'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

const noticeDialogForm = {
	releaseTime: [],
	title: '',
	type: 1,
	content: ''
}

export default {
	name: routerNames.noticeList,
	components: { SelectAgentTree, Modal },
	mixins: [list],
	data() {
		const end = dayjs()
			.endOf('day')
			.valueOf()
		const start = dayjs()
			.startOf('day')
			.subtract(29, 'd')
			.valueOf()
		return {
			modalType: 1, // 1为启用 2为停用
			dialogVisible: false,
			hadSearch: false,
			loading: false,
			releaseTime: [],
			noticeDialogVisible: false,
			noticeDialogForm: {
				type: 1
			},
			editNoticeType: -1,
			form: {
				time: [start, end],
				sendTime: '',
				agentId: '',
				status: -1,
				type: -1
			},
			noticeData: {},
			list: [],
			time: ''
		}
	},
	computed: {
		...mapGetters(['globalDics']),
		...mapGetters(['buttonPermissions']),
		...mapGetters(['userInfo']),
		pickerOptions() {
			const _this = this
			return {
				disabledDate(time) {
					const now = dayjs()
						.endOf('day')
						.valueOf()
					return time.getTime() > now
				},
				onPick({ maxDate, minDate }) {
					if (!maxDate) {
						_this.minDate = minDate
					}
				},
				shortcuts: [
					{
						text: this.$t(`members_betrecord_index_584`),
						onClick(picker) {
							const end = dayjs().endOf('day')
							const start = dayjs().startOf('day')
							picker.$emit('pick', [+start, +end])
						}
					},
					{
						text: this.$t(`members_betrecord_index_585`),
						onClick(picker) {
							const end = dayjs()
								.endOf('day')
								.subtract(1, 'd')
							const start = dayjs()
								.startOf('day')
								.subtract(1, 'd')
							picker.$emit('pick', [+start, +end])
						}
					},
					{
						text: this.$t(`members_betrecord_index_586`),
						onClick(picker) {
							let start, end
							const weekNum = dayjs().day()
							if (weekNum === 0) {
								end = dayjs().endOf('day')
								start = dayjs()
									.subtract(1, 'd')
									.startOf('week')
									.startOf('day')
									.add(1, 'd')
							} else {
								end = dayjs().endOf('day')
								start = dayjs()
									.startOf('day')
									.startOf('week')
									.add(1, 'd')
							}
							picker.$emit('pick', [+start, +end])
						}
					},
					{
						text: this.$t(`members_betrecord_index_587`),
						onClick(picker) {
							const end = dayjs().endOf('day')
							const start = dayjs().startOf('month')
							picker.$emit('pick', [+start, +end])
						}
					},
					{
						text: this.$t(`merchant_dailyrateaccount_index_799`),
						onClick(picker) {
							const end = dayjs().endOf('day')
							const start = dayjs()
								.startOf('day')
								.subtract(89, 'd')
							picker.$emit('pick', [+start, +end])
						}
					}
				]
			}
		},
		startTimeOptions() {
			return {
				disabledDate: (time) => {
					// 今天之前的时间不能作为起始时间
					const yestoday = new Date()
					yestoday.setDate(yestoday.getDate() - 1)
					return time.getTime() < yestoday.getTime()
				}
			}
		},
		noticeRules() {
			const validNoticeTitle = (rule, value, callback) => {
				if (value && value.length > 30) {
					callback(new Error(this.$t('notice_notice_index_1268')))
				} else {
					callback()
				}
			}
			const validNoticeContent = (rule, value, callback) => {
				if (value && value.length > 100) {
					callback(new Error(this.$t('notice_notice_index_1269')))
				} else {
					callback()
				}
			}
			return {
				releaseTime: [
					{
						required: true,
						message: this.$t('notice.notice_29'),
						trigger: 'blur'
					}
				],
				title: [
					{
						required: true,
						message: this.$t('notice_notice_index_1270'),
						trigger: 'blur'
					},
					{ validator: validNoticeTitle, trigger: 'blur' }
				],
				type: [
					{
						required: true,
						message: this.$t('notice.notice_31'),
						trigger: 'blur'
					}
				],
				content: [
					{
						required: true,
						message: this.$t('notice_notice_index_1271'),
						trigger: 'blur'
					},
					{
						validator: validNoticeContent,
						trigger: 'blur'
					}
				]
			}
		},
		noticetype() {
			const types = this.globalDics.noticetype || []
			return types.map((item) => {
				return {
					value: item.value,
					label: item.text,
					zh: item.text,
					en: item.englishText
				}
			})
		}
	},
	methods: {
		filterNoticetype(c) {
			const arr = this.noticetype || []
			const find = arr.find((item) => Number(item.value) === Number(c))
			if (Cookies.get('language') === 'zh') {
				return (find && find.zh) || '-'
			}
			if (Cookies.get('language') === 'en') {
				return (find && find.en) || '-'
			}
			return '-'
		},

		loadData() {
			this.loading = true
			const pageData = {
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				startDate: this.form.time ? this.form.time[0] : '',
				endDate: this.form.time ? this.form.time[1] : ''
			}
			const requestData = this.hadSearch
				? {
						publishStartDate: this.form.sendTime ? this.form.sendTime[0] : '',
						publishEndDate: this.form.sendTime ? this.form.sendTime[1] : '',
						agentId: this.form.agentId,
						type: this.form.type,
						status: this.form.status
				  }
				: {}
			const form = {
				...pageData,
				...requestData
			}

			this.$api
				.noticeList(form)
				.then((_) => {
					this.loading = false
					if (_.code === 200) {
						const data = _.data
						this.list = data.record
						this.total = data.totalRecord
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		editRow(row) {
			setTimeout(() => {
				const releaseTime = this.getReleaseTime(row)
				this.noticeDialogForm = { releaseTime, ...row }
				this.editNoticeType = 1
				this.noticeDialogVisible = true
			}, 800)
		},
		getReleaseTime(row) {
			return [
				dayjs(row.publishStartTime).valueOf(),
				dayjs(row.publishEndTime).valueOf()
			]
		},
		updateStatus() {
			const params = {
				id: this.noticeData.id,
				status: this.noticeData.status === 1 ? 0 : 1
			}
			this.$api.noticeUpdateStatus(params).then((_) => {
				if (_.code === 200) {
					const index = this.list.findIndex((val) => val.id === params.id)
					if (index > -1) {
						this.list[index].status = params.status
						this.dialogVisible = false
					}
					message({
						type: 'success',
						message: this.$t('notice.notice_39')
					})
				}
			})
		},
		editAccountStatus(index, row) {
			this.dialogVisible = true
			this.modalType = row.status === 1 ? 2 : 1
			this.noticeData = { ...row }
		},
		commitNoticeDialog() {
			const timeSpan = 365 * 24 * 60 * 60 * 1000
			this.$refs.noticeDialogForm.validate((valid) => {
				if (valid) {
					if (
						this.noticeDialogForm.releaseTime &&
						this.noticeDialogForm.releaseTime[0] >=
							this.noticeDialogForm.releaseTime[1]
					) {
						return message({
							type: 'warning',
							message: this.$t('notice_notice_index_1272')
						})
					}
					if (
						this.noticeDialogForm.releaseTime[1] -
							this.noticeDialogForm.releaseTime[0] >
						timeSpan
					) {
						return message({
							type: 'warning',
							message: this.$t('notice_notice_index_1273')
						})
					}
					const form = {
						content: this.noticeDialogForm.content,
						publishStartTime:
							(this.noticeDialogForm.releaseTime &&
								this.noticeDialogForm.releaseTime[0]) ||
							'',
						publishEndTime:
							(this.noticeDialogForm.releaseTime &&
								this.noticeDialogForm.releaseTime[1]) ||
							'',
						title: this.noticeDialogForm.title,
						type: this.noticeDialogForm.type,
						id: this.noticeDialogForm.id
					}
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					// 判断是修改还是新建
					if (this.editNoticeType === 0) {
						this.$api
							.noticeCreate(form)
							.then((_) => {
								this.noticeDialogVisible = false
								this.loadData()
								this.$message({
									type: 'success',
									message: this.$t('notice.notice_43')
								})
								loading.close()
							})
							.catch(() => {
								loading.close()
							})
					} else if (this.editNoticeType === 1) {
						// 编辑
						this.$api
							.noticeUpdate(form)
							.then((_) => {
								if (_.code === 200) {
									this.loadData()
									this.noticeDialogVisible = false
									this.$message({
										type: 'success',
										message: this.$t('notice.notice_44')
									})
								}
								loading.close()
							})
							.catch(() => {
								loading.close()
							})
					}
				}
			})
		},
		handleNewNotice() {
			this.noticeDialogVisible = true
			this.noticeDialogForm = {
				...noticeDialogForm
			}
			this.editNoticeType = 0
		},
		handleCurrentChange(val) {
			this.loadData()
		},
		handleReset() {
			const end = dayjs()
				.endOf('day')
				.valueOf()
			const start = dayjs()
				.startOf('day')
				.subtract(29, 'd')
				.valueOf()
			this.pageIndex = 1
			this.form = {
				time: [start, end],
				sendTime: '',
				createdBy: '',
				type: -1,
				status: -1
			}
			this.hadSearch = false
			this.loadData()
		},
		handleSearch() {
			this.hadSearch = true
			this.pageIndex = 1
			this.loadData()
		},
		afterDialogClose() {
			this.noticeDialogVisible = false
			this.$refs.noticeDialogForm.clearValidate()
			setTimeout(() => {
				this.noticeDialogForm = {
					releaseTime: [],
					title: '',
					type: 1,
					content: ''
				}
			}, 300)
		}
	}
}
</script>

<style lang="scss">
.fix-break {
	text-align: initial !important;
}
</style>
