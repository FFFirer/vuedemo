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

## Vue和Axios访问接口跨域问题

环境: Vue-CLI@4

> 简述

假设接口的地址为 `http://localhost:5000/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐`。  
前端地址为 `http://localhost:8080`  
在vue.config.js中设置proxy，vue.config.js和package.json同级，若没有则自己新建。
在以下的例子中，`/spider`，作为请求接口的前缀，以及匹配使用的proxy，将axios的bashUrl设置为`/spider`，然后通过pathRewrite把这个重写掉，因为我们实际的请求中并没有这个。在下面的例子里，axios请求的地址为 `/spider/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐`，通过proxy请求的 `http://localhost:8080/spider/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐`，这个在浏览器的开发者工具里看到的也是这个。然后实际去请求数据的地址是 `http://localhost:5000/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐`。  
假设使用"/api"，作为前缀，而且axios请求接口的地址也以/api开头，则可以不用pathRewrite。

> axios 使用
```javascript
import axios from 'axios'

const testapi = {};

testapi.getFlights = function () {
    var result= {};
    axios.defaults.baseURL = '/spider'

    axios.get('/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐')
    .then(response => result = response.data)
    .catch(function (err) {
        console.error(err)
    });
    return result
}

export default testapi
```

> 在vue.config.js中配置proxy(代理)  

```javascript
module.exports = {
    devServer: {
        proxy: {
            '/spider': {
                target: 'http://localhost:5000',    // 接口的地址
                changeOrigin: true,    // 允许改变源
                pathRewrite: {
                    '^/spider': '/'    // 实际的接口地址没有这个，重写掉
                }
            }
        }
    }
}
```

> NOTE:  
> * 每次修改完之后要重新编译一遍然后重新启动去请求才有效，不然可能没有改动。  
> * 对于不同的开发和生产环境，只需将vue.config.js中的target的地址替换掉就可以了。
> * 参考资料：https://blog.csdn.net/jikangjian/article/details/80798677


## Elements in iteration expect to have 'v-bind:key' directives  vue/require-v-for-key
```html
<tr v-for="flight in flightdata" :key="flight.Id">
    <td>
        {{ flight.AirlineName }}
    </td>
    <td>
        {{ flight.FlightNumber }}
    </td>
    <td>
        {{ flight.departureDate }}
    </td>
    <td>
        {{ flight.departureCityName }} - {{ flight.departureAirportName }}
    </td>
    <td>
        {{ flight.arrivalCityName }} - {{ flight.arrivalAirportName }}
    </td>
    <td>
        {{ flight.CraftTypeName }}
    </td>
</tr>
```