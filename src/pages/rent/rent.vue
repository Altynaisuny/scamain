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
        <div slot="header" class="clearfix">
          <span>用户名:{{rentHumanId}}</span>
          <span style="line-height: 36px;">已借项目</span>
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
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="primary" icon="delete" @click="deleteShop"></el-button>
            </template>
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
        tableData: [{
          id: '00001',
          name: '物品一',
          time: '2017-08-19',
          rentCode: '15645615645',
          price: '50元',
          remarks: '备注'
        },
          {
            id: '00002',
            name: '物品二',
            time: '2017-08-19',
            rentCode: '6546165146',
            price: '50元',
            remarks: '备注'
          }, {
            id: '00003',
            name: '物品三',
            time: '2017-08-19',
            rentCode: '15465452621',
            price: '50元',
            remarks: '备注'
          }, {
            id: '00004',
            name: '物品四',
            time: '2017-08-19',
            rentCode: '1235648948',
            price: '50元',
            remarks: '备注'
          }, {
            id: '00005',
            name: '物品五',
            time: '2017-08-19',
            rentCode: '8786184984',
            price: '50元',
            remarks: '备注'
          }]
      }
    },
    methods: {
      loseFocus(Event) {
        var not = this.$notify.error({
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
      deleteShop(){

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

    },
    watch: {
      inputValue: function (value) {
      }
    },
    components: {ElCol, ElRow}
  }
</script>
<style lang="less" scoped>
</style>