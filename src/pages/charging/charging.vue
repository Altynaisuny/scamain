<template>
  <div id="app-charging">
    <el-row>
      <el-col :span="2" :offset="8">
        <i class="el-icon-information"></i>
        请输入商品ID
      </el-col>
      <el-col :span="4">
        <el-input v-model="goodsId" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="2" :offset="8">
        <i class="el-icon-information"></i>
        请选择店铺ID
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
      <el-col :span="4" :offset="1">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="plus" @click="dialogNewShop = true">新增</el-button>
      </el-col>
    </el-row>
    <el-row class="app-charging-table">
      <el-col :span="14" :offset="5">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="priceId"
            label="价格编号"
            >
          </el-table-column>
          <el-table-column
            prop="price"
            label="截至价格"
            >
          </el-table-column>
          <el-table-column
            prop="duration"
            label="截至时间"
          >
          </el-table-column>
          <el-table-column
            label="计费周期"
            width="200"
            >
            <template scope="scope">
              <el-radio-group v-model="scope.row.pattern">
                <el-radio :label="0">分</el-radio>
                <el-radio :label="1">时</el-radio>
                <el-radio :label="2">天</el-radio>
              </el-radio-group>
            </template>
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

    <el-dialog title="产品价格维护" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="产品id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.goodsId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
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
        <el-form-item label="价格id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.priceId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="截至时间" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计费周期" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-radio-group v-model="formEdit.pattern">
            <el-radio :label="0">分</el-radio>
            <el-radio :label="1">时</el-radio>
            <el-radio :label="2">天</el-radio>
          </el-radio-group>
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

    <el-dialog title="新增" :visible.sync="dialogNewShop">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新增价格</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="产品id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.goodsId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
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
            <el-form-item label="计费周期" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-radio-group v-model="formNew.pattern" >
                <el-radio :label="0">分</el-radio>
                <el-radio :label="1">时</el-radio>
                <el-radio :label="2">天</el-radio>
              </el-radio-group>
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
        options: [],
        tableData: [],
        formNew: {
          duration:'',
          pattern:'',
          price:'',
          shopId:'',
          goodsId:''
        },
        formEdit:{
          priceId:'',
          duration:'',
          pattern:'',
          price:'',
          shopId:'',
          goodsId:''
        },
        dialogNewShop: false,
        //店铺ID
        shopId: '',
        isSystem: false,
        formLabelWidth: '120px',
        dialogFormVisible: false,//编辑
        goodsId:''
      }
    },
    methods: {
      search() {
        this.$http.post('/lease/price/find.action', {
          goodsId: this.goodsId,
          shopId: this.shopId
        }).then((response) => {
          let body = response.data;
          if (body.code === 0) {
            this.tableData = body.data;
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        }, (error) => {
        });
      },
      handleEdit(index, row){
        this.dialogFormVisible = true;//打开对话框
        this.formEdit.goodsId = this.goodsId
        this.formEdit.priceId = row.priceId;
        this.formEdit.duration = row.duration;
        this.formEdit.pattern = row.pattern;
        this.formEdit.price = row.price;
        this.formEdit.shopId =row.shopId;

      },
      handleDelete(index, row){
        this.$confirm('删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('/lease/price/delete.action',{
            priceId:row.priceId
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message
              });
              this.search();
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          },(error)=>{});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      add(){
        this.$confirm('新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/price/update.action',{
            duration:this.formNew.duration,
            pattern:this.formNew.pattern,
            price:this.formNew.price,
            shopId:this.shopId,
            goodsId:this.formNew.goodsId
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message+"id"+body.data.priceId
              });
              this.formNew.goodsId = ''
              this.formNew.duration = '';
              this.formNew.pattern = '';
              this.formNew.price = '';
              this.formNew.shopId ='';
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          },(error)=>{

          });
        }).catch(() => {
          this.dialogFormVisible = false;
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      //取消修改
      cancelEdit(){
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
        this.dialogFormVisible = false;
      },
      //确定修改
      confirmEdit(){
        this.$confirm('修改信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/price/update.action',{
            priceId:this.formEdit.priceId,
            duration:this.formEdit.duration,
            pattern:this.formEdit.pattern,
            price:this.formEdit.price,
            shopId:this.formEdit.shopId,
            goodsId:this.formEdit.goodsId
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message
              });
              this.search();
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          },(error)=>{});
        }).catch(() => {
          this.dialogFormVisible = false;
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      change(val){
//        console.log(val);
      }
    },
    mounted() {
      let systemState = sessionStorage.getItem('isSystem');
      if (systemState === 'true') {
        //管理员权限，查询系统所有的店铺信息
        this.$http.post('/lease/shop/find.action', {
        }).then((response) => {
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
  @import "./charging.less";
</style>