<template>
  <div class="game-container report-container memberOverflow-container">
    <div class="line-member"></div>
    <div class="memberOverflow-content">
      <div class="form-header">
        <span>会员溢出申请资料 </span>
        <span>
          <code style="color: #ff3b30">*</code>
          为必填项
        </span>
      </div>
      <!--   溢出会员表单          -->
      <el-form ref="memberForm" :model="memberForm" :rules="rules" label-width="100px">
        <el-form-item label="溢出会员:" prop="username">
          <el-input
            v-model="memberForm.username"
            size="medium"
            minlength="4"
            maxlength="11"
            placeholder="请输入"
            clearable
            style="width: 365px"
            @keyup.enter.native="enterSearch"
          ></el-input>
          <el-button
            type="primary"
            :disabled="loading"
            size="medium"
            style="margin-left: 10px"
            @click="searchMemeber"
          >
            查询
          </el-button>
        </el-form-item>
        <el-form-item label="账号类型:" prop="accountType">
          <el-select
            v-model="memberForm.accountType"
            placeholder="请选择"
            clearable
            disabled
            style="width: 365px"
          >
            <el-option
              v-for="item in accountTypeArr"
              :key="item.code"
              :label="item.description"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前上级:" prop="currentProxyName">
          <el-input
            v-model="memberForm.currentProxyName"
            size="medium"
            placeholder=""
            clearable
            style="width: 365px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="转入代理:" prop="transferProxyName">
          <el-input
            v-model="memberForm.transferProxyName"
            size="medium"
            minlength="4"
            maxlength="11"
            placeholder="请输入"
            clearable
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item label="推广设备:" prop="promotionDevice">
          <el-select
            v-model="memberForm.promotionDevice"
            placeholder="请选择"
            clearable
            style="width: 365px"
          >
            <el-option
              v-for="item in promoteDeviceList"
              :key="item.code"
              :label="item.description"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推广链接:" prop="promotionLink">
          <el-input
            v-model="memberForm.promotionLink"
            size="medium"
            maxlength="50"
            placeholder="请输入"
            clearable
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片:" prop="uploadImage">
          <el-input v-if="false" v-model="memberForm.uploadImage"></el-input>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            accept="jpg/png"
            :limit="6"
            :class="{ hide: hideUpload }"
            :auto-upload="false"
            :on-success="uploadSuccess"
            :on-exceed="uploadLimit"
            :on-error="uploadFalse"
            :before-upload="handleUploadBefore"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="审核信息:" prop="applyInfo">
          <el-input
            v-model="memberForm.applyInfo"
            size="medium"
            minlength="2"
            maxlength="50"
            placeholder="请输入"
            clearable
            show-word-limit
            type="textarea"
            style="width: 365px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="add"
          >
            提交
          </el-button>
          <el-button
            icon="el-icon-refresh-left"
            :disabled="loading"
            size="medium"
            @click="reset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import { isHaveEmoji, notSpecial2 } from '@/utils/validate'

export default {
  name: routerNames.memberOverflow,
  mixins: [list],
  data() {
    return {
      loading: false,
      memberForm: {
        username: '',
        accountType: '',
        currentProxyName: '',
        transferProxyName: '',
        promotionDevice: '',
        promotionLink: '',
        uploadPicture: '',
        applyInfo: '',
        uploadImage: ['115164654564']
      },
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false
    }
  },
  computed: {
    // 设备列表
    promoteDeviceList() {
      return [
        { description: 'WEB', code: 'WEB' },
        { description: 'APP', code: 'APP', change: true },
        { description: 'H5', code: 'H5' }
      ]
    },
    accountTypeArr() {
      return this.globalDics.accountType
    },
    genderType() {
      return [...this.globalDics.genderType].reverse()
    },
    // 输入规则处理
    rules() {
      const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
      const testUserName = (rule, value, callback) => {
        const isSpecial = !notSpecial2(String(value))
        const isRmoji = isHaveEmoji(String(value))
        if (isSpecial) {
          callback(new Error('不支持空格及特殊字符'))
        } else if (isRmoji) {
          callback(new Error('不支持表情'))
        } else if (!reg1.test(value)) {
          callback(new Error('请输入4-11位，最少2个字母+数字组合，首位字母'))
        } else {
          callback()
        }
      }

      return {
        promotionDevice: [
          { required: true, message: '请选择账号类型', trigger: 'change' }
        ],
        username: [
          {
            required: true,
            validator: testUserName,
            trigger: 'blur'
          }
        ],
        transferProxyName: [
          {
            required: true,
            validator: testUserName,
            trigger: 'blur'
          }
        ],
        uploadPicture: [
          {
            required: false,
            trigger: 'blur'
          }
        ],
        applyInfo: [
          {
            required: true,
            message: '请输入≥2个字符',
            trigger: 'blur'
          }
        ],
        uploadImage: [
          {
            required: true,
            min: 1,
            message: '最多上传6张图片,图片格式仅支持png,jpg, 每张图片大小不能超过2MB',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    // 文件上传成功触发
    uploadSuccess(response, file, fileList) {
      console.log(response)
      if (response.code === 0) {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '导入失败',
          type: 'error'
        })
      }
    },
    // 文件上传失败触发
    uploadFalse(response, file, fileList) {
      this.$message({
        message: '文件上传失败！',
        type: 'error'
      })
    },
    // 上传前对文件的大小和类型的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'jpg'
      const extension2 = file.name.split('.')[1] === 'png'
      if (!extension && !extension2) {
        this.$message({
          message: '图片只能是 jpg、png格式!',
          type: 'error'
        })
      }
      return extension || extension2
    },
    handleUploadBefore(file) {
      this.beforeAvatarUpload(file)
      console.log(file)
    },
    // 上传数量限制
    uploadLimit(file, fileList) {
      if (fileList.length >= 6) {
        this.$message({ message: '最多上传6张图片', type: 'error' })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    searchMemeber() {
      const { username } = this.memberForm
      this.$api.overflowMemberInfo({ username: username }).then((res) => {
        if (res.code === 200) {
          console.log('查询数据弹窗！#todo', res)
        }
      })
    },
    add() {
      this.loading = true
      const params = {
        ...this.memberForm
      }
      let lock = true
      this.$refs['memberForm'].validate((valid) => {
        if (valid && lock) {
          lock = false
          this.$api
            .addMemberAPI(params)
            .then((res) => {
              this.loading = false
              lock = true
              const { code, data, msg } = res
              if (code === 200) {
                this.$confirm(`溢出会员${data}资料提交成功`, {
                  confirmButtonText: '确定',
                  type: 'success',
                  showCancelButton: false
                })
                this.reset()
              } else {
                this.$message({
                  message: msg,
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.loading = false
              lock = true
            })
        }
      })

      setTimeout(() => {
        this.loading = false
        lock = true
      }, 1000)
    },
    // 数据重置
    reset() {
      this.$refs['memberForm'].resetFields()
      this.memberForm = {
        username: '',
        accountType: '',
        currentProxyName: '',
        transferProxyName: '',
        promotionDevice: '',
        promotionLink: '',
        uploadPicture: '',
        applyInfo: '',
        uploadImage: []
      }
    },
    enterSearch() {
      this.searchMemeber()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
/deep/.hide .el-upload--picture-card {
  display: none;
}
.memberOverflow-container {
  background-color: #f5f5f5;
  margin: 0;
  min-height: calc(100vh - 105px);
  .line-member {
    height: 50px;
  }
  .memberOverflow-content {
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
  .memberOverflow-content::after {
    position: absolute;
    top: 45px;
    content: "";
    width: 100%;
    background-color: rgba(233, 233, 233, 1);
    height: 1px;
  }
}
</style>
