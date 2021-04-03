<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="changePassword" @click="handleChangePassword">
          <a-icon type="desktop" />
          修改密码
      <change-password-form
        ref="changePasswordModal"
        :visible.sync="editForm.visible"
        :loading="editForm.loading"
        :formData="editForm.data"
        :type="editForm.type"
      />
        </a-menu-item>
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import ChangePasswordForm from './ChangePasswordForm'

export default {
  name: 'AvatarDropdown',
  components: { ChangePasswordForm },
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      editForm: { data: {}, visible: false, type: 'edit', loading: false },
    }
  },
  methods: {
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            window.location = 'login.html'
          })
        },
        onCancel () {}
      })
    },
    handleChangePassword(e){
      this.editForm = {
        data: { oldPwd: '', newPwd: '', confirmNewPwd:'' },
        visible: true,
        type: 'edit',
        loading: false,
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
