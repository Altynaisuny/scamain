<template>
  <div id="app-goodsRegister">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-form ref="form" :rules="rule" :model="form" label-width="80px">
          <el-form-item label="名称" :rules="[{ required: true, message: '不能为空'}]">
            <el-input v-model="form.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" :rules="[{ required: true, message: '不能为空'}]">
            <el-select v-model="form.categoryId" placeholder="请选择物品种类" @change="change">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.categoryName"
                :value="item.categoryId">
                <span style="float: left">{{ item.categoryId }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.categoryName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条码" :rules="[{ required: true, message: '不能为空'}]">
            <el-input v-model="form.bar"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
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


  export default {
    data() {
      return {
        form: {
          categoryId:'',
          goodsName:'',
          describe:'',
          remark:'',
          bar:''
        },
        //下拉框
        options:[],
        //表单校验规则
        rule:{},
      }

    },
    methods: {
      submitForm(formName) {
        let  submitState = false ;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitState = true;//校验通过
          }
        });
        //todo 表单校验有问题，需要处理
        if (submitState){
          //发送
          this.$http.post('http://lease.loverqi.cn:8080/lease/goods/update.action',{
            categoryId:this.form.categoryId,
            goodsName:this.form.goodsName,
            describe:this.form.describe,
            remark:this.form.remark,
            bar:this.form.bar
          }).then((response)=>{
            let body = response.data
            if (body.code === 0 ){
              this.$message({
                type: 'success',
                message: body.message+",新产品录,ID:"+body.data.goodsId
              });
            } else {
              this.$message({
                type: 'error',
                message: "该商品已注册或者参数不对！"
              });
            }
          },(error)=>{});
        }
      },
      resetForm(forName) {
        this.$refs[forName].resetFields();
      },
      //下拉框选定
      change(val){
        this.form.categoryId = val;
      }
    },
    watch: {},
    components: {
      ElCol, ElRow
    },
    mounted(){
      this.$http.post('http://lease.loverqi.cn:8080/lease/category/find.action',{
      }).then((response)=>{
        let body = response.data;
        if (body.code === 0 ){
          this.options = body.data;
        } else {
          this.$message({
            type: 'error',
            message: body.message
          });
        }
      },(error)=>{});
    }
  }
</script>
<style lang="less" scoped>
</style>