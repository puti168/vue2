<template>
<div>
      <a-row>
        <a-col :span="22" :offset="1"><login-form @register="handleRegister" @login="handleLogin"/></a-col>
      </a-row>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="22" :offset="1"><tip /></a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row v-if="userInfo.username" type="flex" justify="space-around" align="middle">
        <a-col :span="22" :offset="1"><account-panel :user-info="userInfo" /></a-col>
      </a-row>
</div>
</template>

<script>
import { LoginForm, AccountPanel, Tip } from '@/components'

export default {
  components: { LoginForm, AccountPanel, Tip },
  data() {
    return {
      userInfo: {
        username: '',
      },
    }
  },
  methods: {
    handleRegister(data) {
      this.userInfo = data
    },
    handleLogin(data) {
      this.userInfo = data
    },
  },
}
</script>
<style lang="less" scoped>
</style>
