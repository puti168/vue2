<template>
  <div class="game-container account">
    <div class="params flex-h flex-bc">
      <el-form ref="form" :inline="true" :model="listQuery">
        <el-form-item label="用户名称：">
          <el-input
            v-model="listQuery.userName"
            size="medium"
            style="width: 280px"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 30px">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="handleSearch"
          >
            查询
          </el-button>
          <el-button
            icon="el-icon-refresh-left"
            :disabled="loading"
            size="medium"
            @click="handleReset"
          >
            重置
          </el-button>
          <el-button
            type="success"
            icon="el-icon-folder-add"
            size="medium"
            @click="addUser"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        :header-cell-style="getRowClass"
      >
        <el-table-column
          align="center"
          type="index"
          :label="$t('system_component_account_275')"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="性别"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="roleName"
          :label="$t('system_component_account_277')"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="googleAuthCode"
          label="谷歌验证秘钥"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createAt"
          label="添加时间"
          width="160"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createBy"
          :label="$t('system_component_account_278')"
        ></el-table-column>
       <el-table-column
          align="center"
          prop="lastLoginTime"
          :label="$t('system_component_account_279')"
          width="160"
        ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.userName === username"
              :value="scope.row.status === '1'"
              active-color="#58A3F7"
              inactive-color="#ff4949"
              @change="change(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <!-- 操作，编辑 -->
        <el-table-column
          align="center"
          fixed="right"
          :label="$t('system_component_account_280')"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="medium"
              @click.native.prevent="popupPwdDialog(scope.row)"
            >
              修改密码
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="medium"
              @click.stop="editRow(scope.row, list)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total"
        :current-page="pageNum"
        background
        :total="total"
        :layout="layout"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <EditAccount
      :user-type="userType"
      :drawer.sync="drawer"
      :deal-data.sync="dealData"
      :is-created.sync="isCreated"
    />
    <AccountUpdatePass :dialog.sync="dialog" :agentid="agentid" />
    <el-dialog
      width="500px"
      :close-on-click-modal="false"
      center
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      @close="closeDialog"
    >
      <div slot="title" class="center">
        <span>{{ $t("system_component_account_283") }}</span>
        <span
          :class="{
            'active-color': dealerStatus.status === '1',
            'stop-color': dealerStatus.status === '0',
          }"
        >
          {{
            dealerStatus.status === "1"
              ? $t("system_component_account_266")
              : $t("system_component_account_267")
          }}
        </span>
        <span>{{ $t("system_component_account_284") }}</span>
      </div>
      <el-form ref="dialogForm" :model="dialogForm">
        <el-form-item :label="$t('system_component_account_285')" prop="remark">
          <el-input
            v-model="dialogForm.remark"
            type="textarea"
            maxlength="50"
            :placeholder="$t('system_component_account_286')"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t("system_component_account_287") }}
        </el-button>
        <el-button type="primary" @click="requestChange">
          {{ $t("system_component_account_288") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditAccount from './EditAccount'
import AccountUpdatePass from '@/components/Dialog/UpdatePass'
import list from '@/mixins/list'
import { message } from '@/utils/message'
import { getUsername } from '@/utils/auth' // get token from cookie
import { sleep } from '@/utils/sleep'
import md5 from 'js-md5'

export default {
  name: 'Account',
  components: { EditAccount, AccountUpdatePass },
  mixins: [list],
  data() {
    return {
      curUsername: '',
      username: getUsername(),
      userType: '',
      loading: true,
      dialogVisible: false,
      dealerStatus: {},
      dialogForm: {
        remark: ''
      },
      agentid: 0,
      drawer: false,
      dialog: false,
      isCreated: false,
      dealData: {},
      list: [],
      listQuery: {},
      form: {
        originPwd: '',
        newPwd: '',
        rePwd: ''
      },
      id: ''
    }
  },
  computed: {},
  methods: {
    loadData() {
      const [startTime, endTime] = this.listQuery.time || []
      let params = {
        ...this.listQuery,
        startTime: startTime && startTime + '',
        endTime: endTime && endTime + ''
      }
      params = {
        ...this.getParams(params)
      }

      this.$api.getUsers(params).then((response) => {
        this.loading = false
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields()
    },
    change({ id, status, userName }) {
      this.dialogVisible = true
      this.dealerStatus = {
        ...this.dealerStatus,
        id: id,
        status: status === '1' ? '0' : '1',
        userName
      }
    },
    requestChange() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$api
            .updateXPSStatus({ ...this.dealerStatus, ...this.dialogForm })
            .then(() => {
              this.loadData()
            })
            .then((_) => {
              this.dialogVisible = false
            })
        }
      })
    },
    updatePassword(form) {
      return this.$api
        .modifyPassword({
          pwd: md5(form.password + this.userName),
          rePwd: md5(form.passwordAgain + this.userName),
          id: form.id,
          userName: this.userName
        })
        .then((_) => {
          if (_.code === 200) {
            message({
              message: this.$t('system_component_account_289'),
              type: 'success'
            })

            if (this.curUsername === this.username) {
              sleep(1000).then(() => {
                this.$store
                  .dispatch('user/logout')
                  .then((_) => {
                    location.reload()
                  })
                  .catch((err) => {
                    message({ message: err.message, type: 'error' })
                    this.$router.go('/')
                  })
              })
            }
          }
        })
    },
    editRow(data) {
      this.dealData = data
      this.isCreated = false
      this.drawer = true
    },
    popupPwdDialog(row) {
      this.curUsername = row.userName
      this.agentid = row.id
      this.userName = row.userName
      this.dialog = true
    },
    addUser() {
      this.drawer = true
      this.isCreated = true
    },
    handleSearch() {
      this.pageNum = 1
      this.loadData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.$nextTick(() => {
        this.loadData()
      })
    },
    handleReset() {
      this.listQuery = {
        time: undefined,
        cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
        createdBy: undefined
      }
      this.loadData()
    }
  }
}
</script>
