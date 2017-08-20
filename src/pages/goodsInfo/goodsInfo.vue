<template>
  <div id="app-goodsInfo">

    <el-row class="app-goodsInfo-search-input">
      <el-col :span="8" :offset="6">
        <el-input placeholder="请输入内容" v-model="input5" autofocus>
          <el-select v-model="select" slot="prepend" placeholder="请选择类别" style="width: 118px;">
            <el-option label="序号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="电话" value="3"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="search">搜索</el-button>
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
            prop="id"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="种类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="time"
            label="租借时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="rentCode"
            label="租赁码"
            width="220">
          </el-table-column>
          <el-table-column
            prop="returnCode"
            label="归还码"
            width="220">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="origin"
            label="来源"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
              <el-button @click="deleteSelected" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <el-row class="app-goodsInfo-table-pagination">
      <el-col :span="4" :offset="16">
        <el-pagination
          layout="prev, pager, next"
          :total="500">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">

      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="名称" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="EditFormLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="类别一" value="shanghai"></el-option>
            <el-option label="类别二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租借时间" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="租赁码" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="归还码" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="EditFormLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
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
       input5:'',
       //查询类型
       select: '',
       //表数据
       tableData: [{
         id: '00001',
         name: '物品名称',
         type: '类别',
         time: '一天',
         rentCode: '5641675161',
         returnCode: '164157981781',
         price: '1500元',
         origin:'购买',
         remarks:'备注'
       },
         {
           id: '00002',
           name: '物品名称',
           type: '类别',
           time: '一天',
           rentCode: '5641675161',
           returnCode: '164157981781',
           price: '1500元',
           origin:'购买',
           remarks:'备注'
         },{
           id: '00003',
           name: '物品名称',
           type: '类别',
           time: '一天',
           rentCode: '5641675161',
           returnCode: '164157981781',
           price: '1500元',
           origin:'购买',
           remarks:'备注'
         },{
           id: '00004',
           name: '物品名称',
           type: '类别',
           time: '一天',
           rentCode: '5641675161',
           returnCode: '164157981781',
           price: '1500元',
           origin:'购买',
           remarks:'备注'
         },{
           id: '00005',
           name: '物品名称',
           type: '类别',
           time: '一天',
           rentCode: '5641675161',
           returnCode: '164157981781',
           price: '1500元',
           origin:'购买',
           remarks:'备注'
         }],
       //编辑
       dialogFormVisible: false,
       form: {
         name: '',
         region: '',
         date1: '',
         date2: '',
         delivery: false,
         type: [],
         resource: '',
         desc: ''
       },
       //搜索框宽度
       formLabelWidth: '120px',
       EditFormLabelWidth:'120px',
       labelPosition:'left'
     }
    },
    methods:{
      deleteSelected(){
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
<style lang="less" scoped>
  .app-goodsInfo-table{
    margin-top: 20px;
  }
  .app-goodsInfo-table-pagination{
    margin-top: 20px;
  }
</style>