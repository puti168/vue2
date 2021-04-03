<template>
  <a-form-model ref="loginForm" layout="inline" class="bd-login" :model="loginForm">
    <a-form-model-item label="会员号" v-if="username" style="float: left">
      {{ username }}
    </a-form-model-item>
    <div style="float: right">
      <a-form-model-item
        v-if="!isLogined"
        prop="username"
        :rules="{
          required: true,
          min: 6,
          max: 12,
          message: '用户名为6~12个字符',
        }"
      >
        <a-input v-model="loginForm.username" class="bd-login-input" placeholder="请输入用户名，6-12个字符">
          <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        v-if="!isLogined"
        prop="password"
        :rules="{
          required: true,
          min: 6,
          max: 12,
          message: '密码为6~12个字符',
        }"
      >
        <a-input-password
          v-model="loginForm.password"
          class="bd-login-input"
          type="password"
          placeholder="请输入正确密码，6-12个字符"
        />
      </a-form-model-item>
      <a-form-model-item
        v-if="isRegister"
        prop="confirmPassword"
        :rules="{
          required: true,
          min: 6,
          max: 12,
          message: '密码为6~12个字符',
        }"
      >
        <a-input-password
          v-model="loginForm.confirmPassword"
          class="bd-login-input"
          type="password"
          placeholder="请再次输入密码，6-12个字符"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="link" v-if="isLogined" @click="toLogin"> 登陆 </a-button>
        <a-button type="primary" v-if="isLogin" @click="doLogin">登陆</a-button>
        <a-button type="link" v-if="!isRegister" @click="toRegister"> 注册 </a-button>
        <a-button type="primary" v-if="isRegister" @click="doRegister"> 注册 </a-button>
        <a-button type="link" v-if="isRegister" @click="toLogin"> 登陆 </a-button>
      </a-form-model-item>
    </div>
  </a-form-model>
</template>
<script>
import { login, register } from '@/api/user'
export default {
  name: 'LoginForm',
  data() {
    return {
      type: 1, //1：登陆 2注册  3已登陆
      username: '',
      loginForm: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    doLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if(!valid){
          return
        }
        const { confirmPassword, ...rest } = this.loginForm
        login(rest).then(
          this.$handleResponse((data) => {
            this.$emit('login', data)
            this.username = this.loginForm.username
            this.type = 3
            this.$message.success('登录成功')
          })
        )
      })
    },
    toLogin() {
      this.type = 1
    },
    toRegister() {
      this.type = 2
    },
    doRegister() {
      this.$refs['loginForm'].validate((valid) => {
        if(!valid){
          return
        }
        register(this.loginForm).then(
          this.$handleResponse((data) => {
            this.$emit('register', data)
            this.username = this.loginForm.username
            this.type = 3
            this.$message.success('注册成功')
          })
        )
      })
    },
  },
  computed: {
    isLogin() {
      return this.type == 1
    },
    isRegister() {
      return this.type == 2
    },
    isLogined() {
      return this.type == 3
    },
  },
}
</script>
<style lang="less" scoped>
.bd-login-input {
  width: 230px;
}
</style>