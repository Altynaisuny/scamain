<template>
  <div id="app-shopManage">
    <el-row>
      <el-col :span="4" :offset="6">
        <el-input v-model="inputshopId" placeholder="请输入店铺编号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputname" placeholder="请输入店铺名称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </el-col>
      <el-button type="primary" icon="plus" @click="dialogNewShop = true">新增</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shopId"
        label="店铺编号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="adderss"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="店铺信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="店铺编号" :label-width="formLabelWidth">
          <el-input v-model="formEdit.shopId" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" :label-width="formLabelWidth">
          <el-input v-model="formEdit.adderss" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺电话" :label-width="formLabelWidth">
          <el-input v-model="formEdit.phone" auto-complete="off"></el-input>
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
          <span style="line-height: 36px;">新增店铺</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="店铺名称" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.adderss" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.phone" auto-complete="off"></el-input>
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
      ElRow},
    data(){
      return{
        tableData: [],
        dialogFormVisible: false,
        formEdit: {
          shopId: '',
          name: '',
          adderss: '',
          phone:''
        },
        formLabelWidth: '120px',
        formNew: {
          name: '',
          phone:'',
          adderss:''
        },
        //新增用户dialog
        dialogNewShop:false,
        inputshopId:'',
        inputname:''
      }
    },
    methods:{
      handleEdit(index, row){
        this.dialogFormVisible = true
        this.formEdit.shopId = row.shopId
        this.formEdit.name = row.name
        this.formEdit.adderss = row.adderss
        this.formEdit.phone = row.phone
      },
      handleDelete(index, row){
        let shopId = row.shopId
        this.$confirm('删除店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('/lease/shop/delete.action',{
            shopId:shopId
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
        this.$http.post('/lease/shop/update.action',{
          name: this.formNew.name,
          phone:this.formNew.phone,
          adderss:this.formNew.adderss
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
            this.$message({
              type: 'success',
              message: body.message+"店铺ID"+body.data.shopId
            });
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
          this.search();
        },(error)=>{});

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
        this.$confirm('修改店铺信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          this.$http.post('/lease/shop/update.action',{
            shopId:this.formEdit.shopId,
            name:this.formEdit.name,
            adderss:this.formEdit.adderss,
            phone: this.formEdit.phone
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

      search(){
        this.$http.post('/lease/shop/find.action',{
          shopId:this.inputshopId,
          name:this.inputname
        }).then((response)=>{
          let body = response.data;
          if (body.code === 0 ){
            this.tableData = body.data;
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});

      }
    },
    mounted(){
      this.search()
    }
  }
</script>
<style lang="less" scoped>
  .app-shopManage-new{
    margin-top: 20px;
  }
</style>