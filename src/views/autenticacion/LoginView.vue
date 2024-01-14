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
            @change="validatePassword(password)"
          />
          <span class="error" v-if="errors.password.length > 0"
            >La contraseña debe contener al menos: <br />{{
              errors.password
            }}</span
          >
        </div>
      </div>
      <span class="error-message">{{ errors.err }}</span>
      <span class="error-message">{{ errors.emailDoesntExist }}</span>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <p>
          <span @click="goToLoginML">¿Has olvidado tu contraseña?</span>
          o
          <span @click="goToRegister">Crear cuenta</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button class="button w-100" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import "./autentication.scss";
import { supabaseClient } from "../../main";

export default {
  name: "LoginView",
  data() {
    return {
      userEmail: "jordimolto15@gmail.com",
      password: "aaaaA1",
      errors: {
        userEmail: "",
        password: "",
        emailDoesntExist: "",
        err: "",
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
        this.errors.err = error.message;
      } else {
        console.log("Inicio de sesión exitoso:", data);
        this.$router.push({ name: "dashboard" });
      }
    },

    // Navegar a la ruta de registro
    goToRegister() {
      this.$router.push({ name: "register" });
    },
    // Navegar a la ruta de MagicLink
    goToLoginML() {
      this.$router.push({ name: "login-magic-link" });
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
    validatePassword(password) {
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const isLengthValid = password.length >= 6;

      let errorMessage = "";

      if (!hasLowerCase) {
        errorMessage += "Una letra minúscula. ";
      }

      if (!hasUpperCase) {
        errorMessage += "Una letra mayúscula. ";
      }

      if (!hasNumbers) {
        errorMessage += "Un número. ";
      }

      if (!isLengthValid) {
        errorMessage += "6 caracteres. ";
      }

      this.errors.password = errorMessage.trim();
    },
  },
};
</script>

<style>
.error-message {
  color: var(--color-error);
  font-size: 12px;
  margin: 10px 0;
  display: block;
}
</style>
