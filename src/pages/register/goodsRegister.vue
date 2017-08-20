<template>
  <div id="app-goodsRegister">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="物品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="物品种类">
            <el-select v-model="form.region" placeholder="请选择物品种类">
              <el-option label="种类一" value="shanghai"></el-option>
              <el-option label="种类二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="租借时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="租赁码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="归还码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="物品来源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    data(){
      return{
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods:{
      onSubmit() {
        this.$message({
          message:"登记成功",
          type:'success'
        });
      },
      resetForm(forName){
        this.$refs[forName].resetFields();
      }
    },
    components:{
      ElCol, ElRow
    }
  }
</script>
<style lang="less" scoped>
  @import "goodRegister.less";
</style>