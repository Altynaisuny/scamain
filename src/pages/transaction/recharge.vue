<template>
  <div id="app-recharge">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-input v-model="cardId" placeholder="请读卡" autofocus @keyup.enter.native="search">
          <template slot="prepend">会员卡号：</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="6" :offset="9">
        <el-input v-model="name" placeholder="请输入姓名">
          <template slot="prepend">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="6" :offset="9">
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="6" :offset="9">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ props.row.adderss }}</span>
                </el-form-item>
                <el-form-item label="余额">
                  <span>{{ props.row.balance }}</span>
                </el-form-item>
                <el-form-item label="会员级别">
                  <span>{{ props.row.level }}</span>
                </el-form-item>
                <el-form-item label="消费金额">
                  <span>{{ props.row.cost }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="IC卡号码"
            prop="cardId">
          </el-table-column>
          <el-table-column
            label="昵称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="primary" icon="check" @click="handleSelect(scope.$index, scope.row)">选定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="3" :offset="9">
        已选用户信息
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="9">
        IC卡号码：{{vipObj.cardId}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="9">
        姓名:{{vipObj.name}}
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="6" :offset="9">
        <el-radio class="radio" v-model="state" label="0">用户充值</el-radio>
        <el-radio class="radio" v-model="state" label="1">用户余额修改</el-radio>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="2" :offset="9">
        <el-tag type="primary">余额：￥{{vipObj.nowBalance}}元</el-tag>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="6" :offset="9">
        {{inputState}}：
        <el-autocomplete
          v-model="balance"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearch"
          placeholder="请输入金额"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="4" :offset="9">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="text" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {

    data(){
      return{
        //会员卡账号
        cardId:'',
        //充值金额
        balance:'',
        moneyList: [
          { "value": "20"},
          { "value": "50"},
          { "value": "100"},
          { "value": "150"},
          { "value": "200"},
          { "value": "300"},
          { "value": "400"},
          { "value": "500"},
          { "value": "1000"},
          { "value": "3000"},
        ],
        state:'0',
        name:'',
        //充值还是修改
        inputState:'用户充值',
        tableData: [],
        //选定待充值的会员信息
        vipObj:{
          cardId:'',
          name:'',
          nowBalance:''
        }
      }
    },
    components: {
      ElCol,
      ElRow
    },
    methods:{
      querySearch(queryString, cb) {
        let moneyList = this.moneyList;
        let results = queryString ? moneyList.filter(this.createFilter(queryString)) : moneyList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (moneyList) => {
          return (moneyList.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.balance = item.value
      },
      submit(){
        this.$http.post('/lease/user/recharge.action',{
          cardId:this.vipObj.cardId,
          balance:this.balance,
          state:this.state
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
        //发送完请求，会员卡置空
        this.cardId = '';
        this.name = '';
        this.tableData = [];
        this.nowBalance = '';
      },
      reset(){
        this.name='';
        this.cardId=''
      },
      //查询用户信息
      search(){
        if (this.name !=='' || this.cardId !== ''){
          this.$http.post('/lease/user/find.action',{
            cardId:this.cardId,
            name:this.name
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.tableData = body.data.body
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          },(error)=>{});
        } else {
          this.tableData = [];
        }

      },
      handleSelect(index,row){
        this.vipObj.name =row.name;
        this.vipObj.cardId = row.cardId;
        this.vipObj.nowBalance = row.balance
      }
    },
    watch:{
      state(val){
        if (val === '0'){
          this.inputState = '充值'
        } else {
          this.inputState = '余额修改'
        }
      }
    },
    computed:{

    }
  }
</script>
<style lang="less" scoped>
  .my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .highlighted .addr {
    color: #ddd;
  }
  }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>