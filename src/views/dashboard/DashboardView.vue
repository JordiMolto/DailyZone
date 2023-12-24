<template>
  <div class="dashboard-view">
    <!--SIDEBAR -->
    <div
      :class="{
        'sidebar-dashboard': true,
        'open-sidebar': showSidebar,
        'close-sidebar': !showSidebar,
      }"
    >
      <!--profile image & text-->
      <div class="profile">
        <img :src="image" alt="profile_picture" />
        <h3>Jordiet</h3>
        <p>Desarrollador Web</p>
      </div>

      <!--menu item-->
      <div class="list-links">
        <!-- LISTADO TOP -->
        <div class="list-links-top">
          <p class="sidebar-title">General</p>
          <ul>
            <li
              v-for="(option, index) in sidebarOptionsTop"
              :class="{ active: option.isActive }"
              :key="index"
            >
              <a :href="option.isActive ? '#' : ''">
                <span class="icon"><i :class="option.iconClass"></i></span>
                <span class="item">{{ option.itemText }}</span>
              </a>
              <div class="display-icon">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </li>
          </ul>
        </div>

        <!-- LISTADO BOTTOM -->
        <div class="list-links-bottom">
          <p class="sidebar-title">Perfil</p>
          <ul>
            <li
              v-for="(option, index) in sidebarOptionsBottom"
              :class="{ active: option.isActive }"
              :key="index"
            >
              <a @click="option.action">
                <span class="icon"><i :class="option.iconClass"></i></span>
                <span class="item">{{ option.itemText }}</span>
              </a>
              <div class="display-icon">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div @click="showSidebarFn()" class="toggle-sidebar">
        <div class="toggle-sidebar-icon">
          <div class="hamburger">
            <a href="#">
              <i v-if="showSidebar" class="fa-solid fa-chevron-left"></i>
              <i v-if="!showSidebar" class="fa-solid fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!--DASHBOARD CONTENT -->
    <div class="content-dashboard">
      <h1>ACABAS DE ENTRAR AL DASHBOARD CON EL SIGUIENTE NOMBRE DE USUARIO:</h1>
      <h1>{{ "usuario" }}</h1>
    </div>
  </div>
</template>

<script>
import "./dashboard-view.scss";
import { supabaseClient } from "../../main";
import img from "../../assets/images/default.jpg";

export default {
  name: "DashboardView",
  comments: {},
  data() {
    return {
      image: img,
      showSidebar: true,
      sidebarOptionsTop: [
        {
          iconClass: "fa fa-home",
          itemText: "Home",
          isActive: true,
        },
        {
          iconClass: "fa fa-desktop",
          itemText: "My Dashboard",
          isActive: false,
        },
        {
          iconClass: "fa fa-user-friends",
          itemText: "People",
          isActive: false,
        },
        {
          iconClass: "fa fa-tachometer-alt",
          itemText: "Perfomance",
          isActive: false,
        },
        {
          iconClass: "fa fa-database",
          itemText: "Development",
          isActive: false,
        },
      ],
      sidebarOptionsBottom: [
        {
          iconClass: "fa fa-cog",
          itemText: "Configuración",
          action: this.goToChangePassword,
          isActive: false,
        },
        {
          iconClass: "fa-solid fa-lock",
          itemText: "Cambiar contraseña",
          action: this.goToChangePassword,
          isActive: false,
        },
        {
          iconClass: "fa-solid fa-door-open",
          itemText: "Cerrar sesión",
          action: this.signOutSession,
          isActive: false,
        },
      ],
    };
  },
  methods: {
    // CERRAR SESIÓN
    async signOutSession() {
      let response = await supabaseClient.auth.signOut();

      if (response.error) {
        console.error("Error al cerrar la sesión:", response.error);
      } else {
        this.$router.push({ name: "home" });
      }
    },

    // Navegar a la ruta de cambio de contraseña
    goToChangePassword() {
      this.$router.push({ name: "password-change" });
    },

    // Toggle showSidebar
    showSidebarFn() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>