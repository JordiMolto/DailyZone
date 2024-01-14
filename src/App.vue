<template>
  <div id="app">
    <div class="auth-page">
      <Sidebar v-if="usuarioActualRol === 'authenticated'"></Sidebar>

      <div class="current-router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/styles/main.scss";
import "./assets/styles/paleta-colores.scss";
import Sidebar from "./components/sidebar-component/SidebarComponent.vue";
import { supabaseClient } from "./main";

export default {
  name: "App",
  components: { Sidebar },
  data() {
    return {
      usuarioActualRol: "",
    };
  },
  created() {
    this.getUser();
    supabaseClient.auth.onAuthStateChange((event, session) => {
      this.usuarioActualRol = session?.user?.role ?? "";
    });
  },
  methods: {
    async getUser() {
      try {
        const {
          data: { user },
        } = await supabaseClient.auth.getUser();
        if (user) {
          this.usuarioActualRol = user.role;
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
  },
};
</script>

<style>
#app > .auth-page {
  display: flex;
}

.current-router-view {
  height: 100vh;
  overflow-y: auto;
  width: 100%;
}
</style>
