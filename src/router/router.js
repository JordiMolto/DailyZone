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

  // LISTADO DE TAREAS
  {
    path: "/dashboard/task-list",
    name: "task-list",
    component: () => import("../views/dashboard/task-list/TaskList.vue"),
  },

  // RELOJ -> CONTADOR
  {
    path: "/dashboard/contador",
    name: "contador",
    component: () =>
      import("../views/dashboard/reloj/contador-view/ContadorView.vue"),
  },

  // RELOJ -> ALERTAS
  {
    path: "/dashboard/alertas",
    name: "alertas",
    component: () =>
      import("../views/dashboard/reloj/alertas-view/AlertasView.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

// Guardia de navegación global
router.beforeEach(async (to, from, next) => {
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/password-change",
    "/login-magic-link",
  ];
  const authRequired = !publicPages.includes(to.path);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (authRequired && !session) {
    // Si se requiere autenticación y no hay sesión, redirige a login
    return next("/login");
  }

  if (!authRequired && session) {
    // Si no se requiere autenticación y  hay sesión, redirige a dashboard
    return next("/dashboard/task-list");
  }

  // Si no se requiere autenticación o si el usuario está autenticado, continúa con la ruta
  next();
});

export default router;
