<template>
  <div id="app-login">
    <el-card class="box-card app-login-content">
      <el-form
        :model="userInfo"
        :rules="rulesTemp"
        ref="userInfo"
        label-width="100px"
        class="app-login-content-form"
        :label-position="labelPosition"
      >
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="userInfo.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="userInfo.pass" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('userInfo')"
            :plain="false"
          >登录
          </el-button>
          <el-button @click="resetForm('userInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    components: {ElCol, ElRow},
    data(){
      var checkUser = (rule, value, callback) => {
        if (value===null || value==="") {
          callback(new Error('账号不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else {
//          if (this.userInfo.checkPass !== '') {
//            this.$refs.userInfo.validateField('checkPass');
//          }
          callback();
        }
      };

      return {
        userInfo: {
          user: '',
          pass: ''
        },
        labelPosition:'left',
        rulesTemp: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          user: [
            {validator: checkUser, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(FormName){
        //规范性检验
        this.$refs[FormName].validate((valid) => {
          if (valid) {
            //弹框显示
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            //进入租赁界面
            this.$router.push("/rent")
          } else {
            //弹框显示
            this.$message.error("账户/密码错误，请重新输入");
            return false;
          }
        });
      },
      resetForm(forName){
        this.$refs[forName].resetFields();
      }

    },
    watch: {}
  }
</script>
<style lang="less" scoped>
  @import "login.less";
</style>