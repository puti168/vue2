<template>
  <div class="rolespermission">
    <a-card>
      <searchForm ref="searchForm" :searchFunc="search"></searchForm>
      <a-space size="8" class="bd-right" style="margin: -20px 0 20px 0">
        <a-button type="primary" v-action:xzjs style="margin-right: 10px" @click="add"> 新增角色 </a-button>
        <a-button type="primary" v-action:plsc @click="roleDelete"> 批量删除空角色 </a-button>
      </a-space>
      <a-modal
        v-model="modalVisible"
        width="60%"
        :title="modalTitle"
        @ok="createSubmit"
        destroyOnClose
        :cancelText="cancelText"
        :okText="okText"
      >
        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" @submit="createSubmit">
          <a-form-item label="角色名称">
            <a-input
              v-if="modalTitle === '新增角色'"
              :maxLength="20"
              placeholder="请输入角色名称"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '角色名称由1~20位字符组成' }, { validator: handleUsernameOruser }],
                  validateTrigger: 'blur',
                },
              ]"
            />
            <a-input
              v-else
              :maxLength="20"
              placeholder="请输入角色名称"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '角色名称由1~20位字符组成' }, { validator: handleUsername }],
                  validateTrigger: 'blur',
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="角色描述" :wrapper-col="{ span: 20 }">
            <a-textarea v-model="textvalue" placeholder="请输入角色描述，长度不要超过255字" :maxLength="255" />
          </a-form-item>
          <a-form-item label="权限分配">
            <a-tree
              class="scrollbox"
              showIcon
              checkable
              v-model="checkedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="treeData"
              :replaceFields="{ children: 'childMenu', title: 'menuName', key: 'menuId' }"
              @check="onCheck"
              defaultExpandAll
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
        style="margin-top: 17px; margin-bottom: 10px"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :loading="tableLoading"
        size="middle"
        bordered
        rowKey="roleId"
        @change="onTableChange"
      >
        <template slot="index" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
        <template slot="show" slot-scope="text, record, index">
          <div>
            <a-button type="link" v-action:xg size="small" @click="edit(text, record, index)"> 修改 </a-button>
            <a-button
              type="link"
              v-action:sc
              v-if="record.userCount < 1"
              size="small"
              @click="roleDelete(text, record, index)"
            >
              删除
            </a-button>
            <a-button type="link" v-action:sc disabled v-else size="small"> 删除 </a-button>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { PaginationMixin } from '@/core/mixins'
import searchForm from './components/searchForm'
import {
  getRoleQuery,
  getAllMenu,
  setBatchDelete,
  setRoleDelete,
  setRoleAdd,
  setRoleUpdate,
  getRoleNameQuery,
} from '@/api/user'
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'num',
    width: '10%',
    align: 'center',
    scopedSlots: { customRender: 'index' },
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'acc',
    width: '10%',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'crea',
    width: '15%',
    align: 'center',
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'user',
    width: '10%',
    align: 'center',
  },
  {
    title: '人数',
    dataIndex: 'userCount',
    key: 'ip',
    width: '10%',
    align: 'center',
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'rem',
    width: '35%',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'show',
    key: 'oper',
    align: 'center',
    width: '10%',
    scopedSlots: { customRender: 'show' },
  },
]
export default {
  mixins: [PaginationMixin],
  components: {
    searchForm,
  },
  data() {
    return {
      modalTitle: '',
      cancelText: '',
      okText: '',
      form: this.$form.createForm(this),
      textvalue: '', //角色描述
      tableLoading: false,
      modalVisible: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      menuIdsArr: [],
      treeData: [],
      username: 'admin123',
      columns,
      tableData: [],
      addData: {},
      str: '',
    }
  },
  mounted() {
    this.fetch(1, this.pageSize)
    this.initMenu()
  },
  methods: {
    search() {
      this.fetch(1, this.pageSize)
    },
    fetch(page, pageSize) {
      this.tableLoading = true
      this.page = page
      this.pageSize = pageSize
      let queryData = this.$refs.searchForm.formData
      queryData.pageNum = page
      queryData.pageSize = pageSize
      queryData.roleName = queryData.roleName == '' ? null : queryData.roleName
      queryData.createdBy = queryData.createdBy == '' ? null : queryData.createdBy
      queryData.startTime = queryData.startTime != '' ? queryData.startTime : null
      queryData.endTime = queryData.endTime != '' ? queryData.endTime : null
      delete queryData.regisTime
      getRoleQuery(queryData)
        .then((res) => {
          this.tableLoading = false
          if (res.code === 200) {
            this.tableData = res.data
            this.total = res.totalCount
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initMenu() {
      getAllMenu()
        .then((res) => {
          if (res.code === 200) {
            this.treeData = res.data.list
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    add() {
      this.modalTitle = '新增角色'
      this.cancelText = '取消创建'
      this.okText = '确定创建'
      this.textvalue = ''
      this.addData = {}
      this.checkedKeys = []
      this.modalVisible = true
    },
    handleUsernameOruser(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('角色不能包含空格')
      }
      if (value && value.replace(' ', '').length < 1) {
        callback('角色名称由1~20位字符组成')
      }
      getRoleNameQuery({ roleName: value })
        .then((res) => {
          if (res.data != null) {
            callback('角色已存在')
          } else {
            callback()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleUsername(rule, value, callback) {
      let reg = /\s/
      if (value && reg.test(value)) {
        callback('角色不能包含空格')
      }
      if (value && value.replace(' ', '').length < 1) {
        callback('角色名称由1~20位字符组成')
      }
      callback()
    },
    onCheck(checkedKeys, info) {
      let checkedKeysResult = [...checkedKeys, ...info.halfCheckedKeys]
      this.menuIdsArr = checkedKeysResult
    },
    getMenuIdsArr(list) {
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        if (ele.isPermission) {
          this.menuIdsArr.push(ele.menuId)
        }
        if (ele.childMenu && ele.childMenu.length > 0) {
          this.getMenuIdsArr(ele.childMenu)
        }
      }
      return this.menuIdsArr
    },
    getTrueId(list) {
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        if (ele.childMenu && ele.childMenu.length > 0) {
          this.getTrueId(ele.childMenu)
        } else if (ele.isPermission) {
          this.checkedKeys.push(ele.menuId)
        }
      }
      return this.checkedKeys
    },
    edit(text, record, index) {
      this.modalTitle = '修改角色'
      this.cancelText = '取消修改'
      this.okText = '确定修改'
      this.modalVisible = true
      this.textvalue = record.remark
      this.addData.roleId = record.roleId
      this.menuIdsArr = []
      this.checkedKeys = []
      setTimeout(() => {
        this.form.setFieldsValue({
          username: record.roleName,
        })
      }, 100)
      let that = this
      getAllMenu({ roleId: record.roleId })
        .then((res) => {
          if (res.code === 200) {
            that.getTrueId(res.data.list)
            that.getMenuIdsArr(res.data.list)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.checkedKeys.length < 1) {
            this.$message.error('至少选择一条权限')
          } else {
            this.addData.roleName = values.username
            this.addData.remark = this.textvalue
            this.addData.menuIds = this.menuIdsArr.toString()
            let that = this
            if (that.addData.roleId) {
              setRoleUpdate(that.addData)
                .then((res) => {
                  if (res.code === 200) {
                    that.modalVisible = false
                    that.fetch(1, that.pageSize)
                    that.$message.success(res.msg)
                  } else {
                    that.$message.error(res.msg)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              setRoleAdd(that.addData)
                .then((res) => {
                  if (res.code === 200) {
                    that.modalVisible = false
                    that.fetch(1, that.pageSize)
                    that.$message.success(res.msg)
                  } else {
                    that.$message.error(res.msg)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }
        }
      })
    },
    roleDelete(text, record, index) {
      let res = {}
      let that = this
      if (record) {
        res.roleId = record.roleId
        res.roleName = record.roleName
        this.$confirm({
          title: '删除角色',
          content: '删除后，创建用户时将不能够选择该项角色权限，还要继续吗？',
          bodyStyle: { color: 'red' },
          onOk() {
            setRoleDelete(res)
              .then((res) => {
                if (res.code === 200) {
                  that.$message.success(res.msg)
                  that.fetch(1, that.pageSize)
                } else {
                  that.$message.error(res.msg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          },
        })
      } else {
        this.$confirm({
          title: '删除角色',
          content: '删除后，绑定人数为0的角色都将被删除，还要继续吗？',
          onOk() {
            setBatchDelete()
              .then((res) => {
                if (res.code === 200) {
                  that.$message.success(res.msg)
                  that.fetch(1, that.pageSize)
                } else {
                  that.$message.error(res.msg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          },
        })
      }
    },
    hideModal() {},
  },
}
</script>

<style lang="less" scoped>
/deep/ th {
  text-align: center !important;
  overflow: hidden !important;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
  font-weight: 700 !important;
  font-style: normal;
}
/deep/ .scrollbox {
  height: 400px;
  overflow-y: auto;
}
/deep/ .ant-tree li span.ant-tree-switcher {
  display: none !important;
}
/deep/ .ant-tree li ul {
  // display: flex !important;
}
/deep/ .ant-tree-child-tree .ant-tree-child-tree-open {
  display: flex !important;
}
/deep/ .ant-tree-child-tree > li:first-child {
  padding-top: 4px;
}
</style>