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
      <el-button type="primary" icon="plus" @click="dialogNewShop = true"></el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shopId"
        label="店铺编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180">
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
          <el-input v-model="formEdit.address" auto-complete="off"></el-input>
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

    <el-dialog title="新增用户" :visible.sync="dialogNewShop">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新增店铺</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
              <el-input v-model="formNew.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" :label-width="formLabelWidth">
              <el-input v-model="formNew.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" :label-width="formLabelWidth">
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
          address: '',
          phone:''
        },
        formLabelWidth: '120px',
        formNew: {
          name: '',
          shopId:'',
          phone:'',
          address:''
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
        this.$http.post('/lease/category/update.action',{
          name: this.formNew.name,
          phone:this.formNew.phone,
          address:this.formNew.address
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
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
            address:this.formEdit.address,
            phone: this.formEdit.phone
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
          let body = response.data
          if (body.code === 0 ){
            this.tableData = body.data
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