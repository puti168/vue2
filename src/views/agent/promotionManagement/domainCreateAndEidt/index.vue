<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="head paddingLR">
        <p class="title">创建/编辑</p>
        <p class="right-btn">
          <el-button type="success" @click="serve">保存</el-button>
        </p>
        <p class="right-btn">
          <el-button plain @click="goBack">取消</el-button>
        </p>
      </div>
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="80px"
        class="formBox"
      >
        <el-form-item
          label="域名:"
          prop="domainName"
          :rules="[
            { required: true, message: '请输入域名地址', trigger: 'blur' },
            { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.domainName"
            placeholder="请输入"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述:"
          prop="description"
          :rules="[
            { required: true, message: '请输入描述信息', trigger: 'blur' },
            { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.description"
            type="textarea"
            :maxlength="50"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="displayOrder">
          <el-input v-model.number="formData.displayOrder" :disabled="control"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formData.status" placeholder="请选择" :disabled="control">
            <el-option label="已启用" value="0"></el-option>
            <el-option label="已禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="control" label="备注:">
          <el-input
            v-model="formData.remark"
            type="textarea"
            :maxlength="50"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-else
          label="备注:"
          prop="remark"
          :rules="[
            { required: true, message: '请输入备注信息', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.remark"
            type="textarea"
            :maxlength="50"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.domainCreateAndEidt,
  components: {},
  props: {},
  data() {
    var checkAge = (rule, value, callback) => {
      console.log(!!value)
      //   if (!value) {
      //     return callback(new Error("年龄不能为空"));
      //   }

      setTimeout(() => {
        if (value && !Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (Number.isInteger(value) && value <= 0) {
            callback(new Error('输入值不能小于等于0'))
          } else {
            callback()
          }
        }
      }, 100)
    }
    return {
      formData: {
        status: '1'
      },
      control: true,
      rules: {
        displayOrder: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.name === 'domainCreateAndEidt') {
      const data = this.$route.query
      console.log(this.$route.query)
      if (data.status) {
        this.formData.status = data.status
        this.control = false
      }
    }
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    serve() {
      console.log(this.formData)
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.control) {
            this.$api.addDomainInsert(this.formData).then((res) => {
              console.log(res)
            })
          } else {
            this.$api.setDomainUpdate(this.formData).then((res) => {
              console.log(res)
            })
          }
          console.log(this.formData)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  border: 1px solid #dcdfe6;
  font-size: 14px;
  width: 50%;
  height: 600px;
  margin: 0 auto;
}
.paddingLR {
  padding: 0 30px;
}
.head {
  height: 70px;
  line-height: 70px;
  width: 100%;
  background: #000;
  border-radius: 2px;

  .title {
    font-weight: 600;
    font-size: 16px;
    color: rgb(192, 190, 190);
    float: left;
  }
  .right-btn {
    float: right;
    margin-left: 20px;
  }
}
.strong {
  height: 70px;
  line-height: 80px;
}
.paddingB {
  padding-bottom: 30px;
}
.formBox {
  width: 50%;
  margin: 100px auto;
}
</style>
