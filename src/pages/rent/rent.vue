<template>
  <div id="app-rent">
    <el-row>
      <el-col>
        <el-button type="primary" icon="setting" @click="getSystem">进入后台管理系统</el-button>
      </el-col>

      <el-col :span="6" :offset="7">
        <el-input
          v-model="inputValue"
          placeholder="正在扫码"
          @blur="loseFocus('Event')"
          @focus="getFocus('Event')"
          class="app-rent-content-input"
          @keyup.enter.native="doLogin"
          autofocus
        >
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-alert
          title=""
          type="warning"
          description="请不要在框外点击鼠标"
          :closable="false"
          show-icon>
        </el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="height: 50px;">
          <el-col>
            需要支付：
            <el-tag type="primary">￥{{cost}}元</el-tag>
          </el-col>
          <el-col :span="3" :offset="4">
            <el-input
              placeholder="IC卡号码"
              v-model="userInfo.cardId"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input
              placeholder="昵称"
              v-model="userInfo.name"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input
              placeholder="余额"
              v-model="userInfo.balance"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input
              placeholder="会员级别"
              v-model="userInfo.level"
              :disabled="true">
            </el-input>
          </el-col>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="物品编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="租借时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rentCode"
            label="租赁码">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注">
          </el-table-column>
        </el-table>
      </el-card>

    </el-row>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";


  export default {
    data() {
      return {
        show: true,
        //输入框的值
        inputValue: '',
        //输入框状态
        inputStatus: {},
        rentHumanId: '张三',
        tableData: [],
        userInfo:{
          cardId:'',
          name:"",
          balance:'',
          level:''
        },
        cost:''
      }
    },
    methods: {
      loseFocus(Event) {
        let not = this.$notify.error({
          title: '错误',
          message: '扫码器失去焦点，无法正常工作，如需扫码，请单击输入框。'
        });
      },
      getFocus() {
        this.$notify({
          title: '成功',
          message: '扫码器获得焦点，可以正常工作',
          type: 'success'
        });
      },
      getSystem(){
        this.$router.push("/workBeach");
      },
      doLogin(){
        console.log(this.inputValue);
        this.inputValue='';
      }

    },
    computed: {},
    mounted() {
      //输入框获取焦点
      document.querySelector(".app-rent-content-input input").focus();
      console.log(sessionStorage.getItem('token'));
    },
    watch: {
      inputValue: function (value) {
        //租赁前用户信息请求
        this.$http.post('/lease/leasemain/userstart.action',{
          cardId:value
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
            this.userInfo = body.data;//用户信息赋值
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
        //请求租赁/租赁结束
        this.$http.post('/lease/leasemain/leasegoods.action',{
          cardId:this.userInfo.cardId,
          shopId:'',
          barCode:value
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
          //下一步要进行的操作
          if (body.data.next){
            this.userInfo = {}//删除当前用户信息
          }
          //是否是归还物品
          if (body.data.ifAlso){
            this.cost = body.data.cost
          }
        },(error)=>{});
      }
    },
    components: {ElCol, ElRow}
  }
</script>
<style lang="less" scoped>
</style>