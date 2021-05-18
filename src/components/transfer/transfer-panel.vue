<template>
	<div class="el-transfer-panel" style="width: 285px; height: 450px">
		<p class="el-transfer-panel__header">
			<!--			<el-checkbox-->
			<!--				v-model="allChecked"-->
			<!--				@change="handleAllCheckedChange"-->
			<!--				:indeterminate="isIndeterminate"-->
			<!--			>-->
			<!--			</el-checkbox>-->
			{{ title }}
			<span>{{ !show ? checkedSummary : '' }}</span>
		</p>
		<div
			:class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']"
		>
			<el-input
				v-if="filterable"
				v-model="query"
				class="el-transfer-panel__filter"
				size="small"
				placeholder="请输入游戏名称"
				@mouseenter.native="inputHover = true"
				@mouseleave.native="inputHover = false"
			>
				<i
					slot="prefix"
					:class="['el-input__icon', 'el-icon-' + inputIcon]"
					@click="clearQuery"
				></i>
			</el-input>
			<!--			<div-->
			<!--				v-show="!hasNoMatch && data.length > 0"-->
			<!--				v-if="show"-->
			<!--				:class="{ 'is-filterable': filterable }"-->
			<!--				class="el-transfer-panel__list"-->
			<!--			>-->
			<!--				<el-checkbox-->
			<!--					v-for="item in filteredData"-->
			<!--					:key="item[keyProp]"-->
			<!--					class="el-transfer-panel__item"-->
			<!--					:label="item[keyProp]"-->
			<!--				>-->
			<!--					<option-content :option="item"></option-content>-->
			<!--				</el-checkbox>-->
			<!--			</div>-->
			<draggable
				v-if="show"
				v-model="gameNameList"
				tag="ul"
				v-bind="dragOptions"
				class="el-transfer-panel__list"
				:move="onMove"
				@end="onEnd"
			>
				<li v-for="item in gameNameList" :key="item.id" class="selected-theme">
					<p class="item-content">
						<span class="item-label">
							{{ item.gameName }}
						</span>
						<span
							v-if="item.gameStatus * 1 === 0"
							class="item-status disableRgba"
						>
							禁用
						</span>
						<span
							v-if="item.gameStatus * 1 === 1"
							class="item-status normalRgba"
						>
							开启
						</span>
						<span
							v-if="item.gameStatus * 1 === 2"
							class="item-status deleteRgba"
						>
							维护中
						</span>
					</p>
				</li>
			</draggable>
			<draggable
				v-show="!hasNoMatch && data.length > 0"
				v-else
				v-model="data"
				:class="{ 'is-filterable': filterable }"
				class="el-transfer-panel__list"
				v-bind="dragOptions"
			>
				<div
					v-for="item in filteredData"
					:key="item[keyProp]"
					class="el-transfer-panel__item"
				>
					<p class="item-content">
						<span class="item-id">{{ item.assort }}</span>
						<span class="item-label">
							{{ item.gameName }}
						</span>
						<span
							v-if="item.gameStatus * 1 === 0"
							class="item-status disableRgba"
						>
							禁用
						</span>
						<span
							v-if="item.gameStatus * 1 === 1"
							class="item-status normalRgba"
						>
							开启
						</span>
						<span
							v-if="item.gameStatus * 1 === 2"
							class="item-status deleteRgba"
						>
							维护中
						</span>
						<i class="el-icon-close"></i>
					</p>
				</div>
			</draggable>
			<p v-show="hasNoMatch" class="el-transfer-panel__empty">
				{{ t('el.transfer.noMatch') }}
			</p>
			<p
				v-show="data.length === 0 && !hasNoMatch"
				class="el-transfer-panel__empty"
			>
				{{ t('el.transfer.noData') }}
			</p>
		</div>
		<p v-if="hasFooter" class="el-transfer-panel__footer">
			<slot></slot>
		</p>
	</div>
</template>

<script>
// import ElCheckboxGroup from 'element-ui/packages/checkbox-group'
// import ElCheckbox from 'element-ui/packages/checkbox'
// import ElInput from 'element-ui/packages/input'
import Locale from 'element-ui/src/mixins/locale'
import draggable from 'vuedraggable'

export default {
	name: 'ElTransferPanel',

	components: {
		// ElCheckboxGroup,
		// ElCheckbox,
		// ElInput,
		draggable
		// OptionContent: {
		// 	props: {
		// 		option: Object
		// 	},
		// 	render(h) {
		// 		const getParent = (vm) => {
		// 			if (vm.$options.componentName === 'ElTransferPanel') {
		// 				return vm
		// 			} else if (vm.$parent) {
		// 				return getParent(vm.$parent)
		// 			} else {
		// 				return vm
		// 			}
		// 		}
		// 		const panel = getParent(this)
		// 		const transfer = panel.$parent || panel
		// 		return panel.renderContent ? (
		// 			panel.renderContent(h, this.option)
		// 		) : transfer.$scopedSlots.default ? (
		// 			transfer.$scopedSlots.default({ option: this.option })
		// 		) : (
		// 			<span>
		// 				{this.option[panel.labelProp] || this.option[panel.keyProp]}{' '}
		// 				{this.option[panel.statusProp] || ''}
		// 			</span>
		// 		)
		// 	}
		// }
	},
	mixins: [Locale],

	componentName: 'ElTransferPanel',

	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		gameNameList: {
			type: Array,
			default() {
				return []
			}
		},
		renderContent: Function,
		title: String,
		show: Boolean,
		filterable: Boolean,
		format: Object,
		filterMethod: Function,
		defaultChecked: Array,
		props: Object
	},

	data() {
		return {
			checked: [],
			allChecked: false,
			query: '',
			inputHover: false,
			checkChangeByUser: true,
			selectedTheme: [
				{
					id: 1,
					label: `老虎机`,
					status: '开启中'
				},
				{
					id: 2,
					label: `百人牛牛`,
					status: '已禁用'
				},
				{
					id: 4,
					label: `老虎机`,
					status: '开启中'
				}
			],
			backSelectedTheme: [], // 选主题列表备份
			backUnSelectTheme: [], // 未选主题列表备份用于恢复默认设置
			relatedListLast: {}, // 已选主题列表最后一项
			isShowDel: false
		}
	},

	computed: {
		filteredData() {
			return this.data.filter((item) => {
				if (typeof this.filterMethod === 'function') {
					// console.log('item', item)
					return this.filterMethod(this.query, item)
				} else {
					const label = item[this.labelProp] || item[this.keyProp].toString()
					return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
				}
			})
		},
		dragOptions() {
			return {
				animation: 0,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost'
			}
		},
		checkableData() {
			return this.filteredData.filter((item) => !item[this.disabledProp])
		},

		checkedSummary() {
			const checkedLength = this.checked.length
			const dataLength = this.data.length
			const { noChecked, hasChecked } = this.format
			if (noChecked && hasChecked) {
				return checkedLength > 0
					? hasChecked
							.replace(/\${checked}/g, checkedLength)
							.replace(/\${total}/g, dataLength)
					: noChecked.replace(/\${total}/g, dataLength)
			} else {
				return `${dataLength}个`
			}
		},

		isIndeterminate() {
			const checkedLength = this.checked.length
			return checkedLength > 0 && checkedLength < this.checkableData.length
		},

		hasNoMatch() {
			return this.query.length > 0 && this.filteredData.length === 0
		},

		inputIcon() {
			return this.query.length > 0 && this.inputHover
				? 'circle-close'
				: 'search'
		},

		labelProp() {
			return this.props.label || 'label'
		},

		keyProp() {
			return this.props.key || 'key'
		},

		statusProp() {
			return this.props.status || 'status'
		},

		disabledProp() {
			return this.props.disabled || 'disabled'
		},

		hasFooter() {
			return !!this.$slots.default
		}
	},

	watch: {
		checked(val, oldVal) {
			this.updateAllChecked()
			if (this.checkChangeByUser) {
				const movedKeys = val
					.concat(oldVal)
					.filter((v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1)
				this.$emit('checked-change', val, movedKeys)
			} else {
				this.$emit('checked-change', val)
				this.checkChangeByUser = true
			}
		},

		data() {
			const checked = []
			const filteredDataKeys = this.filteredData.map(
				(item) => item[this.keyProp]
			)
			this.checked.forEach((item) => {
				if (filteredDataKeys.indexOf(item) > -1) {
					checked.push(item)
				}
			})
			this.checkChangeByUser = false
			this.checked = checked
		},

		checkableData() {
			this.updateAllChecked()
		},

		defaultChecked: {
			immediate: true,
			handler(val, oldVal) {
				if (
					oldVal &&
					val.length === oldVal.length &&
					val.every((item) => oldVal.indexOf(item) > -1)
				) {
					return
				}
				const checked = []
				const checkableDataKeys = this.checkableData.map(
					(item) => item[this.keyProp]
				)
				val.forEach((item) => {
					if (checkableDataKeys.indexOf(item) > -1) {
						checked.push(item)
					}
				})
				this.checkChangeByUser = false
				this.checked = checked
			}
		}
	},

	methods: {
		updateAllChecked() {
			const checkableDataKeys = this.checkableData.map(
				(item) => item[this.keyProp]
			)
			this.allChecked =
				checkableDataKeys.length > 0 &&
				checkableDataKeys.every((item) => this.checked.indexOf(item) > -1)
		},

		handleAllCheckedChange(value) {
			this.checked = value
				? this.checkableData.map((item) => item[this.keyProp])
				: []
		},

		clearQuery() {
			if (this.inputIcon === 'circle-close') {
				this.query = ''
			}
		},

		onMove({ relatedContext, draggedContext, to }) {
			const relatedElement = relatedContext.element
			const draggedElement = draggedContext.element
			const dragInEl = to['className']
			console.log('relatedElement', relatedElement)
			console.log('draggedElement', draggedElement)
			console.log('dragInEl', dragInEl)
			if (dragInEl === 'selected-list') {
				this.isShowDel = false
				if (this.selectedTheme.length === 4) {
					// 判断往已选列表拖时，如果已经满足4项，则记录已选列表的最后一项
					// 拖拽结束时将此项清除到未选列表中
					this.relatedListLast = this.selectedTheme[
						this.selectedTheme.length - 1
					]
				}
			} else {
				this.isShowDel = true // 判断如果是往未选列表里拖的话显示垃圾桶
			}
			return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
		},
		onEnd(dragObj) {
			const dragInEl = dragObj.to['className']
			console.log('dragInEl', dragObj)
			if (dragInEl === 'selected-list') {
				// if (this.selectedTheme.length > 4) {
				// 	// 判断已选列表大于4项，将记录的最后一项过滤出来，并push到未选列表数组
				// 	this.selectedTheme = this.selectedTheme.filter((item) => {
				// 		return item.type !== this.relatedListLast.type
				// 	})
				// 	this.unSelectTheme.push(this.relatedListLast)
				// }
			}
			if (dragInEl === 'theme-right-list') {
				// 判断是往未选列表拖时，拖拽结束时将垃圾桶隐藏
				this.isShowDel = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .el-transfer-panel__list.is-filterable {
	height: 400px;
}
/deep/ .el-transfer-panel__item {
	padding-left: 0;
	height: 42px;
}
.item-content {
	border-bottom: 1px solid #ccc;
	height: 42px;
	line-height: 42px;
	padding-left: 20px;
	span {
		display: inline-block;
	}
	.item-id {
		color: #aaa;
		font-size: 20px;
		font-weight: 700;
	}
	.item-label {
		font-size: 14px;
		color: #666;
		font-weight: 400;
		padding-left: 30px;
		text-align: center;
		width: 100px;
	}
	.item-status {
		margin-right: 10px;
	}
}
.selected-list {
	height: 240px;
	margin-top: 24px;
	overflow: hidden;
	.selected-theme {
		width: 160px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		margin-bottom: 16px;
		cursor: pointer;
		background: linear-gradient(
			180deg,
			rgba(43, 46, 83, 1) 0%,
			rgba(108, 116, 150, 1) 100%
		);
		border-radius: 6px;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(255, 255, 255, 1);
	}
}
.theme-setting {
	/deep/.el-dialog {
		height: 476px;
		border-radius: 6px;
		.el-dialog__header {
			height: 55px;
			line-height: 56px;
			padding: 0;
			border-bottom: 1px solid rgba(13, 20, 30, 0.1);
			.el-dialog__title {
				height: 21px;
				font-size: 16px;
				font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
				font-weight: bold;
				color: rgba(13, 20, 30, 1);
				line-height: 21px;
			}
			.el-dialog__headerbtn {
				margin-top: -4px;
			}
		}
		.el-dialog__body {
			position: relative;
			display: flex;
			height: 331px;
			padding: 0;
			border-bottom: 1px solid rgba(13, 20, 30, 0.1);
		}
	}

	.theme-left {
		width: 218px;
		margin-left: 24px;
		border-right: 1px solid rgba(13, 20, 30, 0.1);
		.theme-title {
			display: flex;
			margin-top: 24px;
			.title {
				height: 19px;
				margin-right: 4px;
				font-size: 14px;
				font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
				font-weight: bold;
				color: rgba(13, 20, 30, 1);
				line-height: 19px;
			}
			.des {
				height: 16px;
				font-size: 12px;
				font-family: MicrosoftYaHei;
				color: rgba(13, 20, 30, 0.6);
				line-height: 19px;
			}
		}
	}
	.theme-right {
		padding: 0 24px;
		.theme-right-title {
			padding-top: 24px;
			height: 19px;
			font-size: 14px;
			font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
			font-weight: bold;
			color: rgba(13, 20, 30, 0.4);
			line-height: 19px;
		}
		.theme-right-list {
			width: 357px;
			height: 240px;
			overflow: scroll;
			margin-top: 24px;
			.theme-right-item {
				width: 160px;
				height: 48px;
				line-height: 48px;
				float: left;
				margin-right: 16px;
				margin-bottom: 16px;
				background: rgba(247, 248, 252, 1);
				border-radius: 6px;
				font-size: 14px;
				font-family: MicrosoftYaHei;
				color: rgba(13, 20, 30, 0.4);
				text-align: center;
				cursor: pointer;
			}
		}
		.theme-right-list::before,
		.theme-right-list::after {
			content: '';
			display: table;
		}
		.theme-right-list::after {
			clear: both;
		}
	}
	.drag-drop-del {
		position: absolute;
		right: 1px;
		top: 0;
		width: 404px;
		height: 331px;
		display: flex;
		justify-content: center;
		align-items: center;
		//background-image: url('../../../../../../src/assets/img/bb_logo.png');
		img {
			width: 96px;
			height: 96px;
		}
	}
}
</style>
