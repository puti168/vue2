<template>
  <div class="navbar">
    <svg-icon icon-class="left-logo" class="left-logo" />
    <span class="left-title">OB旗舰中控管理</span>
    <template v-for="(item, index) in routes">
      <div
        v-if="item.show"
        :key="index"
        class="navbar-title"
        :class="item.checked ? 'active' : ''"
        @click="go(item)"
      >
        {{ item.name }}
      </div>
    </template>
    <div class="right-menu flex">
      <div class="avatar-wrapper flex flex-cc">
        <svg-icon icon-class="user" class="user-avatar" />
        <div class="name flex-cc">{{ name }}</div>
      </div>
      <div class="login-out" @click="loginOut"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNickName } from '@/utils/auth'
import { formatCurrency } from '@/utils'
export default {
  components: {},
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'routes', 'userInfo']),
    myavatar() {
      return this.avatar || require('@/assets/img/avatar.png')
    },
    env() {
      return process.env.NODE_ENV === 'development'
    }
  },
  mounted() {
    this.name = getNickName()
  },
  methods: {
    formatCurrency,
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async go(item) {
      await this.$store.dispatch('permission/setNowroute', item.id)
      item.checked = !item.checked
    },
    async loginOut() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('permission/clearRoutes')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  color: #fff;
  background: rgba(38, 156, 255, 1);
  .active {
    border-bottom: 5px solid #fff;
    text-shadow: #fff 0px 0px 10px;
  }
  .navbar-title {
    width: 80px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    display: inline-block;
    font-weight: 700;
  }
  .left-logo {
    color: #fff;
    margin-left: 20px;
    display: inline-block;
    font-weight: 700;
    width: 40px;
    height: 40px;
  }
  .left-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 70px;
    margin-right: 40px;
  }
  .right-menu {
    margin-right: 15px;
    float: right;
    height: 100%;
    line-height: 70px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-wrapper {
      margin-right: 15px;
      padding-right: 15px;
      position: relative;
      position: relative;

      .user-avatar {
        margin-top: 15px;
        margin-right: 10px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        font-size: 40px;
        border-radius: 50%;
      }

      .name {
        font-size: 14px;
        color: #fff;
      }
    }
    .login-out {
      margin-top: 20px;
      width: 40px;
      height: 30px;
      display: inline-block;
      background: url("../../assets/img/bb_bt_logout.png") no-repeat;
      cursor: pointer;
    }
    .login-out:active {
      background: url("../../assets/img/bb_bt_logout_pre.png") no-repeat;
    }
  }
}
</style>