<template>
	<div class="deliverySetting">
		<div class="deliverySetting-btn">
			<div class="tabs-btn ac">
				<input
					type="button"
					value="分配派送商"
					@click="showSetDistributorDailog"
				/>
			</div>
			<div class="tabs-btn ac">
				<input
					type="button"
					value="取消分配"
					@click="showCancelDistributorDailog"
				/>
			</div>
		</div>

		<div class="deliverySetting-table">
			<div class="table-head">
				<div class="selection">
					<el-checkbox
						v-model="ischeckAll"
						:indeterminate="indeterminate"
						@change="handleCheckAllChange"
					></el-checkbox>
				</div>
				<div class="width185">分区名称</div>
				<div class="width265">国家</div>
				<div>派送商</div>
			</div>
			<div
				v-for="(partition, partitionIndex) in distributorsInfo"
				:key="partitionIndex"
				class="table-body"
			>
				<div class="selection">
					<p>
						<el-checkbox
							:key="partitionIndex"
							v-model="partition.selected"
							:indeterminate="partition.indeterminate"
							@change="
								handleCheckedCountryAllChange(
									partitionIndex,
									partition.partitionId,
									$event
								)
							"
						></el-checkbox>
					</p>
				</div>
				<div class="width185">
					<p>{{ partition.partitionName }}</p>
				</div>
				<div class="width265">
					<el-checkbox
						v-for="country in partition.country"
						:key="country.id"
						v-model="country.selected"
						:label="country"
						@change="
							handleCheckedCountryChange(
								partitionIndex,
								country.id,
								partition.partitionId,
								$event
							)
						"
					>
						{{ country.fieldName }}
					</el-checkbox>
				</div>
				<div>
					<p v-for="(item, index) in partition.country" :key="index">
						{{ item.distributors }}
					</p>
				</div>
			</div>
		</div>

		<!-- 分配派送商dailog -->
		<el-dialog
			title="分配派送商"
			:visible.sync="setDistributorDailog"
			width="480px"
		>
			<el-form
				:model="distributorForm"
				:rules="rules"
				class="setDistributorDailog"
			>
				<el-form-item label="派送代理商" label-width="120px">
					<el-input
						v-model="distributorForm.vendorName"
						auto-complete="off"
						placeholder="请输入供应商名称"
					></el-input>
				</el-form-item>
				<el-form-item label="末端派送商" prop="senderName" label-width="120px">
					<el-select
						v-model="distributorForm.senderName"
						filterable
						allow-create
						default-first-option
						placeholder="请选派送商名称"
					>
						<el-option label="派送商1" value="shanghai"></el-option>
						<el-option label="派送商2" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="派送商官网" prop="website" label-width="120px">
					<el-input
						v-model="distributorForm.website"
						auto-complete="off"
						placeholder="请输入派送商官网"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="setDistributorDailog = false">取 消</el-button>
				<el-button type="primary" @click="setDistributorDailog = false">
					确 定
				</el-button>
			</div>
		</el-dialog>

		<!-- 取消分配派送商 -->
		<el-dialog
			title="停止提示"
			:visible.sync="cancelDistributorDailog"
			:modal="false"
			width="480px"
			custom-class="stop-coupon-dialog"
		>
			<p><br /></p>
			<p class="ac f16">您确定要取消对的派送分配吗？</p>
			<p><br /></p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelDistributorDailog = false">取 消</el-button>
				<el-button type="primary" @click="cancelDistributorDailog = false">
					确 定
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'DeliverySetting',
	components: {},
	props: {},
	data() {
		return {
			distributorsInfo: [
				{
					partitionName: '1区',
					selected: false,
					partitionId: 1,
					isIndeterminate: false,
					country: [
						{
							id: '1',
							fieldName: '奥地利',
							fieldTableName: '奥地利',
							distributors: 'UPS',
							selected: false
						},
						{
							id: '2',
							fieldName: '芬兰',
							fieldTableName: '芬兰',
							distributors: 'UPS',
							selected: false
						},
						{
							id: '3',
							fieldName: '意大利',
							fieldTableName: '意大利',
							distributors: 'UPS',
							selected: false
						},
						{
							id: '4',
							fieldName: '葡萄牙',
							fieldTableName: '葡萄牙',
							distributors: 'UPS',
							selected: false
						},
						{
							id: '9',
							fieldName: '西班牙',
							fieldTableName: '西班牙',
							distributors: 'UPS',
							selected: false
						},
						{
							id: '10',
							fieldName: '瑞典',
							fieldTableName: '瑞典',
							distributors: 'UPS',
							selected: false
						}
					]
				},
				{
					partitionName: '2区',
					selected: false,
					partitionId: 2,
					isIndeterminate: false,
					country: [
						{
							id: '5',
							fieldName: '丹麦',
							fieldTableName: '单买',
							distributors: '',
							selected: false
						},
						{
							id: '6',
							fieldName: '法国',
							fieldTableName: '法国',
							distributors: '',
							selected: false
						}
					]
				},
				{
					partitionName: '3区',
					selected: false,
					partitionId: 3,
					isIndeterminate: false,
					country: [
						{
							id: '7',
							fieldName: '德国',
							fieldTableName: '德国',
							distributors: 'YODEL',
							selected: false
						},
						{
							id: '8',
							fieldName: '瑞士',
							fieldTableName: '瑞士',
							distributors: 'DPD',
							selected: false
						}
					]
				}
			],
			ischeckAll: false, // 一级全选状态
			setDistributorDailog: false,
			cancelDistributorDailog: false,
			distributorForm: {
				vendorName: '',
				senderName: ''
			},
			indeterminate: false,
			rules: {
				senderName: [
					{ required: true, message: '字段不能为空', trigger: 'blur' }
				],
				website: [{ required: true, message: '字段不能为空', trigger: 'blur' }]
			}
		}
	},
	computed: {},
	watch: {},
	created: function() {},
	mounted: function() {
		// (async() => {
	},
	methods: {
		handleCheckAllChange(e) {
			// 一级change事件
			this.ischeckAll = e
			if (e === true) {
				this.indeterminate = false
				for (var i = 0, len = this.distributorsInfo.length; i < len; i++) {
					// 二级全选反选不确定
					this.distributorsInfo[i].selected = e
					for (
						var j = 0, len1 = this.distributorsInfo[i].country.length;
						j < len1;
						j++
					) {
						this.distributorsInfo[i].country[j].selected = e
					}
				}
			} else {
				this.indeterminate = false
				for (let i = 0, len = this.distributorsInfo.length; i < len; i++) {
					// 三级全选反选不确定
					this.distributorsInfo[i].selected = e
					for (
						let j = 0, len1 = this.distributorsInfo[i].country.length;
						j < len1;
						j++
					) {
						this.distributorsInfo[i].country[j].selected = e
					}
				}
			}
		},
		handleCheckedCountryAllChange(index, topId, e) {
			// 二级change事件
			this.distributorsInfo[index].selected = e // 二级勾选后，子级全部勾选或者取消
			if (e === false) this.distributorsInfo[index].indeterminate = false // 去掉二级不确定状态
			const childrenArray = this.distributorsInfo[index].country
			if (childrenArray) {
				for (let i = 0, len = childrenArray.length; i < len; i++) {
					childrenArray[i].selected = e
				}
			}

			this.getIsCheckAll()
		},
		handleCheckedCountryChange(topIndex, sonId, topId, e) {
			// 三级change事件
            const childrenArray = this.distributorsInfo[topIndex].country
            let tickCount = 0
            let unTickCount = 0
            const len = childrenArray.length
			for (let i = 0; i < len; i++) {
				if (sonId === childrenArray[i].id) childrenArray[i].selected = e
				if (childrenArray[i].selected === true) tickCount++
				if (childrenArray[i].selected === false) unTickCount++
			}
			if (tickCount === len) {
				// 三级级全勾选
				this.distributorsInfo[topIndex].selected = true
				this.distributorsInfo[topIndex].indeterminate = false
			} else if (unTickCount === len) {
				// 三级级全不勾选
				this.distributorsInfo[topIndex].selected = false
				this.distributorsInfo[topIndex].indeterminate = false
			} else {
				this.distributorsInfo[topIndex].selected = false
				this.distributorsInfo[topIndex].indeterminate = true // 添加二级不确定状态
			}

			this.getIsCheckAll()
		},
		getIsCheckAll() {
            let tickCount = 0
            let unTickCount = 0
            const ArrLength = this.distributorsInfo.length
			for (let j = 0; j < ArrLength; j++) {
				// 全选checkbox状态
				if (this.distributorsInfo[j].selected === true) tickCount++
				if (this.distributorsInfo[j].selected === false) unTickCount++
			}
			if (tickCount === ArrLength) {
				// 二级全勾选
				this.ischeckAll = true
				this.indeterminate = false
			} else if (unTickCount === ArrLength) {
				// 二级全不勾选
				this.ischeckAll = false
				this.indeterminate = false
			} else {
				this.ischeckAll = false
				this.indeterminate = true // 添加一级不确定状态
			}
		},

		showSetDistributorDailog() {
			this.setDistributorDailog = true
		},
		showCancelDistributorDailog() {
			this.cancelDistributorDailog = true
		}
	}
}
</script>
<style lang="scss">
.deliverySetting {
	padding: 20px 0;
	position: relative;
	.el-table {
		thead {
			tr {
				th {
					font-size: 14px;
				}
			}
		}
		tbody {
			tr {
				td {
					vertical-align: baseline;
					p {
						line-height: 30px;
					}
					.el-checkbox-group {
						display: flex;
						flex-direction: column;
						label {
							line-height: 30px;
							margin-left: 0;
						}
					}
				}
			}
		}
	}
	.deliverySetting-table {
		font-size: 14px;
		color: #333;
		.table-head,
		.table-body {
			display: flex;
			padding: 10px 0;
			.selection {
				width: 45px;
				text-align: center;
				line-height: 36px;
			}
			.width185 {
				width: 185px;
			}
			.width265 {
				width: 265px;
			}
		}
		.table-head {
			height: 36px;
			align-items: center;
			background-color: #e7f2ff;
		}
		.table-body {
			border-bottom: 1px solid #e4e4e4;
			color: #666;
			&:hover {
				background-color: #f5f7fa;
			}
			.width265 {
				display: flex;
				flex-direction: column;
				label {
					line-height: 30px;
					margin-left: 0;
					color: #666;
				}
			}
			p {
				line-height: 30px;
			}
		}
	}
	.deliverySetting-btn {
		/*width: 100%;*/
		height: 59px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		top: -55px;
		right: -16px;
		z-index: 100;
		.tabs-btn {
			min-width: 90px;
			height: 34px;
			line-height: 32px;
			padding: 0 10px;
			color: #2387f7;
			border: solid 1px #4fa2ff;
			background-color: #e7f2ff;
			cursor: pointer;
			&:nth-of-type(2) {
				margin: 0 15px;
			}
			input {
				border: none;
				background: transparent;
				color: inherit;
				cursor: inherit;
				outline: none;
				margin: 0;
				padding: 0;
			}
			&:hover {
				color: #fff;
				background-color: #2387f7;
			}
		}
	}
	.setDistributorDailog {
		.el-input {
			width: 270px;
		}
	}
}
</style>
