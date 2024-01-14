<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form
      v-if="!showSuccessRegister && !charging"
      class="auth-form"
      @submit.prevent="registrarUser"
    >
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
            @blur="
              checkPasswordMatch(passwd_1, passwd_2);
              validatePassword(passwd_1, 'passwd_1');
            "
          />
          <span class="error">{{ errors.passwd_1 }}</span>
          <br />
          <span class="error" v-if="showPasswordValidationpasswd_1">
            La contraseña debe contener al menos:
            <br />{{ passwordValidationMessagepasswd_1 }}
          </span>
        </div>

        <div class="form-field">
          <!-- Repetir contraseña -->
          <label for="passwd_2">Repetir contraseña:</label>
          <input
            v-model="passwd_2"
            type="password"
            id="passwd_2"
            name="passwd_2"
            @blur="
              checkPasswordMatch(passwd_1, passwd_2);
              validatePassword(passwd_2, 'passwd_2');
            "
          />
          <span class="error">{{ errors.passwd_2 }}</span>
          <br />
          <span class="error" v-if="showPasswordValidationpasswd_2">
            La contraseña debe contener al menos:
            <br />{{ passwordValidationMessagepasswd_2 }}
          </span>
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <span @click="goToLogin">Ya tengo una cuenta, iniciar sesión</span>
      </div>

      <!-- BOTÓN -->
      <button class="button w-100" type="submit">Registrarse</button>
      <span v-if="errors.emailDuplicated" class="error-message mt-10">{{
        errors.emailDuplicated
      }}</span>
    </form>

    <div v-if="showSuccessRegister && !charging" class="success-view">
      <div class="c-registered">
        <div>
          <h2 class="title mb-5">¡Ha sido registrado correctamente!</h2>
          <p>Confirma tu registro en el correo electrónico</p>
        </div>

        <div class="enlaces">
          <button class="button w-100" @click="goToGmail">
            Abrir correo electrónico
            <i class="fa-solid fa-envelope"></i>
          </button>
          o
          <button class="button w-100" @click="goToHome">
            Ir a la página principal <i class="fa-solid fa-reply"></i>
          </button>
        </div>
      </div>
    </div>

    <LoadingAnimation v-if="charging"></LoadingAnimation>
  </div>
</template>

<script>
import "./autentication.scss";
import LoadingAnimation from "../../components/loading-animation/loading-animation.vue";
import { supabaseClient } from "../../main";

export default {
  name: "RegisterView",
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      userName: "Jordiet",
      userEmail: "jordimolto1@gmail.com",
      passwd_1: "aaa",
      passwd_2: "aaa",
      showPasswordValidationpasswd_1: false,
      passwordValidationMessagepasswd_1: "",
      showPasswordValidationpasswd_2: false,
      passwordValidationMessagepasswd_2: "",
      errors: {
        userName: "",
        userEmail: "",
        passwd_1: "",
        passwd_2: "",
        emailDuplicated: "",
      },
      charging: false,
      showSuccessRegister: false,
    };
  },
  methods: {
    // CREAR CUENTA
    async registrarUser() {
      if (
        this.errors.userEmail.length <= 0 &&
        this.errors.userName.length <= 0 &&
        this.errors.emailDuplicated.length <= 0 &&
        this.errors.passwd_1.length <= 0 &&
        this.errors.passwd_2.length <= 0
      ) {
        this.charging = true;

        try {
          // Verificar si ya existe un usuario con el mismo correo electrónico
          const { userExists, err } = await this.$root.$data.$supabase
            .from("Clientes")
            .select("email")
            .eq("email", this.userEmail);

          if (userExists) {
            this.emailDuplicated = this.userEmail + " ya está registrado.";
            throw new Error(this.userEmail + " ya está registrado.");
          } else if (err) {
            throw err;
          }

          // Si no existe, proceder con el registro
          const response = await supabaseClient.auth.signUp({
            email: this.userEmail,
            password: this.passwd_1,
          });

          if (response.error) {
            throw response.error;
          } else {
            // Insertamos la info del usuario creado en la tabla Clientes
            const responseUserCreated = await this.$root.$data.$supabase
              .from("Clientes")
              .insert([
                {
                  user_id: response.data.user.identities[0].user_id,
                  email: this.userEmail,
                  nombre: this.userName,
                },
              ]);

            if (responseUserCreated.error) {
              throw responseUserCreated.error;
            } else {
              this.showSuccessRegister = true;
            }
          }
        } catch (error) {
          console.error("Error al registrar usuario:", error.message);
          this.errors.emailDuplicated = error.message;
        } finally {
          this.charging = false;
        }
      }
    },

    // Navegar a la home
    goToHome() {
      this.$router.push({ name: "home" });
    },

    // Navegar a la ruta de login
    goToLogin() {
      this.$router.push({ name: "login" });
    },

    // Navegar a Gmail
    goToGmail() {
      window.open("https://mail.google.com/", "_blank");
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
    checkPasswordMatch(p1, p2) {
      if (p1 && p2) {
        return p1 === p2
          ? (this.errors.passwd_2 = "")
          : (this.errors.passwd_2 =
              "La contraseña no coincide con la anterior");
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
      this["showPasswordValidation" + field] = true;
    },
  },
};
</script>

<style scoped>
.error-message {
  color: var(--color-error);
  font-size: 12px;
  margin: 10px 0;
  display: block;
}
</style>
