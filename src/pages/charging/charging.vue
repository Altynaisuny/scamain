<template>
  <div id="app-charging">
    <el-row>
      <el-col :span="2" :offset="8">
        <i class="el-icon-information"></i>
        请扫码
      </el-col>
      <el-col :span="4">
        <el-input v-model="bar" placeholder="请输入" autofocus></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="2" :offset="8">
        <i class="el-icon-information"></i>
        请选择店铺
      </el-col>
      <el-col :span="4" v-if="isSystem">
        <el-select v-model="shopId" filterable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.shopId">
            <span style="float: left">{{ item.shopId }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-else>
        <el-input
          v-model="shopId"
          :disabled="true"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="5">
        <el-button type="text" icon="plus" @click="dialogNewShop = true">新增阶段计费</el-button>
      </el-col>
    </el-row>
    <el-row class="app-charging-table">
      <el-col :span="14" :offset="5">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="price"
            label="价格"
          >
          </el-table-column>
          <el-table-column
            prop="duration"
            label="截止时间"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="5">
        <el-table
          :data="sectionConsumeTableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="price"
            label="价格"
          >
          </el-table-column>
          <el-table-column
            prop="duration"
            label="截止时间"
          >
          </el-table-column>
          <el-table-column
            label="计费周期(分钟)"
            prop="pattern"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete2(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--第一阶段维护-->
    <el-dialog title="产品价格维护" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">

        <el-form-item label="店铺id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-select v-model="formEdit.shopId" filterable v-if="isSystem">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.shopId">
              <span style="float: left">{{ item.shopId }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
          <el-input v-model="shopId" :disabled="true" v-else></el-input>
        </el-form-item>

        <el-form-item label="截至时间" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.price" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!--第二阶段维护-->
    <el-dialog title="产品价格维护" :visible.sync="dialogFormVisible2">
      <el-form :model="formEdit2">
        <el-form-item label="店铺id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-select v-model="formEdit2.shopId" filterable v-if="isSystem">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.shopId">
              <span style="float: left">{{ item.shopId }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
          <el-input v-model="shopId" :disabled="true" v-else></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit2.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit2.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计费周期(分钟)" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit2.pattern" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit2">取 消</el-button>
        <el-button type="primary" @click="confirmEdit2">确 定</el-button>
      </div>
    </el-dialog>

    <!--第一阶段新增-->
    <el-dialog title="新增" :visible.sync="dialogNewShop">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">价格</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="店铺" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-select v-model="shopId" filterable v-if="isSystem">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.shopId">
                  <span style="float: left">{{ item.shopId }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
              <el-input v-model="shopId" :disabled="true" v-else></el-input>
            </el-form-item>
            <el-form-item label="截至时间(分钟)" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.duration" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="价格" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.price" auto-complete="off"></el-input>
            </el-form-item>

          </el-form>
        </div>
      </el-card>
    </el-dialog>

  </div>
</template>
<script>
	import ElRow from "element-ui/packages/row/src/row";
	import ElCol from "element-ui/packages/col/src/col";

	export default {
		components: {
			ElCol,
			ElRow
		},
		data() {
			return {
				//下拉框
				options: [],
				tableData: [],
				//第二阶段
				sectionConsumeTableData: [
					{
						priceId: '',
						shopId: '',
						price: '',
						duration: '',
						pattern: ''
					}
				],
				//计费的第一个周期
				formNew: {
					duration: '',
					price: '',
					shopId: '',
					bar: ''
				},
				//计费的第二周期
				formNewSection: {
					bar: '',
					shopId: '',
					duration: '',
					pattern: '',
					price: ''
				},
				//第一阶段编辑
				formEdit: {
					priceId: '',
					duration: '',
					pattern: '',
					price: '',
					shopId: '',
          bar:''
				},
				//第二阶段编辑
				formEdit2: {
					priceId: '',
					duration: '',
					pattern: '',
					price: '',
					shopId: '',
          bar:'',
				},
				//阶段计费
				dialogNewShop: false,
				//阶段计费详情
				dialogNewSection: false,
				//店铺ID
				shopId: '',
				isSystem: false,
				formLabelWidth: '120px',
				//第一阶段编辑
				dialogFormVisible: false,
				//第二阶段编辑
				dialogFormVisible2: false,
				//扫码
				bar: '',
        barTemp:''
			}
		},
		methods: {
			search() {
				this.barTemp = '';//
				this.barTemp = this.bar;
				this.formNew.bar = this.barTemp;
				this.formEdit.bar = this.barTemp;
				this.tableData = [];
				this.sectionConsumeTableData = [];
				this.$http.post('http://lease.loverqi.cn:8080/lease/price/find.action', {
					bar: this.barTemp,
					shopId: this.shopId
				}).then((response) => {
					let body = response.data;
					if (body.code === 0) {
						//第一阶段
						this.tableData = body.data.first;
						//第二阶段
						if (body.data.second.length !== 0) {
							this.sectionConsumeTableData = body.data.second;
						} else {
							this.sectionConsumeTableData = [{
								priceId: '',
								shopId: '',
								price: '',
								duration: '',
								pattern: '',
                bar:''
							}]
						}
					} else {
						this.$message({
							type: 'error',
							message: body.message
						});
					}
				}, (error) => {
				});
				this.bar = '';
			},
			handleEdit(index, row) {
				this.dialogFormVisible = true;//打开对话框
				this.formEdit.duration = row.duration;
				this.formEdit.pattern = row.pattern;
				this.formEdit.price = row.price;
				this.formEdit.shopId = row.shopId;
				this.formEdit.priceId = row.priceId;
			},
			handleEdit2(index, row) {
				this.dialogFormVisible2 = true;//打开对话框
				this.formEdit2.duration = row.duration;
				this.formEdit2.pattern = row.pattern;
				this.formEdit2.price = row.price;
				this.formEdit2.shopId = this.shopId;
				this.formEdit2.priceId = row.priceId;
				this.formEdit2.bar = this.barTemp;//bar
			},
      //第一阶段
			handleDelete(index, row) {
				this.$confirm('删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('http://lease.loverqi.cn:8080/lease/price/delete.action', {
						priceId: row.priceId
					}).then((response) => {
						let body = response.data
						if (body.code === 0) {
							this.$message({
								type: 'success',
								message: body.message
							});
						} else {
							this.$message({
								type: 'error',
								message: body.message
							});
						}
					}, (error) => {
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
      //第二阶段
			handleDelete2(index,row){
				this.$confirm('删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('http://lease.loverqi.cn:8080/lease/price/delete.action', {
						priceId: row.priceId
					}).then((response) => {
						let body = response.data
						if (body.code === 0) {
							this.$message({
								type: 'success',
								message: body.message
							});
						} else {
							this.$message({
								type: 'error',
								message: body.message
							});
						}
					}, (error) => {
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
      },
			//第一阶段新增
			add() {
				this.$confirm('新增, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogFormVisible = false;
					this.$http.post('http://lease.loverqi.cn:8080/lease/price/update.action', {
						duration: this.formNew.duration,
						price: this.formNew.price,
						shopId: this.shopId,
						bar: this.formNew.bar
					}).then((response) => {
						let body = response.data
						if (body.code === 0) {
							this.$message({
								type: 'success',
								message: body.message + "id" + body.data.priceId
							});
							//重置
							this.reset();

						} else {
							this.$message({
								type: 'error',
								message: body.message
							});
						}
					}, (error) => {

					});
				}).catch(() => {
					this.dialogFormVisible = false;
					this.$message({type: 'info', message: '已取消操作'});
				});
			},
			//第一阶段取消修改
			cancelEdit() {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
				this.dialogFormVisible = false;
			},
			//第一阶段确定修改
			confirmEdit() {
				this.$confirm('修改信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogFormVisible = false;
						this.$http.post('http://lease.loverqi.cn:8080/lease/price/update.action', {
							duration: this.formEdit.duration,
							price: this.formEdit.price,
							shopId: this.formEdit.shopId,
              bar : this.formEdit.bar,
              priceId:this.formEdit.priceId
						}).then((response) => {
							let body = response.data
							if (body.code === 0) {
								this.$message({
									type: 'success',
									message: body.message
								});
							} else {
								this.$message({
									type: 'error',
									message: body.message
								});
							}
						}, (error) => {
						});
				}).catch(() => {
					this.dialogFormVisible = false;
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//第二阶段取消修改
			cancelEdit2() {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
				this.dialogFormVisible2 = false;
			},

			//第二阶段确定修改
			confirmEdit2() {
				this.$confirm('修改信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogFormVisible2 = false;
					console.log(this.barTemp);
					//此处发送请求
          if (this.formEdit2.priceId === '') {
            //新增
	          this.$http.post('http://lease.loverqi.cn:8080/lease/price/update.action', {
		          duration: this.formEdit2.duration,
		          pattern: this.formEdit2.pattern,
		          price: this.formEdit2.price,
		          shopId: this.formEdit2.shopId,
              bar:this.barTemp
	          }).then((response) => {
		          let body = response.data
		          if (body.code === 0) {
			          this.$message({
				          type: 'success',
				          message: body.message
			          });
		          } else {
			          this.$message({
				          type: 'error',
				          message: body.message
			          });
		          }
	          }, (error) => {
	          });
          } else {
            //修改
	          this.$http.post('http://lease.loverqi.cn:8080/lease/price/update.action', {
		          bar:this.barTemp,
		          duration: this.formEdit2.duration,
		          pattern: this.formEdit2.pattern,
		          price: this.formEdit2.price,
		          shopId: this.formEdit2.shopId,
		          priceId: this.formEdit2.priceId
	          }).then((response) => {
		          let body = response.data
		          if (body.code === 0) {
			          this.$message({
				          type: 'success',
				          message: body.message
			          });
		          } else {
			          this.$message({
				          type: 'error',
				          message: body.message
			          });
		          }
	          }, (error) => {
	          });
          }

				}).catch(() => {
					this.dialogFormVisible2 = false;
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//新增第一阶段界面重置
			reset() {
				this.formNew.bar = '';
				this.formNew.duration = '';
				this.formNew.price = '';
				this.formNew.shopId = '';
			},
		},
		mounted() {
			let systemState = sessionStorage.getItem('isSystem');
			if (systemState === 'true') {
				//管理员权限，查询系统所有的店铺信息
				this.$http.post('http://lease.loverqi.cn:8080/lease/shop/find.action', {}).then((response) => {
					let body = response.data
					if (body.code === 0) {
						this.options = body.data;//给下拉框赋值
					}
				}, (error) => {
				});
				this.isSystem = true
			} else {
				this.shopId = sessionStorage.getItem('shopId');//员工对应的店铺ID
			}
		}
	}
</script>
<style lang="less">
  .app-charging-table {
    margin-top: 20px;
  }
</style>