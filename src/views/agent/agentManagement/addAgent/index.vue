<template>
    <div class="game-container report-container addAgent-container">
        <div class="line-member"></div>
        <div class="addAgent-content">
            <div class="form-header">
                <span>新增代理资料</span>
                <span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="代理类型:" prop="accountType">
                    <el-select
                        v-model="form.accountType"
                        size="medium"
                        placeholder="全部"
                        clearable
                        style="width: 365px"
                    >
                        <el-option
                            v-for="item in accountTypeArr"
                            :key="item.code"
                            :label="item.description"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理账号:" prop="userName">
                    <el-input
                        v-model="form.userName"
                        size="medium"
                        maxlength="11"
                        placeholder="4-11位，最少2个字母+数字组合，首位字母"
                        clearable
                        style="width: 365px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="登录密码:" prop="password">
                    <el-input
                        v-model="form.password"
                        size="medium"
                        placeholder="8-12位，字母+数字组合"
                        clearable
                        oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
                        maxlength="12"
                        style="width: 365px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="审核信息:">
                    <el-input
                        v-model="form.applyInfo"
                        size="medium"
                        type="textarea"
                        placeholder="请输入"
                        clearable
                        maxlength="50"
                        style="width: 365px"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        :disabled="loading"
                        size="medium"
                        @click="add"
                    >
                        提交
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
    </div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import { notSpecial2, isHaveEmoji } from '@/utils/validate'
export default {
    name: routerNames.addAgent,
    mixins: [list],
    data() {
        return {
            loading: false,
            form: {
                accountType: '2',
                userName: '',
                password: '',
                applyInfo: ''
            }
        }
    },
    computed: {
        accountTypeArr() {
            return this.globalDics.accountType
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

            return {
                accountType: [
                    { required: true, message: '请选择账号类型', trigger: 'change' }
                ],
                userName: [
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
            let lock = true
            this.$refs['form'].validate((valid) => {
                if (valid && lock) {
                    lock = false
                    this.$api
                        .addAgentAPI(params)
                        .then((res) => {
                            this.loading = false
                            lock = true
                            const { code, data, msg } = res
                            if (code === 200) {
                                this.$confirm(`代理${data}资料提交成功`, {
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
                            lock = true
                        })
                }
            })

            setTimeout(() => {
                this.loading = false
                lock = true
            }, 1000)
        },
        reset() {
            this.$refs['form'].resetFields()
            this.form = {
                accountType: '2',
                userName: '',
                password: '',
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
.addAgent-container {
    background-color: #f5f5f5;
    margin: 0;
    min-height: calc(100vh - 105px);
    .line-member {
        height: 50px;
    }
    .addAgent-content {
        width: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        position: relative;
        padding-top: 65px;
        padding-bottom: 65px;
        .form-header {
            height: 45px;
            line-height: 45px;
            span:nth-child(1) {
                position: absolute;
                left: 30px;
                top: 0;
                color: #666;
                font-size: 14px;
                font-weight: 700;
            }
            span:nth-child(2) {
                position: absolute;
                right: 30px;
                color: #999;
                font-weight: 400;
                font-size: 14px;
                top: 0;
            }
        }
    }
    .addAgent-content::after {
        position: absolute;
        top: 45px;
        content: '';
        width: 100%;
        background-color: rgba(233, 233, 233, 1);
        height: 1px;
    }
}
</style>
