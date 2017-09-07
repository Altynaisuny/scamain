<template>
  <div id="app-level">
    <el-row>
      <el-col :span="4" :offset="8">
        <el-input v-model="id" placeholder="请输入会员ID"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"  @click="dialogNewShop = true">新增</el-button>
      </el-col>


    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="gradeId"
          label="会员编号">
        </el-table-column>
        <el-table-column
          prop="gradeName"
          label="优惠名称">
        </el-table-column>
        <el-table-column
          prop="discounts"
          label="优惠额度">
        </el-table-column>
        <el-table-column
          prop="consumption"
          label="最低消费(元)">
        </el-table-column>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button type="primary" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="等级信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="会员编号" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.gradeId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="优惠名称" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="formEdit.gradeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠折扣" :label-width="formLabelWidth">
          <el-input v-model="formEdit.discounts" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最低消费(元)" :label-width="formLabelWidth">
          <el-input v-model="formEdit.consumption" auto-complete="off"></el-input>
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
          <span style="line-height: 36px;">新增级别</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="会员编号" :label-width="formLabelWidth">
              <el-input v-model="formNew.gradeId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="优惠名称" :label-width="formLabelWidth">
              <el-input v-model="formNew.gradeName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="优惠折扣" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.discounts" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="最低消费" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.consumption" auto-complete="off"></el-input>
            </el-form-item>
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
    data(){
      return{
        tableData: [],
        //会员ID
        id:'',
        dialogFormVisible: false,
        formEdit: {
          gradeId: '',
          gradeName:'',
          discounts:'',
          consumption:''
        },
        formLabelWidth: '120px',
        labelPosition:'left',
        dialogNewShop:false,
        formNew:{
          gradeId: '',
          gradeName:'',
          discounts:'',
          consumption:''
        }
      }
    },
    methods:{
      search(){
        this.$http.post('/lease/grade/find.action',{
          id:this.id
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
            this.tableData = body.data;
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});
      },
      add(){
        this.$confirm('新增类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/grade/update.action',{
            gradeId: this.formEdit.gradeId,
            gradeName:this.formEdit.gradeName,
            discounts:this.formEdit.discounts,
            consumption:this.formEdit.consumption
          }).then((response)=>{
            let body = response.data;
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message+"id"+body.data.gradeId
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
          this.$message({type: 'info', message: '已取消操作'});
        });
      },

      handleDelete(index, row){
        let gradeId = row.gradeId;
        this.$confirm('删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('/lease/grade/delete.action',{
            gradeId:gradeId
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
      //修改
      handleEdit(index, row){
        this.formEdit.gradeId=row.gradeId
        this.formEdit.gradeName=row.gradeName
        this.formEdit.discounts=row.discounts
        this.formEdit.consumption=row.consumption
        this.dialogFormVisible = true;
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
          this.$http.post('/lease/grade/update.action',{
            gradeId: this.formEdit.gradeId,
            gradeName:this.formEdit.gradeName,
            discounts:this.formEdit.discounts,
            consumption:this.formEdit.consumption
          }).then((response)=>{
            let body = response.data;
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

      }
    },
    components: {ElCol, ElRow},
    mounted(){
      this.search();
    }
  }
</script>
<style lang="less">
  @import "./level.less";
</style>