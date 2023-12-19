<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form @submit.prevent="loginUser" class="auth-form">
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Inicio sesión</h2>
      </div>

      <!-- FORMULARIO INICIO SESIÓN -->
      <div class="login-card">
        <div class="form-field">
          <label for="usuario">Usuario:</label>
          <input type="text" id="usuario" name="usuario" />
        </div>

        <div class="form-field">
          <label for="contrasenya">Contraseña:</label>
          <input type="password" id="contrasenya" name="contrasenya" />
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <p>
          <span @click="enviarCorreoCambioContrasenya()"
            >¿Has olvidado tu contraseña?</span
          >
          o
          <span @click="goToRegister">Crear cuenta</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button class="button" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import "./autentication.scss";
import imgLogo from "../../assets/images/logo.png";

export default {
  name: "LoginView",
  comments: {
    imgLogo,
  },
  data() {
    return {};
  },
  methods: {
    // INICIO DE SESIÓN
    async loginUser() {
      const { user, error } = await this.$root.$data.$supabase.auth.signIn({
        email: "user@example.com",
        password: "password",
      });
      if (error) {
        console.error("Error al iniciar sesión:", error.message);
      } else {
        console.log("Inicio de sesión exitoso:", user);
      }
    },

    // Navegar a la ruta de registro
    goToRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>
