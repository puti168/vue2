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
        <el-form-item label="溢出会员:" prop="userName">
          <el-input
            v-model="memberForm.userName"
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
          <el-input v-show="false" v-model="memberForm.uploadImage"></el-input>
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            accept="jpg/png"
            :limit="6"
            :class="{ hide: hideUpload }"
            :auto-upload="false"
            :on-success="
              (response, file, fileList) =>
                uploadSuccess(response, file, fileList, form.imageAddress)
            "
            :on-exceed="uploadLimit"
            :on-error="uploadFalse"
            :before-upload="handleUploadBefore"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="uploadFile"
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
            :disabled="isSub"
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
        userName: '',
        accountType: '',
        currentProxyName: '',
        transferProxyName: '',
        promotionDevice: '',
        promotionLink: '',
        applyInfo: '',
        uploadImage: '',
        imgPath: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      picList: [],
      isSub: true
    }
  },
  computed: {
    // 设备列表
    promoteDeviceList() {
      return [
        { description: 'APP', code: '1' },
        { description: 'WEB', code: '2' },
        { description: 'H5', code: '3' }
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
        userName: [
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
            message:
              '至少上传一张，最多上传6张图片,图片格式仅支持png,jpg, 每张图片大小不能超过2MB',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    // 文件上传成功触发
    uploadSuccess(res, file, fileList) {
      console.log(111111, res)
    },
    // 文件上传失败触发
    uploadFalse(res, file, fileList) {
      this.$message({
        message: '文件上传失败！',
        type: 'error'
      })
    },
    // 上传前对文件的大小和类型的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'jpg'
      const extension2 = file.name.split('.')[1] === 'png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!extension && !extension2) {
        this.$message({
          message: '图片只能是 jpg、png格式!',
          type: 'error'
        })
      }
      return (extension || extension2) && isLt2M
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
      console.log(11111111, file, fileList, this.picList)
      for (const i in this.picList) {
        if (this.picList[i].key === file.uid) {
          this.picList.splice(i, 1)
        } else {
          console.log(888, fileList)
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadFile(file) {
      console.log('触发了change事件')
      const curFile = file.raw
      const formData = new FormData()
      const uid = file.uid
      formData.append('file', curFile)
      this.$api
        .imageUpload(formData)
        .then((res) => {
          this.picList.push({ key: uid, value: res.data })
          this.$message({
            message: '上传成功!',
            type: 'success'
          })
          this.memberForm.uploadImage = ''
          this.memberForm.uploadImage = res.data
          this.$refs['memberForm'].validateField('uploadImage')
          //   this.$set(this.form, "imageAddress", res.data);
        })
        .catch(() => {
          this.$refs.upload.clearFiles()
        })
    },
    searchMemeber() {
      const { userName } = this.memberForm
      this.$api.overflowMemberInfo({ userName: userName }).then((res) => {
        if (res.code === 200 && res.data !== null) {
          this.memberForm.accountType = res.data.accountType + ''
          this.memberForm.currentProxyName = res.data.currentUserName
          this.isSub = false
        }
      })
    },
    add() {
      //   this.loading = true;
      this.memberForm.imgPath = []

      for (let i = 0; i < this.picList.length; i++) {
        const ele = this.picList[i]
        this.memberForm.imgPath.push(ele.value)
      }
      const params = {
        ...this.memberForm
      }
      console.log('保存', params, this.picList)
      this.$refs['memberForm'].validate((valid) => {
        if (valid) {
          this.$confirm(`确定修改吗？`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              delete params.uploadImage
              this.$api
                .addOverflowMember(params)
                .then((res) => {
                  this.loading = false
                  if (res.code === 200) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                    this.picList = []
                    this.isSub = true
                    this.reset()
                  } else {
                    this.$message({
                      message: res.msg,
                      type: 'error'
                    })
                  }
                })
                .catch(() => {
                  this.loading = false
                })
            })
            .catch(() => {})
        }
      })
    },
    // 数据重置
    reset() {
      this.$refs['memberForm'].resetFields()
      this.$refs.upload.clearFiles()
      this.picList = []
      this.memberForm = {
        userName: '',
        accountType: '',
        currentProxyName: '',
        transferProxyName: '',
        promotionDevice: '',
        promotionLink: '',
        applyInfo: '',
        uploadImage: '',
        imgPath: []
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
