<template>
    <div class="game-container report-container">
        <template v-if="!showDetail">
            <div class="params">
                <el-form ref="form" :inline="true" :model="queryData">
                    <el-form-item label="提款时间:">
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
                            :default-time="defaultTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单号:">
                        <el-input
                            v-model="queryData.auditNum"
                            clearable
                            size="medium"
                            :maxlength="19"
                            style="width: 180px"
                            placeholder="请输入"
                            @keyup.enter.native="enterSearch"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="会员账号:">
                        <el-input
                            v-model="queryData.userName"
                            clearable
                            size="medium"
                            :maxlength="11"
                            style="width: 180px"
                            placeholder="请输入"
                            @keyup.enter.native="enterSearch"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态:">
                        <el-select
                            v-model="queryData.lockOrder"
                            style="width: 180px"
                            :popper-append-to-body="false"
                        >
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item in lockOrderType"
                                :key="item.code"
                                :label="item.description"
                                :value="Number(item.code)"
                            ></el-option>
                        </el-select>
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
                </el-form>
            </div>
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
                        <el-table-column
                            prop="auditStep"
                            align="center"
                            label="操作"
                            width="100"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    class="look"
                                    size="medium"
                                    @click="goDetail(scope.row)"
                                >
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="auditNum"
                            align="center"
                            label="订单号"
                        ></el-table-column>
                        <el-table-column
                            prop="applyName"
                            align="center"
                            label="会员账号"
                        ></el-table-column>
                        <el-table-column
                            prop="applyName"
                            align="center"
                            label="会员姓名"
                        ></el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="订单状态"
                        ></el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="申请类型"
                        ></el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="增加金额"
                        ></el-table-column>
                        <el-table-column
                            prop="applyTime"
                            align="center"
                            label="申请时间"
                        ></el-table-column>
                        <el-table-column
                            prop="applyTime"
                            align="center"
                            label="审核人"
                        ></el-table-column>
                        <el-table-column
                            prop="applyTime"
                            align="center"
                            label="审核时间"
                        ></el-table-column>
                        <el-table-column
                            prop="applyTime"
                            align="center"
                            label="审核用时"
                        ></el-table-column>
                        <el-table-column
                            prop="remark"
                            align="center"
                            label="备注"
                        ></el-table-column>
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
        </template>
        <detail v-else :type="type" :rowData="rowData" @goBack="goBack"></detail>
    </div>
</template>

<script>
import list from '@/mixins/list'
import detail from './components/detail'
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
import { routerNames } from '@/utils/consts'
const end = dayjs()
    .endOf('day')
    .valueOf()
const start = dayjs()
    .startOf('day')
    .valueOf()

export default {
    name: routerNames.memberTopUpReviewRecord,
    components: { detail },
    mixins: [list],
    data() {
        return {
            queryData: {
                auditStatusList: [],
                auditStep: '',
                userName: '',
                lockOrder: '',
                applyName: '',
                auditName: '',
                auditNum: '',
                orderProperties: '',
                orderType: ''
            },
            type: true,
            showDetail: false,
            formTime: {
                time: [start, end],
                time2: []
            },
            rowData: {},
            name: '',
            dataList: []
        }
    },
    computed: {
        accountType() {
            return this.globalDics.accountType
        },
        auditStatus() {
            return this.globalDics.auditStatusType
        },
        auditStepType() {
            return this.globalDics.auditStepType
        },
        lockOrderType() {
            return this.globalDics.lockOrderType
        },
        applyType() {
            return this.globalDics.applyType
        }
    },
    mounted() {
        this.name = getUsername()
    },
    methods: {
        loadData() {
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
            this.$api
                .proxyList(params)
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
        goDetail(row) {
            this.type = Number(row.auditStep) === 1 && row.auditName === this.name
            this.rowData = row
            this.showDetail = true
        },
        goBack() {
            this.showDetail = false
            this.loadData()
        },
        reset() {
            this.queryData = {
                auditStatusList: [],
                auditStep: '',
                lockOrder: '',
                applyName: '',
                auditName: '',
                auditNum: '',
                orderProperties: '',
                orderType: ''
            }
            this.formTime = {
                time: [start, end],
                time2: []
            }
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
/deep/ .caret-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.data-refresh {
    margin-top: 0;
    padding-bottom: 20px;
}
.look {
    //background-color: #00BFBF;
    //border-color: #00BFBF;
    color: #00bfbf;
}
</style>
