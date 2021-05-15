<template>
    <overflow-review-detail v-if="isDetails" @back="back" />
    <div v-else class="game-container report-container">
        <!-- 查询参数       -->
        <div class="params">
            <el-form ref="form" :inline="true" :model="queryData">
                <el-form-item label="申请时间:">
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
                <el-form-item label="一审完成时间:">
                    <el-date-picker
                        v-model="formTime.time2"
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
                <el-form-item label="代理账号:">
                    <el-input
                        v-model="queryData.userName"
                        clearable
                        size="medium"
                        :max="1"
                        style="width: 180px"
                        placeholder="请输入"
                        @keyup.enter.native="enterSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="审核单号:">
                    <el-input
                        v-model="queryData.auditNum"
                        clearable
                        size="medium"
                        :max="19"
                        style="width: 300px"
                        placeholder="请输入"
                        @keyup.enter.native="enterSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="审核操作:">
                    <el-select
                        v-model="queryData.auditStep"
                        style="width: 180px"
                        :popper-append-to-body="false"
                    >
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="item in auditStepType"
                            :key="item.code"
                            :label="item.description"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态:">
                    <el-select
                        v-model="queryData.auditStatus"
                        style="width: 180px"
                        multiple
                        placeholder="默认选择全部"
                        :popper-append-to-body="false"
                    >
                        <el-option
                            v-for="item in auditStatus"
                            :key="item.code"
                            :label="item.description"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请人:">
                    <el-input
                        v-model="queryData.applyName"
                        clearable
                        size="medium"
                        :max="12"
                        style="width: 180px"
                        placeholder="请输入"
                        @keyup.enter.native="enterSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="一审人:">
                    <el-input
                        v-model="queryData.auditName"
                        clearable
                        size="medium"
                        :max="12"
                        style="width: 180px"
                        placeholder="请输入"
                        @keyup.enter.native="enterSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="锁单状态:">
                    <el-select
                        v-model="queryData.lockOrder"
                        style="width: 180px"
                        :popper-append-to-body="false"
                    >
                        <el-option label="全部" value></el-option>
                        <el-option
                            v-for="item in lockOrderType"
                            :key="item.code"
                            :label="item.description"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理类型:">
                    <el-select
                        v-model="queryData.agentType"
                        style="width: 180px"
                        :popper-append-to-body="false"
                    >
                        <el-option label="全部" value></el-option>
                        <el-option
                            v-for="item in agentType"
                            :key="item.code"
                            :label="item.description"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="溢出账号:">
                    <el-input
                        v-model="queryData.overflowNum"
                        clearable
                        size="medium"
                        :max="19"
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
                <p class="danger data-refresh">数据更新时间： {{ now }}</p>
            </el-form>
        </div>
        <!--  数据列表      -->
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
                    @sort-change="changeTableSort"
                >
                    <el-table-column align="center" label="锁单" width="60">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-if="
									Number(scope.row.auditStep) === 1 &&
										(scope.row.auditName === name || !scope.row.auditName)
								"
                                v-model="scope.row.lockStatus"
                                @change="lockChange(scope.row)"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="auditStep"
                        align="center"
                        label="操作"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <el-button
                                :class="
									Number(scope.row.auditStep) === 1 &&
									scope.row.auditName !== name
										? 'dis'
										: ''
								"
                                :type="
									Number(scope.row.auditStep) === 0 ? 'success' : 'primary'
								"
                                size="medium"
                                @click="openDetails(scope.row)"
                            >
                                {{ typeFilter(scope.row.auditStep, 'auditStepType') }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="auditNum"
                        align="center"
                        label="审核单号"
                        width="170px"
                    ></el-table-column>
                    <el-table-column align="center" label="操作类型">
                        <template slot="header">
                            <p style="font-weight: 600">申请代理</p>
                            <p style="font-weight: 600">代理类型</p>
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.applyAgent ? scope.row.applyAgent : '-' }}
                            <Copy :title="scope.row.modifyBy" :copy="copy" />
                            <p>{{ typeFilter(scope.row.agentType, 'agentType') }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作类型">
                        <template slot="header">
                            <p style="font-weight: 600">溢出账号</p>
                            <p style="font-weight: 600">账号类型</p>
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.overflowAccount ? scope.row.overflowAccount : '-' }}
                            <Copy :title="scope.row.modifyBy" :copy="copy" />
                            <p>{{ typeFilter(scope.row.accountType, 'accountType') }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="applyTime"
                        align="center"
                        sortable="custom"
                        width="160"
                        label="申请时间"
                    ></el-table-column>
                    <el-table-column
                        prop="applyInfo"
                        align="center"
                        label="申请信息"
                    ></el-table-column>
                    <el-table-column align="center" label="审核状态" width="100">
                        <template slot-scope="scope">
							<span
                                v-if="Number(auditStatus) !== 0"
                                :class="
									Number(scope.row.auditStatus) === 1
										? 'infoState'
										: Number(scope.row.auditStatus) === 2
										? 'successState'
										: 'dangerState'
								"
                            >
								{{ typeFilter(scope.row.auditStatus, 'auditStatusType') }}
							</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="auditTime"
                        align="center"
                        sortable="custom"
                        width="200px"
                    >
                        <template slot="header">
							<span>
								一审审核人
								<br />
								一审完成时间
							</span>
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.auditName ? scope.row.auditName : '-' }}
                            <p>{{ scope.row.auditTime ? scope.row.auditTime : '-' }}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    :current-page.sync="pageNum"
                    class="pageValue"
                    background
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
import { getUsername } from '@/utils/auth'
import OverflowReviewDetail from '@/views/agent/agencyReview/overflowReview/components/overflowReviewDetail'
const end = dayjs()
    .endOf('day')
    .valueOf()
const start = dayjs()
    .startOf('day')
    .valueOf()
export default {
    components: {OverflowReviewDetail},
    mixins: [list],
    data() {
        return {
            // 查询表单数据
            queryData: {
                auditAction: [],
                applyType: [],
                // // 溢出账户
                overflowAccount: '',
                accountType: [],
                auditStep: '',
                applyName: '',
                lockOrder: '',
                auditNum: '',
                overflowNum: '',
                agentType: '',
                applyAgent: '',
                orderKey: '',
                auditStatus: [],
                auditName: '',
                auditTime: ''
            },
            now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            formTime: {
                time: [start, end],
                time2: []
            },
            name: '',
            dataList: [],
            isDetails: false
        }
    },
    computed: {
        accountType() {
            const at = this.globalDics.accountType
            if (at != null) {
                return at
            }
            return [{}]
        },
        auditAction() {
            return this.globalDics.auditAction
        },
        auditStatus() {
            return this.globalDics.auditStatus
        },
        auditStepType() {
            return this.globalDics.auditStepType
        },
        lockOrderType() {
            return this.globalDics.lockOrderType
        },
        agentType() {
            return this.globalDics.agentType
        }
    },
    mounted() {
        this.name = getUsername()
        this.addDataList()
    },
    methods: {
        openDetails(val) {
            this.isDetails = true
        },
        back() {
            this.isDetails = false
        },
        // 初始化数据
        addDataList() {
            debugger
            const qw = this.agentType
            console.log(qw)
            for (let i = 0; i < 10; i++) {
                this.dataList[i] = {
                    lockStatus: i % 2 === 0,
                    auditStep: i,
                    auditNum: 'CH20210404102929888' + i,
                    applyAgent: 'shenQing11123',
                    // agentType: this.agentType[0],
                    agentType: '正式',
                    overflowAccount: 'daXia11123',
                    // accountType: this.accountType[0],
                    accountType: '测试',
                    applyTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    applyInfo: '请尽快通过',
                    // auditStatus: this.auditStatus[0],
                    auditStatus: '审核通过',
                    auditName: '鲁班',
                    auditTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }
            }
            debugger
            console.log(this.dataList)
        },
        loadInitData() {
            this.loading = true
            const [startTime, endTime] = this.formTime.time || []
            const [startTime2, endTime2] = this.formTime.time2 || []
            let params = {
                ...this.queryData,
                applyTimeStart: startTime
                    ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
                    : '',
                applyTimeEnd: endTime
                    ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
                    : '',
                auditTimeStart: startTime2
                    ? dayjs(startTime2).format('YYYY-MM-DD HH:mm:ss')
                    : '',
                auditTimeEnd: endTime2
                    ? dayjs(endTime2).format('YYYY-MM-DD HH:mm:ss')
                    : ''
            }
            params = {
                ...this.getParams(params)
            }
            this.$api.memberChange(params).then((res) => {
                if (res.code === 200) {
                    this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
                    const response = res.data
                    this.loading = false
                    this.dataList = response.record
                    if (this.dataList) {
                        this.dataList.forEach((item) => {
                            if (Number(item.lockOrder) === 1) {
                                item.lockStatus = true
                            } else {
                                item.lockStatus = false
                            }
                        })
                    }
                    this.total = response.totalRecord
                } else {
                    this.loading = false
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.loading = false
            })
        },
        goDetail(row) {
            // const type = Number(row.auditStep) === 1 && row.auditName === this.name
            // this.$store.dispatch('tagsView/delView', {
            //     name: routerNames.memberChangeReview
            // })
            // this.$nextTick(() => {
            //     this.$router.push({
            //         path: '/member/memberReview/memberChangeReview',
            //         query: { id: row.id, userId: row.userId, type: type }
            //     })
            // })
            this.isDetails = true
        },
        reset() {
            this.queryData = {
                userName: '',
                accountType: [],
                applyType: [],
                auditStatus: [],
                applyName: '',
                auditName: '',
                lockOrder: '',
                auditNum: '',
                orderType: '',
                orderKey: ''
            }
            this.formTime = {
                time: [start, end],
                time2: []
            }
            this.loadData()
        },
        changeTableSort({ column, prop, order }) {
            this.pageNum = 1
            if (prop === 'applyTime') {
                this.queryData.orderKey = 1
            } else {
                this.queryData.orderKey = 2
            }
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
        lockChange(val) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.$api
                .lock({ id: val.id, lockFlag: Number(val.lockOrder) === 0 ? 0 : 1 })
                .then((res) => {
                    if (res.code === 200) {
                        loading.close()
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                        this.loadData()
                    } else {
                        loading.close()
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(() => {
                loading.close()
            })
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
/deep/ .caret-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.data-refresh {
    margin-top: 0;
    padding-bottom: 20px;
}
</style>
