<template>
  <div class="sidebar-component">
    <!--SIDEBAR -->
    <div
      :class="{
        sidebar: true,
        'open-sidebar': showSidebar,
        'close-sidebar': !showSidebar,
      }"
    >
      <!--profile image & text-->
      <div class="profile">
        <img :src="image" alt="profile_picture" />
        <h3>{{ usuarioActualNombre }}</h3>
        <p>{{ usuarioActualProfesion }}</p>
        <p>{{ usuarioActualEmail }}</p>
      </div>

      <!--menu item-->
      <div class="list-links">
        <!-- LISTADO TOP -->
        <div class="list-links-top">
          <p class="sidebar-title">Herramientas</p>
          <ul class="ul-principal">
            <li
              class="li-principal"
              v-for="(option, index) in sidebarOptionsTop"
              :class="{ active: option.isActive }"
              :key="index"
            >
              <a @click="toggleSubOptions(index)">
                <div>
                  <span class="icon"><i :class="option.iconClass"></i></span>
                  <span class="item">{{ option.itemText }}</span>
                </div>
                <span class="display-icon">
                  <i
                    class="fa"
                    :class="
                      option.subOptionsVisible
                        ? 'fa-chevron-down'
                        : 'fa-chevron-right'
                    "
                  ></i>
                </span>
              </a>
              <ul v-if="option.subOptionsVisible" class="ul-secundario">
                <li
                  class="li-secundario"
                  v-for="(subOption, subIndex) in option.subOptions"
                  :key="subIndex"
                >
                  <!-- Aquí tu estructura de subopción -->
                  <span class="item">
                    {{ subOption.text }}
                  </span>
                </li>
              </ul>
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
  </div>
</template>

<script>
import "./sidebar-component.scss";
import { supabaseClient } from "../../main";
import img from "../../assets/images/default.jpg";

export default {
  name: "SidebarComponent",
  comments: {},
  data() {
    return {
      image: img,
      showSidebar: true,
      sidebarOptionsTop: [
        {
          iconClass: "fa fa-list",
          itemText: "Listados",
          isActive: true,
          link: "",
          subOptionsVisible: true, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa fa-clock",
          itemText: "Reloj",
          isActive: false,
          link: "",
          subOptionsVisible: true, // Añade esta línea

          subOptions: [
            { text: "Alertas" }, // Ejemplo de subopciones
            { text: "Cronómetro" },
          ],
        },
        {
          iconClass: "fa fa-home",
          itemText: "Home",
          isActive: false,
          link: "",
          subOptionsVisible: true, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa fa-desktop",
          itemText: "My Dashboard",
          isActive: false,
          link: "",
          subOptionsVisible: true, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa fa-user-friends",
          itemText: "People",
          isActive: false,
          link: "",
          subOptionsVisible: true, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa fa-tachometer-alt",
          itemText: "Perfomance",
          isActive: false,
          link: "",
          subOptionsVisible: false, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa fa-database",
          itemText: "Development",
          isActive: false,
          link: "",
          subOptionsVisible: false, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
      ],
      sidebarOptionsBottom: [
        {
          iconClass: "fa fa-cog",
          itemText: "Configuración",
          action: this.goToChangePassword,
          isActive: false,
          link: "",
          subOptionsVisible: false, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa-solid fa-lock",
          itemText: "Cambiar contraseña",
          action: this.goToChangePassword,
          isActive: false,
          link: "",
          subOptionsVisible: false, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
        {
          iconClass: "fa-solid fa-door-open",
          itemText: "Cerrar sesión",
          action: this.signOutSession,
          isActive: false,
          link: "",
          subOptionsVisible: false, // Añade esta línea

          subOptions: [
            { text: "Subopción 1" }, // Ejemplo de subopciones
            { text: "Subopción 2" },
          ],
        },
      ],
      usuarioActual: "usuarioActual",
      usuarioActualRol: "usuarioActualRol",
      usuarioActualEmail: "emailejemplo@gmail.com",
      usuarioActualNombre: "Nombre Ejemplo",
      usuarioActualProfesion: "Profesión actual ejemplo",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const {
          data: { user },
        } = await supabaseClient.auth.getUser();
        this.usuarioActual = user;
        this.usuarioActualRol = user.role;
        this.usuarioActualEmail = user.email;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
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

    toggleSubOptions(index) {
      this.sidebarOptionsTop[index].subOptionsVisible =
        !this.sidebarOptionsTop[index].subOptionsVisible;
    },
  },
};
</script>
