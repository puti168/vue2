<template>
	<div class="el-transfer">
        <el-button type="primary" class="clear-list">列表清空</el-button>
		<transfer-panel
			ref="leftPanel"
			v-bind="$props"
			:data="sourceData"
			:title="titles[0]"
            :show="false"
			:default-checked="leftDefaultChecked"
			:placeholder="filterPlaceholder"
			@checked-change="onSourceCheckedChange"
		>
			<slot name="left-footer"></slot>
		</transfer-panel>
		<div class="el-transfer__buttons">
            <el-button type="primary" @click.native="addToLeft">
                <i class="el-icon-d-arrow-left"></i>
                <span>拖拽游戏移入</span>
            </el-button>
<!--			<el-button-->
<!--				type="primary"-->
<!--				:class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"-->
<!--				:disabled="rightChecked.length === 0"-->
<!--				@click.native="addToLeft"-->
<!--			>-->
<!--				<i class="el-icon-d-arrow-left"></i>-->
<!--				<span>拖拽游戏移入</span>-->
				<!--				<span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>-->
<!--			</el-button>-->
			<!--			<el-button-->
			<!--				type="primary"-->
			<!--				:class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"-->
			<!--				:disabled="leftChecked.length === 0"-->
			<!--				@click.native="addToRight"-->
			<!--			>-->
			<!--				<span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>-->
			<!--				<i class="el-icon-arrow-right"></i>-->
			<!--			</el-button>-->
		</div>
		<el-select
			v-model="queryData.supportTerminal"
			size="medium"
			placeholder="默认选择全部"
			clearable
			multiple
            class="game-choose"
		>
			<el-option
				v-for="item in terminalTypeArr"
				:key="item.code"
				:label="item.description"
				:value="item.code"
			></el-option>
		</el-select>
		<transfer-panel
			ref="rightPanel"
			v-bind="$props"
			:data="targetData"
			:title="titles[1]"
            :show="true"
			:default-checked="rightDefaultChecked"
			:placeholder="filterPlaceholder"
			@checked-change="onTargetCheckedChange"
		>
			<slot name="right-footer"></slot>
		</transfer-panel>
	</div>
</template>

<script>
import ElButton from 'element-ui/packages/button'
import Emitter from 'element-ui/src/mixins/emitter'
import Locale from 'element-ui/src/mixins/locale'
import TransferPanel from './transfer-panel.vue'
import Migrating from 'element-ui/src/mixins/migrating'

export default {
	name: 'Transfer',

	components: {
		TransferPanel,
		ElButton
	},

	mixins: [Emitter, Locale, Migrating],

	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		titles: {
			type: Array,
			default() {
				return []
			}
		},
		buttonTexts: {
			type: Array,
			default() {
				return []
			}
		},
		filterPlaceholder: {
			type: String,
			default: ''
		},
		filterMethod: Function,
		leftDefaultChecked: {
			type: Array,
			default() {
				return []
			}
		},
		rightDefaultChecked: {
			type: Array,
			default() {
				return []
			}
		},
		renderContent: Function,
		value: {
			type: Array,
			default() {
				return []
			}
		},
		format: {
			type: Object,
			default() {
				return {}
			}
		},
		filterable: Boolean,
		props: {
			type: Object,
			default() {
				return {
					label: 'label',
					key: 'key',
					disabled: 'disabled'
				}
			}
		},
		targetOrder: {
			type: String,
			default: 'original'
		}
	},

	data() {
		return {
			leftChecked: [],
			rightChecked: [],
			queryData: {
				supportTerminal: ''
			},
            terminalTypeArr: []
		}
	},

	computed: {
		dataObj() {
			const key = this.props.key
			return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
		},

		sourceData() {
			return this.data.filter(
				(item) => this.value.indexOf(item[this.props.key]) === -1
			)
		},

		targetData() {
			if (this.targetOrder === 'original') {
				return this.data.filter(
					(item) => this.value.indexOf(item[this.props.key]) > -1
				)
			} else {
				return this.value.reduce((arr, cur) => {
					const val = this.dataObj[cur]
					if (val) {
						arr.push(val)
					}
					return arr
				}, [])
			}
		},

		hasButtonTexts() {
			return this.buttonTexts.length === 2
		}
	},

	watch: {
		value(val) {
			this.dispatch('ElFormItem', 'el.form.change', val)
		}
	},

	methods: {
		getMigratingConfig() {
			return {
				props: {
					'footer-format': 'footer-format is renamed to format.'
				}
			}
		},

		onSourceCheckedChange(val, movedKeys) {
			this.leftChecked = val
			if (movedKeys === undefined) return
			this.$emit('left-check-change', val, movedKeys)
		},

		onTargetCheckedChange(val, movedKeys) {
			this.rightChecked = val
			if (movedKeys === undefined) return
			this.$emit('right-check-change', val, movedKeys)
		},

		addToLeft() {
			const currentValue = this.value.slice()
			this.rightChecked.forEach((item) => {
				const index = currentValue.indexOf(item)
				if (index > -1) {
					currentValue.splice(index, 1)
				}
			})
			this.$emit('input', currentValue)
			this.$emit('change', currentValue, 'left', this.rightChecked)
		},

		addToRight() {
			let currentValue = this.value.slice()
			const itemsToBeMoved = []
			const key = this.props.key
			this.data.forEach((item) => {
				const itemKey = item[key]
				if (
					this.leftChecked.indexOf(itemKey) > -1 &&
					this.value.indexOf(itemKey) === -1
				) {
					itemsToBeMoved.push(itemKey)
				}
			})
			currentValue =
				this.targetOrder === 'unshift'
					? itemsToBeMoved.concat(currentValue)
					: currentValue.concat(itemsToBeMoved)
			this.$emit('input', currentValue)
			this.$emit('change', currentValue, 'right', this.leftChecked)
		},

		clearQuery(which) {
			if (which === 'left') {
				this.$refs.leftPanel.query = ''
			} else if (which === 'right') {
				this.$refs.rightPanel.query = ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.el-transfer {
    position: relative;
    .clear-list {
        position: absolute;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        z-index: 10;
        top: 6px;
        left: 180px;
    }
    .game-choose {
        position: absolute;
        z-index: 10;
        top: 2px;
        right: 325px;
        width: 150px;
    }
}
</style>
