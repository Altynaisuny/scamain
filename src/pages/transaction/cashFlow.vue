<template>
  <div id="app-cashFlow">
    <el-row class="app-info-search">
      <el-col :span="3">
        <el-input v-model="categoryName" placeholder="请输入产品类别名称"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="state" placeholder="当前查询类别" @change="change">
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
        <el-input v-model="shopId" placeholder="请输入店铺号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="goodsId" placeholder="请输入商品号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-col>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="endTime"
          type="datetime"
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
          label="IC卡号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="租赁开始时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="租赁结束时间">
        </el-table-column>
        <el-table-column
          prop="consuming"
          label="总耗时">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="总费用">
        </el-table-column>
        <el-table-column
          prop="borrowName"
          label="租借店铺">
        </el-table-column>
        <el-table-column
          prop="alsoName"
          label="结束租赁店铺">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="app-info-pagination">
      <el-col :span="4" :offset="18">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pagination.pageCount"
          :page-size="pagination.pageSize"
          :current-page.sync="pagination.currentPage"
          @current-change="flip"
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
        startTime: '',
        endTime: '',
        tableData: [],
        //分页配置
        pagination: {
          pageCount: 100,
          pageSize: 10,//页面显示条数
          page: 1//查询页码
        },
        //当前查询的类别
        state: '',
        //商品号
        goodsId: '',
        //店铺号
        shopId: '',
        //会员卡号
        cardId: '',
        //产品类别名称
        categoryName: '',
        options: [],
      }

    },
    methods: {

      search() {
        this.$http.post('/lease/flowing/findFlowing.action', {
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          categoryName: this.categoryName,
          state: this.state,
          shopId: this.shopId,
          goodsId: this.goodsId,
          startTime: this.startTime,
          endTime: this.endTime
        }).then((response) => {
          let body = response.data
          if (body.code === 0) {
            this.tableData = body.data
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        }, (error) => {
        });
      },

      reset() {
        this.state = '';
        this.goodsId = '';
        this.shopId = '';
        this.cardId = '';
        this.startTime = '';
        this.endTime = ''
      },

      flip(val) {
        this.pagination.currentPage = val
        this.search();
      },
      change(val) {
        this.state = val;
      }
    },
    mounted() {
      //列表初始化查询。
      this.$http.post('/lease/flowing/findFlowing.action', {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        categoryName: this.categoryName,
        shopId: this.shopId,
        goodsId: this.goodsId,
        startTime: this.startTime,
        endTime: this.endTime
      }).then((response) => {
        let body = response.data
        if (body.code === 0) {
          this.tableData = body.data
        } else {
          this.$message({
            type: 'error',
            message: body.message
          });
        }
      }, (error) => {
      });
      //下拉框初始化查询
      this.$http.post('/lease/dictionary/find.action', {
        id: '1001'
      }).then((response) => {
        let body = response.data;
        if (body.code === 0) {
          this.options = body.data.list;
        } else {
          this.$message({
            type: 'error',
            message: body.message
          });
        }
      }, (error) => {
      });

    },
    components: {
      ElCol, ElRow
    }
  }
</script>
<style lang="less" scoped>
  .app-info-search {
    margin-bottom: 20px;
  }
</style>