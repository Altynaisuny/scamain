<template>
  <div id="app-nav">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

      <el-menu-item index="1" @click="navClick('rent')" v-if="!isSystem">返回租赁</el-menu-item>

      <el-submenu index="2">
        <template slot="title">信息管理</template>
        <el-menu-item index="2-1" @click="navClick('level')">等级管理</el-menu-item>
        <el-menu-item index="2-2" @click="navClick('charging')">计费管理</el-menu-item>
        <el-menu-item index="2-3" @click="navClick('rentInfo')">租赁管理</el-menu-item>
        <el-menu-item index="2-4" @click="navClick('goodsInfo')">物品管理</el-menu-item>
        <el-menu-item index="2-5" @click="navClick('user')">会员管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">交易</template>
        <el-menu-item index="3-1" @click="navClick('cashFlow')">交易流水</el-menu-item>
        <el-menu-item index="3-2" @click="navClick('cashFlowAll')">交易流水合计</el-menu-item>
        <el-menu-item index="3-3" @click="navClick('recharge')">充值</el-menu-item>
      </el-submenu>
      <el-submenu index="4" >
        <template slot="title">登记</template>
        <el-menu-item index="4-1" @click="navClick('register')">物品登记</el-menu-item>
        <el-menu-item index="4-2" @click="navClick('category')">类别登记</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">系统管理</template>
        <el-menu-item index="5-1" @click="navClick('userManage')" v-if="isSystem">员工管理</el-menu-item>
        <el-menu-item index="5-2" @click="navClick('shopManage')">店铺管理</el-menu-item>
        <el-menu-item index="5-3" @click="navClick('toggleUser')">切换用户</el-menu-item>
        <el-menu-item index="5-4" @click="navClick('modifyPassword')">修改密码</el-menu-item>
        <el-menu-item index="5-5" @click="navClick('loginAgain')">重新登录</el-menu-item>
        <el-menu-item index="5-6" @click="navClick('logOut')">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        activeIndex:'1',
        isSystem: false
      }
    },
    methods:{
      navClick(obj){
        switch (obj){
          case "rent":
            this.$router.push("/rent");
            break;
          case 'charging':
            this.$router.push("/workBeach/charging");
            break;
          case 'level':
            this.$router.push("/workBeach/level");
            break;
          case "rentInfo":
            this.$router.push("/workBeach/rentInfo");
            break;
          case "goodsInfo":
            this.$router.push("/workBeach/goodsInfo");
            break;
          case "user":
            this.$router.push("/workBeach/user");
            break;
          case "blackList":
            this.$router.push("/workBeach/blackList");
            break;
          case "register":
            this.$router.push("/workBeach/register");
            break;
          case "category":
            this.$router.push("/workBeach/category");
            break;
          case "userManage":
            this.$router.push("/workBeach/userManage");
            break;
          case "cashFlow":
            this.$router.push("/workBeach/cashFlow");
            break;
          case "cashFlowAll":
            this.$router.push("/workBeach/cashFlowAll");
            break;
          case "recharge":
            this.$router.push("/workBeach/recharge");
            break;
          case "shopManage":
            this.$router.push("/workBeach/shopManage");
            break;
          case "loginAgain":
            this.logout();
            this.$router.push("/index.html");
            break;
          case "modifyPassword":
            this.$router.push("/workBeach/modifyPassword");
            break;
          case "toggleUser":
            this.$confirm('切换用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.logout();
              this.$router.push('/index.html');
              this.$message({
                type: 'success',
                message: '切换成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
            break;
          case "logOut":
            this.$confirm('退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.logout();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
            break;
        }
      },
      handleSelect(){

      },
      logout(){
        this.$http.post('/lease/woker/unlogin.action',{
          token:sessionStorage.getItem('token')
        }).then((response)=>{
          let body = response.data
          if (body.code === 0 ){
            this.$message({
              type: 'success',
              message: body.message
            });
            this.$router.push('/index.html');//跳转至登录
            sessionStorage.removeItem('token')//移除token
            sessionStorage.removeItem('shopId')
            sessionStorage.removeItem('isSystem')
            sessionStorage.removeItem('username')
          } else {
            this.$message({
              type: 'error',
              message: body.message
            });
          }
        },(error)=>{});
      }
    },
    mounted(){
      if (sessionStorage.getItem('isSystem') === 'true'){
        this.isSystem = true;
      }
    }
  }
</script>
<style lang="less">
  @import "./nav.less";
</style>