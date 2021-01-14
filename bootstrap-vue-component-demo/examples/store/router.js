import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Demo from '../pages/Demo.vue'
import DropdownDemo from '../pages/Demos/DropdownDemo.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [{
        path: '/',
        component: HelloWorld
    },
    {
        path: '/demo',
        component: Demo
    },
    {
        path: '/demo/drop-down',
        component: DropdownDemo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router