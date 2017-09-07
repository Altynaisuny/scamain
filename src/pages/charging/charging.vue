<template>
  <div id="app-charging">

    <el-row>
      <el-col :span="2" :offset="8">
        <i class="el-icon-information"></i>
        请选择店铺ID
      </el-col>
      <el-col :span="4" v-if="isSystem = true ? true :false">
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
      <el-col :span="4" v-if="isSystem = true ? false : true">
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
      <el-col :span="9" :offset="8">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="priceId"
            label="价格编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="截至价格"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          <el-input v-model="formEdit.shopId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.priceId" auto-complete="off"></el-input>
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
            <el-form-item label="产品id" :label-width="formLabelWidth">
              <el-input v-model="formNew.goodsId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.shopId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格id" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.priceId" auto-complete="off"></el-input>
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
          goodsId:'',
          shopId:'',
          priceId:'',
          price:''
        },
        formEdit:{
          goodsId:'',
          shopId:'',
          priceId:'',
          price:''
        },
        dialogNewShop: false,
        //店铺ID
        shopId: '',
        isSystem: false,
        formLabelWidth: '120px',
        dialogFormVisible: false,
      }
    },
    methods: {
      search() {
        this.$http.post('/lease/price/find.action', {
          goodsId: this.goodsId,
          shopId: this.shopId
        }).then((response) => {
          let body = response.data
          if (body.code === 0) {
            this.tableData = body.data;//给table赋值
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

      },
      add(){
        this.$confirm('新增价格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/price/update.action',{

          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message+"id"+body.data.gradeId
              });
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          },(error)=>{});
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
      confirmEdit(){
        //确定修改
        this.$confirm('修改等级信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求

          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.dialogFormVisible = false;
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      }
    },
    mounted() {
      let systemState = sessionStorage.getItem('isSystem');
      if (systemState) {
        //管理员权限，查询系统所有的店铺信息
        this.$http.post('/lease/shop/find.action', {}).then((response) => {
          let body = response.data
          if (body.code === 0) {
            this.options = body.data;//给下拉框赋值
          }
        }, (error) => {
        });
        let that = this;
        that.isSystem = true
      } else {
        this.shopId = sessionStorage.getItem('shopId');//员工对应的店铺ID
      }
    },
    watch:{
      isSystem(val){
        console.log(val)
      }
    }
  }
</script>
<style lang="less">
  @import "./charging.less";
</style>