<template>
  <div id="app-info">

    <el-row class="app-info-search">
      <el-col :span="4">
        <el-select v-model="value8" filterable placeholder="请选择物品类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value7" filterable placeholder="请选择物品名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" >
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4" >
        <el-select
          v-model="value9"
          multiple
          filterable
          remote
          placeholder="请输入租赁人姓名"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" >
        <el-button type="info">查询</el-button>
        <el-button :plain="true" type="info" @click="reset">重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="会员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="租赁时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="租赁时长">
        </el-table-column>
        <el-table-column
          prop="address"
          label="费用">
        </el-table-column>
        <el-table-column
          prop="address"
          label="产品">
        </el-table-column>
        <el-table-column
          prop="address"
          label="优惠额度">
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="app-info-pagination">
      <el-col :span="4" :offset="18">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: '',
        value7: '',
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"],

        value1: '',
        value2: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }

    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      reset(){
        this.value8='';
        this.value7='';
        this.value9='';
        this.value1='';
        this.value2='';
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return {value: item, label: item};
      });
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