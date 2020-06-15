import flightsummary from '../components/flightsummary.vue'
import flightdetail from '../components/flightdetail.vue'
import welcome from '../components/welcome.vue'
// import content from '../components/content.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

// 设置路由规则
const routers = [
    {
        path: '/',
        component: welcome
    },
    {
        path: '/ctrip',
        component: welcome
    },
    {
        path: '/ctrip/flightsummary',
        component: flightsummary
    },
    {
        path: '/ctrip/flightdetail',
        component: flightdetail
    }
];

const router = new VueRouter({
    routes: routers
});

export default router;