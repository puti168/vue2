<template>
  <transition name="fade-transform" mode="out-in">
    <div v-if="!editPage" class="game-container report-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="变更时间:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :clearable="false"
              :default-time="defaultTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select
              v-model="queryData.status"
              size="medium"
              placeholder="默认选择全部"
              clearable
              style="width: 300px"
            >
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in entrAuthorityTypeArr"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="第三方支付渠道id:">
            <el-input
              v-model="queryData.channelId"
              clearable
              size="medium"
              :maxlength="12"
              style="width: 180px"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="第三方回调ip:">
            <el-input
              v-model="queryData.ip"
              clearable
              size="medium"
              :maxlength="15"
              style="width: 180px"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 30px">
            <el-button
              type="primary"
              icon="el-icon-search"
              :disabled="loading"
              size="medium"
              @click="search"
            >
              查询
            </el-button>
            <el-button
              icon="el-icon-refresh-left"
              :disabled="loading"
              size="medium"
              @click="reset"
            >
              重置
            </el-button>
            <el-button
              v-if="hasPermission('398')"
              type="warning"
              icon="el-icon-folder"
              :disabled="loading"
              size="medium"
              class="fr"
              @click="openEdit('')"
            >
              创建
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="view-container dealer-container">
        <div class="content">
          <el-table
            v-loading="loading"
            border
            size="mini"
            class="small-size-table"
            :data="dataList"
            style="width: 100%"
            :header-cell-style="getRowClass"
            @sort-change="_changeTableSort"
          >
            <el-table-column prop="createDt" align="center" label="创建时间">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.createDt+'')">
                  {{ scope.row.createDt }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="申请人" prop="applyBy">
              <template slot-scope="scope">
                <span v-if="scope.row.applyBy">
                  {{ scope.row.applyBy }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="变更时间" prop="updateDt">
              <template slot-scope="scope">
                <span v-if="scope.row.updateDt">
                  {{ scope.row.updateDt }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="第三方回调ip" prop="ip">
              <template slot-scope="scope">
                <span v-if="scope.row.ip">
                  {{ scope.row.ip }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="operator" align="center" width="120" label="操作人">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.operator+'')">
                  {{ scope.row.operator }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="status">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.status+'')">
                  {{ typeFilter(scope.row.status, 'entrAuthorityType') }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="第三方支付渠道id" prop="channelId">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.channelId+'')">
                  {{ scope.row.channelId }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="三方回调IP白名单管理主键id" prop="id">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.id+'')">
                  {{ scope.row.id }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商户号id" prop="merchantId">
              <template slot-scope="scope">
                <span v-if="!!(scope.row.merchantId+'')">
                  {{ scope.row.merchantId }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column v-if="hasPermission('400')||hasPermission('399')||hasPermission('401')" align="center" label="操作" min-width="250">
              <template slot-scope="scope">
                <el-button
                  v-if="hasPermission('400')"
									type="danger"
									icon="el-icon-delete"
									size="medium"
									@click="dele(scope.row)"
								>
									删除
								</el-button>
                <el-button
                  v-if="hasPermission('399')"
									type="warning"
									icon="el-icon-edit"
									size="medium"
									@click.stop="openEdit(scope.row)"
								>
									编辑
								</el-button>
                <el-button
                  v-if="hasPermission('401')"
									type="warning"
									icon="el-icon-edit"
									size="medium"
									@click.stop="updateStatus(scope.row)"
								>
									更改状态
								</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :current-page.sync="pageNum"
            class="pageValue"
            background
            layout="total, sizes,prev, pager, next, jumper"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <editForm v-else :editRowData="editData" @back="back"></editForm>
  </transition>
</template>

<script>
import editForm from './components/editForm.vue'
import list from '@/mixins/list'
import dayjs from 'dayjs'
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()
export default {
  components: {
    editForm
  },
  mixins: [list],
  data() {
    this.search = this.throttle(this.search, 1000)
    this.reset = this.throttle(this.reset, 1000)
    return {
      queryData: {
        status: undefined,
        channelId: undefined,
        ip: undefined,
        orderType: undefined
      },
      searchTime: [start, end],
      dataList: [],
      editPage: false,
      editRowData: undefined
    }
  },
	computed: {
		entrAuthorityTypeArr() {
			return this.globalDics.entrAuthorityType
		}
	},
  mounted() {},
  methods: {
    loadData() {
      const [beginTime, endTime] = this.searchTime || []
      let params = {
        ...this.queryData,
        beginTime: beginTime ? dayjs(beginTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      delete params.time
      this.loading = true

      this.$api
        .getCallbackIpWhiteList(params)
        .then((res) => {
          this.loading = false
          const {
            code,
            data: { record, totalRecord },
            msg
          } = res
          if (code === 200) {
            this.dataList = record || []
            this.total = totalRecord || 0
          } else {
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    _changeTableSort({ column, prop, order }) {
      this.pageNum = 1
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderKey
        delete this.queryData.orderType
      }
      this.loadData()
    },
		openEdit(val) {
			val ? (this.editData = val) : (this.editData = {})
			this.editPage = true
		},
    back() {
			this.editPage = false
			this.editData = {}
			this.loadData()
		},
    dele(rowData) {
      this.$confirm(
        `<strong>是否删除该条配置?</strong></br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api.deleteCallbackIpWhite({ id: rowData.id }).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.loadData()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        })
        .catch(() => { this.loading = false })
    },
    updateStatus(rowData) {
      this.$confirm(
        `<strong>是否更改状态?</strong></br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const { id } = rowData
          let { status } = rowData
          if (status === 0) {
            status = 1
          } else {
            status = 0
          }
          this.$api.updateStatusCallbackIpWhite({ id, status })
          .then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.loadData()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        })
        .catch(() => { this.loading = false })
    },
    reset() {
      this.pageNum = 1
      this.queryData = {}
      this.searchTime = [start, end]
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgCenter {
    img {
      max-width: 100%;
    }
  }
</style>
