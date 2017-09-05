<template>
  <div id="app-modify">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="text" v-model="ruleForm2.checkusername" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="password" v-model="ruleForm2.checkpassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" :rules="[{ required: true, message: '不能为空'}]">
            <el-input type="password" v-model="ruleForm2.checknewPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
      ElRow},
    data() {
      var checkusername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var checkpassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          return  callback();
        }
      };

      var checknewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          password: '',
          newPassword: ''
        },
        rules2: {
          username: [
            { validator: checkusername, trigger: 'blur' }
          ],
          password: [
            { validator: checkpassword, trigger: 'blur' }
          ],
          newPassword: [
            { validator: checknewPassword, trigger: 'blur' }
          ]
        },

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
        if (validStatus){
          this.$http.post('/lease/woker/updatePwd.action',{
            username: this.ruleForm2.username,
            password: this.ruleForm2.password,
            newPassword: this.ruleForm2.newPassword
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
          },(error)=>{});
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
</style>
