<template>
  <div>
    <el-row type="flex" justify="space-around" class="herderBox fontsize">
      <el-col style="line-height: 44px; text-align: center">游戏类型</el-col>
      <el-col>
        VIP0
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP1
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP2
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP3
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP4
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP5
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP6
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP7
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP8
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP9
        <br />
        返水比例
      </el-col>
      <el-col>
        VIP10
        <br />
        返水比例
      </el-col>
    </el-row>
    <el-form
      v-for="(item, index) in listData"
      ref="formData"
      :key="index + 'a'"
      :model="formData + index"
      status-icon
      class="demo-ruleForm"
    >
      <el-row type="flex" justify="space-around">
        <el-col style="text-align: center">
          <el-form-item class="inputBox fontsize">
            <span>{{ formData.gameName }}</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip0">
            <el-input-number
              v-model.number="formData.vip0"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip1">
            <el-input-number
              v-model.number="formData.vip1"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip2">
            <el-input-number
              v-model.number="formData.vip2"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip3">
            <el-input-number
              v-model.number="formData.vip3"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip4">
            <el-input-number
              v-model.number="formData.vip4"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip5">
            <el-input-number
              v-model.number="formData.vip5"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip6">
            <el-input-number
              v-model.number="formData.vip6"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip7">
            <el-input-number
              v-model.number="formData.vip7"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip8">
            <el-input-number
              v-model.number="formData.vip8"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip9">
            <el-input-number
              v-model.number="formData.vip9"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="vip10">
            <el-input-number
              v-model.number="formData.vip10"
              class="inputBox"
              :max="99999"
              :precision="2"
            ></el-input-number>
            <span>%</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <p class="subBox">
        <el-button type="primary" @click="submitForm('formData')"> 保存 </el-button>
        <el-button class="pad" @click="resetForm('formData')"> 恢复上次设置 </el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    listData: { type: Array, default: () => [] }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    for (let i = 0; i < this.listData.length; i++) {
      const ele = this.listData[i]
      this.formData = ele
      console.log(ele)
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.herderBox {
  line-height: 22px;
  padding: 10px 0;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
}
.fontsize {
  font-size: 14px;
  color: #606266;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Arial, sans-serif;
  font-weight: 700;
}
.demo-ruleForm {
  padding-top: 15px;
  border: 1px solid #e8e8e8;
}
.inputBox {
  width: 65%;
  margin: auto;
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number .el-input__inner {
  padding: 0 15px;
  text-align: left;
}
.subBox {
  width: 240px;
  margin: 20px auto;
  .pad {
    padding: 0 10px;
  }
}
</style>
