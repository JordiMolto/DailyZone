// router.js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/autenticacion/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/autenticacion/RegisterView.vue"),
  },
  {
    path: "/password-change",
    name: "password-change",
    component: () => import("../views/autenticacion/PasswordChange.vue"),
  },
  {
    path: "/success",
    name: "success",
    component: () => import("../views/autenticacion/success/SuccessView.vue"),
  },
  {
    path: "/dashboard-view",
    name: "dashboard-view",
    component: () => import("../views/dashboard/DashboardView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
