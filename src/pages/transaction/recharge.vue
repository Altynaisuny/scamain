<template>
  <div id="app-recharge">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-input v-model="cardId" placeholder="请读卡" autofocus>
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
    <el-row style="margin-top: 30px;">
      <el-col :span="6" :offset="9">
        <el-radio class="radio" v-model="state" label="0">用户充值</el-radio>
        <el-radio class="radio" v-model="state" label="1">用户余额修改</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col :spna="2" :offset="13">
        <el-tag type="primary">余额：￥{{cost}}元</el-tag>
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
        //金额
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
        inputState:'用户充值',
        cost:''
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
          cardId:this.cardId,
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
      },
      reset(){
        this.name='';
        this.cardId=''
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
</style>