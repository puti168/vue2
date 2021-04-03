<template>
  <a-popconfirm placement="bottom" ok-text="确定" cancel-text="取消" @confirm="confirm">
    <template slot="icon"
      ><a-form-model ref="buttonForm" class="bd-button" :model="formData">
        <a-form-model-item
          label="金额"
          prop="amount"
          :rules="{
            required: true,
            message: '请输入金额',
          }"
        >
          <a-input-number
            v-model="formData.amount"
            style="width: 220px"
            :min="0"
            :precision="2"
            placeholder="请输入金额"
          />
        </a-form-model-item>
      </a-form-model>
    </template>
    <a-button type="primary" class="balance-btn"> {{ text }} </a-button>
  </a-popconfirm>
</template>

<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
export default {
  props: {
    text: PropTypes.string.def(''),
    type: PropTypes.number.def(1),
    defaultAmount: PropTypes.number.def(0),
  },
  data() {
    return {
      formData: {
        amount: this.defaultAmount,
      },
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', this.type, this.formData.amount)
    },
  },
  watch:{
    defaultAmount(val){
      this.formData.amount = val
    }
  }
}
</script>