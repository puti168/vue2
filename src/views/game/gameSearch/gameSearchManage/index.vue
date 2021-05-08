<template>
    <div class="game-container report-container gameSearch-container">
        <div class="gameSearch-content">
            <div class="form-header">
                <span>游戏搜索管理</span>
                <span>
					<el-button type="success">保存</el-button>
				</span>
            </div>
            <div class="content-part2">
                <p>配置信息</p>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="历史游戏上限:">
                        <el-input
                            v-model="form.username"
                            size="medium"
                            minlength="4"
                            maxlength="11"
                            oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="热门搜索上限:">
                        <el-input
                            v-model="form.username"
                            size="medium"
                            minlength="4"
                            maxlength="11"
                            oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
                            placeholder="请输入"
                            clearable
                            style="width: 365px"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import { notSpecial2, isHaveEmoji } from '@/utils/validate'
import { MOBILE_PATTERN, EMAIL_PATTERN } from '@/utils/pattern'
export default {
    name: routerNames.addMember,
    mixins: [list],
    data() {
        return {
            loading: false,
            form: {
                accountType: '4',
                username: '',
                password: '',
                mobile: '',
                parentProxyName: '',
                gender: '2',
                vipExperenceValue: '',
                email: '',
                realName: '',
                applyInfo: ''
            }
        }
    },
    computed: {
        accountTypeArr() {
            return [...this.globalDics.accountType]
        },
        genderType() {
            return [...this.globalDics.genderType].reverse()
        },
        rules() {
            const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
            const reg2 = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/

            const testUserName = (rule, value, callback) => {
                const isSpecial = !notSpecial2(String(value))
                const isRmoji = isHaveEmoji(String(value))
                if (isSpecial) {
                    callback(new Error('不支持空格及特殊字符'))
                } else if (isRmoji) {
                    callback(new Error('不支持表情'))
                } else if (!reg1.test(value)) {
                    callback(new Error('请输入4-11位，最少2个字母+数字组合，首位字母'))
                } else {
                    callback()
                }
            }

            const testPassword = (rule, value, callback) => {
                const isSpecial = !notSpecial2(String(value))
                const isRmoji = isHaveEmoji(String(value))
                if (isSpecial) {
                    callback(new Error('不支持空格及特殊字符'))
                } else if (isRmoji) {
                    callback(new Error('不支持表情'))
                } else if (!reg2.test(value)) {
                    callback(new Error('请输入8-12位，字母+数字组合'))
                } else {
                    callback()
                }
            }

            const testMobile = (rule, value, callback) => {
                if (!!value && !MOBILE_PATTERN.test(value)) {
                    callback(new Error('请输入有效的手机号码'))
                } else {
                    callback()
                }
            }

            const testEmail = (rule, value, callback) => {
                if (!!value && !EMAIL_PATTERN.test(value)) {
                    callback(new Error('请输入正确的邮箱'))
                } else {
                    callback()
                }
            }

            return {
                accountType: [
                    { required: true, message: '请选择账号类型', trigger: 'change' }
                ],
                username: [
                    {
                        required: true,
                        validator: testUserName,
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: testPassword,
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: false,
                        validator: testMobile,
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: false,
                        validator: testEmail,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted() {},
    methods: {
        add() {
            this.loading = true
            const params = {
                ...this.form
            }
            console.log(params)
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
                accountType: '4',
                username: '',
                password: '',
                mobile: '',
                parentProxyName: '',
                gender: '2',
                vipExperenceValue: '',
                email: '',
                realName: '',
                applyInfo: ''
            }
        },
        checkValue(val) {}
    }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
    text-align: center;
    color: #909399;
    font-weight: 700;
}
.gameSearch-container {
    background-color: #f5f5f5;
    margin: 0;
    min-height: calc(100vh - 105px);
    .gameSearch-content {
        width: 70%;
        margin: 0 auto;
        background-color: #fff;
        position: relative;
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
        .form-header:after{
            content: '.';
            height: 0;
            display: table;
            clear: both;
        }
        .content-part2 {

        }
    }
    .addMember-content::after {
        position: absolute;
        top: 45px;
        content: '';
        width: 100%;
        background-color: rgba(233, 233, 233, 1);
        height: 1px;
    }
}
</style>
