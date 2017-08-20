<template>
  <div id="app-useManage">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="用户编号"
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
          <el-button type="primary" icon="edit" @click="dialogFormVisible = true"></el-button>
          <el-button type="primary" icon="delete" @click="deleteShop"></el-button>
          <el-button type="primary" icon="plus" @click="dialogNewUser = true"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="formEdit.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formEdit.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formEdit.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    </el-row>
    <el-dialog title="新增用户" :visible.sync="dialogNewUser">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新增用户</span>
          <el-button style="float: right;" type="primary">增加</el-button>
        </div>
        <div>
          <el-form :model="formNew" :label-position="labelPosition" >
            <el-form-item label="编号" :label-width="formLabelWidth">
              <el-input v-model="formNew.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="formNew.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="formNew.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="formNew.phone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol},
    data(){
      return{

        tableData: [{
          date: '001',
          name: '店铺一',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'0123456789'
        }, {
          date: '002',
          name: '店铺二',
          address: '上海市普陀区金沙江路 1517 弄',
          phone:'0123456789'
        }, {
          date: '003',
          name: '店铺三',
          address: '上海市普陀区金沙江路 1519 弄',
          phone:'0123456789'
        }, {
          date: '004',
          name: '店铺四',
          address: '上海市普陀区金沙江路 1516 弄',
          phone:'0123456789'
        }],
        dialogFormVisible: false,
        formEdit: {
          name: '',
          id:'',
          phone:'',
          address:''
        },
        formLabelWidth: '120px',
        labelPosition:'left',
        formNew: {
          name: '',
          id:'',
          phone:'',
          address:''
        },
        //新增用户对话框
        dialogNewUser:false
      }
    },
    methods:{

      deleteShop(){
        this.$confirm('删除店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
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
        this.$confirm('修改店铺信息, 是否继续?', '提示', {
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
    }
  }
</script>
<style lang="less">
  .app-userManage-new{
    margin-top: 20px;
  }
</style>