<template>
  <div id="app-nav">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" @click="navClick('rent')">返回租赁</el-menu-item>
      <el-submenu index="2">
        <template slot="title">信息管理</template>
        <el-menu-item index="2-1" @click="navClick('vip')">会员管理</el-menu-item>
        <el-menu-item index="2-2" @click="navClick('level')">等级管理</el-menu-item>
        <el-menu-item index="2-3" @click="navClick('charging')">计费管理</el-menu-item>
        <el-menu-item index="2-4" @click="navClick('rentInfo')">租赁管理</el-menu-item>
        <el-menu-item index="2-5" @click="navClick('goodsInfo')">物品管理</el-menu-item>

      </el-submenu>
      <el-menu-item index="3" @click="navClick('register')">物品登记</el-menu-item>
      <el-submenu index="4">
        <template slot="title">系统管理</template>
        <el-menu-item index="4-1" @click="navClick('userManage')">用户管理</el-menu-item>
        <el-menu-item index="4-2" @click="navClick('shopManage')">店铺管理</el-menu-item>
        <el-menu-item index="4-3" @click="navClick('toggleUser')">切换用户</el-menu-item>
        <el-menu-item index="4-4" @click="navClick('blackList')">黑名单</el-menu-item>
        <el-menu-item index="4-5" @click="navClick('logOut')">退出登录</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        activeIndex:'1'
      }
    },
    methods:{
      navClick(obj){
        switch (obj){
          case "rent":
            this.$router.push("/rent");
            break;
          case "vip":
            this.$router.push("/workBeach/vip");
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
          case "blackList":
            this.$router.push("/workBeach/blackList");
            break;
          case "register":
            this.$router.push("/workBeach/register");
            break;
          case "userManage":
            this.$router.push("/workBeach/userManage");
            break;
          case "shopManage":
            this.$router.push("/workBeach/shopManage");
            break;
          case "toggleUser":
            this.$confirm('切换用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/');
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
              this.$router.push('/');
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
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

      }
    }
  }
</script>
<style lang="less">
  @import "./nav.less";
</style>