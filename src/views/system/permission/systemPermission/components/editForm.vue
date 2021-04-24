<template>
  <el-form
    ref="form"
    :inline="true"
    :rules="rules"
    :model="editData"
    label-width="100px"
    @click="submitForm"
  >
    <el-form-item label="角色名称" prop="roleName">
      <el-input
        v-model="editData.roleName"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入角色名称"
        :disabled="loading"
        @keyup.enter.native="enterSearch"
      ></el-input>
    </el-form-item>
    <el-form-item v-show="control" label="创建人">
      <el-input
        v-model="editData.createBy"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入创建人"
        disabled
      ></el-input>
    </el-form-item>
    <el-form-item v-show="control" label="编辑人">
      <el-input
        v-model="editData.updatedBy"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入编辑人"
        disabled
      ></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input
        v-model="editData.remark"
        type="textarea"
        clearable
        size="medium"
        style="width: 675px"
        placeholder="最多输入100"
      ></el-input>
    </el-form-item>
    <el-form-item label="权限设置">
      <div v-show="treeData.length > 0" class="choices">
        <el-checkbox
          v-model="checkedAll"
          :indeterminate="isIndeterminate"
          @change="checkAllChange"
        >
          全选
        </el-checkbox>
      </div>
      <div class="ps">
        <el-tree
          ref="tree"
          :data="treeData"
          :default-checked-keys="checkedKeys"
          default-expand-all
          node-key="id"
          show-checkbox
          :check-on-click-node="false"
          :props="defaultProps"
          @check="handCheck"
        ></el-tree>
      </div>
    </el-form-item>
    <!-- <el-form-item>
      <el-button>取消</el-button>
      <el-button type="primary" @click="submitEdit">立即创建</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
import list from '@/mixins/list'
import { getRoleListPage, setSaveRoleInfo } from '@/api/roleController'
export default {
  components: {},
  mixins: [list],
  props: {
    control: { type: Boolean },
    editFormData: { type: Object, default: () => ({}) },
    treeData: { type: Array, default: () => [] },
    checkedKeys: { type: Array, default: () => [] },
    maxLength: { type: Number, default: () => 0 }
  },
  data() {
    return {
      editData: { status: '1' },
      status: '1',
      checkedAll: false,
      isIndeterminate: false,
      // checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      },
      menuIdsArr: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    control: {
      handler(newV) {
        if (!newV) {
          this.editData = {}
        }
      },
      deep: true,
      immediate: true
    },
    editFormData: {
      handler(newV) {
        this.editData = newV
      },
      deep: true,
      immediate: true
    },
    checkedKeys: {
      handler(newV) {
        console.log('newV', newV, this.maxLength)
        if (newV.length > 0 && this.maxLength > newV.length) {
          this.checkedAll = false
          this.isIndeterminate = true
        } else if (this.maxLength === newV.length) {
          this.checkedAll = true
          this.isIndeterminate = false
        } else {
          this.checkedAll = false
          this.isIndeterminate = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  methods: {
    getMenuIdsArr(list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const ele = list[i]
          if (ele.id) {
            this.menuIdsArr.push(ele.id)
          }
          if (ele.children && ele.children.length > 0) {
            this.getMenuIdsArr(ele.children)
          }
        }
        return this.menuIdsArr
      } else {
        return (this.menuIdsArr = [])
      }
    },
    enterSubmit() {
      const params = {
        ...this.getParams(params)
      }
      getRoleListPage(params).then((res) => {})
    },
    checkAllChange(val) {
      this.menuIdsArr = []
      if (val) {
        this.checkedAll = true
        this.isIndeterminate = false
        this.getMenuIdsArr(this.treeData)
        this.$refs.tree.setCheckedKeys(this.menuIdsArr)
        this.editData.permissionIds = this.menuIdsArr
      } else {
        this.getMenuIdsArr()
        this.$refs.tree.setCheckedKeys([])
      }
    },
    handCheck(checkedNodes, checkedKeys) {
      this.menuIdsArr = checkedKeys.checkedKeys.concat(checkedKeys.halfCheckedKeys)
      this.editData.permissionIds = checkedKeys.checkedKeys.concat(
        checkedKeys.halfCheckedKeys
      )
      if (this.menuIdsArr.length > 0 && this.maxLength > this.menuIdsArr.length) {
        this.checkedAll = false
        this.isIndeterminate = true
      } else if (this.maxLength === this.menuIdsArr.length) {
        this.checkedAll = true
        this.isIndeterminate = false
      } else {
        this.checkedAll = false
        this.isIndeterminate = false
      }
    },
    submitForm(val) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          setSaveRoleInfo(this.editData).then((res) => {
            console.log(res)
          })
          val()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ps {
  width: 675px;
  height: 400px;
  overflow-y: scroll;
  padding: 0 24px;
  border: 1px solid #eee;
  .choices {
    border-bottom: 1px solid #eee;
  }
  .tile {
    float: left;
  }
}
</style>
