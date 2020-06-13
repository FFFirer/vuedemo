<template>
  <div id="app">
    <sidebar-demo></sidebar-demo>
    <main-content></main-content>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import mainContent from './components/content'

export default {
  name: 'App',
  components: {
    'sidebar-demo': Sidebar,
    'main-content': mainContent
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
