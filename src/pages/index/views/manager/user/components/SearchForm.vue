<template>
  <a-form-model ref="searchForm" layout="inline" :model="searchForm">
    <a-form-model-item label="账号名称" class="titlebold" prop="adminName">
      <a-input v-model="searchForm.adminName" placeholder="请输入账号名称" />
    </a-form-model-item>
    <a-form-model-item label="创建时间" class="titlebold" prop="regisTime">
      <date-range-picker
        v-model="searchForm.regisTime"
        :placeholder="['开始时间', '结束时间']"
        @change="timeData"
      />
    </a-form-model-item>
    <a-form-model-item label="创建人" class="titlebold" prop="createdBy">
      <a-input v-model="searchForm.createdBy" placeholder="请输入创建人" />
    </a-form-model-item>
    <a-form-model-item label="启用状态" class="titlebold" prop="status">
      <a-select v-model="searchForm.status" style="width: 180px" placeholder="请选择状态">
        <a-select-option value="">全部状态</a-select-option>
        <a-select-option :value="0">禁用</a-select-option>
        <a-select-option :value="1">启用</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item
      label="所属角色"
      class="titlebold"
      prop="roleId"
      v-show="roleList.length"
    >
      <a-select
        v-model="searchForm.roleId"
        style="width: 180px"
        placeholder="请选择角色"
        @change="modalroleChange"
      >
        <a-select-option value="">全部角色</a-select-option>
        <a-select-option
          v-for="(item, index) in roleList"
          :value="item.roleId"
          :key="index + 'a'"
        >
          {{ item.roleName }}
        </a-select-option>
      </a-select>
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
import moment from "moment";
import { DateRangePicker } from "@/components";
export default {
  name: "memberSearch",
  components: { DateRangePicker },
  props: {
    searchFunc: {
      type: Function,
    },
    roleList: {
      type: Array,
    },
  },
  data() {
    return {
      searchForm: {
        adminName: "",
        startTime: "",
        endTime: "",
        createdBy: "",
        roleId: "",
        roleName: "",
        status: "",
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
        this.searchForm.startTime = date[0].format("YYYY-MM-DD");
        this.searchForm.endTime = date[1].format("YYYY-MM-DD");
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
    },
    modalroleChange(val) {
      console.log(val);
      this.searchForm.roleId = val;
      if (val == "") {
        this.searchForm.roleName = "";
      }
      this.roleList.forEach((e) => {
        if (e.roleId === val) {
          this.searchForm.roleName = e.roleName;
        }
      });
    },
    submitForm() {
      this.$refs.searchForm.validate((value) => {
        this.fetch(1, this.pageSize);
      });
    },
    resetForm() {
      this.searchForm.startTime = "";
      this.searchForm.endTime = "";
      this.searchForm.roleName = "";
      this.$refs.searchForm.resetFields();
      this.fetch(1, this.pageSize);
    },
  },
  mounted() {
    this.fetch(1, this.pageSize);
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
