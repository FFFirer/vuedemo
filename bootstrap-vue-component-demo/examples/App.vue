<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-link to="/">Hello World</router-link>
  <router-link to="/demo">Demo</router-link>
  <router-link to="/demo/drop-down">Dropdown Demo</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},

  HelloWorlddata: function() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
