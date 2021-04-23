import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // 首页我们需要默认空路径重定向到 home ，避免空页面
  {
    path: "/",
    name: "home",
    redirect: "home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      index: 1, // 添加 meta 属性，约定 1 为第一级
    },
  },
  {
    path: "/category",
    name: "category",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "category" */"../views/Category.vue"),
    meta: {
      index: 1, // 添加 meta 属性， 约定 2 为 第二级
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () =>import(/* webpackChunkName: "user" */"../views/User.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>import(/* webpackChunkName: "detail" */ "../views/Detail.vue" ),
    meta: {
      index: 2,
    },
  },
  {
    path: "/address",
    name: "address",
    meta: {
      index: 2,
  },
    component: () =>import(/* webpackChunkName: "address" */ "../views/Address.vue"),
   },
   {
    path: "/address-edit",
    name: "address-edit",
    meta: {
      index: 3,
  },
    component: () =>import(  /* webpackChunkName: "address-edit" */"../views/AddressEdit.vue"),
   },
];

const router = new VueRouter({
  routes,
});

export default router;
