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

  export default {
    components: {ElCol, ElRow},
    data() {
      var checkUser = (rule, value, callback) => {
        if (value === null || value === "") {
          callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else {
          callback();
        }
      };

      return {
        userInfo: {
          user: '',
          pass: ''
        },
        labelPosition: 'left',
        rulesTemp: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          user: [
            {validator: checkUser, trigger: 'blur'}
          ]
        },
        loginStatus: false
      };
    },
    methods: {
      submitForm(FormName) {
        let validStatus = false;
        //规范性检验
        this.$refs[FormName].validate((valid) => {
          if (valid) {
            validStatus = true;
          }
        });
        let status = false ;
        //校验成功
        if (validStatus) {
          this.$http.post('/lease/woker/login.action', {
            username: this.userInfo.user,
            password: this.userInfo.pass
          }).then( (response)=> {
            let body = response.data;
            console.log(response);
            if (body.code === 0) {
              this.$store.dispatch('setToken',body.token);

              this.$store.dispatch('setSystem',body.data.isSystem);

              this.$store.dispatch('setShopId', body.data.shopId);

              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
              //进入租赁界面
              this.$router.push("/rent");
              return true
            } else {
              this.$message.error(body.message);
              return false;
            }
          },(error) => {
            console.log(error)
          })
        } else {
          //校验失败
          return false;
        }
      },
      resetForm(forName) {
        this.$refs[forName].resetFields();
      }

    },
    watch: {
      loginStatus: function (val) {

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "login.less";
</style>