<template>
  <div class="game-container report-container">
    <div v-if="editDomeShow" class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="createTime"
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
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="域名:">
            <el-input
              v-model="queryData.domainName"
              clearable
              :maxlength="50"
              size="medium"
              style="width: 200px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.createdBy"
              clearable
              :maxlength="12"
              size="medium"
              style="width: 220px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.updatedBy"
              clearable
              :maxlength="12"
              size="medium"
              style="width: 220px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:" class="tagheight">
            <el-select
              v-model="queryData.status"
              style="width: 180px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in domainStatusType"
                :key="item.description"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="域名类型:" class="tagheight">
            <el-select
              v-model="queryData.domainType"
              style="width: 180px"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in enumProxyDomainTypeOperate"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最近修改时间:">
            <el-date-picker
              v-model="editTime"
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
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
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
              v-if="hasPermission('282')"
              type="warning"
              icon="el-icon-folder"
              :disabled="loading"
              size="medium"
              @click="domainLabel('创建')"
            >
              创建
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column
            prop="displayOrder"
            align="center"
            label="排序"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="domainName"
            align="center"
            label="域名"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label="描述"
          ></el-table-column>
          <el-table-column prop="status" align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.status === '1'" class="normalRgba">
                {{ typeFilter(scope.row.status, "domainStatusType") }}
              </div>
              <div v-else class="disableRgba">
                {{ typeFilter(scope.row.status, "domainStatusType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="domainType" align="center" label="域名类型">
            <template slot-scope="scope">
              {{ typeFilter(scope.row.domainType, "enumProxyDomainTypeOperate") }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" align="center" label="备注"></el-table-column>
          <el-table-column prop="createdBy" align="center" label="创建人" width="120px">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="创建时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="updatedBy"
            align="center"
            label="最近操作人"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="最近操作时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作" width="300px">
            <template slot-scope="scope">
              <el-button
                :disabled="loading"
                type="success"
                size="medium"
                class="noicon"
                @click="codeAndLink('生成二维码', scope.row)"
              >
                二维码
              </el-button>
              <el-button
                type="warning"
                :disabled="loading"
                size="medium"
                @click="codeAndLink('生成短链接', scope.row)"
              >
                短链接
              </el-button>
              <el-button
                v-if="hasPermission('283')"
                type="primary"
                icon="el-icon-edit"
                :disabled="loading"
                size="medium"
                @click="domainLabel(scope.row)"
              >
                编辑
              </el-button>

              <el-button
                v-if="hasPermission('284')"
                :disabled="scope.row.status === '1'"
                type="danger"
                size="medium"
                class="noicon"
                icon="el-icon-delete"
                @click="deleteLabel(scope.row)"
              >
                删除
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
      <el-dialog
        :title="mTitle"
        :visible.sync="dialogGameVisible"
        :destroy-on-close="true"
        width="480px"
        class="rempadding"
        center
      >
        <el-row v-if="mTitle === '生成二维码'" type="flex" justify="space-around">
          <el-col class="textCenter">
            <img :src="wechatShortChain" alt="" />
            <div>防封微信二维码</div>
          </el-col>
          <el-col class="textCenter">
            <img :src="qqShortChain" alt="" />
            <div>防封QQ二维码</div></el-col>
        </el-row>
        <el-row v-else class="marginT">
          <el-col>
            防封微信短链：<Copy :title="wechatShortChain" :copy="copy"> </Copy>
          </el-col>
          <el-col>
            防封QQ短链：
            <Copy :title="qqShortChain" :copy="copy"> </Copy>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogGameVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <editDome
      v-else
      ref="editDome"
      :editData="editData"
      @change-type="onChangeType"
    ></editDome>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
import editDome from './components/editDome'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.domainNameManagement,
  components: { editDome },
  mixins: [list],
  data() {
    this.loadData = this.throttle(this.loadData, 1000)
    this.deleteLabel = this.throttle(this.deleteLabel, 1000)
    return {
      queryData: {},
      createTime: [startTime, endTime],
      editTime: [startTime, endTime],
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {},
      mTitle: '',
      dialogGameVisible: false,
      wechatQrCode: '',
      qqQrCode: '',
      wechatShortChain: '',
      qqShortChain: '',
      editDomeShow: true,
      editData: {}
    }
  },
  computed: {
    domainStatusType() {
      return this.globalDics.domainStatusType
    },
    enumProxyDomainTypeOperate() {
      return this.globalDics.enumProxyDomainTypeOperate
    }
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      const create = this.createTime || []
      const edit = this.editTime || []
      const [beginDate, endDate] = create
      const [beginUpdateDate, endUpdateDate] = edit
      let params = {
        ...this.queryData,
        beginDate: beginDate ? dayjs(beginDate).format('YYYY-MM-DD HH:mm:ss') : '',
        endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD HH:mm:ss') : '',
        beginUpdateDate: beginUpdateDate
          ? dayjs(beginUpdateDate).format('YYYY-MM-DD HH:mm:ss')
          : '',
        endUpdateDate: endUpdateDate
          ? dayjs(endUpdateDate).format('YYYY-MM-DD HH:mm:ss')
          : ''
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getDomainSelect(params)
        .then((res) => {
          if (res.code === 200) {
            this.total = res.data.totalRecord
            this.tableData = res.data.record
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    reset() {
      this.queryData = {}
      this.createTime = [startTime, endTime]
      this.editTime = [startTime, endTime]
      this.pageNum = 1
      this.loadData()
    },
    domainLabel(val) {
      this.editDomeShow = false
      const { id, description, displayOrder, domainName, remark, status } = {
        ...val
      }
      console.log({ id, description, displayOrder, domainName, remark, status })
      if (val === '创建') {
        this.editData = {
          id,
          description,
          displayOrder,
          domainName,
          remark,
          status,
          domainType: '0'
        }
        this.editData.status = '0'
        this.$nextTick(() => {
          this.$refs.editDome.control = false
        })
      } else {
        this.editData = { id, description, displayOrder, domainName, remark, status }
        this.editData.domainType = val.domainType + ''
        this.$nextTick(() => {
          this.$refs.editDome.control = true
        })
      }
    },
    onChangeType(type) {
      // type是子组件$emit传递的参数
      this.editDomeShow = type
    },
    // 二维码、短链接
    codeAndLink(val, row) {
      this.mTitle = val
      this.wechatQrCode = row.wechatQrCode
      this.qqQrCode = row.qqQrCode
      this.wechatShortChain = row.wechatShortChain
      this.qqShortChain = row.qqShortChain
      this.dialogGameVisible = true
      console.log(val, row)
    },
    deleteLabel(val) {
      this.$confirm(
        `<strong>是否删除该条配置?</strong></br><span style='font-size:12px;color:#c1c1c1'>请慎重操作</span>`,
        `确认提示`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api.setDomainDelete({ id: val.id }).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
          console.log(1111111)
        })
        .catch(() => {})
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 1
      }
      if (prop === 'updatedAt') {
        prop = 2
      }
      this.pageNum = 1
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      } else {
        delete this.queryData.orderKey
        delete this.queryData.orderType
      }
      this.loadData()
    },
    enterSubmit() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  color: #909399;
  font-weight: 700;
}
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
}
/deep/ .rempadding .el-dialog__body {
  padding: 0;
  padding-bottom: 30px;

  .contentBox,
  form {
    padding: 0 20px;
  }
}
.decoration {
  text-decoration: underline;
  cursor: pointer;
}
.bodyBox {
  max-height: 400px;
  overflow: auto;
}
p {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e8e8e8;
  justify-content: space-around;
  span {
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}
.headerBox {
  color: #000000d8;
  background: #fafafa;
  font-family: "PingFang SC ", "PingFang SC", sans-serif;
  font-weight: 650;
  border-top: 1px solid #e8e8e8;
  margin-top: 15px;
}
.textCenter {
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    margin: 40px;
  }
}
.marginT {
  padding: 0 30px;
  margin-top: 30px;
  p {
    display: inline-block;
    border: none;
    line-height: 24px;
    i {
      margin-left: 10px;
    }
  }
}
</style>
