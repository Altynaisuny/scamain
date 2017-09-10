<template>
  <div id="app-userManage">
    <el-row>
      <el-col :span="4" :offset="6">
        <el-input v-model="inputshopId" placeholder="请输入员工编号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputusername" placeholder="请输入员工名称"></el-input>
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
        prop="username"
        label="员工名称"
        >
      </el-table-column>
      <el-table-column
        prop="shopName"
        label="所属店铺"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
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

    <el-dialog title="员工信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formEdit.username" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formEdit.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-select v-model="formEdit.shopId" placeholder="请选择" @change="editChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.shopId">
            <span style="float: left">{{ item.shopId }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
        </el-select>
        <el-form-item label="员工电话" :label-width="formLabelWidth">
          <el-input v-model="formEdit.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工备注" :label-width="formLabelWidth">
          <el-input v-model="formEdit.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增员工" :visible.sync="dialogNewShop">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新增员工</span>
          <el-button style="float: right;" type="primary" @click="add('formNew')">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew" ref="formNew" >
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属店铺" :label-width="formLabelWidth" prop="shopId" :rules="[{ required: true, message: '不能为空'}]">
              <el-select v-model="formNew.shopId" placeholder="请选择" @change="addChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.shopId">
                  <span style="float: left">{{ item.shopId }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="formNew.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="formNew.remark" auto-complete="off"></el-input>
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
          username: '',
          password: '',
          shopId: '',
          phone:'',
          remark:'',
        },
        formLabelWidth: '120px',
        formNew: {
          username: '',
          password: '',
          shopId:'',
          phone:'',
          remark:''
        },
        //新增用户dialog
        dialogNewShop:false,
        inputshopId:'',
        inputusername:'',
        //下拉框
        options:[]
      }
    },
    methods:{
      handleEdit(index, row){
        this.dialogFormVisible = true
        this.formEdit.username = row.username
        this.formEdit.password = row.password
      },
      //删除用户
      handleDelete(index, row){
        let username = row.username
        this.$confirm('删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('/lease/woker/delete.action',{
            username:username
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
          this.search();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      add(formName){
        let submitForm = false ;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitForm = true;
          }
        });
        if (submitForm){
          this.$confirm('添加用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/lease/woker/update.action',{
              username:this.formNew.username,
              password:this.formNew.password,
              shopId:this.formNew.shopId,
              phone:this.formNew.phone,
              remark:this.formNew.remark
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
              message: '已取消'
            });
          });

        }

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
        this.$confirm('修改员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;

          this.$http.post('/lease/woker/update.action',{
            username: this.formNew.username,
            password:this.formNew.password,
            shopId:this.formNew.shopId,
            phone:this.formNew.phone,
            remark:this.formNew.remark
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
        this.$http.post('/lease/woker/userstart.action',{
          shopId:this.inputshopId,
          username:this.inputusername
        }).then((response)=>{
          let body = response.data;
          if (body.code === 0 ){
            this.tableData = body.data
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});

      },
      addChange(val){
        this.formNew.shopId = val;
      },
      editChange(val){
        this.formEdit.shopId = val;
      }

    },
    mounted(){
      //获取店铺下拉框
      this.$http.post('/lease/shop/find.action',{
      }).then((response)=>{
        let body = response.data
        if (body.code === 0 ){
         this.options = body.data
        } else {
          this.$message({
            type: 'error',
            message: body.message
          });
        }
      },(error)=>{});
      this.search();
    }
  }
</script>
<style lang="less" scoped>
  .app-shopManage-new{
    margin-top: 20px;
  }
</style>