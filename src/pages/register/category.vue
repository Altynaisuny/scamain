<template>
  <div id="app-category">
    <el-row>
      <el-col :span="4" :offset="10">
        <el-input
          placeholder="产品类别名称"
          icon="search"
          v-model="inputCategoryName"
          :on-icon-click="handleIconClick">
        </el-input>
      </el-col>
      <el-button type="primary" icon="plus" @click="dialogNewShop = true"></el-button>
    </el-row>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="categoryId"
        label="产品类别号"
        >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="产品类别名称"
        >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="类别描述"
        >
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

    <el-row>
      <el-col :span = 4 :offset = 18>
        <el-pagination
          layout="prev, pager, next"
          :page-count="pagination.pageCount"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="产品类别修改" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="产品类别号" :label-width="formLabelWidth" >
          <el-input v-model="formEdit.categoryId" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品类别名称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.categoryName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别描述" :label-width="formLabelWidth">
          <el-input v-model="formEdit.describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formEdit.remark" auto-complete="off"></el-input>
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
          <span style="line-height: 36px;">新增商品类别</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="产品类别名称" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.categoryName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别描述" :label-width="formLabelWidth">
              <el-input v-model="formNew.describe" auto-complete="off"></el-input>
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
        tableData: [
        ],
        //产品类别修改dialog
        dialogFormVisible: false,
        formEdit: {
          categoryId: '',
          categoryName:'',
          describe:'',
          remark:''
        },
        formLabelWidth: '120px',
        formNew: {
          categoryName: '',
          describe:'',
          remark:'',
        },
        //新增用户dialog
        dialogNewShop:false,
        //分页配置
        pagination:{
          pageCount:100,
          pageSize:10,//页面显示条数
          currentPage:1//查询页码
        },
        //模糊查询产品类别名称
        inputCategoryName:''
      }
    },
    methods:{
      //编辑
      handleEdit(index, row){
        this.dialogFormVisible = true;//打开对话框
        this.formEdit.categoryId = row.categoryId
    },
      //删除
      handleDelete(index, row) {
        let categoryId = row.categoryId
        this.$confirm('删除类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('/lease/category/delete.action',{
            categoryId:categoryId
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
        this.$confirm('修改商品类别信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/category/update.action',{
            categoryId:this.formEdit.categoryId,
            categoryName:this.formEdit.categoryName,
            describe:this.formEdit.describe,
            remark:this.formEdit.remark
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
          this.dialogFormVisible = false;
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      add(){
        this.$confirm('新增类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/category/update.action',{
            categoryName:this.formNew.categoryName,
            describe:this.formNew.describe,
            remark:this.formNew.remark
          }).then((response)=>{
            let body = response.data;
            if (body.code === 0){
              this.$message({type: 'success', message: body.message});
              this.formNew.categoryName = ''
              this.formNew.describe = ''
              this.formNew.remark = ''
            } else {
              this.$message({type: 'error', message: body.message});
            }
          },(error)=>{});
        }).catch(() => {
          this.dialogFormVisible = false;
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      //产品类别名称，该字段为模糊查询
      handleIconClick(){
        this.$http.post('/lease/category/find.action',{
          page:this.pagination.currentPage,
          pageSize:this.pagination.pageSize,
          categoryName:this.inputCategoryName
        }).then((response)=>{
          let body = response.data;
          console.log(body)
          if (body.code === 0 ){
            body.data = this.tableData
          } else {
            this.$message({type:'error',message:body.message});
          }
        },(error)=>{
          console.log(error);
        });
      }
    },
    mounted(){
      this.handleIconClick()
    }
  }
</script>
<style lang="less" scoped>

</style>