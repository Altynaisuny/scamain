<template>
  <div id="app-user">

    <el-row class="app-goodsInfo-search-input">
      <el-col :span="4" :offset="2">
        <el-input v-model="inputcardId" placeholder="请输入用户的ic卡号" autofocus></el-input>&nbsp;
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputname" placeholder="请输入用户昵称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputphone" placeholder="请输入用户的联系电话"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputlevel" placeholder="请输入用户的级别"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button>重置查询条件</el-button>
      </el-col>
      <el-button type="primary" icon="plus" @click="dialogNewShop = true">新增</el-button>
    </el-row>
    <el-row class="app-goodsInfo-table">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          element-loading-text="拼命加载中"
          class="app-vip-tableList"
        >
          <el-table-column
            prop="cardId"
            label="IC卡号码"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="昵称"
          >
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="phone"
          >
          </el-table-column>
          <el-table-column
            prop="adderss"
            label="地址"
          >
          </el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
          ></el-table-column>
          <el-table-column
            prop="level"
            label="会员级别"
          ></el-table-column>

          <el-table-column
            prop="cost"
            label="总体消费金额"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
          ></el-table-column>
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
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">

      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="IC卡号码" :label-width="EditFormLabelWidth">
          <el-input v-model="form.cardId" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" :label-width="EditFormLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="EditFormLabelWidth">
          <el-input v-model="form.adderss" auto-complete="off"></el-input>
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
    <el-dialog title="新增" :visible.sync="dialogNewShop">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">新增会员</span>
          <el-button style="float: right;" type="primary" @click="add">增加</el-button>
        </div>
        <div class="text item">
          <el-form :model="formNew">
            <el-form-item label="会员卡账号" :label-width="formLabelWidth">
              <el-input v-model="formNew.cardId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.name" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formNew.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="formNew.adderss" auto-complete="off"></el-input>
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
      ElRow
    },
    data() {
      return {
        //用户的ic卡号
        inputcardId: '',
        //用户昵称
        inputname: '',
        //用户的联系电话
        inputphone: '',
        //用户的级别
        inputlevel: '',
        //表数据
        tableData: [],
        //编辑
        dialogFormVisible: false,
        //修改form
        form: {
          cardId: '',
          name: '',
          phone: '',
          adderss: '',
          remark: ''
        },
        //新增
        formNew: {
          cardId: '',
          name: '',
          phone: '',
          adderss: '',
          remark: ''
        },
        //搜索框宽度
        formLabelWidth: '120px',
        EditFormLabelWidth: '120px',
        labelPosition: 'left',
        //分页配置
        pagination: {
          pageCount: 100,
          pageSize: 10,//页面显示条数
          currentPage: 1//查询页码
        },
        //新增弹窗
        dialogNewShop:false
      }
    },
    methods: {
      //编辑
      handleEdit(index, row) {
        this.form.cardId = row.cardId
        this.dialogFormVisible = true
      },
      handleDelete(){

      },
      search() {
        this.$http.post('/lease/user/find.action', {
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          cardId: this.inputcardId,
          name: this.inputname,
          phone: this.inputphone,
          level: this.inputlevel
        }).then((response) => {
          let body = response.data
          if (body.code === 0) {
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
        }, (error) => {
        });
      },
      //取消修改
      cancelEdit() {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
        this.dialogFormVisible = false;
      },
      confirmEdit() {
        //确定修改
        this.$confirm('修改用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/user/update.action', {
            cardId: this.form,
            name: this.form.name,
            phone: this.form.phone,
            adderss: this.form.adderss,
            remark: this.form.remark
          }).then((response) => {
            let body = response.data
            if (body.code === 0) {
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
          }, (error) => {
          });
        }).catch(() => {
          this.dialogFormVisible = false;
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      add(){
        this.$confirm('新增用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false;
          //此处发送请求
          this.$http.post('/lease/user/update.action',{
            categoryName:this.formNew.cardId,
            name:this.formNew.name,
            phone:this.formNew.phone,
            adderss:this.formNew.adderss,
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
    },
    mounted() {
      this.search();
    }
  }
</script>
<style lang="less" scoped>
  .app-goodsInfo-table {
    margin-top: 20px;
  }

  .app-goodsInfo-table-pagination {
    margin-top: 20px;
  }
</style>