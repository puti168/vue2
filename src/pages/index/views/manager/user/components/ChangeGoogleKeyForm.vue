<template>
  <a-modal
    class="bd-merchant"
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    v-bind="footer"
    @ok="handleOk('addForm')"
    @cancel="handleCancel('addForm')"
    destroyOnClose
  >
    <a-spin :spinning="bodyLoading">
      <a-row type="flex" justify="center" :gutter="[12, 12]">
        <a-col :span="10">
          <a-row>
            <img :src="googleKeyUrl" style="width: 200px; height: 200px" alt="" referrerpolicy="no-referrer" />
          </a-row>
          <a-row>
            <span>{{ googleKey }}</span>
            <span style="color: #18addc; cursor: pointer" v-clipboard:copy="googleKey" v-clipboard:success="onCopy"
              >&nbsp;复制</span
            >
          </a-row>
        </a-col>
        <a-col :span="10">
          <a-row style="color: #f08080">温馨提示：</a-row>
          <a-row>1.使用google authenticator扫描左图二维码或者输入谷歌秘钥</a-row>
          <a-row>2.下方输入谷歌双重身份验证口令</a-row>
          <a-row>3.请保存谷歌秘钥，它将用于恢复你的谷歌验证器</a-row>
        </a-col>
        <a-col :span="20">
          <a-form-model ref="addForm" :model="formData" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-form-model-item
              label="google验证器"
              :rules="{
                required: true,
                min: 2,
                message: 'google验证码不能为空',
              }"
              prop="code"
            >
              <a-input v-model="formData.code" :maxLength="6" placeholder="请输入google验证码" />
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import { FormModalMixin } from '@/core/mixins'
import { getGooglePath, setUpdateGoogle } from '@/api/user'

export default {
  name: 'AddFormModal',
  mixins: [FormModalMixin],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      googleKeyUrl: '',
      googleKey: '',
    }
  },
  methods: {
    request({ code }) {
      return setUpdateGoogle({ adminId: this.formData.adminId, secret: this.googleKey, code })
    },
    onCopy(e) {
      this.$message.success('内容已复制到剪切板')
    },
    setGooglePic(adminName) {
      getGooglePath({ adminName }).then(this.$handleResponse((data) => {
        this.bodyLoading = false
        this.googleKey = data.secret
        this.googleKeyUrl = data.url
      }))
    },
  },
  mounted() {
    this.bodyLoading = true
    this.setGooglePic(this.formData.adminName)
  },
  computed: {
    title() {
      if (this.formData.uniteMerName) {
        return `绑定google验证器 -- ${this.formData.uniteMerName}`
      }
      return '绑定google验证器'
    },
  },
}
</script>

<style lang="less" scoped>
.bd-merchant-noinput {
  margin-bottom: 0px;
}
</style>
