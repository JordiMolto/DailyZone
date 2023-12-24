<template>
  <div class="auth-container">
    <!-- FORMULARIO  -->
    <form
      v-if="!emailSent"
      @submit.prevent="sendLoginMagicLink"
      class="auth-form"
    >
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Inicio de sesión por email</h2>
      </div>

      <div class="login-card">
        <div class="form-field">
          <label for="userEmail">Correo electrónico:</label>
          <input
            v-model="userEmail"
            type="text"
            id="userEmail"
            name="userEmail"
            @change="checkEmail(userEmail)"
          />
          <span class="error">{{ errors.userEmail }}</span>
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <!-- OPCIÓN CONTRASEÑAS -->
        <p>
          <span @click="goToLogin">Ya tengo cuenta, iniciar sesión</span>
          o
          <span @click="goToRegister">Crear cuenta</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button class="button w-100" type="submit">Enviar correo</button>
      <span v-if="errors.err" class="error-message mt-10">{{
        errors.err
      }}</span>
      <span v-if="errors.emailDoesntExist" class="error-message mt-10">{{
        errors.emailDoesntExist
      }}</span>
    </form>

    <!-- MENSAJE  -->
    <div v-if="emailSent" class="login-ml">
      <img class="img" :src="imagen" alt="Página no encontrada" />
      <p class="title">
        Hemos enviado un mensaje a tu correo electrónico para iniciar sesión sin
        necesidad de utilizar contraseña!
      </p>
      <p class="">
        Te recomendamos encarecidamente cambiar tu contraseña una vez accedas al
        panel.
      </p>
      <button class="button" @click="goToHome">
        Ir a la página principal <i class="fa-solid fa-reply"></i>
      </button>
    </div>
  </div>
</template>

<script>
import "./autentication.scss";
import img from "../../assets/images/correo-electronico.png";
import { supabaseClient } from "../../main";

export default {
  name: "LoginMagicLink",
  data() {
    return {
      imagen: img,
      userEmail: "jordimolto15@gmail.com",
      errors: {
        userEmail: "",
        emailDoesntExist: "",
        err: "",
      },
      emailSent: false,
    };
  },
  methods: {
    // Navegar a la home
    goToHome() {
      this.$router.push({ name: "home" });
    },

    async sendLoginMagicLink() {
      if (this.userEmail) {
        const userExists = await supabaseClient
          .from("Clientes")
          .select("email")
          .eq("email", this.userEmail);

        if (userExists.data.length <= 0) {
          console.log("entro aquí:", userExists.data.length);
          this.errors.emailDoesntExist =
            "El usuario con el correo electrónico '" +
            this.userEmail +
            "' aún no se encuentra registrado.";
        } else {
          const { data, error } = await supabaseClient.auth.signInWithOtp({
            email: this.userEmail,
            options: {
              emailRedirectTo: "http://localhost:8080/dashboard-view",
            },
          });

          if (data) {
            this.emailSent = true;
          } else if (error) {
            console.error("El correo electrónico no está definido o es nulo.");
            this.err = error;
          }
        }
      } else {
        console.error("El correo electrónico no está definido o es nulo.");
      }
    },

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

    // Navegar al login
    goToLogin() {
      this.$router.push({ name: "login" });
    },
    // Navegar al register
    goToRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style>
.error-message {
  color: rgb(207, 0, 0);
  font-size: 12px;
  margin: 10px 0;
  display: block;
}
</style>
