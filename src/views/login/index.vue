<template>
    <div class="login-container">
        <div class="bg-login"></div>
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
            <div class="login-content">
                <div class="title-container">
                    <svg-icon icon-class="bg-login" class="login_logo" />
                    <h3 class="title">
                        {{ $t('login.title') }}
                    </h3>
                </div>
                <el-form-item prop="username">
					<span class="svg-container">
						<svg-icon icon-class="user" class="svg-active" />
					</span>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        :placeholder="$t('login.username')"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="off"
                    />
                </el-form-item>

                <el-form-item prop="password">
					<span class="svg-container">
						<svg-icon icon-class="password" class="svg-active" />
					</span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        :placeholder="$t('login.password')"
                        name="password"
                        tabindex="2"
                        auto-complete="off"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
						<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
					</span>
                </el-form-item>
                <el-form-item prop="googleAuth">
					<span class="svg-container">
						<svg-icon icon-class="security" class="svg-active" />
					</span>
                    <el-input
                        ref="security"
                        v-model="loginForm.googleAuth"
                        placeholder="请输入谷歌验证码"
                        name="googleAuth"
                        type="text"
                        tabindex="3"
                        @keyup.enter.native="handleLogin"
                    />
                </el-form-item>

                <div class="login-btn" @click.prevent="handleLogin">{{ $t('login.logIn') }}</div>

                <!-- 后端还没做翻译，暂时隐藏
                <div class="switch-language flex-bc">
                    <a :class="{ aActive: language === 'zh' }" @click.prevent="handleSetLanguage('zh')">简体中文</a>
                    <a :class="{ aActive: language === 'tw' }" @click.prevent="handleSetLanguage('tw')">繁體中文</a>
                    <a :class="{ aActive: language === 'en' }" @click.prevent="handleSetLanguage('en')">English</a>
                </div>-->
            </div>
        </el-form>
        <div class="bottom-tips">Copyright &copy; OBQJ, All Rights Reserved <br />助力打造最强现金网</div>
        <div class="version">version: {{ version }}</div>
    </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import {Message} from 'element-ui'
import Cookies from 'js-cookie'

const devLoginForm = {
    username: 'admin',
    password: '123456',
    googleAuth: ''
}

export default {
    name: 'Login',
    data() {
        return {
            loginForm: this.env === 'dev' ? devLoginForm : {},
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            baseUrl: process.env.VUE_APP_BASE_API,
            timestamp: +new Date(),
            version: ''
        }
    },
    computed: {
        language() {
            return this.$store.getters.language
        },
        loginRules() {
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('login.less6Password')))
                } else {
                    callback()
                }
            }
            return {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: this.$t('login.username')
                    }
                ],
                password: [
                    {required: true, message: this.$t('login.password')},
                    {
                        trigger: 'blur',
                        validator: validatePassword
                    }
                ],
                kaptcha: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: this.$t('login.codeVerify')
                    }
                ]
            }
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    mounted() {
        const VERSION = Cookies.get('version') || ''
        this.version = VERSION
    },
    methods: {
        // 兼容ie input 失去 再 聚焦 光标从头开始
        fixInput(obj) {
            const nodes = obj.$el.childNodes[1]
            nodes.focus() // 解决ff不获取焦点无法定位问题
            if (window.getSelection) {
                // ie11 10 9 ff safari
                var max_Len = nodes.value.length // text字符数
                nodes.setSelectionRange(max_Len, max_Len)
            } else if (document.selection) {
                // ie10 9 8 7 6 5
                var range = nodes.createTextRange() // 创建range
                range.collapse(false) // 光标移至最后
                range.select() // 避免产生空格
            }
        },
        handleSetLanguage(lang) {
            Message.closeAll()
            let actMessage
            switch (lang) {
                case 'zh':
                    actMessage = '切换语言成功'
                    break
                case 'tw':
                    actMessage = '切換語言成功'
                    break
                default:
                    actMessage = 'Switch Language Success'
            }
            this.$i18n.locale = lang
            this.$store.dispatch('app/setLanguage', lang)
            this.$message({
                message: actMessage,
                type: 'success'
            })
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.fixInput(this.$refs.password)
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({path: this.redirect || '/'})
                            this.loading = false
                        })
                        .catch(() => {
                            this.timestamp = +new Date()
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #999;
$bgc: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    min-height: 100%;
    width: 100%;
    //background-color: $bgc;
    overflow: hidden;
    //background: url('../../assets/img/bg.jpg') no-repeat;
    background-size: cover;
    // background-position: fixed; /* Internet Explorer 7/8 */
    .login-form {
        position: relative;
        width: 500px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .logo {
        text-align: center;
        margin-bottom: 19px;
    }

    .bg-login {
        position: absolute;
        width: 100%;
        max-width: 100%;
        height: 220px;
        margin: 0 auto;
        top: 287px;
        background: url('../../assets/img/bg-login.jpg') no-repeat;
        background-size: cover;
    }

    .login-content {
        padding: 8% 12% 500px 12%;
        height: 490px;
        background-size: cover;
        background-color: #FFFFFF;
        border-radius: 5px;
        border: 0.5px solid #ccc;
        box-shadow: 0 0 10px rgba(25, 81, 134, 0.35);
        z-index: 10;
    }

    h3 {
        margin: 0 0 32px 0;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #fff;
    }

    .el-input {
        display: inline-block;
        height: 47px;
        width: 75%;
        min-width: 100px;
        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: #999;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
                box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        box-sizing: border-box;
        width: auto;
        height: 50px;
        margin: 0 auto;
        margin-bottom: 25px;
        //background-color: #2e3949;
        color: #999;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .el-form-item:focus-within .svg-active {
        color: #0b7dfa;
    }

    .el-form-item:focus-within .el-form-item__error {
        display: none;
    }

    .el-form-item:focus-within {
        border: 1px solid #0b7dfa;
        border-radius: 5px;
    }

    .login-btn {
        background-color: rgba(0, 121, 254, 1);
        height: 51px;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 20px;
        color: #fff;
        line-height: 51px;
        margin-bottom: 50px;
    }

    .login-btn:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .aActive {
        color: #fff !important;
    }

    .switch-language a {
        margin-top: 46px;
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #8a90a5;
    }

    .svg-container {
        padding: 3px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 35px;
        display: inline-block;
        font-size: 18px;
    }

    .title-container {
        position: relative;
        text-align: center;
        .login_logo {
            width: 80px;
            height: 80px;
            margin: 0 auto;
            vertical-align: center;
        }

        .title {
            font-family: 'Microsoft Yahei';
            font-weight: normal;
            font-size: 26px;
            color: $light_gray;
            margin: 0 auto 40px auto;
            text-align: center;
            color: #0079FE;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .kaptcha {
        height: 50px;
        border-radius: 10px;
    }

    .version {
        position: fixed;
        right: 10px;
        bottom: 10px;
        color: #fff;
    }

    .bottom-tips {
        position: fixed;
        bottom: 30px;
        text-align: center;
        left: 50%;
        font-size: 12px;
        color: #ccc;
        transform: translate(-50%, 0);
    }
}
</style>
