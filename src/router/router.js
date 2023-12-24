// router.js
import Vue from "vue";
import VueRouter from "vue-router";
import { supabaseClient } from "../main";

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
    path: "/login-magic-link",
    name: "login-magic-link",
    component: () => import("../views/autenticacion/LoginMagicLink.vue"),
  },
  {
    path: "*",
    name: "error-404",
    component: () => import("../views/not-found/NotFound.vue"),
  },
  {
    path: "/dashboard-view",
    name: "dashboard-view",
    component: () => import("../views/dashboard/DashboardView.vue"),
    beforeEnter: (to, from, next) => {
      (async () => {
        try {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();

          const user = session?.user;

          if (!user) {
            next("/login"); // Redirigir si no está autenticado
          } else {
            next(); // Permitir el acceso
          }
        } catch (error) {
          console.error(error);
          next("/error");
        }
      })();
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
