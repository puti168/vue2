<template>
  <div class="game-container report-container">
    <h3>推广域名管理</h3>
    <div class="view-container dealer-container">
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
              v-model="queryData.bankCode"
              clearable
              :maxlength="50"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="12"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="12"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:" class="tagheight">
            <el-select
              v-model="accountType"
              style="width: 180px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="已启用" value="0"></el-option>
              <el-option label="已禁用" value="1"></el-option>
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
              type="warning"
              icon="el-icon-folder"
              :disabled="loading"
              size="medium"
              @click="domainLabel()"
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
            align="center"
            label="排序"
            type="index"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="vipSerialNum"
            align="center"
            label="域名"
            width="180px"
          ></el-table-column>
          <el-table-column prop="content" align="center" label="描述"></el-table-column>
          <el-table-column prop="bankName" align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.code === 1" class="normalRgba">已启用</div>
              <div v-else class="disableRgba">已停用</div>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" align="center" label="备注"></el-table-column>
          <el-table-column prop="createp" align="center" label="创建人" width="120px">
          </el-table-column>
          <el-table-column
            prop="createDt"
            align="center"
            label="创建时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="createp"
            align="center"
            label="最近操作人"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="createDt"
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
                type="primary"
                icon="el-icon-edit"
                :disabled="loading"
                size="medium"
                @click="domainLabel(scope.row)"
              >
                编辑
              </el-button>

              <el-button
                :disabled="loading"
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
            <img src="" alt="" />
            <div>防封微信二维码</div>
          </el-col>
          <el-col class="textCenter">
            <img src="" alt="" />
            <div>防封QQ二维码</div></el-col>
        </el-row>
        <el-row v-else>
          <el-col class="marginT">
            防封微信短链：<Copy :title="'http://bdqjxxx.com/ajnZDDX'" :copy="copy">
            </Copy>
          </el-col>
          <el-col class="marginT">
            防封QQ短链：
            <Copy :title="'http://bdqjaaaaas.com/ajnZDDX'" :copy="copy"> </Copy>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogGameVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.domainNameManagement,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {},
      accountType: '',
      createTime: [startTime, endTime],
      editTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      summary: {
        count: 0,
        failCount: 0,
        successCount: 0
      },
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {},
      mTitle: '',
      dialogGameVisible: false
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        vipSerialNum: 'https://www.obqj555.com',
        bankCode: '165416416464654',
        bankName: 'H5版代理链接（欢迎使用）',
        content: 'H5版代理链接（欢迎使用）',
        code: '0',
        createp: 'admin',
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      const create = this.createTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
    },
    reset() {
      this.queryData = {}
      this.createTime = [startTime, endTime]
      this.editTime = [startTime, endTime]
    },
    domainLabel(val) {
      console.log(val)
      this.$store.dispatch('tagsView/delView', {
        name: routerNames.domainCreateAndEidt
      })
      this.$nextTick(() => {
        this.$router.push({
          path: '/agent/promotionManagement/domainCreateAndEidt',
          query: val || ''
        })
      })
    },
    // 二维码、短链接
    codeAndLink(val, row) {
      this.mTitle = val
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
          console.log(1111111)
        })
        .catch(() => {})
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'vipSerialNum') {
        prop = 1
      }
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
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
    i {
      margin-left: 10px;
    }
  }
}
</style>
