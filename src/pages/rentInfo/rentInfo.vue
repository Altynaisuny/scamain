<template>
  <div id="app-info">
    <el-row class="app-info-search">
      <el-col :span="3">
        <el-select v-model="state" filterable placeholder="请选择订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input v-model="cardId" placeholder="请输入会员卡号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="shopId" placeholder="请输入店铺号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="goodsId" placeholder="请输入商品号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
      </el-col>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-button type="info" @click="search">查询</el-button>
        <el-button :plain="true" type="info" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="state"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="cardId"
          label="用户IC">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="租赁时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束租赁时间">
        </el-table-column>
        <el-table-column
          prop="consuming"
          label="租赁的总耗时">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="租赁的总费用">
        </el-table-column>
        <el-table-column
          prop="borrowId"
          label="租借的店铺">
        </el-table-column>
        <el-table-column
          prop="alsoId"
          label="结束租赁的店铺">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="订单备注">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="app-info-pagination">
      <el-col :span="4" :offset="18">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pagination.pageCount"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
        >
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    data() {
      return {
        options: [],
        loading: false,
        startTime: '',
        endTime: '',
        tableData: [],
        //分页配置
        pagination:{
          pageCount:100,
          pageSize:10,//页面显示条数
          page:1//查询页码
        },
        //订单的状态
        state:'',
        //商品号
        goodsId:'',
        //店铺号
        shopId:'',
        //会员卡号
        cardId:''
      }

    },
    methods: {

      search(){
        this.$http.post('/lease/flowing/leasegoods.action',{
          page:this.pagination.page,
          pageSize:this.pagination.pageSize,
          state:this.state,
          cardId:this.cardId,
          shopId:this.shopId,
          goodsId:this.goodsId,
          startTime:this.startTime,
          endTime:this.endTime
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
            this.tableData = body.data

          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});
      },

      reset(){
        this.state=''
        this.goodsId=''
        this.shopId=''
        this.cardId=''
        this.startTime=''
        this.endTime=''
      }
    },
    mounted() {
      this.search();
      this.$http.post('/lease/dictionary/find.action',{
        id:'1000'
      }).then((response)=>{
        let body = response.data
        if (body.code === 0 ){
          this.options = body.data.list;
        } else {
          this.$message({
            type: 'error',
            message: body.message
          });
        }
      },(error)=>{});
    },
    components: {
      ElCol, ElRow
    }
  }
</script>
<style lang="less" scoped>
  .app-info-search{
    margin-bottom: 20px;
  }
</style>