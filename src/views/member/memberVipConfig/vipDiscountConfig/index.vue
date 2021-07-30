<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="dataList"
					style="width: 100%"
					:header-cell-style="_getRowClass"
				>
					<el-table-column
						align="center"
						label="vip等级"
						prop="vipSerialNum"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.vipSerialNum">
								{{ scope.row.vipSerialNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="lowestTransferQuota"
						align="center"
						label="最低转账额度"
					>
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.lowestTransferQuota"
									size="medium"
                                    :max="9999999999"
                                    :precision="0"
                                    :min="0"
									placeholder="请输入"
									style="width: 180px"
									@blur="checkTransferValue(scope.row, 'lowestTransferQuota')"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="bonusRatio" align="center" label="红利比例">
                        <template slot="header" slot-scope="scope">
                            <el-popover placement="top-start" title="提示" width="280" trigger="hover">
                                <div v-if="!scope.row">
                                    <div>转账额度*红利比例=最终红利金额</div>
                                </div>
                                <div slot="reference" class="el-icon-question">
                                    <span class="other-class">红利比例</span>
                                </div>
                            </el-popover>
                        </template>
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model.number="scope.row.bonusRatio"
									size="medium"
									maxlength="5"
                                    :max="100"
                                    :precision="0"
                                    :min="0"
									placeholder="请输入"
									style="width: 180px"
                                    @blur="checkTransferValue(scope.row, 'bonusRatio')"
								></el-input-number>
							</span>
							<span>%</span>
						</template>
					</el-table-column>
					<el-table-column prop="highestBonus" align="center" label="最高奖金">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.highestBonus"
									size="medium"
                                    :max="9999999999"
                                    :precision="0"
                                    :min="0"
									placeholder="请输入"
									style="width: 180px"
                                    @blur="checkTransferValue(scope.row, 'highestBonus')"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="waterMultiple" align="center" label="流水倍数">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.waterMultiple"
									size="medium"
                                    :max="9999999999"
                                    :precision="0"
                                    :min="0"
									placeholder="请输入"
									style="width: 180px"
                                    @blur="checkTransferValue(scope.row, 'waterMultiple')"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="participateNum" align="center" label="参与次数">
						<template slot-scope="scope">
							<span>
								<el-select
									v-model="scope.row.participateNum"
									placeholder="请选择"
                                    style="width: 200px"
								>
									<el-option
										v-for="item in participateTypeArr"
										:key="item.code"
										:label="item.description"
										:value="item.code * 1"
									></el-option>
								</el-select>
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="参与场馆" width="300">
						<template slot-scope="scope">
							<span>
								<el-select
									v-model="scope.row.participateVenue"
									multiple
									placeholder="请选择"
									value-key="id"
                                    collapse-tags
								>
									<el-option
										v-for="item in gameVenueList"
										:key="item.id"
										:label="item.gameName"
										:value="item.id"
									></el-option>
								</el-select>
							</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn_footer">
				<el-button
                    v-if="hasPermission('248')"
					type="primary"
					icon="el-icon-search"
					size="medium"
					:disabled="loadingT"
					style="padding: 0 8px"
					@click="saveData()"
				>
					保存
				</el-button>
				<el-button
					icon="el-icon-refresh-left"
					size="medium"
					style="padding: 0 8px"
					@click="resetData()"
				>
					恢复上次配置
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.vipDiscountConfig,
	components: {},
	mixins: [list],
	data() {
        this.saveData = this.throttle(this.saveData, 1000)
		return {
			dataList: [],
			gameVenueList: [],
			loadingT: false
		}
	},
	computed: {
		participateTypeArr() {
			return this.globalDics.participateType
		}
	},
	created() {
		this.getMemberVipMerchantGame()
	},
	mounted() {},
	methods: {
		_getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF; height: 50px; font-size: 14px; font-weight: 650; color: rgba(0, 0, 0, 0.847058823529412)'
			} else {
				return ''
			}
		},
        checkTransferValue(row, type) {
            if (!row[type]) {
                row[type] = 0
            }
        },
		loadData() {
			this.loading = true
			this.$api
				.memberVipPromotionListAPI()
				.then((res) => {
					this.loading = false
					const { code, data, msg } = res
					if (code === 200) {
						const arr =
							data.length &&
							data.map((item) => {
								const num = {}
								item.participateVenue
									? (num.participateVenue = item.participateVenue.split(','))
									: (num.participateVenue = [])
								return Object.assign(item, num)
							})
						this.dataList = arr || []
						this.dataList.reverse()
						console.log('ww', arr)
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		// 获取商户场馆
		getMemberVipMerchantGame() {
			this.$api.memberVipMerchantGameAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.gameVenueList = data || []
				}
			})
		},
		saveData() {
			this.loadingT = true
			const memberVipPromotionParams =
				this.dataList.map((item) => {
					return {
						id: item.id,
						bonusRatio: item.bonusRatio,
						highestBonus: item.highestBonus,
						lowestTransferQuota: item.lowestTransferQuota,
						participateNum: item.participateNum,
						participateVenue: item.participateVenue.join(','),
						vipSerialNum: item.vipSerialNum,
						waterMultiple: item.waterMultiple
					}
				}) || []
			this.$api
				.memberVipPromotionUpdateAPI(memberVipPromotionParams)
				.then((res) => {
					this.loadingT = false
					const { code, msg } = res
					if (code === 200) {
						this.$message({
							message: '保存成功',
							type: 'success'
						})
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}

					this.loadData()
				})
				.catch(() => {
					this.loadingT = false
				})
		},
		resetData() {}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}

/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}
.btn_footer {
	text-align: center;
	margin-top: 50px;
}
.other-class {
    color: rgba(0, 0, 0, 0.847058823529412);
    font-weight: 700;
}
/deep/ .el-icon-question:after {
    content: '\E7A4';
    font-size: 25px;
}
/deep/ .el-icon-question::before {
    content: '';
}
</style>
