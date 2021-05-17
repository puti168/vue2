<template>
    <div class="game-container report-container">
        <div class="review-content">
            <div class="head">
                <span class="title">会员溢出审核详情</span>
                <div v-if="type" class="right-btn">
                    <el-button plain @click="goBack">取消</el-button>
                    <el-button type="success" @click="confirm(true)">一审通过</el-button>
                    <el-button type="danger" @click="confirm(false)">一审拒绝</el-button>
                </div>
                <div v-else class="right-btn">
                    <el-button plain @click="goBack">返回</el-button>
                </div>
            </div>
            <div class="main-content">
                <div class="review-content">
                    <p class="name">代理注册信息</p>
                    <div class="review-flex">
                        <div>注册时间: {{ list.registerTime }}</div>
                        <div>账号类型: {{ typeFilter(list.accountType, 'accountType') }}</div>
                        <div>上次登录时间: {{ list.lastLoginTime }}</div>
                        <div>注册端: {{ list.parentProxyName }}</div>
                    </div>
                </div>
                <div class="review-content">
                    <p class="name">代理账号信息</p>
                    <div class="review-flex">
                        <div>账号: {{ list.applyName }}</div>
                        <div>账号状态: {{ list.applyTime }}</div>
                        <div>风控层级: {{ list.applyInfo }}</div>
                        <div>代理标签: {{ list.applyInfo }}</div>
                    </div>
                    <div class="review-flex">
<!--                        <div>VIP等级: {{ typeFilter(list.vipDict, 'vipDict') }}</div>-->
                        <div>VIP等级: 112</div>
                        <div>备注信息: {{ list.remark }}</div>
                    </div>
                </div>

                <div class="review-content" style="height: 180px">
                    <p class="name">溢出会员信息</p>
                    <div class="review-flex">
                        <div>账号: {{ list.applyName }}</div>
                        <div>账号状态: {{ list.applyTime }}</div>
                        <div>风控层级: {{ list.applyInfo }}</div>
                        <div>代理标签: {{ list.applyInfo }}</div>
                    </div>
                    <div class="review-flex">
<!--                        <div>VIP等级: {{ typeFilter(list.vipDict, 'vipDict') }}</div>-->
                        <div>VIP等级: 12313</div>
                        <div>银行卡数量: 5</div>
                        <div>虚拟账号数量: 6</div>
                        <div>备注信息: {{ list.remark }}</div>
                    </div>
                    <div class="review-flex">
                        <div>注册时间: {{ list.registerTime }}</div>
                        <div>上次登录时间: {{ list.lastLoginTime }}</div>
                        <div>注册端: {{ list.parentProxyName }}</div>
                    </div>
                </div>

                <div class="review-content" style="height: 180px">
                    <p class="name">申请信息</p>
                    <div class="review-flex">
                        <div>溢出会员: {{ list.auditName }}</div>
                        <div>上级代理: {{ list.auditTime }}</div>
                        <div>推广链接: https://www.baidu.com</div>
                    </div>
                    <div class="review-flex">
                        <div>推广设备: {{ list.auditName }}</div>
                        <div>申请理由: 我的会员没有绑定成功</div>
                    </div>
                    <div class="review-flex">
                        <div>申请附图：
<!--                            <div style="display: flex;justify-content: center;">-->
<!--                                <el-image :src="list.images" fit="scale-down" lazy style="margin: 20px auto;">-->
<!--                                    <div slot="error" class="image-slot">-->
<!--                                        <i class="el-icon-picture-outline"></i>-->
<!--                                    </div>-->
<!--                                </el-image>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>

                <div class="review-content">
                    <p class="name">审核信息</p>
                    <div class="review-flex">
                        <div>一审人: {{ auditInfo.auditName }}</div>
                        <div>一审时间: {{ auditInfo.auditTime }}</div>
                        <div>一审备注: {{ auditInfo.auditRemark }}</div>
                        <div>一审状态: {{ auditInfo.auditRemark }}</div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="提交确认"
            center
            :visible.sync="visible"
            :before-close="closeFormDialog"
            width="610px"
        >
            <el-form ref="form" label-width="100px">
                <el-form-item label="提交审核信息">
                    <el-input
                        v-model="remark"
                        clearable
                        type="textarea"
                        :max="50"
                        :autosize="{ minRows: 4, maxRows: 4 }"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="auditOne">
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
// import dayjs from 'dayjs'
export default {
    name: routerNames.addMemberReview,
    components: {},
    mixins: [list],
    data() {
        return {
            list: {},
            visible: false,
            remark: '',
            action: false,
            // 审核 true 仅返回 false
            type: true
        }
    },
    computed: {},
    created() {
        if (this.$route.name === 'addMemberReview') {
            this.getInfo()
            this.type = this.$route.query.type
        }
    },
    mounted() {},
    methods: {
        closeFormDialog() {
            this.visible = false
        },
        confirm(action) {
            this.remark = ''
            this.action = action
            this.visible = true
        },
        auditOne() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            const params = {
                id: this.$route.query.id,
                userId: this.$route.query.userId,
                remark: this.remark,
                auditStatus: this.action ? 2 : 3
            }

            this.$api
                .updateMemberAuditRecord(params)
                .then((res) => {
                    loading.close()
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                        this.visible = false
                        this.goBack()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
                .catch(() => {
                    loading.close()
                })
        },
        goBack() {
            this.$router.go(-1)
        },
        getInfo() {
            const params = {
                id: this.$route.query.id
            }
            this.$api.memberAuditDetail(params).then((res) => {
                if (res.code === 200) {
                    const response = res.data
                    this.loading = false
                    this.list = response
                } else {
                    this.loading = false
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background:#EFEFEF'
            } else {
                return ''
            }
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
.review-content {
    width: 100%;
    .head {
        height: 70px;
        line-height: 70px;
        width: 100%;
        background: #000;
        border-radius: 2px;
        padding: 0 30px;
        .title {
            font-weight: 600;
            color: rgb(192, 190, 190);
        }
        .right-btn {
            float: right;
        }
    }
    .main-content {
        .review-content {
            height: 150px;
            border: 1px solid rgba(192, 190, 190, 0.5);
            border-top: 0px;
            padding: 30px;
            .name {
                font-weight: 600;
            }
            .review-flex {
                position: relative;
                width: 100%;
                margin-top: 15px;
                div {
                    display: inline-block;
                    width: 24%;
                }
            }
        }
        .more-height {
            height: 200px;
        }
    }
}
</style>
