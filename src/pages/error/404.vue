<template>
  <div id="app-404">
    <scmainHeader class="app-404-header"></scmainHeader>
    <div class="app-404-content">
      <img src="./404.png">
    </div>
  </div>
</template>
<script>
  import scmainHeader from "../../components/nav/nav.vue"
  export default{
    data(){
      return{

      }
    },
    methods:{

    },
    components:{
      scmainHeader
    }
  }
</script>
<style lang="less" scoped>
  .app-404-content{
    text-align:center;
    img{
      max-width: 500px;
      height: auto;
    }
  }
</style>