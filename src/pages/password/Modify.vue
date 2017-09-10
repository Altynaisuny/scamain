<template>
  <div id="app-modify">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="账户" prop="username" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="password" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    components: {
      ElCol,
      ElRow
    },
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          newPassword: ''
        },
        rules: {},

      }
    },
    methods: {
      submitForm(formName) {
        let validStatus = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            validStatus = true;
          }
        });
        //校验成功
        if (validStatus) {
          this.$http.post('/lease/woker/updatePwd.action', {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            newPassword: this.ruleForm.newPassword
          }).then((response) => {
            let body = response.data
            if (body.code === 0) {
              this.$message({
                type: 'success',
                message: body.message
              });
              this.resetForm(formName);
              this.$router.push("/index.html");//更改密码成功，重新登录
            } else {
              this.$message({
                type: 'error',
                message: body.message
              });
            }
          }, (error) => {
          });
        } else {
          return false;
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      this.$http.post('/lease/woker/userstart.action',{
        shopId:this.inputshopId,
        username:this.inputusername
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
    }
  }
</script>

<style lang="less">
</style>
