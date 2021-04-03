
<template>
  <a-form
    :form="form"
    ref="addForm"
    :label-col="{ span: 4 }"
    :model="addData"
    :wrapper-col="{ span: 20 }"
    @submit="next"
  >
    <a-form-item label="账号名称">
      <a-input
        :maxLength="12"
        v-decorator="[
          'username',
          {
            rules: [{ required: true, message: '账号名称由6~12位字符组成' }, { validator: handleUsernameOruser }],
            validateTrigger: 'blur',
          },
        ]"
      />
    </a-form-item>
    <a-form-item label="账号密码">
      <a-input-password
        :maxLength="12"
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: '账号密码由6~12位字符组成' }, { validator: handleUsernameOrpwd }],
            validateTrigger: 'blur',
          },
        ]"
      />
    </a-form-item>
    <a-form-item label="所属角色" :wrapper-col="{ span: 8 }" v-if="roleList.length">
      <a-select :default-value="roleList[0].roleId" style="width: 180px" placeholder="请选择角色" @change="roleListC">
        <a-select-option v-for="(item, index) in roleList" :value="item.roleId" :key="index + 'a'">
          {{ item.roleName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="描述" :wrapper-col="{ span: 20 }">
      <a-textarea v-model="addData.remark" placeholder="最多可输入255字符" :maxLength="255" />
    </a-form-item>
  </a-form>
</template>
<script>
import { setAdminNameQuery } from '@/api/user'
export default {
  name: 'memberSearch',
  props: {
    addFormc: {
      type: Function,
    },
    roleList: {
      type: Array,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      addData: {
        adminName: '',
        password: '',
        roleId: '',
        roleName: '',
        remark: '',
      },
    }
  },
  methods: {
    handleUsernameOruser(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('账号不能包含空格')
      }
      if (value && value.replace(' ', '').length < 6) {
        callback('账号名称由6~12位字符组成')
      }
      setAdminNameQuery({ adminName: value })
        .then((res) => {
          if (res.data != null) {
            callback('账号已存在')
          } else {
            callback()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleUsernameOrpwd(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('密码不能包含空格')
      } else if (value && value.replace(' ', '').length < 6) {
        callback('账号密码由6~12位字符组成')
      }
      callback()
    },
    roleListC(val) {
      this.addData.roleId = val
      this.roleList.forEach((e) => {
        if (e.roleId === val) {
          this.addData.roleName = e.roleName
        }
      })
    },
    next(showGoogleModel) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.addData.adminName = values.username
          this.addData.password = values.password
          showGoogleModel()
        }
      })
    },
  },
  mounted() {
    if (this.roleList.length) {
      this.addData.roleId = this.roleList[0].roleId
      this.addData.roleName = this.roleList[0].roleName
    }
  },
}
</script>

<style lang="less" scoped>
</style>

