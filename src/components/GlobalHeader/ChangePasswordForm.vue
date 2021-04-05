<template>
  <a-modal
    class="bd-merchant"
    title="修改密码"
    :width="500"
    :visible="visible"
    :confirmLoading="loading"
    v-bind="footer"
    @ok="handleOk('editForm')"
    @cancel="handleCancel('editForm')"
    destroyOnClose
  >
    <a-spin :spinning="loading">
      <a-form-model ref="editForm" :model="formData" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row
          ><a-col :span="24">
            <a-form-model-item
              label="输入旧密码"
              prop="oldPwd"
              :rules="{
                required: true,
                validator: validatePwd,
              }"
            >
              <a-input-password v-model="formData.oldPwd" autocomplete="off" placeholder="请输入当前的登陆密码" />
            </a-form-model-item> </a-col
        ></a-row>
        <a-row
          ><a-col :span="24">
            <a-form-model-item
              label="输入新密码"
              prop="newPwd"
              :rules="{
                required: true,
                validator: validatePwd,
              }"
            >
              <a-input-password v-model="formData.newPwd" autocomplete="off" placeholder="请输入新的登陆密码" />
            </a-form-model-item> </a-col
        ></a-row>
        <a-row
          ><a-col :span="24">
            <a-form-model-item
              label="确认新密码"
              prop="confirmNewPwd"
              :rules="{
                required: true,
                validator: validateConfirmPwd,
              }"
            >
              <a-input-password
                v-model="formData.confirmNewPwd"
                autocomplete="off"
                placeholder="请再次输入新的登陆密码"
              />
            </a-form-model-item> </a-col
        ></a-row>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { FormModalMixin } from '@/core/mixins'
import { changePassword } from '@/api/login'
import md5 from 'md5'

export default {
  name: 'ChangePasswordFormModal',
  mixins: [FormModalMixin],
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
  },
  methods: {
    request({ oldPwd, newPwd }) {
      return changePassword({ oldPwd: md5(oldPwd), newPwd: md5(newPwd) })
    },
    validatePwd(rule, value, callback) {
      if (!value) {
        callback('密码为6-12个字符')
        return
      }
      if (value.length < 6 || value.length > 12) {
        callback('密码为6-12个字符')
        return
      }
      if (value.indexOf(' ') > -1) {
        callback('密码不能包含空格')
      }
      callback()
    },
    validateConfirmPwd(rule, value, callback) {
      if (!value) {
        callback('密码为6-12个字符')
        return
      }
      if (value.length < 6 || value.length > 12) {
        callback('密码为6-12个字符')
        return
      }
      if (value != this.formData.newPwd) {
        callback('确认密码与新密码不一致')
        return
      }
      if (value.indexOf(' ') > -1) {
        callback('密码不能包含空格')
      }
      callback()
    },
    resetData(isOk) {
      if (!isOk) {
        return
      }
      return this.$store.dispatch('Logout').then(() => {
        window.location = `/login.html?redirect=${window.location.pathname}${window.location.search}${window.location.hash}`
      })
    },
  },
}
</script>

<style lang="less" scoped>
.bd-merchant-noinput {
  margin-bottom: 0px;
}
</style>
