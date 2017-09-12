<template>
  <div id="app-goodsInfo">

    <el-row class="app-goodsInfo-search-input">
      <el-col :span="4">
        <el-input v-model="inputCategoryName" placeholder="请输入产品类别名称" autofocus></el-input>&nbsp;
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputCategoryId" placeholder="请输入产品类别id"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputGoodsId" placeholder="请输入产品id"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputGoodsName" placeholder="请输入产品名称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputBar" placeholder="条形码"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button>重置查询条件</el-button>
      </el-col>
    </el-row>
    <el-row class="app-goodsInfo-table">
      <el-col :span="24" >
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="app-vip-tableList"
        >
          <el-table-column
            prop="categoryName"
            label="商品类别"
            >
          </el-table-column>
          <el-table-column
            prop="goodsId"
            label="产品id"
            >
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="产品名称"
            >
          </el-table-column>
          <el-table-column
            prop="bar"
            label="条码"
          >
          </el-table-column>
          <el-table-column
            prop="describes"
            label="产品描述"
            >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
           >
            <template scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <el-row class="app-goodsInfo-table-pagination">
      <el-col :span="4" :offset="16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pagination.pageCount"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          @current-change="flip"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">

      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="商品ID" :label-width="EditFormLabelWidth">
          <el-input v-model="form.goodsId" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="EditFormLabelWidth">
          <el-input v-model="form.goodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" :label-width="EditFormLabelWidth">
          <el-input v-model="form.categoryId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品条码" :label-width="EditFormLabelWidth">
          <el-input v-model="form.bar" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="EditFormLabelWidth">
          <el-input v-model="form.describes" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="EditFormLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确定修改</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default{
    components: {
      ElCol,
      ElRow},
    data(){
     return{
       //模糊查询产品名称
       inputGoodsName:'',
       //产品类别名称，该字段为模糊查询
       inputCategoryName: '',
       //	产品类别id
       inputCategoryId:'',
       //	产品id
       inputGoodsId:'',
       //条形码
       inputBar:'',
       //表数据
       tableData: [],
       //编辑
       dialogFormVisible: false,
       form: {
         goodsId:'',
         categoryId:'',
         goodsName:'',
         describes:'',
         remark:''
       },
       //搜索框宽度
       formLabelWidth: '120px',
       EditFormLabelWidth:'120px',
       labelPosition:'left',
       //分页配置
       pagination:{
         pageCount:1000,
         pageSize:10,//页面显示条数
         currentPage:1//查询页码
       },
     }
    },
    methods:{
      //编辑
      handleEdit(index, row){
        this.form.goodsId = row.goodsId;
        this.form.goodsName = row.goodsName;//todo 查询出来是name，修改提交是id
        this.form.categoryId = row.categoryId;
        this.form.describes = row.describes;
        this.form.remark = row.remark;
        this.dialogFormVisible = true
      },
      //删除
      handleDelete(index, row){
        let goodsId = row.goodsId
        this.$confirm('删除产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //此处发送请求
          this.$http.post('http://lease.loverqi.cn:8080/lease/goods/delete.action',{
            goodsId:goodsId
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
            this.search();
          },(error)=>{});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      search(){
        this.$http.post('http://lease.loverqi.cn:8080/lease/goods/find.action',{
          page:this.pagination.currentPage,
          pageSize:this.pagination.pageSize,
          categoryName:this.inputCategoryName,
          categoryId:this.categoryId,
          goodsId:this.goodsId,
          goodsName:this.goodsName,
          bar:this.inputBar
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
          this.$http.post('http://lease.loverqi.cn:8080/lease/goods/update.action',{
            categoryId:this.form.categoryId,
            goodsId:this.form.goodsId,
            goodsName:this.form.goodsName,
            describe:this.form.describe,
            remark:this.form.remark
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


      flip(val){
        this.pagination.currentPage = val
        this.search();
      }
    },
    mounted(){
      this.search();
    }
  }
</script>
<style lang="less" scoped>
  .app-goodsInfo-table{
    margin-top: 20px;
  }
  .app-goodsInfo-table-pagination{
    margin-top: 20px;
  }
</style>