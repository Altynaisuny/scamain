<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {}
		},
		components: {},
		beforeMounted() {
		},
		mounted() {
		},
		methods: {}
	}
</script>

<style lang="less">
  @import "./pages/login/login.less";

  #app {
    width: 100%;
    height: 100%;
  }

</style>
