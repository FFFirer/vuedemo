import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import component from '../views/Home.vue';
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }, {
    path: "/tabs-demo",
    name: "TabsDemo",
    component: () => import("../views/TabsDemo.vue")
  },{
    path: "/element-plus-demo",
    name: "ElementPlusDemo",
    component:()=>import("../views/ElementPlusDemo.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
