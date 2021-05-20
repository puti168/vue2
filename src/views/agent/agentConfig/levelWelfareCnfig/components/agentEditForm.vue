<template>
    <div class="game-container report-container editPicturePage-container">
        <div class="editPicturePage-content">
            <div class="form-header">
                <span>创建/编辑</span>
                <span>
					<el-button type="info" @click="back">取消</el-button>
					<el-button type="success">保存</el-button>
				</span>
            </div>
            <div class="content-part2">
                <el-form
                    ref="form"
                    :model="queryData"
                    :rules="rules"
                    label-width="180px"
                    class="agent-form"
                >
                    <el-form-item label="代理等级:" prop="agentLeve">
                        <el-input
                            v-model="queryData.agentLeve"
                            size="medium"
                            maxlength="50"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="本月活跃人数≥:" prop="activeCount">
                        <el-input
                            v-model="queryData.activeCount"
                            size="medium"
                            maxlength="50"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="新增活跃人数≥:" prop="addActiveCount">
                        <el-input
                            v-model="queryData.addActiveCount"
                            size="medium"
                            maxlength="50"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="额外赠佣佣金比例%:" prop="extraGiftCommissionRate">
                        <el-input
                            v-model="queryData.extraGiftCommissionRate"
                            size="medium"
                            maxlength="50"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="赠佣上限:" prop="giftCommissionLimit">
                        <el-input
                            v-model="queryData.giftCommissionLimit"
                            size="medium"
                            maxlength="50"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="赠送彩金:" prop="giftAmt">
                        <el-input
                            v-model="queryData.giftAmt"
                            size="medium"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import list from '@/mixins/list'
// import Sortable from 'sortablejs'
// import Transfer from '@/components/transfer'

export default {
    name: 'EditPage',
    mixins: [list],
    data() {
        return {
            loading: false,
            queryData: {
                agentLeve: undefined,
                activeCount: undefined,
                addActiveCount: undefined,
                extraGiftCommissionRate: undefined,
                giftCommissionLimit: undefined,
                giftAmt: undefined
            },
            dataList: []
        }
    },
    computed: {
        terminalTypeArr() {
            return [...this.globalDics.terminalnType]
        },
        gameDisplayArr() {
            return [...this.globalDics.gameDisplayType]
        },
        imageSize() {
            return {
                width: 1920,
                height: 400
            }
        },
        imgTip() {
            return this.queryData.imgUrl ? '' : '请上传图片！'
        },
        rules() {
            return {
                agentLeve: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                activeCount: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                addActiveCount: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                giftCommissionLimit: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                extraGiftCommissionRate: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                giftAmt: [
                    { required: true, message: '请输入', trigger: 'change' }
                ]
            }
        }
    },
    mounted() {
        document.body.ondrop = function(event) {
            event.preventDefault()
            event.stopPropagation()
        }

        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 16 && e.shiftKey) {
                this.shiftKey = true
            }
        })
        window.addEventListener('keyup', (e) => {
            this.shiftKey = false
        })
    },
    updated() {},
    methods: {
        back() {
            this.$emit('back')
        },
        add() {
            this.loading = true
            const params = {
                ...this.form
            }
            this.$refs['form'].validate((valid) => {
                console.log('valid', valid)
                if (valid) {
                    this.$api
                        .addMemberAPI(params)
                        .then((res) => {
                            this.loading = false
                            const { code, data, msg } = res
                            if (code === 200) {
                                this.$confirm(`会员${data}资料提交成功`, {
                                    confirmButtonText: '确定',
                                    type: 'success',
                                    showCancelButton: false
                                })
                                this.reset()
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
                }
            })

            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        reset() {
            this.$refs['form'].resetFields()
            this.form = {
                historyGameLimit: undefined,
                hotSearch: undefined
            }
        },
        checkValue(val) {},
        addRow() {
            const lastRow = this.dataList[this.dataList.length - 1]
            const new_row = lastRow.id + 1
            this.dataList.push({ id: new_row })
        },
        deleteRow(val) {
            this.$confirm('确定删除此游戏吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // const loading = this.$loading({
                    // 	lock: true,
                    // 	text: 'Loading',
                    // 	spinner: 'el-icon-loading',
                    // 	background: 'rgba(0, 0, 0, 0.7)'
                    // })
                    // this.$api
                    // 	.setDeleteRole('', val.id)
                    // 	.then((res) => {
                    // 		loading.close()
                    // 		this.$message({
                    // 			type: 'success',
                    // 			message: '删除成功!'
                    // 		})
                    // 		this.loadData()
                    // 	})
                    // 	.catch(() => {
                    // 		loading.close()
                    // 	})
                })
                .catch(() => {})
        },
        handleStartUpload() {
            this.$message.info('图片开始上传')
        },
        handleUploadSucess({ index, file, id }) {
            this.form.imgUrl = file.imgUrl
        },
        handleUploadDefeat() {
            this.form.imgUrl = ''
            this.$message.error('图片上传失败')
        },
        handleDeleteUpload() {
            this.form.imgUrl = ''
            this.$message.warning('图片已被移除')
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
/deep/ .el-button--info {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
    background-color: #eeeded;
}
.editPicturePage-container {
    background-color: #f5f5f5;
    margin: 0;
    min-height: calc(100vh - 105px);
    .editPicturePage-content {
        width: 50%;
        margin: 0 auto;
        background-color: #fff;
        position: relative;
        padding-bottom: 30px;
        .form-header {
            height: 55px;
            line-height: 55px;
            width: 100%;
            background-color: rgba(0, 0, 0, 1);
            span:nth-child(1) {
                position: absolute;
                left: 30px;
                top: 0;
                color: rgba(255, 255, 255, 0.847058823529412);
                font-size: 16px;
                font-weight: 700;
            }
            span:nth-child(2) {
                position: absolute;
                right: 30px;
                top: 0;
                color: #999;
                font-weight: 400;
                font-size: 14px;
            }
        }
        .form-header:after {
            content: '.';
            height: 0;
            display: table;
            clear: both;
        }
        .content-part2 {
            width: 100%;
            padding: 25px 35px 20px;
            position: relative;
            margin: 0 auto;
            .agent-form {
                position: relative;
                width: 800px;
                max-width: 100%;
                padding: 35px 35px 0;
                margin: 0 auto;
                overflow: hidden;
                .el-form-item{
                    .el-form-item_label{
                        width: 150px;
                    }
                }
            }
        }
    }
}
</style>
