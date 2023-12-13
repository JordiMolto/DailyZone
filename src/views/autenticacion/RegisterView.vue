<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form v-if="!comeFrom" class="auth-form" @submit.prevent="registrarUser">
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Crear cuenta</h2>
      </div>

      <!-- FORMULARIO CREAR CUENTA -->
      <div class="register-card">
        <div class="form-field">
          <!-- Nombre -->
          <label for="user_name">Nombre:</label>
          <input
            v-model="userName"
            type="text"
            id="user_name"
            name="user_name"
            :max="100"
          />
          <span class="error">{{ errors.userName }}</span>
        </div>

        <div class="form-field">
          <!-- Correo electrónico -->
          <label for="user_email">Correo electrónico:</label>
          <input
            v-model="userEmail"
            type="text"
            id="user_email"
            name="user_email"
            @blur="checkEmail(userEmail)"
          />
          <span class="error">{{ errors.userEmail }}</span>
        </div>

        <div class="form-field">
          <!-- Contraseña -->
          <label for="passwd_1">Contraseña:</label>
          <input
            v-model="passwd_1"
            type="password"
            id="passwd_1"
            name="passwd_1"
            @blur="checkPassword(passwd_1)"
          />
          <span class="error">{{ errors.passwd_1 }}</span>
        </div>

        <div class="form-field">
          <!-- Repetir contraseña -->
          <label for="passwd_2">Repetir contraseña:</label>
          <input
            v-model="passwd_2"
            type="password"
            id="passwd_2"
            name="passwd_2"
            @blur="checkPasswordMatch(passwd_1, passwd_2)"
          />
          <span class="error">{{ errors.passwd_2 }}</span>
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces">
        <!-- OPCIÓN INICIAR SESIÓN -->
        <p>
          <span @click="goToLogin">Ya tengo una cuenta, iniciar sesión</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button type="submit">Registrarse</button>
    </form>
    <success-view v-if="comeFrom" :comeFrom="comeFrom"></success-view>
  </div>
</template>

<script>
import "./autentication.scss";
import imgLogo from "../../assets/images/logo.png";
import SuccessView from "./success/SuccessView.vue";

export default {
  components: { SuccessView },
  name: "RegisterView",
  comments: {
    imgLogo,
    SuccessView,
  },
  data() {
    return {
      userName: "Jordiet",
      userEmail: "asdfasfaflfalefefs2@gmail.com",
      passwd_1: "123456aA",
      passwd_2: "123456aA",
      errors: {
        userName: "",
        userEmail: "",
        passwd_1: "",
        passwd_2: "",
      },
      comeFrom: null,
      charging: false,
    };
  },
  methods: {
    // CREAR CUENTA
    async registrarUser() {
      if (
        this.errors.userName.length <= 0 &&
        this.errors.userEmail.length <= 0 &&
        this.errors.passwd_1.length <= 0 &&
        this.errors.passwd_2.length <= 0
      ) {
        this.charging = true;

        const { user, error } = await this.$root.$data.$supabase.auth.signUp({
          email: this.userEmail,
          password: this.passwd_1,
        });

        this.charging = false;
        if (error) {
          console.error("Error al registrar usuario:", error.message);
        } else {
          this.comeFrom = "register";
          console.log("Usuario registrado exitosamente:", user);
        }
      }
    },

    // Navegar a la ruta de login
    goToLogin() {
      this.$router.push({ name: "login" });
    },

    // UTILS
    checkEmail(email) {
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
        ? (this.errors.passwd_1 = "")
        : (this.errors.passwd_1 = "La contraseña no cumple con los requisitos");
    },
    checkPasswordMatch(p1, p2) {
      return p1 === p2
        ? (this.errors.passwd_2 = "")
        : (this.errors.passwd_2 = "La contraseña no coincide con la anterior");
    },
  },
};
</script>
