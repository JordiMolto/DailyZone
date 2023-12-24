<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form @submit.prevent="changePassword" class="auth-form">
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Cambio de contraseña</h2>
      </div>

      <!-- FORMULARIO CAMBIO CONTRASEÑA -->
      <div class="change-password-card">
        <div class="form-field">
          <label for="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Jordiet"
            disabled="true"
          />
        </div>

        <div class="form-field">
          <label for="psswd_1">Nueva contraseña:</label>
          <input
            v-model="psswd_1"
            type="password"
            id="psswd_1"
            name="psswd_1"
            @blur="
              checkPasswordMatch(psswd_1, psswd_2);
              validatePassword(psswd_1, 'psswd_1');
            "
          />
          <span class="error">{{ errors.psswd_1 }}</span>
          <br />
          <span
            class="error"
            v-if="passwordValidationMessagepsswd_1.length > 0"
          >
            La contraseña debe contener al menos:
            <br />{{ passwordValidationMessagepsswd_1 }}
          </span>
        </div>

        <div class="form-field">
          <label for="psswd_2">Repetir contraseña:</label>
          <input
            v-model="psswd_2"
            type="password"
            id="psswd_2"
            name="psswd_2"
            @blur="
              checkPasswordMatch(psswd_1, psswd_2);
              validatePassword(psswd_2, 'psswd_2');
            "
          />
          <span class="error">{{ errors.psswd_2 }}</span>
          <br />
          <span
            class="error"
            v-if="passwordValidationMessagepsswd_2.length > 0"
          >
            La contraseña debe contener al menos:
            <br />
            {{ passwordValidationMessagepsswd_2 }}
          </span>
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <!-- OPCIÓN CONTRASEÑAS -->
        <p>
          <span @click="goToLogin">Iniciar sesión</span>
          o
          <span @click="goToRegister">Crear cuenta</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button class="button w-100" type="submit">Confirmar</button>
    </form>
  </div>
</template>

<script>
import "./autentication.scss";
import { supabaseClient } from "../../main";

export default {
  name: "PasswordChange",

  data() {
    return {
      psswd_1: "aaaa",
      psswd_2: "aaaa",
      passwordValidationMessagepsswd_1: "",
      passwordValidationMessagepsswd_2: "",
      errors: {
        psswd_1: "",
        psswd_2: "",
      },
    };
  },
  methods: {
    async changePassword() {
      if (
        this.errors.psswd_1.length <= 0 &&
        this.errors.psswd_2.length <= 0 &&
        this.passwordValidationMessagepsswd_1.length <= 0 &&
        this.passwordValidationMessagepsswd_2.length <= 0
      ) {
        const psswd = this.psswd_1;

        try {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();

          const user = session?.user;

          if (user) {
            const { error } = await supabaseClient.auth.updateUser({
              password: psswd,
            });

            if (error) {
              console.error("Error al cambiar la contraseña:", error.message);
            } else {
              console.log("Contraseña cambiada exitosamente.");
            }
          } else {
            console.error("Usuario no autenticado.");
          }
        } catch (error) {
          console.error("Error al cambiar la contraseña:", error.message);
        }
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

    checkPasswordMatch(p1, p2) {
      if (p1 && p2) {
        return p1 === p2
          ? (this.errors.psswd_2 = "")
          : (this.errors.psswd_2 = "La contraseña no coincide con la anterior");
      }
    },
    validatePassword(password, field) {
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

      this["passwordValidationMessage" + field] = errorMessage.trim();
    },
  },
};
</script>
