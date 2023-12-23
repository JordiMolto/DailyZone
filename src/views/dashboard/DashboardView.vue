<!-- Login.vue -->
<template>
  <div>
    <h1>ACABAS DE ENTRAR AL DASHBOARD CON EL SIGUIENTE NOMBRE DE USUARIO:</h1>
    <h1>{{ "usuario" }}</h1>
    <br />
    <br />
    <br />
    <br />
    <h3>tienes la posibilidad de:</h3>
    <button class="button mt-25" @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script>
import "./dashboard-view.scss";
import { supabaseClient } from "@/main";

export default {
  name: "DashboardView",
  comments: {},
  data() {
    return {};
  },
  methods: {
    // CERRAR SESIÓN
    async cerrarSesion() {
      let response = await supabaseClient.auth.signOut();

      if (response.error) {
        console.error("Error al cerrar la sesión:", response.error);
      } else {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
