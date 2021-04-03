<template>
  <div>
    <a-form
      :form="editform"
      v-model="formData"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      @submit="editSubmit"
    >
      <a-form-item label="创建人">
        <span>{{ formData.createdBy }}</span>
      </a-form-item>
      <a-form-item label="创建日期">
        <span>{{ formData.createdAt }}</span>
      </a-form-item>
      <a-form-item label="账号名称">
        <a-input
          :maxLength="12"
          disabled
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '账号名称由6~12位字符组成' }, { validator: handleEdit }],
              validateTrigger: 'blur',
              initialValue: formData.adminName,
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="账号密码">
        <a-input-password
          :class="eyes ? 'eyest' : 'eyesf'"
          :maxLength="12"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '账号密码由6~12位字符组成' }, { validator: handlerpwd }],
              validateTrigger: 'blur',
              initialValue: '******',
            },
          ]"
          @click="pwdChange"
        />
      </a-form-item>
      <a-form-item label="所属角色" :wrapper-col="{ span: 8 }">
        <a-select :default-value="formData.roleName" @change="editModalrole">
          <a-select-option v-for="(item, index) in roleList" :value="item.roleId" :key="index + 'c'">
            {{ item.roleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述" :wrapper-col="{ span: 20 }">
        <a-textarea v-model="formData.remark" placeholder="最多可输入255字符" :maxLength="255" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { setEditUpdate } from '@/api/user'
export default {
  props: {
    roleList: {
      type: Array,
    },
    formData: {
      type: Object,
    },
    editformfn: {
      type: Function,
    },
  },
  data() {
    return {
      editform: this.$form.createForm(this),
      editFormData: {},
      eyes: true,
      editrole: '',
    }
  },

  methods: {
    handleEdit(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('账号不能包含空格')
      }
      if (value && value.replace(' ', '').length < 6) {
        callback('账号名称由6~12位字符组成')
      }
      callback()
    },
    handlerpwd(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('密码不能包含空格')
      } else if (value && value.replace(' ', '').length < 6) {
        callback('账号密码由6~12位字符组成')
      }
      callback()
    },
    editSubmit(fn) {
      this.editform.validateFields((err, values) => {
        if (!err) {
          let res = {}
          res.adminId = this.formData.id
          res.adminName = values.username
          res.password = values.password == '******' ? '' : values.password
          res.roleId = this.formData.roleId
          res.roleName = this.formData.roleName
          res.remark = this.formData.remark
          setEditUpdate(res)
            .then((res) => {
              if (res.code === 200) {
                fn()
                this.$message.success(res.msg)
                this.editformfn()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    editModalrole(val) {
      this.formData.roleId = val
      this.roleList.forEach((e) => {
        if (e.roleId === val) {
          this.formData.roleName = e.roleName
        }
      })
    },
    pwdChange() {
      this.eyes = false
      setTimeout(() => {
        this.editform.setFieldsValue({
          password: '',
        })
      }, 100)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .eyest svg {
  display: none;
}
/deep/ .eyesf svg {
  display: inline-block;
}
</style>