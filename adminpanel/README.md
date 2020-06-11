# adminpanel

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 项目详解

## 引用jQuery

> vue-cli@4

在此版本下，安装完jQuery依赖之后

```bash
npm install jquery --save-dev
```
在要只用jQuery的地方直接导入就可以
```javascript
import $ from 'jquery'
```

## 引用Bootstrap

安装依赖

```bash
npm install jquery bootstrap@4 popper.js --save-dev
```

在入口文件main.js中添加依赖
```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```


## 侧边栏

### 组件

* @/components/Content.vue
* @/components/Sidebar.vue

点击Content.vue中的按钮可以打开关闭Sidebar  
定义默认情况下，组件不含有.active类，点击按钮则加上active类，再次点击则移去。  
定义，组件内又一个参数，为真时则加上active类，视图上做响应设置。

> 视图  

``` html
<div id="content" v-bind:class="{active: isActive}">
```

> 组件  
``` javascript
export default {
    name: 'Content',
    computed : {
        isActive: function () {
            return this.$store.state.sidebarIsActive;
        }
    }
}
```

使用vuex作为全局参数存放，当在Content.vue点击按钮时，更新状态，同时在Sidebar.vue更新状态，更新视图

> @/store/index.js 定义vuex初始值

``` javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sidebarIsActive: false
    },
    mutations: {
        sidebarToggleActive(state) {
            state.sidebarIsActive = !state.sidebarIsActive
        }
    }
})
```
> 在入口文件main.js中引入

```javascript
import store from '@/store/index.js'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```

> 点击按钮时执行的函数
```javascript
methods: {
        sidebarCollapse: function(){
            console.log(this.$store.state.sidebarIsActive)
            this.$store.commit('sidebarToggleActive');
            console.log(this.$store.state.sidebarIsActive)
        }
```

