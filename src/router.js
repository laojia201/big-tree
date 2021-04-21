import Vue from "vue";
import Router from "vue-router";
import bTree from "./views/bTree.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/b-tree"
    },
    {
      path: "/b-tree",
      name: "bTree",
      component: bTree
    }
  ]
});
