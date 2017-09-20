<template>
  <div id="app-rent">
    <el-row>
      <el-col>
        <el-button type="primary" icon="setting" @click="getSystem">进入后台管理系统</el-button>
      </el-col>

      <el-col :span="6" :offset="7">
        <el-input
          v-model="QScode"
          placeholder="正在扫码"
          @blur="loseFocus('Event')"
          @focus="getFocus('Event')"
          class="app-rent-content-input"
          @keyup.enter.native="search"
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
        <div slot="header" class="clearfix" style="height: 100px;">
          <el-col v-if="!rentOrReturnState">
            需要支付：
            <el-tag type="danger" style="font-size: 30px">￥{{cost}}元</el-tag>
          </el-col>
          <el-col :span="3" :offset="4">
            IC卡号码
            <el-input
              placeholder="IC卡号码"
              v-model="userInfo.cardId"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            姓名
            <el-input
              placeholder="昵称"
              v-model="userInfo.name"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            余额
            <el-input
              placeholder="余额"
              v-model="userInfo.balance"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            会员级别
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
          style="width: 100%"
          v-if="rentOrReturnState"
        >
          <el-table-column
            prop="goodsId"
            label="产品编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="产品类别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="产品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="describes"
            label="产品描述">
          </el-table-column>
          <el-table-column
            prop="remark"
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
        tableData: [],
        userInfo:{
          cardId:'',
          name:"",
          balance:'',
          level:''
        },
        cost:0,//归还费用
        //输入框内的码
        QScode:'',
        //租赁是true
        //归还时false
        rentOrReturnState:true
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
      //扫码ing
      search(){
        //会员卡的卡号位数是10位
        if (this.QScode.length === 10){
          //用户刷卡，当前会员信息置空
          this.userInfo.cardId = '';
          this.userInfo.name = '';
          this.userInfo.balance = '';
          this.userInfo.level = '';
          //租赁表置空
          this.tableData = [];
          this.$http.post('http://lease.loverqi.cn:8080/lease/leasemain/userstart.action',{
            cardId:this.QScode
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.userInfo = body.data;//用户信息赋值userinfo对象
            }
          },(error)=>{});
          //扫码框置空
          this.QScode = ''
          //表格置空
          this.tableData = []
          //支付费用清空
          this.cost = 0
          this.rentOrReturnState = true;
        } else {
          //物品码
          //请求租赁
          this.$http.post('http://lease.loverqi.cn:8080/lease/leasemain/leasegoods.action',{
            cardId:this.userInfo.cardId, //会员卡ID
            shopId:sessionStorage.getItem('shopId'),
            barCode:this.QScode //物品码
          }).then((response)=>{
            let body = response.data;
            if (body.code === 0){
              //上一个请求是归还，该会员本次租赁结束，清空用户信息
              if (body.data.next === true){
                this.userInfo.cardId = '';
                this.userInfo.name = '';
                this.userInfo.balance = '';
                this.userInfo.level = '';
                //输入框归0
                this.QScode = '';
                //租借表清空
                this.tableData = [];
                this.rentOrReturnState = false;//状态置为归还
              } else {
                //上一个请求是租赁，把刚才的租赁商品 添加 进租赁表
                this.rentOrReturnState = true;//状态置为租赁

                this.getGoodsInfo(this.QScode);
              }
              //是否是归还物品
              if (body.data.ifAlso === true){
                this.cost = body.data.cost;
              }
            }
          },(error)=>{});
        }
      },
      //查询
      //todo 异步，要等待
      getGoodsInfo(qscode){
        this.$http.post('http://lease.loverqi.cn:8080/lease/goods/find.action',{
          bar:qscode
        }).then((response)=>{
          let body = response.data;
          //商品存在
          if (body.code === 0 ){
            this.tableData.push(body.data[0]);
            this.QScode = ''
          }else{
            //商品不存在
            this.QScode = '';
            this.$message({
              type: 'error',
              message: "商品不存在"
            });
          }
        },(error)=>{});

      }

    },
    mounted() {
      //输入框获取焦点
      document.querySelector(".app-rent-content-input input").focus();
    },
    components: {ElCol, ElRow}
  }
</script>
<style lang="less" scoped>
</style>