<template>
    <agentEditFrom v-if="edit" @back="back" />
    <div v-else class="view-container dealer-container">
        <div class="content">
            <el-table
                v-loading="loading"
                border
                size="mini"
                class="small-size-table"
                :data="agentDataList"
                style="width: 100%"
                :header-cell-style="getRowClass"
                @sort-change="changeTableSort"
            >
                <el-table-column
                    prop="code"
                    align="center"
                    label="序号"
                ></el-table-column>
                <el-table-column
                    prop="agentLevel"
                    align="center"
                    label="代理等级"
                ></el-table-column>
                <el-table-column
                    prop="activeCount"
                    align="center"
                    label="本月活跃人数"
                ></el-table-column>
                <el-table-column
                    prop="addActiveCount"
                    align="center"
                    label="本月增加激活人数"
                ></el-table-column>
                <el-table-column
                    prop="levelWelfare"
                    align="center"
                    label="等级福利"
                ></el-table-column>
                <el-table-column
                    prop="gameAmt"
                    align="center"
                    label="游戏彩金"
                ></el-table-column>
                <el-table-column
                    prop="createUser"
                    align="center"
                    label="创建人"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    align="center"
                    label="创建时间"
                    sortable="custom"
                ></el-table-column>
                <el-table-column
                    prop="modifyUser"
                    align="center"
                    label="最近操作人"
                ></el-table-column>
                <el-table-column
                    prop="modifyTime"
                    align="center"
                    label="最近操作时间"
                    sortable="custom"
                ></el-table-column>
                <el-table-column
                    prop="operating"
                    align="center"
                    label="操作"
                    width="240px"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            :disabled="loading"
                            size="medium"
                            @click="openEdit(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            :disabled="loading"
                            type="danger"
                            size="medium"
                            class="noicon"
                            @click="confined"
                        >
                            删除
                        </el-button>
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
</template>

<script>

import list from '@/mixins/list'
import dayjs from 'dayjs'
import agentEditFrom from './agentEditForm'

export default {
    components: {agentEditFrom},
    mixins: [list],
    props: {agentDataList: { type: Array, default: () => []}},
    data() {
        return {
            total: 50,
            loading: false,
            pageNum: 10,
            pageSize: 10,
            pageSizes: [10, 20, 50],
            layout: 'total, sizes, prev, pager, next, jumper',
            defaultTime: ['00:00:00', '23:59:59'],
            sortable: true,
            edit: false
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        loadData() {
            const [startTime, endTime] = []
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
        openEdit(val) {
            debugger
            this.edit = true
        },
        back() {
            this.edit = false
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
            this.loadData()
        },
        handleCurrentChange() {
            this.loadData()
        }
    }
}
</script>

<style scoped>

</style>
