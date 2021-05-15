<template>
    <div class="game-container report-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="代理等级配置" name="agentLevelConfig">
                <agent-level-config v-if="isAgentLevelConfig" :agentDataList="agentDataList" />
            </el-tab-pane>
            <el-tab-pane label="反佣等级配置" name="backCommissionLevelConfig">
                <back-commission-level-config v-if="isBackCommissionLevelConfig" :backCommDataList="backCommDataList" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
import AgentLevelConfig from './components/agentLevelConfig'
import BackCommissionLevelConfig from './components/backCommissionLevelConfig'

const end = dayjs()
    .endOf('day')
    .valueOf()
const start = dayjs()
    .startOf('day')
    .valueOf()
export default {
    name: routerNames.levelWelfareConfig,
    components: {BackCommissionLevelConfig, AgentLevelConfig},
    mixins: [list],
    data() {
        return {
            activeName: 'agentLevelConfig',
            isAgentLevelConfig: true,
            isBackCommissionLevelConfig: false,
            isBackCommissionLevelConfigTest: false,
            formTime: {
                time: [start, end]
            },
            agentDataList: [],
            backCommDataList: [],
            title: ''
        }
    },
    computed: {
        accountType() {
            return this.globalDics.accountType
        },
        virtualType() {
            return this.globalDics.virtualType
        },
        virtualProtocolType() {
            return this.globalDics.virtualProtocolType
        },
        bindType() {
            return this.globalDics.bindType
        }
    },
    // 数据案例
    mounted() {
        for (let i = 0; i < 10; i++) {
            this.agentDataList[i] = {
                code: i,
                agentLevel: 'VIP1',
                activeCount: '≥100',
                addActiveCount: '≥11',
                levelWelfare: '佣金加赠2%，最高1888元',
                gameAmt: '188元',
                createUser: '鲁班七号',
                createTime: '2021-02-13 20:28:54',
                modifyUser: '安琪拉',
                modifyTime: '2021-05-13 20:28:54'
            }
        }
        for (let i = 0; i < 10; i++) {
            this.backCommDataList[i] = {
                code: i,
                commissionLevel: '第1级',
                totalProfit: '1~40000',
                activeCount: '≥11',
                commissionRate: '30%',
                createUser: '租个两',
                createTime: '2020-02-13 20:28:54',
                modifyUser: '后裔',
                modifyTime: '2020-08-13 20:28:54'
            }
        }
    },
    methods: {
        handleClick(tab) {
            if (tab.name === 'agentLevelConfig') {
                this.isAgentLevelConfig = true
                this.isBackCommissionLevelConfig = false
            } else if (tab.name === 'backCommissionLevelConfig') {
                this.isAgentLevelConfig = false
                this.isBackCommissionLevelConfig = true
            }
        },
        loadData() {
            const [startTime, endTime] = this.formTime.time || []
            let params = {
                ...this.queryData,
                createDtStart: startTime
                    ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
                    : '',
                createDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
            }
            if (!params.createDtStart || !params.createDtEnd) {
                // this.$message({
                //     message: '操作时间参数必传',
                //     type: 'info'
                // })
                return
            }
            params = {
                ...this.getParams(params)
            }
            this.loading = true

            this.$api
                .bankRecordListAPI(params)
                .then((res) => {
                    if (res.code === 200) {
                        const response = res.data
                        this.loading = false
                        this.dataList = response.record
                        this.total = response.totalRecord
                    } else {
                        this.loading = false
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
                .catch(() => {
                    this.loading = false
                })
        },
        openEdit(row) {
            this.$router.push({
                path: '/game/gameConfig/gameHomeRecommendEdit',
                query: { id: row.id, userId: row.userId }
            })
        },
        // 删除
        confined() {
            this.$confirm(
                `<strong>是否对子游戏进行删除操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即删除</span>`,
                '确认提示',
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    // this.getOneKeyWithdraw({ userId: this.parentData.userId }) // 一键下分
                })
                .catch(() => {})
        },
        changeTableSort({ column, prop, order }) {
            this.pageNum = 1
            const orderParams = this.checkOrderParams.get(prop)
            if (orderParams) {
                if (order === 'ascending') {
                    // 升序
                    this.queryData.orderType = 'asc'
                } else if (column.order === 'descending') {
                    // 降序
                    this.queryData.orderType = 'desc'
                }
                this.loadData()
            }
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
                virtualKind: [],
                virtualProtocol: []
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
