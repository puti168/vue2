<template>
  <el-form ref="form" :inline="true" :model="editData" label-width="100px">
    <el-form-item label="角色名称">
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
    <el-form-item v-show="control" label="角色ID">
      <el-input
        v-model="editData.id"
        clearable
        size="medium"
        style="width: 280px"
        placeholder="请输入角色ID"
        disabled
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
      <div class="ps">
        <div v-show="treeData.length > 0" class="choices">
          <el-checkbox v-model="checkedAll" @change="checkAllChange"> 全选 </el-checkbox>
        </div>
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
  </el-form>
</template>

<script>
import list from '@/mixins/list'
import { setEidteBank } from '@/api/bankController'
export default {
  components: {},
  mixins: [list],
  props: {
    control: { type: Boolean },
    editFormData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      editData: { status: '1' },
      status: '1',
      checkedAll: false,
      isIndeterminate: true,
      checkedKeys: [],
      treeData: [
        {
          id: 1,
          label: '1级 ',
          children: [
            {
              id: 3,
              label: '3级',
              children: [
                {
                  id: 6,
                  label: '6级',
                  children: [
                    {
                      id: 8,
                      label: '8级'
                    },
                    {
                      id: 9,
                      label: '9级'
                    }
                  ]
                },
                {
                  id: 7,
                  label: '7级'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '2级',
          children: [
            {
              id: 4,
              label: '4级'
            },
            {
              id: 5,
              label: '5级'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuIdsArr: [],
      maxLength: 9
    }
  },
  computed: {},
  watch: {
    control: {
      // 深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        if (!newV) {
          this.editData = {}
        }
      },
      deep: true,
      immediate: true // 该回调将会在侦听开始之后被立即调用
    },
    editFormData: {
      // 深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        this.editData = newV
      },
      deep: true,
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created() {},
  mounted() {
    // this.getMenuIdsArr(this.treeData);
    // console.log(this.maxLength);
  },
  methods: {
    getMenuIdsArr(list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const ele = list[i]
          if (ele.id) {
            this.maxLength = this.maxLength + 1
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
      console.log(222222222)
      const params = {
        ...this.getParams(params)
      }
      setEidteBank(params).then((res) => {
        console.log(res)
      })
    },
    checkAllChange(val) {
      this.maxLength = 0
      if (val) {
        this.getMenuIdsArr(this.treeData)
        this.$refs.tree.setCheckedKeys(this.menuIdsArr)
      } else {
        this.getMenuIdsArr()
        this.$refs.tree.setCheckedKeys([])
      }
    },
    handCheck(checkedNodes, checkedKeys) {
      console.log(this.maxLength)
      console.log(checkedKeys)
      console.log(this.menuIdsArr)
    }
  }
}
</script>

<style lang="scss" scoped>
.ps {
  width: 675px;
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
