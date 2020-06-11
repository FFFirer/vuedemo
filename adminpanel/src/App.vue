<template>
  <div id="app">
    <sidebar-demo></sidebar-demo>
    <content-demo></content-demo>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Content from './components/Content.vue'

export default {
  name: 'App',
  components: {
    'sidebar-demo': Sidebar,
    'content-demo': Content
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
