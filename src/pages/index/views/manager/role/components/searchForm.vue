<template>
  <a-form-model ref="searchForm" layout="inline" :model="formData">
    <a-form-model-item label="角色名称" class="titlebold" prop="roleName">
      <a-input v-model="formData.roleName" placeholder="请输入角色名称" />
    </a-form-model-item>
    <a-form-model-item label="创建时间" class="titlebold" prop="regisTime">
      <date-range-picker
        v-model="formData.regisTime"
        :placeholder="['开始时间', '结束时间']"
        @change="timeData"
      />
    </a-form-model-item>
    <a-form-model-item
      label="创建人"
      class="titlebold"
      prop="createdBy"
      style="margin-right: 32px"
    >
      <a-input v-model="formData.createdBy" placeholder="请输入创建人" />
    </a-form-model-item>
    <a-form-model-item class="titlebold">
      <a-button type="primary" v-action:ymck @click="submitForm('searchForm')">
        查询
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('searchForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { DateRangePicker } from "@/components";
export default {
  name: "memberSearch",
  components: { DateRangePicker },
  props: {
    searchFunc: {
      type: Function,
    },
  },
  data() {
    return {
      formData: {
        roleName: "",
        startTime: "",
        endTime: "",
        createdBy: "",
        regisTime: [undefined, undefined],
      },
    };
  },
  methods: {
    fetch() {
      this.searchFunc();
    },
    timeData(date) {
      if (date[0]) {
        this.formData.startTime = date[0].format("YYYY-MM-DD");
        this.formData.endTime = date[1].format("YYYY-MM-DD");
      } else {
        this.formData.startTime = "";
        this.formData.endTime = "";
      }
    },
    submitForm() {
      this.$refs.searchForm.validate((value) => {
        this.fetch(1, this.pageSize);
      });
    },
    resetForm() {
      this.formData.startTime = "";
      this.formData.endTime = "";
      this.$refs.searchForm.resetFields();
      this.fetch(1, this.pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.bd-table-title {
  min-height: 360px;
}
.titlebold {
  margin-bottom: 20px;
}
.titlebold /deep/.ant-form-item-label,
.titlebold /deep/.ant-form-item-control {
  height: 32px !important;
  line-height: 32px !important;
}
.titlebold /deep/ .ant-form-item-label > label {
  color: #3f3f3f;
  font-weight: 550 !important;
  opacity: 0.85;
}
.bd-input-group-left {
  width: 150px;
  border-right: 0px;
}
.bd-input-group-left /deep/ input {
  text-align: center;
}
.bd-input-group-center {
  width: 30px;
  border-left: 0;
  border-right: 0;
  pointer-events: none;
  background-color: #fff;
  padding: 0;
  text-align: center;
}
.bd-input-group-right {
  width: 150px;
  text-align: center;
  border-left: 0;
}
.bd-input-group-right /deep/ input {
  text-align: center;
}
</style>
