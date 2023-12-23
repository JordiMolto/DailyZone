<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form @submit.prevent="loginUser(userEmail, password)" class="auth-form">
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Inicio sesión</h2>
      </div>

      <!-- FORMULARIO INICIO SESIÓN -->
      <div class="login-card">
        <div class="form-field">
          <label for="user">Correo electrónico:</label>
          <input
            v-model="userEmail"
            type="text"
            id="user"
            name="user"
            @change="checkEmail(userEmail)"
          />
          <span class="error">{{ errors.userEmail }}</span>
        </div>

        <div class="form-field">
          <label for="password">Contraseña:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            @change="checkPassword(password)"
          />
          <span class="error">{{ errors.password }}</span>
        </div>
      </div>
      <span class="error-message">{{ errors.emailDoesntExist }}</span>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <p>
          <span @click="sendPasswordChange()"
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
import { supabaseClient } from "@/main";

export default {
  name: "LoginView",
  data() {
    return {
      userEmail: "jordimol4to15@gmail.com",
      password: "123456aA",
      errors: {
        userEmail: "",
        password: "",
        emailDoesntExist: "",
      },
    };
  },
  methods: {
    // INICIO DE SESIÓN
    async loginUser(em, psswd) {
      // Verificar si ya existe un usuario con el mismo correo electrónico
      const userExists = await supabaseClient
        .from("Clientes")
        .select("email")
        .eq("email", em);

      if (userExists.data.length <= 0) {
        console.log("entro aquí:", userExists.data.length);
        this.errors.emailDoesntExist =
          "El usuario con el correo electrónico '" +
          em +
          "' aún no se encuentra registrado.";
      }

      // Proceso de inicio de sesión
      let { data, error } = await supabaseClient.auth.signInWithPassword({
        email: em,
        password: psswd, // 123456aA
      });
      if (error) {
        console.error("Error al iniciar sesión:", error.message);
      } else {
        console.log("Inicio de sesión exitoso:", data);
        this.$router.push({ name: "dashboard-view" });
      }
    },

    // Navegar a la ruta de registro
    goToRegister() {
      this.$router.push({ name: "register" });
    },

    // UTILS
    async checkEmail(email) {
      const regex = /^\S+@\S+\.\S+$/;
      if (!email) {
        this.errors.userEmail = "El correo electrónico es requerido";
      } else if (!regex.test(email)) {
        this.errors.userEmail =
          "El formato del correo electrónico no es válido";
      } else {
        this.errors.userEmail = "";
      }
    },
    checkPassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(password)
        ? (this.errors.password = "")
        : (this.errors.password =
            "La contraseña no cumple con los requisitos");
    },
  },
};
</script>

<style scoped>
.error-message {
  color: rgb(207, 0, 0);
  font-size: 12px;
  margin: 10px 0;
  display: block;
}
</style>
