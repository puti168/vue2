<template>
  <div>
    <video class="bd-login-video" autoplay preload="preload" muted loop>
      <source src="~@/assets/video/mv.mp4" type="video/mp4" />
    </video>
    <div class="bd-login-container">
      <div class="bd-login-box">
        <h1 class="title"><img class="logo" src="~@/assets/logo.svg" />商户管理后台</h1>
        <a-form-model ref="loginForm" class="bd-login-form" :model="loginForm" @submit="doLogin">
          <a-form-model-item
            prop="merchantCode"
            :rules="[
              {
                required: true,
                min: 2,
                max: 6,
                message: '商户简码为2~6个字符',
              },
              { pattern: /^[A-Za-z0-9]+$/, message: '商户简码由数字与字母组成' },
            ]"
          >
            <a-input v-model="loginForm.merchantCode" placeholder="请输入商户简码，2~6个字符">
              <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            prop="username"
            :rules="[
              {
                required: true,
                min: 6,
                max: 10,
                message: '用户名为6~12个字符',
              },
              { pattern: /^[A-Za-z0-9]+$/, message: '用户名由数字与字母组成' },
            ]"
          >
            <a-input v-model="loginForm.username" placeholder="请输入用户名，6-12个字符">
              <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            prop="password"
            :rules="{
              required: true,
              min: 6,
              max: 12,
              message: '密码为6~12个字符',
            }"
          >
            <a-input-password v-model="loginForm.password" type="password" placeholder="请输入密码，6-12个字符">
              <a-icon type="lock" slot="prefix" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item
            prop="captcha"
            :rules="{
              required: true,
              message: '请输入验证码',
            }"
          >
            <a-input v-model="loginForm.captcha" placeholder="请输入验证码">
              <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" class="btn" htmlType="submit" :loading="loading">登录</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  data() {
    return {
      loading: false,
      loginForm: {
        merchantCode: '',
        username: '',
        password: '',
        captcha: '',
      },
    }
  },
  beforeCreate() {
    storage.remove(ACCESS_TOKEN)
  },
  methods: {
    ...mapActions(['Login']),
    doLogin(e) {
      e.preventDefault()
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true
        const { password, ...rest } = this.loginForm
        this.Login({
          ...rest,
          password: md5(password),
        }).then(
          this.$handleResponse(
            () => {
              window.location = 'index.html'
            },
            () => (this.loading = false)
          )
        )
      })
    },
  },
}
</script>
<style lang="less" scoped>
.bd-login-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
}
.bd-login-box {
  width: 300px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(50vh - 250px);
}
.bd-login-form /deep/ .ant-input-affix-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 18px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: start;
}
.bd-login-form /deep/ .ant-input-affix-wrapper .ant-input-prefix {
  left: 12px;
}
.bd-login-form /deep/ .ant-input-affix-wrapper .ant-input-prefix,
.ant-input-affix-wrapper .ant-input-suffix {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  line-height: 0;
  transform: translateY(-50%);
}
.bd-login-form /deep/ .ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 48px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
}
。bd-login-box {
  color: #ffffff;
}
.bd-login-box .logo {
  height: 50px;
}
.bd-login-box .btn {
  width: 100%;
  font-size: 18px;
  height: 50px;
  border-radius: 6px;
}
.bd-login-box .title {
  text-align: center;
  color: #ffffff;
}
.bd-login-box .tip {
  color: #ffffff;
  text-align: left;
}
.bd-login-box .link {
  padding: 0;
  text-align: left;
  color: rgba(0, 255, 255, 0.9);
}
</style>