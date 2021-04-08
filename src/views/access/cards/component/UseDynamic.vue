<template>
	<!-- 牌盒使用动态 -->
	<div class="use-dynamic">
		<div class="params flex-h flex-bc">
			<el-form ref="listQuery" :inline="true" :model="form">
				<el-form-item :label="$t('cards_component_usedynamic_66')">
					<el-date-picker
						v-model="listQuery.time"
						size="medium"
						format="yyyy-MM-dd"
						:picker-options="pickerOptions"
						type="daterange"
						:range-separator="$t('dealer_index_212')"
						:start-placeholder="$t('开始日期')"
						:end-placeholder="$t('结束日期')"
						align="right"
						value-format="timestamp"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('cards_component_usedynamic_70')">
					<el-select
						v-model="listQuery.status"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_usedynamic_71')"
					>
						<el-option :label="$t('cards_component_usedynamic_71')" :value="-1"></el-option>
						<el-option :label="$t('cards_component_usedynamic_72')" :value="1"></el-option>
						<el-option :label="$t('cards_component_usedynamic_73')" :value="2"></el-option>
						<el-option :label="$t('cards_component_usedynamic_74')" :value="3"></el-option>
						<el-option :label="$t('cards_component_usedynamic_75')" :value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cards_component_usedynamic_76')">
					<el-input
						v-model="listQuery.cardBoxNo"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_usedynamic_77')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('cards_component_usedynamic_78')">
					<el-input
						v-model="listQuery.updatedBy"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_usedynamic_79')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('cards_component_usedynamic_80') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('cards_component_usedynamic_81') }}</el-button>
			</div>
		</div>
		<div class="content">
			<div class="content-head" style="margin-bottom:10px">
				<el-button
					v-if="hasPermission('2142')"
					type="primary"
					size="medium"
					@click="countWarningStatus = true"
				>{{ $t('cards_component_usedynamic_82') }}</el-button>
				<el-button
					v-if="hasPermission('2143')"
					type="primary"
					size="medium"
					@click="showStyleStatus"
				>{{ $t('cards_component_usedynamic_83') }}</el-button>
			</div>
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('cards_component_usedynamic_84')"
					width="120"
				></el-table-column>
				<el-table-column align="center" prop="cardBoxNo" :label="$t('cards_component_usedynamic_76')"></el-table-column>
				<el-table-column align="center" prop="status" :label="$t('cards_component_usedynamic_85')">
					<template slot-scope="scope">{{ scope.row ? status[scope.row.status - 1] : '' }}</template>
				</el-table-column>
				<el-table-column align="center" prop="updatedAt" :label="$t('cards_component_usedynamic_66')"></el-table-column>
				<el-table-column align="center" prop="tableName" :label="$t('cards_component_usedynamic_86')">
					<template slot-scope="scope">
						<span>{{ scope.row.tableName ? scope.row.tableName : '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="bootNo" :label="$t('cards_component_usedynamic_87')">
					<template slot-scope="scope">
						<span>{{ scope.row.bootNo ? scope.row.bootNo : '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="usedCount" :label="$t('cards_component_usedynamic_88')"></el-table-column>
				<el-table-column align="center" prop="updatedBy" :label="$t('cards_component_usedynamic_89')">
					<template slot-scope="scope">
						<span>{{ scope.row.updatedBy ? scope.row.updatedBy : '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="userName" :label="$t('cards_component_usedynamic_90')">
					<template slot-scope="scope">
						<span>{{ scope.row.userName ? scope.row.userName : '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="index" :label="$t('cards_component_usedynamic_91')">
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission('2141')"
							:disabled="Number(scope.row.status) !== 4"
							@click="HandleItemClick(scope.row)"
						>{{ $t('cards_component_usedynamic_92') }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page.sync="pageIndex"
				layout="total, sizes,prev, pager, next, jumper"
				:page-size="pageSize"
				:page-sizes="$store.getters.pageSizes"
				:total="total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
		</div>
		<!-- 纸牌报废 -->
		<el-dialog
			width="400px"
			:title="$t('cards_component_usedynamic_93')"
			:close-on-click-modal="false"
			center
			:destroy-on-close="true"
			:visible.sync="scrapStatus"
		>
			<el-form ref="discardForm" :inline="true" class="flex-hc" :model="discardForm">
				<el-form-item :label="$t('cards_component_usedynamic_94')" required prop="cardColour">
					<el-radio-group v-model="discardForm.cardColour">
						<el-radio :label="1" :value="1" class="stop-color">{{ $t('cards_component_usedynamic_95') }}</el-radio>
						<el-radio :label="2" :value="2" class="blue">{{ $t('cards_component_usedynamic_96') }}</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="scrapStatus = false">{{ $t('cards_component_usedynamic_97') }}</el-button>
				<el-button type="primary" @click="handleScrapCommit">{{ $t('cards_component_usedynamic_98') }}</el-button>
			</span>
		</el-dialog>
		<!-- 使用次数预警提示 -->
		<el-dialog
			width="600px"
			:title="$t('cards_component_usedynamic_82')"
			:close-on-click-modal="false"
			center
			:visible.sync="countWarningStatus"
			:destroy-on-close="true"
			@close="closeWarn"
		>
			<el-form
				ref="warnForm"
				:inline="true"
				class="flex-hc"
				:model="countWarningForm"
				:rules="countWarningFormRules"
			>
				<el-form-item :label="$t('cards_component_usedynamic_99')" prop="warningCount" required>
					<el-input
						v-model="countWarningForm.warningCount"
						size="medium"
						:placeholder="$t('cards_component_usedynamic_100')"
						maxlength="5"
						style="width:320px"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="countWarningStatus = false">{{ $t('cards_component_usedynamic_97') }}</el-button>
				<el-button
					type="primary"
					@click="handleCountWarningCommit"
				>{{ $t('cards_component_usedynamic_98') }}</el-button>
			</span>
		</el-dialog>
		<!-- 洗牌方式提示 -->
		<el-dialog
			width="500px"
			:title="$t('cards_component_usedynamic_83')"
			:close-on-click-modal="false"
			center
			:visible.sync="styleStatus"
			:destroy-on-close="true"
			@close="handleClose"
		>
			<el-divider margin="0px"></el-divider>
			<div class="add-del">
				<el-button
					type="text"
					size="medium"
					@click="addOneNode"
				>{{ $t('cards_component_usedynamic_101') }}</el-button>
				<el-button
					type="text"
					size="medium"
					@click="delShuffle"
				>{{ $t('cards_component_usedynamic_102') }}</el-button>
			</div>
			<el-divider></el-divider>
			<el-tree
				ref="tree"
				:data="type"
				:props="defaultProps"
				show-checkbox
				node-key="key"
				@check="checkNode"
				@node-click="clickNode"
			></el-tree>
			<el-form v-if="inputVisible" ref="inputAddForm" :model="inputForm" :rules="inputFormRules">
				<el-form-item :label-width="formLabelWidthAdd" prop="name">
					<el-input
						v-model="inputForm.name"
						maxlength="5"
						:placeholder="$t('cards_component_usedynamic_103')"
						autofocus
						@blur="blur"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="styleStatus = false">{{ $t('cards_component_usedynamic_104') }}</el-button>
				<el-button
					type="primary"
					@click="handleShuffleCommit"
				>{{ $t('cards_component_usedynamic_105') }}</el-button>
			</span>
		</el-dialog>
		<el-dialog
			:title="$t('cards_component_usedynamic_103')"
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			@close="closeShuffle"
		>
			<el-form ref="inputForm" :model="inputForm" :rules="inputFormRules" label-width="auto">
				<el-form-item
					:label="$t('cards_component_usedynamic_106')"
					:label-width="formLabelWidth"
					prop="name"
				>
					<el-input v-model="inputForm.name" maxlength="5"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{ $t('cards_component_usedynamic_104') }}</el-button>
				<el-button type="primary" @click="confirmShuffle">{{ $t('cards_component_usedynamic_105') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import validate from '@/mixins/validate'
import {
	fetchCardBoxStatusList,
	discardRecord,
	fetchShuffleCardList,
	postEditShuffle,
	postWarnCard
} from '@/api/cardRepertory'
import { message } from '@/utils/message'
export default {
	name: 'UseDynamic',
	mixins: [list, validate],
	data() {
		const hasSpace = (rule, value, callback) => {
			if (/\s/.test(value)) {
				callback(new Error(this.$t('cards_component_usedynamic_107')))
			} else if (value === '') {
				callback(new Error(this.$t('cards_component_usedynamic_108')))
			} else {
				callback()
			}
		}
		return {
			key: 0,
			formLabelWidth: '120px',
			formLabelWidthAdd: '23px',
			dialogFormVisible: false,
			inputVisible: false,
			defaultProps: {
				children: 'children',
				label: 'type'
			},
			type: [],
			list: [],
			status: [
				this.$t('cards_component_usedynamic_72'),
				this.$t('cards_component_usedynamic_73'),
				this.$t('cards_component_usedynamic_74'),
				this.$t('cards_component_usedynamic_75')
			],
			inputAddForm: {
				name: ''
			},
			inputForm: {
				name: ''
			},
			inputFormRules: {
				name: [{ required: true, validator: hasSpace, trigger: 'blur' }]
			},
			form: {
				originPwd: '',
				newPwd: '',
				rePwd: ''
			},
			radio: [],
			listQuery: {},
			discardForm: {
				cardColour: 1,
				cardBoxNo: undefined
			},
			scrapStatus: false,
			scrapStatusform: {
				cardColorStatus: 1
			},
			countWarningStatus: false,
			countWarningForm: {
				warningCount: ''
			},
			styleStatus: false,
			countWarningFormRules: {
				warningCount: [
					{
						required: true,
						validator: (rule, value, callback) => {
							if (+value === 0) {
								callback(new Error(this.$t('cards_component_usedynamic_109')))
							} else {
								callback()
							}
						},
						message: this.$t('cards_component_usedynamic_110')
					},
					{ required: true, validator: this.isNaturalNum2, trigger: 'blur' },
					{ required: true, validator: this.notSupportSpecial, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		showStyleStatus() {
			this.hasPermission('2143') &&
				fetchShuffleCardList().then(({ data }) => {
					this.styleStatus = true
					this.type = data.map((item, index) => ({
						...item,
						key: this.key++
					}))
				})
		},
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),
				time: undefined
			}
			fetchCardBoxStatusList(params).then((response) => {
				this.list = response.data.record
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		handleClose() {
			this.inputVisible = false
			this.$refs.tree.setCheckedKeys([])
		},
		blur(evt) {
			const val = evt.currentTarget.value
			if (/\s/.test(val)) {
				// this.$message({
				// 	message: '不能输入空格',
				// 	type: 'warn'
				// })
			} else if (val.trim() !== '') {
				this.confirmShuffle()
				this.inputVisible = false
			}
		},
		checkNode(node, obj) {
			const checkedKeys = this.$refs.tree.getCheckedKeys()
			this.$refs.tree.setCheckedKeys(checkedKeys)
		},
		clickNode(node) {
			this.inputForm.name = node.type
			this.clickedKey = node.key
			this.addOneNode({ isEditing: true })
		},
		confirmShuffle() {
			const find = this.type.find((i) => i.type === this.inputForm.name)
			if (find) {
				this.inputForm.name = ''
				return message({
					message: this.$t('cards_component_usedynamic_111'),
					type: 'error'
				})
			}

			const validate = this.$refs.inputForm || this.$refs.inputAddForm
			validate.validate((valid) => {
				if (valid) {
					if (!isNaN(this.clickedKey)) {
						this.type = this.type.map((item) => {
							return item.key === this.clickedKey
								? { type: this.inputForm.name, key: this.clickedKey }
								: item
						})
						this.clickedKey = undefined
						this.dialogFormVisible = false
					} else {
						this.type.push({ type: this.inputForm.name, key: this.key++ })
						this.dialogFormVisible = false
					}

					this.inputForm.name = ''
				}
			})
		},
		filter(value, data) {
			return !this.$refs.tree.getCheckedNodes().includes(data)
		},
		delShuffle() {
			const tree = this.$refs.tree
			const current = tree.getCheckedNodes()
			current.map((item) => tree.remove(item))
		},
		closeShuffle() {
			this.inputForm.name = ''
			this.inputAddForm.name = ''
			this.clickedKey = undefined
			// this.$refs.inputForm.resetFields()
			// this.$refs.inputAddForm.resetFields()
		},
		addOneNode({ isEditing = false }) {
			if (isEditing && this.type.length <= 10) {
				this.dialogFormVisible = true
			}
			if (!isEditing && this.type.length >= 10) {
				message({
					message: this.$t('cards_component_usedynamic_112'),
					type: 'warn'
				})
			}
			if (!isEditing && this.type.length < 10) {
				this.inputVisible = true
			}
		},
		handleSearch() {
			const create = this.listQuery.time || []
			const [startTime, endTime] = create
			const params = {
				...this.listQuery,
				pageIndex: 1,
				startDate: startTime && startTime + '',
				endDate: endTime && endTime + ''
			}
			this.loadData(params)
		},
		handleCurrentChange() {
			this.loadData()
		},
		handleReset() {
			this.listQuery = {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
			this.loadData({ pageIndex: 1 })
		},
		HandleItemClick(row) {
			this.scrapStatus = true
			this.discardForm.cardBoxNo = row.cardBoxNo
		},
		handleScrapCommit() {
			this.listLoading = true
			discardRecord({ ...this.discardForm, mode: 1 })
				.then((_) => {
					if (_ && _.code === 200) {
						message({
							message: this.$t('cards_component_usedynamic_113'),
							type: 'success'
						})
						this.scrapStatus = false
						this.listLoading = false
					}
				})
				.then(this.loadData)
				.catch((error) => {
					console.error(error)
				})
		},
		handleShuffleCommit() {
			this.listLoading = true
			this.inputForm.name = ''
			postEditShuffle(this.type.map((item) => ({ type: item.type }))).then((_) => {
				// this.$message({
				// 	message: '操作成功',
				// 	type: 'success'
				// })
				this.listLoading = false
				this.styleStatus = false
			})
		},
		closeWarn() {
			this.$refs.warnForm.resetFields()
		},
		handleCountWarningCommit() {
			this.$refs['warnForm'].validate((valid) => {
				if (valid) {
					this.listLoading = true
					postWarnCard(this.countWarningForm)
						.then((_) => {
							if (_ && _.code === 200) {
								message({
									message: this.$t('cards_component_usedynamic_114'),
									type: 'success'
								})
								this.listLoading = false
								this.styleStatus = false
								this.countWarningStatus = false
							}
						})
						.catch((error) => {
							message({ message: error, type: 'error' })
						})
				}
			})
		}
	}
}
</script>
<style lang="scss">
.use-dynamic {
	.el-radio__input.is-checked + .el-radio__label {
		color: inherit;
	}
	.blue {
		color: blue;
	}

	.el-divider {
		margin: 0;
	}
	.add-del {
		padding-left: 24px;
	}
}
</style>
