import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Dashboard from "../views/Dashboard.vue";
import Plugins from "../views/Plugins.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
  },
  {
    path: "/plugins",
    name: "Plugins",
    component: Plugins,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
