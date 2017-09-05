<template>
  <div id="app-goodsRegister">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称" :rules="[{ required: true, message: '不能为空'}]">
            <el-input v-model="form.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" :rules="[{ required: true, message: '不能为空'}]">
            <el-select v-model="form.categoryId" placeholder="请选择物品种类">
              <el-option label="种类一" value="shanghai"></el-option>
              <el-option label="种类二" value="beijing"></el-option>
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
      }
    },
    methods: {
      onSubmit() {
        this.$http.post('/lease/goods/update.action',{
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
              message: body.message+"ID:"+body.data.goodsId
            });
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});

        this.$message({
          message: "登记成功",
          type: 'success'
        });
      },
      resetForm(forName) {
        this.$refs[forName].resetFields();
      }
    },
    watch: {},
    components: {
      ElCol, ElRow
    },
    mounted(){
      //todo 缺少产品列表下拉框初始化
    }
  }
</script>
<style lang="less" scoped>
  @import "goodRegister.less";
</style>