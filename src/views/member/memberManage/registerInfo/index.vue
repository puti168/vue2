<template>
    <div class="game-container report-container">
        <div class="view-container dealer-container">
            <div class="params">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="注册时间:">
                        <el-date-picker
                            v-model="form.registerTime"
                            prop="registerTime"
                            size="medium"
                            :picker-options="pickerOptions"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            clearable
                            value-format="timestamp"
                            style="width: 382px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="账号类型:">
                        <el-select
                            v-model="form.userType"
                            size="medium"
                            placeholder="全部"
                            clearable
                            style="width: 150px"
                        >
                            <el-option label="全部" value></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员账号:">
                        <el-input
                            v-model="form.userName"
                            prop="userName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="会员姓名:">
                        <el-input
                            v-model="form.nickName"
                            prop="nickName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上级代理:">
                        <el-input
                            v-model="form.supAgent"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="注册手机号:">
                        <el-input
                            v-model="form.phone"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="注册IP:">
                        <el-input
                            v-model="form.IP"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="IP归属地:">
                        <el-input
                            v-model="form.registration"
                            size="medium"
                            placeholder="请输入"
                            clearable
                            style="width: 150px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="注册终端:">
                        <el-select
                            v-model="form.terminal"
                            size="medium"
                            placeholder="全部"
                            clearable
                            style="width: 150px"
                        >
                            <el-option label="全部" value></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            :disabled="loading"
                            size="medium"
                            @click="query"
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

            <div class="content">
                <el-table
                    v-loading="loading"
                    border
                    size="mini"
                    class="small-size-table"
                    :data="dataList"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                >
                    <el-table-column
                        prop="registerDt"
                        align="center"
                        label="注册时间"
                        sortable="custom"
                    ></el-table-column>
                    <el-table-column
                        prop="userType"
                        align="center"
                        label="账号类型"
                        sortable="custom"
                    ></el-table-column>
                    <el-table-column
                        prop="username"
                        align="center"
                        label="会员账号"
                    ></el-table-column>
                    <el-table-column
                        prop="agentSup"
                        align="center"
                        label="上级代理"
                    ></el-table-column>
                    <el-table-column prop="phone" align="center" label="注册手机号">
                        <!--						<template slot="header">-->
                        <!--							<span>注册手机号</span>-->
                        <!--							<i class="el-icon-view"></i>-->
                        <!--						</template>-->
                    </el-table-column>
                    <el-table-column
                        prop="IP"
                        align="center"
                        label="注册IP"
                    ></el-table-column>
                    <el-table-column
                        prop="registration"
                        align="center"
                        label="IP归属地"
                    ></el-table-column>
                    <el-table-column
                        prop="titleId"
                        align="center"
                        label="注册终端"
                        :filters="filterStatus"
                        :filter-multiple="false"
                        :column-key="'type'"
                    ></el-table-column>
                    <el-table-column
                        prop="terminal"
                        align="center"
                        label="终端设备号"
                    ></el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    v-show="!!dataList.length"
                    :current-page.sync="pageNum"
                    layout="total, sizes,prev, pager, next, jumper"
                    :page-size="pageSize"
                    :page-sizes="$store.getters.pageSizes"
                    :total="total"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                ></el-pagination>
                <!--				<el-dialog-->
                <!--					:title="moduleBox"-->
                <!--					center-->
                <!--					:visible.sync="editVisible"-->
                <!--					:before-close="closeFormDialog"-->
                <!--					width="410px"-->
                <!--				>-->
                <!--					<editForm v-if="moduleBox == '新增银行信息'" ref="addForm"></editForm>-->
                <!--					<editForm-->
                <!--						v-else-->
                <!--						ref="editForm"-->
                <!--						:editFormData="editFormData"-->
                <!--					></editForm>-->
                <!--					<div slot="footer" class="dialog-footer">-->
                <!--						<el-button @click="editVisible = false">取 消</el-button>-->
                <!--						<el-button-->
                <!--							v-if="moduleBox == '新增银行信息'"-->
                <!--							type="primary"-->
                <!--							@click="submitAdd"-->
                <!--						>-->
                <!--							确 定-->
                <!--						</el-button>-->
                <!--						<el-button v-else type="primary" @click="submitEdit">-->
                <!--							确 定-->
                <!--						</el-button>-->
                <!--					</div>-->
                <!--				</el-dialog>-->
            </div>
        </div>
    </div>
</template>

<script>
import list from '@/mixins/list'
// import editForm from './components/editForm'
// import { UTable } from 'umy-ui'
export default {
    name: '',
    // components: {
    // 	editForm
    // },
    mixins: [list],
    data() {
        return {
            queryData: {},
            form: {
                registerTime: [],
                userName: '',
                nickName: '',
                levelDays: '',
                vipRank: '',
                userType: '',
                userLabel: '',
                terminal: '',
                supAgent: '',
                lastBetTime: '',
                wallet: ''
            },
            dataList: [],
            total: 0,
            moduleBox: '',
            showForm: '',
            editVisible: false,
            filterStatus: [
                { text: '一级', value: '一级' },
                { text: '二级', value: '二级' }
            ],
            editFormData: {}
        }
    },
    computed: {},
    created() {
        // this.loadData()
    },
    mounted() {},
    methods: {
        loadData(params) {
            params = {
                ...this.getParams(params)
            }
            this.dataList = []
            this.$api.memberRegisterInfoListAPI(params).then((res) => {
                const {
                    code,
                    data: { record, totalRecord },
                    msg
                } = res
                if (code === 200) {
                    this.loading = false
                    this.dataList = record || []
                    this.total = totalRecord || 0
                } else {
                    this.loading = false
                    this.$message({
                        message: msg,
                        type: 'error'
                    })
                }
            })
        },
        query() {
            this.loading = true
            // const { registerTime, lastLoginTime, firstSaveTime } = this.form
            // const [registerStartTime, registerEndTime] = registerTime
            const params = {
                ...this.queryData,
                pageNum: 1
                // startTime: registerStartTime && registerStartTime + '',
                // endTime: registerEndTime && registerEndTime + ''
            }
            console.log(params)
            this.loadData(params)
        },
        reset() {
            this.queryData = {}
            this.$refs['form'].resetFields()
            // this.loadData()
        },

        add() {
            this.moduleBox = '新增银行信息'
            this.editVisible = true
        },
        submitAdd() {
            console.log(this.$refs.addForm)
            //   setAddBank(this.queryData).then((res) => {
            //     console.log(res);
            //   });
        },
        deleteUp(val) {
            console.log(val)
            this.$confirm('确定删除此银行卡号吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    // setDeleteBank(val).then((res) => {
                    //   console.log(res);
                    // });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        editUp(val) {
            this.moduleBox = '修改银行信息'
            this.editVisible = true
            this.editFormData = val
        },
        submitEdit() {
            // setEidteBank().then((res) => {
            //   console.log(res);
            // });
        },
        handleCurrentChange() {
            this.loadData()
        },
        closeFormDialog() {
            this.editVisible = false
        },
        enterSubmit() {
            // this.query()
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
