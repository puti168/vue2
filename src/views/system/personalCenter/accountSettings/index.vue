<template>
  <div class="game-container report-container addMember-container">
    <div class="line-member"></div>
    <div class="addMember-content">
      <div class="form-header">
        <span>账户设置</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="135px">
        <div class="ctbox">
          <!-- <el-avatar icon="el-icon-user-solid" :size="150" class="fit"></el-avatar> -->
          <div class="block">
            <el-avatar :size="150" class="fit" :src="circleUrl"></el-avatar>
          </div>
        </div>

        <el-form-item class="pding" label="角色名称：">
          <el-input
            v-model="form.nickName"
            class="text"
            readonly
            disabled
            unselectable="on"
            size="medium"
            type="text"
            maxlength="6"
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称：">
          <el-input
            v-model="form.userName"
            type="text"
            class="text"
            size="medium"
            readonly="readonly"
            disabled
            maxlength="6"
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            v-model="form.phone"
            size="medium"
            placeholder="请输入联系电话"
            clearable
            maxlength="11"
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item label="旧登录密码：" prop="pwd">
          <el-input
            v-model="form.pwd"
            :type="passwordType"
            name="password"
            size="medium"
            placeholder="请输入原登录密码"
            style="width: 365px"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="新登录密码：" prop="newPwd">
          <el-input
            v-model="form.newPwd"
            :type="passwordType"
            name="password"
            size="medium"
            placeholder="请输入新登录密码"
            maxlength="6"
            style="width: 365px"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="确认新登录密码：" prop="reNewPwd">
          <el-input
            v-model="form.reNewPwd"
            :type="passwordType"
            name="password"
            size="medium"
            placeholder="请确认新登录密码"
            maxlength="6"
            style="width: 365px"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="dut"
            :disabled="loading"
            size="medium"
            @click="onUpdateUser"
          >
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import md5 from 'js-md5'
import validate from '@/mixins/validate'

export default {
  mixins: [list, validate],
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      passwordType: 'password',
      loading: false,
      password: '',
      id: '',
      form: {
        nickName: '',
        newPwd: '',
        phone: '',
        pwd: '',
        reNewPwd: '',
        type: '1',
        userName: ''
      }
    }
  },
  computed: {
    rules() {
      const reNewPwds = (rule, value, callback) => {
        console.log(value, '密码')
        if (!value) {
          callback(new Error('请输入确认密码'))
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入不一致'))
        } else {
          callback()
        }
      }
      const pwds = (rule, value, callback) => {
         const password = localStorage.getItem('password')
        console.log(password, '密码12')
        if (!value) {
          callback(new Error('请输入确认密码'))
        } else if (value !== password) {
          callback(new Error('请输入旧密码'))
        } else {
          callback()
        }
      }

      const pwd = [{ required: true, validator: pwds, message: '请输入旧密码', trigger: 'blur' }]
      const phone = [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      const newPwd = [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      const reNewPwd = [
        {
          required: true,
          validator: reNewPwds,
          trigger: 'blur'
        }
      ]
      return {
        pwd,
        newPwd,
        phone,
        reNewPwd
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    loadData() {
      const id = localStorage.getItem('id')
      this.$api.getuserInfolist({ id }).then((res) => {
        if (res.code === 200) {
          const { id, userName, nickName, phone } = { ...res.data }
          this.form.userId = id
          this.form.phone = phone
          this.form.userName = userName
          this.form.nickName = nickName
          this.dialogGameVisible = true
        }
        this.loading = false
      })
    },
    onUpdateUser(form) {
      const params = {
        ...this.form
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(params, '000')
          this.$api.setUserInfoupdatePwdAdmin({
            pwd: md5(params.userName.trim() + params.pwd.trim()),
          reNewPwd: md5(params.userName.trim() + params.reNewPwd.trim()),
          userId: params.userId,
          userName: params.userName,
          newPwd: params.newPwd,
          phone: params.phone,
          type: 1

          }).then((res) => {
            if (res.code === 200) {
              this.$message.success('修改成功');
              ('success')
            }
          })
        }
      })
    },
    reset() {
      this.$refs['form'].resetFields()
      this.form = {
        newPwd: '',
        phone: '',
        pwd: '',
        reNewPwd: '',
        type: '1',
        userId: 0,
        userName: ''
      }
    },
    checkValue(val) {}
  }
}
</script>

<style lang="scss" scoped>
.forbid {
  background: #889aa4;
}
.pding {
  padding-top: 40px;
}
$dark_gray: #889aa4;
.dut {
  margin-left: 165px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.ctbox {
  width: 300px;
  margin: 0 auto;
}
.fit {
  margin-left: 110px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
.addMember-container {
  background-color: #f5f5f5;
  margin: 0;
  min-height: calc(100vh - 105px);
  .line-member {
    height: 50px;
  }
  .addMember-content {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    position: relative;
    padding-top: 65px;
    .form-header {
      height: 45px;
      line-height: 45px;
      span:nth-child(1) {
        position: absolute;
        left: 30px;
        top: 0;
        color: #666;
        font-size: 14px;
        font-weight: 700;
      }
      span:nth-child(2) {
        position: absolute;
        right: 30px;
        color: #999;
        font-weight: 400;
        font-size: 14px;
        top: 0;
      }
    }
  }
  .addMember-content::after {
    position: absolute;
    top: 45px;
    content: "";
    width: 100%;
    background-color: rgba(233, 233, 233, 1);
    height: 1px;
  }

  ///deep/ input::-webkit-outer-spin-button,
  ///deep/ input::-webkit-inner-spin-button {
  //	display: none;
  //}
}
</style>
