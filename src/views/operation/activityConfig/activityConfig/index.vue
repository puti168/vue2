<template>
  <div class="game-container report-container">
    <div v-if="!dialogFormVisible" class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="活动ID:">
            <el-input
              v-model="queryData.id"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动名称:">
            <el-input
              v-model="queryData.activityName"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动页签:">
            <el-select
              v-model="queryData.discountTagId"
              multiple
              style="width: 300px"
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in activityList"
                :key="item.id"
                :label="item.activityName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动模板:">
            <el-select
              v-model="queryData.activityType"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateDiscountActivityType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动主标题:">
            <el-input
              v-model="queryData.activityTitle"
              clearable
              :maxlength="20"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="洗码倍率:" class="numberBox">
            <el-input-number
              v-model="queryData.activityWashCodeTimes"
              clearable
              :max="999.99"
              :precision="2"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="活动支持终端:">
            <el-select
              v-model="queryData.activityAppType"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateActivitySupportClient"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动支持账户类型:">
            <el-select
              v-model="queryData.activityUserType"
              style="width: 300px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateActivityUserType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时效:">
            <el-select
              v-model="queryData.activityPrescription"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateValidityType"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select
              v-model="queryData.status"
              clearable
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in operateStatus"
                :key="item.code"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="queryData.createdBy"
              clearable
              :maxlength="15"
              size="medium"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="最近操作人:">
            <el-input
              v-model="queryData.updatedBy"
              clearable
              :maxlength="15"
              size="medium"
              style="margin-right: 20px"
              placeholder="请输入"
              @keyup.enter.native="enterSearch"
            ></el-input>
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
              @click="Add"
            >
              新增
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-sort"
              :disabled="loading"
              size="medium"
              style="padding: 0 10px"
              @click="getSortData"
            >
              优惠活动排序
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
          :data="list"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
          <el-table-column align="center" label="活动ID" prop="id" width="200px">
          </el-table-column>
          <el-table-column
            prop="activityName"
            align="center"
            label="活动名称"
            width="150px"
          >
          </el-table-column>
          <el-table-column
            prop="discountTagId"
            align="center"
            label="活动页签"
            width="120px"
          >
            <template slot-scope="scope">
              <span v-for="item in activityList" :key="item.id">
                {{ scope.row.discountTagId === item.id + "" ? item.activityName : "" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="activityType"
            align="center"
            label="活动模板"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{
                typeFilter(scope.row.activityType, "operateDiscountActivityType")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="activityTitle"
            label="活动主标题"
            width="155px"
          >
          </el-table-column>
          <el-table-column align="center" prop="activityWashCodeTimes" label="洗码倍率">
          </el-table-column>
          <el-table-column
            align="center"
            prop="activityAppTypeName"
            label="活动支持终端"
            width="155px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="activityUserTypeName"
            label="活动支持账户类型"
            width="155px"
          >
          </el-table-column>
          <el-table-column align="center" prop="activityPrescription" label="活动时效">
            <template slot-scope="scope">
              <span>{{
                typeFilter(scope.row.activityPrescription, "operateValidityType")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="activityPictureUpAt"
            align="center"
            label="活动图时间"
            width="155px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.activityPrescription === 0">
                {{ scope.row.activityPictureUpAt }}
                <br />
                至
                <br />
                {{ scope.row.activityPictureDownAt }}
              </span>
              <span v-else>
                {{ scope.row.activityPictureUpAt }}
                <br />
                至
                <br />
                --
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="activityStartAt"
            align="center"
            label="活动时间"
            width="155px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.activityPrescription === 0">
                {{ scope.row.activityStartAt }}
                <br />
                至
                <br />
                {{ scope.row.activityEndAt }}
              </span>
              <span v-else>
                {{ scope.row.activityStartAt }}
                <br />
                至
                <br />
                --
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0" class="disableRgba">
                {{ typeFilter(scope.row.status, "operateStatus") }}
              </span>
              <span v-else class="normalRgba">
                {{ typeFilter(scope.row.status, "operateStatus") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="activityEnterPicture" align="center" label="入口图">
            <template slot-scope="scope">
              <span class="text-link" @click="lookImg(scope.row.activityEnterPicture)">
                点击预览
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="activitySharePicture" align="center" label="分享图">
            <template slot-scope="scope">
              <span class="text-link" @click="lookImg(scope.row.activitySharePicture)">
                点击预览
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdBy"
            align="center"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="createdAt"
            align="center"
            label="创建时间"
            width="155px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="updatedBy"
            align="center"
            label="最近操作人"
          ></el-table-column>
          <el-table-column
            prop="updatedAt"
            align="center"
            label="最近操作时间"
            width="155px"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="operating"
            align="center"
            label="操作"
            width="240px"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 0"
                :disabled="loading"
                type="success"
                size="medium"
                class="noicon"
                @click="changeStatus(scope.row)"
              >
                开启
              </el-button>
              <el-button
                v-else
                :disabled="loading"
                type="danger"
                size="medium"
                class="noicon"
                @click="changeStatus(scope.row)"
              >
                禁用
              </el-button>

              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="openEdit(scope.row)"
              >
                编辑信息
              </el-button>
              <el-button
                v-if="scope.row.status === 0"
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="deleteBtn(scope.row)"
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
    </div>
    <div v-else class="game-container report-container editPicturePage">
      <div class="editPicturePage-content">
        <div class="form-header">
          <span>创建/编辑</span>
          <span>
            <el-button type="info" @click="clear">取消</el-button>
            <el-button type="success" @click="subAddOrEdit">保存</el-button>
          </span>
        </div>
        <div class="content-part2">
          <el-form
            ref="formSub"
            class="agent-form"
            :inline="true"
            :model="dialogForm"
            label-width="154px"
          >
            <el-form-item
              label="活动名称:"
              class="tagheight"
              prop="activityName"
              :rules="[
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dialogForm.activityName"
                placeholder="请输入"
                maxlength="20"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活动页签:"
              class="tagheight"
              prop="discountTagId"
              :rules="[{ required: true, message: '请选择活动页签', trigger: 'change' }]"
            >
              <el-select
                v-model="dialogForm.discountTagId"
                placeholder="请选择"
                clearable
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in activityList"
                  :key="item.id"
                  :label="item.activityName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动模板:"
              class="tagheight"
              prop="activityType"
              :rules="[{ required: true, message: '请选择活动模板', trigger: 'change' }]"
            >
              <el-select
                v-model="dialogForm.activityType"
                placeholder="请选择"
                clearable
                :popper-append-to-body="false"
                @change="activityTemplate"
              >
                <el-option
                  v-for="item in operateDiscountActivityType"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="活动主标题:"
              class="tagheight"
              prop="activityTitle"
              :rules="[
                { required: true, message: '请输入活动主标题', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dialogForm.activityTitle"
                placeholder="请输入"
                maxlength="20"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活动支持终端:"
              class="tagheight"
              prop="activityAppType"
              :rules="[
                {
                  required: true,
                  message: '请选择活动支持终端',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.activityAppType"
                placeholder="请选择"
                multiple
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in operateActivitySupportClient"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动支持账户类型:"
              class="tagheight"
              prop="activityUserType"
              :rules="[
                {
                  required: true,
                  message: '请选择活动生效的账户类型',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.activityUserType"
                placeholder="请选择"
                multiple
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in operateActivityUserType"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动时效:"
              class="tagheight"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <el-select
                v-model="dialogForm.activityPrescription"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in operateValidityType"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="活动图上架时间:"
              label-width="125px"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <el-date-picker
                v-model="activityPictureUpAt"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateNow"
                type="datetime"
                align="right"
                :clearable="false"
                @change="changeUpAtTime"
              ></el-date-picker>
              <span v-show="imageUpTime" class="el-form-item__error">
                活动图上架时间不能大于活动图下架时间
              </span>
            </el-form-item>
            <el-form-item
              v-if="dialogForm.activityPrescription === '0'"
              label="活动图下架时间:"
              label-width="125px"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                v-model="activityPictureDownAt"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateEnd"
                type="datetime"
                align="right"
                :clearable="false"
                @change="changeDownAtTime"
              ></el-date-picker>
              <span v-show="imageUpTime" class="el-form-item__error">
                活动图下架时间不能小于活动图上架时间
              </span>
            </el-form-item>
            <br />
            <el-form-item
              label="活动开始时间:"
              label-width="125px"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <el-date-picker
                v-model="activityStartAt"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="activityNow"
                type="datetime"
                align="right"
                :clearable="false"
              ></el-date-picker>
              <span v-show="activityTime" class="el-form-item__error">
                活动开始时间不能大于活动结束时间
              </span>
            </el-form-item>
            <el-form-item
              v-if="dialogForm.activityPrescription === '0'"
              label="活动结束时间:"
              label-width="125px"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                v-model="activityEndAt"
                size="medium"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="activityEnd"
                type="datetime"
                align="right"
                :clearable="false"
              ></el-date-picker>
              <span v-show="activityTime" class="el-form-item__error">
                活动开始时间不能小于活动结束时间
              </span>
            </el-form-item>
            <el-form-item
              label="入口图片上传:"
              prop="activityEnterPicture"
              style="width: 400px"
              :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
            >
              <UploadItem
                ref="imgUpload1"
                :upload-file-type="'image'"
                :platform="'PC'"
                :img-urls="dialogForm.activityEnterPicture"
                @upoladItemSucess="handleUploadSucessEnter"
                @startUpoladItem="handleStartUploadEnter"
                @deleteUpoladItem="handleDeleteUploadEnter"
                @upoladItemDefeat="handleUploadDefeatEnter"
              ></UploadItem>
              <div class="remakeBox">
                <span class="danger">*</span>图片格式仅支持png，jpg <br />
                <span class="danger">*</span>图片大小不能超过2MB
              </div>
            </el-form-item>
            <el-form-item
              label="活动详情跳转地址:"
              class="tagheight"
              prop="activityForwordLink"
              :rules="[
                { required: true, message: '请输入活动详情跳转地址', trigger: 'blur' },
                {
                  min: 1,
                  max: 2038,
                  message: '长度在 1 到 2038 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="dialogForm.activityForwordLink"
                placeholder="请输入 "
                maxlength="2038"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="分享图片上传:"
              prop="activitySharePicture"
              :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
            >
              <UploadItem
                ref="imgUpload2"
                :upload-file-type="'image'"
                :platform="'PC'"
                :img-urls="dialogForm.activitySharePicture"
                @upoladItemSucess="handleUploadSucessShare"
                @startUpoladItem="handleStartUploadShare"
                @deleteUpoladItem="handleDeleteUploadShare"
                @upoladItemDefeat="handleUploadDefeatShare"
              ></UploadItem>
              <div class="remakeBox">
                <span class="danger">*</span>图片格式仅支持png，jpg <br />
                <span class="danger">*</span>图片大小不能超过2MB
              </div>
            </el-form-item>
            <el-form-item
              label="分享链接:"
              class="tagheight"
              prop="activityShareLink"
              :rules="[
                { required: true, message: '请输入分享链接', trigger: 'blur' },
                {
                  min: 1,
                  max: 2038,
                  message: '长度在 1 到 2038 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="dialogForm.activityShareLink"
                placeholder="请输入 "
                maxlength="2038"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="洗码倍率:"
              class="numberBox tagheight"
              prop="activityWashCodeTimes"
              :rules="[{ required: true, message: '请输入洗码倍率', trigger: 'blur' }]"
            >
              <el-input-number
                v-model="dialogForm.activityWashCodeTimes"
                clearable
                :max="999.99"
                :precision="2"
                size="medium"
                placeholder="请输入"
              ></el-input-number>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item
              v-if="dialogForm.activityType === '0'"
              label="场馆名称:"
              class="tagheight"
              prop="venueOrPayType"
              :rules="[
                {
                  required: true,
                  message: '请选择',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.venueOrPayType"
                placeholder="请选择"
                multiple
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in gameTypeList"
                  :key="item.gameCode"
                  :label="item.gameName"
                  :value="item.gameCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else
              label="支付方式:"
              class="tagheight"
              prop="venueOrPayType"
              :rules="[
                {
                  required: true,
                  message: '请选择',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.venueOrPayType"
                placeholder="请选择"
                multiple
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in enumPaymentDepositType"
                  :key="item.code"
                  :label="item.description"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="充值金额大于等于:"
              class="numberBox tagheight"
              prop="activityRechargeMoney"
              :rules="[{ required: true, message: '请输入充值金额', trigger: 'blur' }]"
            >
              <el-input-number
                v-model="dialogForm.activityRechargeMoney"
                clearable
                :max="9999999999"
                size="medium"
                placeholder="请输入"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="优惠方式:"
              class="tagheight"
              :rules="[
                {
                  required: true,
                  message: '请选择优惠方式',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="dialogForm.activityDiscountType"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option label="百分比" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="优惠百分比:"
              class="numberBox tagheight"
              prop="activityDiscountScale"
              :rules="[
                {
                  required: true,
                  message: '请输入优惠百分比',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="dialogForm.activityDiscountScale"
                clearable
                :max="99.99"
                :precision="2"
                size="medium"
                placeholder="请输入"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              v-if="dialogForm.activityType === '0'"
              label="最高赠送总金额:"
              class="numberBox tagheight"
              prop="activityGiveMaxMoney"
              :rules="[
                {
                  required: true,
                  message: '请输入最高赠送总金额',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="dialogForm.activityGiveMaxMoney"
                clearable
                :max="9999999999"
                size="medium"
                placeholder="请输入"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              v-else
              label="单日最高赠送总金额:"
              class="numberBox tagheight"
              prop="activityGiveMaxMoney"
              :rules="[
                {
                  required: true,
                  message: '请输入单日最高赠送总金额',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="dialogForm.activityGiveMaxMoney"
                clearable
                :max="9999999999"
                size="medium"
                placeholder="请输入"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="imgVisible" class="imgCenter" @click="closeImage">
      <img :src="bigImage" />
    </div>
    <el-dialog
      title="设置排序"
      :visible.sync="sortVisible"
      :destroy-on-close="true"
      center
      class="rempadding"
    >
      <table class="nativeTable">
        <tr>
          <td class="first">优惠活动页签</td>
          <td class="last">
            <el-select
              v-model="promotionTab"
              placeholder="请选择"
              :popper-append-to-body="false"
              @change="getActivity"
            >
              <el-option
                v-for="item in activityList"
                :key="item.id"
                :label="item.activityName"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="first">活动区域排序</td>
          <td class="last">
            <div v-if="activityAreaSorting.length <= 0" class="nullData">暂无数据</div>
            <draggable
              v-else
              v-model="activityAreaSorting"
              @start="startChange"
              @end="endChange"
            >
              <transition-group class="sortCss">
                <div
                  v-for="itme in activityAreaSorting"
                  :key="itme.id"
                  :class="{ open: itme.status === 1, close: itme.status === 0 }"
                >
                  {{ itme.activityName }}({{ typeFilter(itme.status, "operateStatus") }})
                </div>
              </transition-group>
            </draggable>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sortVisible = false">取消</el-button>
        <el-button type="primary" @click="subSort">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import UploadItem from '@/components/UploadItem'
import draggable from 'vuedraggable'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()
export default {
  components: { UploadItem, draggable },
  mixins: [list],
  data() {
    return {
      queryData: {},
      dialogFormVisible: false,
      dialogForm: {
        activityType: '0',
        activityAppType: ['1'],
        activityUserType: ['0'],
        activityPrescription: '0',
        activityDiscountType: 0,
        activityEnterPicture: null,
        activitySharePicture: null,
        venueOrPayType: ['qp']
      },
      promotionTab: '',
      activityList: [],
      gameTypeList: [],
      activityAreaSorting: [],
      activityPictureUpAt: Date.now(),
      activityPictureDownAt: endTime,
      activityStartAt: Date.now(),
      activityEndAt: endTime,
      dateNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dateEnd: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      },
      activityNow: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      activityEnd: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      bigImage: '',
      imgVisible: false,
      sortVisible: false,
      addOrEdit: 'add'
    }
  },
  computed: {
    operateStatus() {
      return this.globalDics.operateStatus
    },
    operateVipActivityType() {
      return this.globalDics.operateVipActivityType
    },
    operateValidityType() {
      return this.globalDics.operateValidityType
    },
    operateActivitySupportClient() {
      return this.globalDics.operateActivitySupportClient
    },
    operateActivityUserType() {
      return this.globalDics.operateActivityUserType
    },
    operateDiscountActivityType() {
      return this.globalDics.operateDiscountActivityType
    },
    enumPaymentDepositType() {
      return this.globalDics.enumPaymentDepositType
    },

    imageUpTime() {
      if (
        this.dialogForm.activityPrescription === '0' &&
        this.activityPictureUpAt < this.activityPictureDownAt
      ) {
        return false
      } else if (this.dialogForm.activityPrescription === '1') {
        return false
      } else {
        return true
      }
    },
    activityTime() {
      if (
        this.dialogForm.activityPrescription === '0' &&
        this.activityStartAt < this.activityEndAt
      ) {
        return false
      } else if (this.dialogForm.activityPrescription === '1') {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    activityPictureUpAt: {
      handler(newV, oldV) {
        const DownAt = this.activityPictureDownAt
        this.dateEnd = {
          disabledDate(time) {
            return time.getTime() < newV - 24 * 60 * 60 * 1000 + 1000
          }
        }
        this.activityNow = {
          disabledDate(time) {
            return (
              time.getTime() < newV - 24 * 60 * 60 * 1000 + 1000 ||
              time.getTime() > DownAt
            )
          }
        }
        this.activityEnd = {
          disabledDate(time) {
            console.log(
              time.getTime() < newV - 24 * 60 * 60 * 1000 + 1000,
              time.getTime() > DownAt
            )
            return (
              time.getTime() < newV - 24 * 60 * 60 * 1000 + 1000 ||
              time.getTime() > DownAt
            )
          }
        }
      },
      deep: true
    },
    activityPictureDownAt: {
      handler(newV, oldV) {
        const UpAt = this.activityPictureUpAt
        this.activityNow = {
          disabledDate(time) {
            return (
              time.getTime() > newV || time.getTime() < UpAt - 24 * 60 * 60 * 1000 + 1000
            )
          }
        }
        this.activityEnd = {
          disabledDate(time) {
            return (
              time.getTime() > newV || time.getTime() < UpAt - 24 * 60 * 60 * 1000 + 1000
            )
          }
        }
      },
      deep: true
    },
    activityStartAt: {
      handler(newV, oldV) {
        const DownAt = this.activityPictureDownAt
        this.activityEnd = {
          disabledDate(time) {
            return (
              time.getTime() < newV - 24 * 60 * 60 * 1000 + 1000 ||
              time.getTime() > DownAt
            )
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.seleceInit()
  },
  methods: {
    loadData() {
      const params = {
        ...this.getParams(this.queryData)
      }
      this.loading = true
      this.$api
        .getOperateDiscountActivityQueryList(params)
        .then((res) => {
          if (res.code === 200) {
            const response = res.data
            this.loading = false
            this.list = response.records
            this.total = response.total
          } else {
            this.loading = false
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    seleceInit() {
      this.$api.configDiscountTagQueryNames().then((res) => {
        if (res.code === 200) {
          this.activityList = res.data
        }
      })
      this.$api.getMerchantGameGamePlant().then((res) => {
        if (res.code === 200) {
          this.gameTypeList = res.data
        }
      })
    },
    getSortData() {
      this.seleceInit()
      this.promotionTab = ''
      this.activityAreaSorting = []
      this.sortVisible = true
    },
    getActivity(val) {
      this.$api
        .getOperateDiscountActivityQueryActivityNameListByTag({ tagId: val })
        .then((res) => {
          if (res.code === 200) {
            this.activityAreaSorting = res.data
          }
        })
    },
    startChange() {
      this.drag = true
    },
    endChange() {
      this.drag = false
    },
    subSort() {
      const arr = this.activityAreaSorting
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]
        newArr.push(ele.id)
      }
      const sortIds = newArr.join(',')
      console.log(sortIds)
      this.$api.setOperateDiscountActivitySort({ sortIds: sortIds }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.sortVisible = false
          this.loadData()
        }
      })
    },
    subAddOrEdit() {
      if (this.dialogForm.activityPrescription === '0') {
        this.dialogForm.activityPictureUpAt = dayjs(this.activityPictureUpAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.dialogForm.activityPictureDownAt = dayjs(this.activityPictureDownAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.dialogForm.activityStartAt = dayjs(this.activityStartAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.dialogForm.activityEndAt = dayjs(this.activityEndAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      } else {
        this.dialogForm.activityPictureUpAt = dayjs(this.activityPictureUpAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.dialogForm.activityStartAt = dayjs(this.activityStartAt).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        delete this.dialogForm.activityPictureDownAt
        delete this.dialogForm.activityEndAt
      }
      console.log(this.dialogForm)
      this.$refs.formSub.validate((valid) => {
        if (valid && !this.imageUpTime && !this.activityTime) {
          const params = { ...this.dialogForm }
          params.venueOrPayType = params.venueOrPayType.join(',')
          params.activityAppType = params.activityAppType.join(',')
          params.activityUserType = params.activityUserType.join(',')
          console.log(params)
          if (this.addOrEdit === 'add') {
            this.setOperateDiscountActivityAdd(params)
          } else {
            this.setOperateDiscountActivityUpdate(params)
          }
        }
      })
    },
    // 新增保存
    setOperateDiscountActivityAdd(val) {
      this.$api.setOperateDiscountActivityAdd(val).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '新增成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.loadData()
        }
      })
    },
    // 修改保存
    setOperateDiscountActivityUpdate(val) {
      this.$api.setOperateDiscountActivityUpdate(val).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.loadData()
        }
      })
    },
    changeUpAtTime(val) {
      const Timestamp = new Date(new Date(val).toLocaleDateString()).getTime()
      if (Timestamp === startTime) {
        this.activityPictureUpAt = Date.now()
        this.activityStartAt = Date.now()
      } else {
        this.activityPictureUpAt = Timestamp
        this.activityStartAt = Timestamp
      }
    },
    changeDownAtTime(val) {
      this.activityPictureDownAt = val
      this.activityEndAt = val
    },
    clear() {
      this.$refs.formSub.resetFields()
      this.activityPictureUpAt = Date.now()
      this.activityPictureDownAt = endTime
      this.dialogFormVisible = false
    },

    openEdit(row) {
      this.addOrEdit = 'edit'
      this.dialogForm = { ...row }
      this.dialogForm.activityType = row.activityType + ''
      this.dialogForm.discountTagId = row.discountTagId * 1
      this.dialogForm.venueOrPayType = row.venueOrPayType.split(',')
      this.dialogForm.activityAppType = row.activityAppType.split(',')
      this.dialogForm.activityUserType = row.activityUserType.split(',')
      this.dialogForm.activityPrescription = row.activityPrescription + ''
      this.dialogFormVisible = true
      console.log(this.dialogForm)
      this.$nextTick(() => {
        this.$refs.imgUpload1.state = 'image'
        this.$refs.imgUpload1.fileUrl = row.activityEnterPicture
        this.$refs.imgUpload2.state = 'image'
        this.$refs.imgUpload2.fileUrl = row.activitySharePicture
      })
    },

    changeStatus(val) {
      this.$confirm(
        `<strong>是否对该配置进行${val === 0 ? '开启' : '禁用'}操作?</strong></br><span>${
          val.activityAppTypeName
        }</span>`,
        '确认提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api
            .setOperateDiscountActivityUse({
              id: val.id,
              status: val.status === 0 ? 1 : 0
            })
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功！',
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
            .catch(() => {})
        })
        .catch(() => {})
    },
    deleteBtn(row) {
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
          this.$api.setOperateDiscountActivityDelete({ id: row.id }).then((res) => {
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
        .catch(() => {})
    },
    reset() {
      this.queryData = {}
      this.pageNum = 1
      this.loadData()
    },
    Add() {
      this.addOrEdit = 'add'
      this.dialogForm = {
        activityType: '0',
        venueOrPayType: ['qp'],
        activityAppType: ['1'],
        activityUserType: ['0'],
        activityDiscountType: 0,
        activityPrescription: '0',
        activityEnterPicture: null,
        activitySharePicture: null
      }
      console.log(this.dialogForm)
      this.activityPictureUpAt = Date.now()
      this.activityPictureDownAt = endTime
      this.dialogFormVisible = true
    },
    activityTemplate(val) {
      if (val === '0') {
        this.dialogForm.venueOrPayType = ['qp']
      } else {
        this.dialogForm.venueOrPayType = ['1']
      }
    },
    lookImg(val) {
      this.imgVisible = true
      this.bigImage = val
    },
    closeImage() {
      this.imgVisible = false
    },
    handleStartUploadEnter() {
      this.$message.info('图片开始上传')
    },
    handleUploadSucessEnter({ index, file, id }) {
      this.dialogForm.activityEnterPicture = file.imgUrl
      this.$refs['formSub'].validateField('activityEnterPicture')
    },
    handleUploadDefeatEnter() {
      this.dialogForm.activityEnterPicture = ''
      this.$message.error('图片上传失败')
    },
    handleDeleteUploadEnter() {
      this.dialogForm.activityEnterPicture = ''
      this.$message.warning('图片已被移除')
    },
    handleStartUploadShare() {
      this.$message.info('图片开始上传')
    },
    handleUploadSucessShare({ index, file, id }) {
      this.dialogForm.activitySharePicture = file.imgUrl
      this.$refs['formSub'].validateField('activitySharePicture')
    },
    handleUploadDefeatShare() {
      this.dialogForm.activitySharePicture = ''
      this.$message.error('图片上传失败')
    },
    handleDeleteUploadShare() {
      this.dialogForm.activitySharePicture = ''
      this.$message.warning('图片已被移除')
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'createdAt') {
        prop = 0
      } else {
        prop = 1
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
    enterSearch() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
/deep/ .tagheight {
  .el-form-item__content,
  .el-select,
  .el-input__inner {
    width: 480px;
  }
}
.editPicturePage {
  background-color: #f5f5f5;
  margin: 0;

  padding: 15px 0 20px;
  .editPicturePage-content {
    width: 825px;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    .form-header {
      height: 55px;
      line-height: 55px;
      width: 100%;
      background-color: rgba(0, 0, 0, 1);
      span:nth-child(1) {
        position: absolute;
        left: 30px;
        top: 0;
        color: rgba(255, 255, 255, 0.847058823529412);
        font-size: 16px;
        font-weight: 700;
      }
      span:nth-child(2) {
        position: absolute;
        right: 30px;
        top: 0;
        color: #999;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .form-header:after {
      content: ".";
      height: 0;
      display: table;
      clear: both;
    }
    .content-part2 {
      width: 100%;
      padding: 25px 30px 20px;
      position: relative;
      margin: 0 auto;
      /deep/.agent-form {
        padding: 20px;
        max-height: 600px;
        overflow: auto;
        box-shadow: rgba(88, 88, 88, 0.35) 0px 0px 5px;
        .remakeBox {
          width: 164px;
          position: absolute;
          left: 200px;
          bottom: 0;
          line-height: 20px;
        }
      }
    }
  }
}
.nativeTable {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  tr td {
    border: solid 1px #eee;
  }
  .first {
    width: 100px;
  }
  .last {
    .el-select {
      width: 60%;
      text-align: left;
    }
    .nullData {
      height: 35px;
      line-height: 35px;
    }
  }
}
.sortCss {
  cursor: pointer;
  div {
    color: #ffffff;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    margin: 5px;
    border: solid 1px #eee;
    display: inline-block;
    background-color: #1abc9c;
  }
  .open {
    background-color: #1abc9c;
  }
  .close {
    background-color: #d9001b;
  }
}
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
  display: none;
}
.numberBox /deep/.el-input__inner {
  padding: 0 15px;
  text-align: left;
}
</style>
