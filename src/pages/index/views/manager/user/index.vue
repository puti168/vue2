<template>
  <div>
    <a-card>
      <search-form ref="searchForm" :searchFunc="search" :roleList="roleList" />
      <a-button
        type="primary"
        v-action:xzzh
        style="float: right; margin-bottom: 5px"
        @click="
          () => {
            modalVisible = true;
          }
        "
      >
        新增账号
      </a-button>
      <a-modal
        v-model="modalVisible"
        width="680px"
        title="新增账号"
        @ok="nextSubmit"
        destroyOnClose
        okText="下一步"
      >
        <add-Form ref="addForm" :roleList="roleList"></add-Form>
      </a-modal>
      <a-modal
        v-model="googleModalVisible"
        width="680px"
        title="绑定Google验证器"
        @ok="googleOk"
        destroyOnClose
      >
        <google-Key
          ref="googleKey"
          :googleData="googleData"
          :addData="addData"
          :googlefn="googlefn"
        ></google-Key>
      </a-modal>
      <a-table
        style="margin-bottom: 10px"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :loading="tableLoading"
        size="middle"
        bordered
        rowKey="id"
        @change="onTableChange"
      >
        <template slot="index" slot-scope="text, record, index">
          <span>{{ index + 1 }}</span>
        </template>
        <template slot="login" slot-scope="text, record">
          <span>{{ record.loginTime }}/{{ record.loginIp }}</span>
        </template>
        <template slot="switchStatus" slot-scope="text, record, index">
          <div v-if="$auth('ztxg')">
            <a-switch
              v-action:ztxg
              style="width: 68px"
              v-show="record.id != id"
              checked-children="启用"
              un-checked-children="禁用"
              :checked="text == 1"
              @click="switchChange(text, record, index)"
            />
            <span v-show="record.id == id">启用</span>
          </div>
          <div v-else>
            <span v-if="text == 1">启用</span>
            <span v-else>禁用</span>
          </div>
        </template>
        <template slot="deleted" slot-scope="text, record, index">
          <a-button
            type="link"
            v-action:xg
            size="small"
            v-show="record.id != id"
            @click="edit(text, record, index)"
          >
            修改
          </a-button>
          <a-button
            type="link"
            v-action:gxmy
            size="small"
            v-show="record.id != id"
            @click="updateKey(text, record, index)"
          >
            更新秘钥
          </a-button>
          <a-button
            type="link"
            v-action:sc
            size="small"
            v-show="record.id != id"
            @click="deleteUpdate(text, record, index)"
          >
            删除
          </a-button>
        </template>
      </a-table>
      <a-modal
        v-model="editModalVisible"
        width="680px"
        title="修改账号"
        @ok="editSubmit"
        destroyOnClose
      >
        <edit-form
          ref="editForm"
          :formData="formData"
          :editformfn="editformfn"
          :roleList="roleList"
        ></edit-form>
      </a-modal>
      <change-google-key-form
        :visible.sync="googleForm.visible"
        :formData="googleForm.data"
        v-if="googleForm.visible"
        :type="googleForm.type"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>

<script>
import { PaginationMixin, StoreMixin } from "@/core/mixins";
import SearchForm from "./components/SearchForm";
import AddForm from "./components/AddForm";
import googleKey from "./components/googleKey";
import EditForm from "./components/EditForm";
import ChangeGoogleKeyForm from "./components/ChangeGoogleKeyForm";
import {
  getQueryUser,
  setStatusUpdate,
  setDeleteUpdate,
  getQueryRole,
  getGooglePath,
} from "@/api/user";
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "num",
    width: "5%",
    align: "center",
    scopedSlots: { customRender: "index" },
  },
  {
    title: "账号名称",
    dataIndex: "adminName",
    key: "acc",
    align: "center",
    width: "10%",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "crea",
    width: "10%",
    align: "center",
  },
  {
    title: "所属角色",
    dataIndex: "roleName",
    key: "user",
    width: "10%",
    align: "center",
  },
  {
    title: "最近登录时间/IP",
    dataIndex: "login",
    key: "ip",
    width: "18%",
    align: "center",
    scopedSlots: { customRender: "login" },
  },
  {
    title: "创建人",
    dataIndex: "createdBy",
    key: "founder",
    width: "10%",
    align: "center",
  },
  {
    title: "备注信息",
    dataIndex: "remark",
    key: "rem",
    width: "15%",
    align: "center",
  },
  {
    title: "启用状态",
    dataIndex: "status",
    key: "state",
    width: "10%",
    align: "center",
    scopedSlots: { customRender: "switchStatus" },
  },
  {
    title: "操作",
    dataIndex: "deleted",
    key: "oper",
    align: "center",
    width: "12%",
    scopedSlots: { customRender: "deleted" },
  },
];
export default {
  mixins: [PaginationMixin, StoreMixin],
  components: {
    SearchForm,
    AddForm,
    googleKey,
    EditForm,
    ChangeGoogleKeyForm,
  },
  data() {
    return {
      roleList: [], //角色列表
      columns,
      tableData: [],
      tableLoading: false,
      modalVisible: false,
      googleModalVisible: false,
      editModalVisible: false,
      adminName: "",
      googleData: {
        googleKey: "",
        googleCode: "",
        googleKeyUrl: "",
      },
      id: this.getUserInfo("id"),
      addData: {},
      formData: {},
      googleForm: { data: {}, visible: false, type: "add" },
    };
  },
  created() {
    getQueryRole()
      .then((res) => {
        if (res.code === 200) {
          this.roleList = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    search() {
      this.fetch(1, this.pageSize);
    },
    fetch(page, pageSize) {
      this.tableLoading = true;
      this.page = page;
      this.pageSize = pageSize;
      let res = this.$refs.searchForm.searchForm;
      let resData = Object.assign({}, res);
      resData.pageNum = page;
      resData.pageSize = pageSize;
      resData.adminName = resData.adminName == "" ? null : resData.adminName;
      resData.startTime = resData.startTime == "" ? null : resData.startTime;
      resData.endTime = resData.endTime == "" ? null : resData.endTime;
      resData.createdBy = resData.createdBy == "" ? null : resData.createdBy;
      resData.roleId = resData.roleId == "" ? null : resData.roleId;
      resData.roleName = resData.roleName == "" ? null : resData.roleName;
      resData.status = resData.status == null ? 0 : resData.status;
      getQueryUser(resData)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data;
            this.total = res.totalCount;
            this.tableLoading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    nextSubmit() {
      this.$refs.addForm.next(() => {
        this.addData = this.$refs.addForm.addData;
        if (this.addData.adminName != "") {
          this.modalVisible = false;
          this.googleModalVisible = true;
          getGooglePath({ adminName: this.addData.adminName })
            .then((res) => {
              console.log(res);
              if (res.code === 200) {
                this.googleData.googleKey = res.data.secret;
                this.googleData.googleCode = res.data.code;
                this.addData.secret = res.data.secret;
                this.googleData.googleKeyUrl = res.data.url;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    googleOk() {
      this.$refs.googleKey.googleOk(() => {
        this.googleModalVisible = false;
      });
    },
    googlefn() {
      this.fetch(1, this.pageSize);
    },
    switchChange(text, record, index) {
      this.tableLoading = true;
      let status;
      if (record.status != 0) {
        status = 0;
      } else {
        status = 1;
      }
      setStatusUpdate({ status, adminId: record.id })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.tableLoading = false;
            this.fetch(1, this.pageSize);
          } else {
            this.tableLoading = false;
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editformfn() {
      this.fetch(1, this.pageSize);
    },
    edit(text, record, index) {
      this.formData = JSON.parse(JSON.stringify(record));
      this.editModalVisible = true;
    },
    editSubmit() {
      this.$refs.editForm.editSubmit(() => {
        this.editModalVisible = false;
      });
    },
    updateKey(text, record, index) {
      this.googleForm = {
        data: { adminId: record.id, adminName: record.adminName },
        visible: true,
        type: "add",
      };
    },
    handleOk() {
      this.fetch(1, this.pageSize);
    },
    deleteUpdate(text, index, record) {
      let that = this;
      this.$confirm({
        title: "您确定要删除该用户吗？",
        content: (h) => <div style="color:red;">删除用户后，该用户将无法登录平台</div>,
        bodyStyle: { color: "red" },
        closable: true,
        onOk() {
          setDeleteUpdate({ id: index.id, adminName: index.adminName })
            .then((res) => {
              if (res.code === 200) {
                that.fetch(1, that.pageSize);
                that.$message.success(res.msg);
              } else {
                that.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ th {
  text-align: center !important;
  overflow: hidden !important;
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700 !important;
  font-style: normal;
}
</style>
