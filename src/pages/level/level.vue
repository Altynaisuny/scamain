<template>
  <div id="app-level">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="level"
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="consume"
        label="消费额度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discount"
        label="优惠">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click="dialogFormVisible = true"></el-button>
          <el-button type="primary" icon="delete" @click="deleteShop"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="等级信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-input v-model="formEdit.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="消费额度" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠" :label-width="formLabelWidth">
          <el-input v-model="formEdit.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formEdit.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    data(){
      return{
        tableData: [
          {
          level: '钻石会员',
          consume: '1000',
          discount: '7折',
          remarks:'这是一些备注信息'
          },
          {
            level: '铂金会员',
            consume: '500',
            discount: '8折',
            remarks:'这是一些备注信息'
          },
          {
            level: '白金会员',
            consume: '200',
            discount: '9折',
            remarks:'这是一些备注信息'
          },
          {
            level: '黄金会员',
            consume: '50',
            discount: '9.5折',
            remarks:'这是一些备注信息'
          },
          {
            level: '白银会员',
            consume: '20',
            discount: '9.9折',
            remarks:'这是一些备注信息'
          },
        ],
        dialogFormVisible: false,
        formEdit: {
          name: '',
          id:'',
          phone:'',
          address:''
        },
        formLabelWidth: '120px',
        labelPosition:'left',
      }
    },
    methods:{
      deleteShop(){
        this.$confirm('删除该等级, 是否继续?', '提示', {
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
    }
  }
</script>
<style lang="less">
  @import "./level.less";
</style>