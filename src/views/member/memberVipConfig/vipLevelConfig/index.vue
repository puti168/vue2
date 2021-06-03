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
                        prop="vipLevel"
                        width="120"
                    ></el-table-column>
                    <el-table-column prop="minTransfer" align="center" label="日提款次数">
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model="scope.row.minTransfer"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    style="width: 180px"
                                    @blur="
										checkTransferValue(
											$event,
											scope.row.minTransfer,
											scope.$index,
											scope
										)
									"
                                ></el-input-number>
							</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dividends"
                        align="center"
                        label="每日累计提款额度"
                    >
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model.number="scope.row.dividends"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    style="width: 180px"
                                ></el-input-number>
							</span>
                            <span>%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="turnover" align="center" label="升级礼金">
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model="scope.row.bonus"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    :precision="0"
                                    style="width: 180px"
                                ></el-input-number>
							</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="turnover" align="center" label="生日礼金">
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model="scope.row.turnover"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    style="width: 180px"
                                ></el-input-number>
							</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="times" align="center" label="上半月红包">
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model="scope.row.turnover"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    style="width: 180px"
                                ></el-input-number>
							</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="下半月红包" width="300">
                        <template slot-scope="scope">
							<span>
								<el-input-number
                                    v-model="scope.row.turnover"
                                    size="medium"
                                    maxlength="20"
                                    placeholder="请输入"
                                    clearable
                                    style="width: 180px"
                                ></el-input-number>
							</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="btn_footer">
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="medium"
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
        return {
            dataList: [
                {
                    vipLevel: 'VIP0',
                    minTransfer: '500',
                    dividends: '30%',
                    bonus: '500',
                    turnover: '500',
                    times: 1,
                    venue: []
                },
                {
                    vipLevel: 'VIP1',
                    minTransfer: '600',
                    dividends: '35%',
                    bonus: '600',
                    turnover: '600',
                    times: 2,
                    venue: []
                },
                {
                    vipLevel: 'VIP2',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP3',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP4',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP5',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP6',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP7',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP8',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP9',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                },
                {
                    vipLevel: 'VIP10',
                    minTransfer: '700',
                    dividends: '40%',
                    bonus: '700',
                    turnover: '700',
                    times: 3,
                    venue: []
                }
            ]
        }
    },
    computed: {},
    mounted() {},
    methods: {
        _getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background:#EFEFEF; height: 50px; font-size: 14px; font-weight: 650; color: rgba(0, 0, 0, 0.847058823529412)'
            } else {
                return ''
            }
        },
        checkTransferValue(val, val1, index, scope) {
            console.log('val', val)
            console.log('val1', val1)
            console.log('index', index)
            console.log('scope', scope)
        },
        saveData() {},
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
</style>
