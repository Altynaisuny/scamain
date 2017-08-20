<template>
  <div id="app-main">
    <div class="app-workBeach-header">
      <scamainNav ></scamainNav>
    </div>
    <div class="app-workBeach-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import scamainNav from '../components/nav/nav.vue'
  export default{
    data(){
      return{

      }
    },
    components:{
      scamainNav
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
  #app-main{
    height: 100%;
    width: 100%;
  }
  .app-workBeach-header{
    height: 70px;
  }
  .app-workBeach-content{
    width: 100%;
    height: auto;
  }
</style>