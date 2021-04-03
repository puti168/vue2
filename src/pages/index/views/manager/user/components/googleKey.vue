<template>
  <div>
    <a-spin :spinning="googleData.googleKeyUrl == ''">
      <a-row type="flex" justify="center">
        <a-col :span="10">
          <a-row>
            <img
              :src="googleData.googleKeyUrl"
              style="width: 200px; height: 200px"
              alt=""
              referrerpolicy="no-referrer"
            />
          </a-row>
          <a-row>
            <span>{{ googleData.googleKey }}</span>
            <span
              style="color: #18addc; cursor: pointer"
              v-clipboard:copy="googleData.googleKey"
              v-clipboard:success="onCopy"
              >复制</span
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
          <a-form :form="formGoole" @submit="googleOk">
            <a-form-item label="Google验证器">
              <a-input
                :maxLength="6"
                placeholder="请输入google验证码"
                v-decorator="[
                  'google',
                  {
                    rules: [{ required: true, message: 'Google验证码不能为空' }, { validator: handleGoogle }],
                    validateTrigger: 'blur',
                  },
                ]"
              />
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
import { setCheckQuery, setNewAddUser } from '@/api/user'
export default {
  props: {
    adminName: { type: String },
    googleData: { type: Object },
    addData: {
      type: Object,
    },
    googlefn: {
      type: Function,
    },
  },
  data() {
    return { formGoole: this.$form.createForm(this) }
  },
  methods: {
    onCopy() {
      this.$message.success('内容已复制到剪切板！')
    },
    handleGoogle(rule, value, callback) {
      callback()
    },
    googleOk(fn) {
      this.formGoole.validateFields((err, values) => {
        if (!err) {
          let code = values.google
          this.addData.code = values.google
          setCheckQuery({
            code: code,
            adminName: this.addData.adminName,
            secret: this.googleData.googleKey,
          })
            .then((res) => {
              if (res.data.result) {
                setNewAddUser(this.addData)
                  .then((res) => {
                    if (res.code === 200) {
                      this.$message.success(res.msg)
                      fn()
                      this.googlefn()
                    } else {
                      this.$message.error(res.msg)
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else {
                this.$message.warning('google验证失败！')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>