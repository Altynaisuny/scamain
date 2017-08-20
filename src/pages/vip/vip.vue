<template>
  <div id="app-vip">

    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input5" autofocus>
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px;">
            <el-option label="序号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="电话" value="3"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="6" style="text-align: center">
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择开始日期"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-col>
      <el-col :span="6" style="text-align: center">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button>重置查询条件</el-button>
      </el-col>
    </el-row>

    <el-row class="app-vip-table">
      <el-col :span="20" :offset="2">
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
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="level"
            label="级别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="310">
          </el-table-column>
          <el-table-column
            prop="RechargeRecord"
            label="充值记录"
            width="120">
          </el-table-column>
          <el-table-column
            prop="consumeRecord"
            label="消费记录"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button @click="dialogVisible = true" type="text" size="small">查看</el-button>
              <el-button @click="deleteVip" type="text" size="small">删除</el-button>
              <el-button @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <el-row class="app-vip-table-pagination">
      <el-col :span="4" :offset="16">
        <el-pagination
          layout="prev, pager, next"
          :total="500">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="VIP信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="VIP名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确定修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      >
      <span>此处是会员信息</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    data() {
      return {
        //输入框的值
        input5: '',
        //查询类型
        select: '',
        //表数据
        tableData: [{
          id: '00001',
          name: '王小虎',
          level: '初级',
          balance: '￥50',
          address: '上海市普陀区金沙江路 1518 弄',
          RechargeRecord: '',
          consumeRecord: '',
        }, {
          id: '00002',
          name: '王小虎',
          level: '中级',
          balance: '￥50',
          address: '上海市普陀区金沙江路 1518 弄',
          RechargeRecord: '',
          consumeRecord: '',
        }, {
          id: '00003',
          name: '王小虎',
          level: '高级',
          balance: '￥50',
          address: '上海市普陀区金沙江路 1518 弄',
          RechargeRecord: '',
          consumeRecord: '',
        }, {
          id: '00004',
          name: '王小虎',
          level: '初级',
          balance: '￥50',
          address: '上海市普陀区金沙江路 1518 弄',
          RechargeRecord: '',
          consumeRecord: '',
        }],
        //编辑
        dialogFormVisible: false,
        //查看
        dialogVisible: false,
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
        //开始
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //结束
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //开始日期
        value1: '',
        //结束日期
        value2: '',
      };

    },
    methods: {
      deleteVip(){
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

    },
    components: {
      ElCol, ElRow

    }
  }
</script>
<style lang="less" scoped>
  .app-vip-tableList{
    margin-top: 20px;
  }
</style>