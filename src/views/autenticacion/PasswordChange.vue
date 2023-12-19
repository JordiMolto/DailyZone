<!-- Login.vue -->
<template>
  <div class="auth-container">
    <form class="auth-form">
      <div class="seccion-top">
        <i class="fa-solid fa-user"></i>
        <h2 class="mb-8">Cambio contraseña</h2>
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
          <label for="contrasenya">Contraseña antigua:</label>
          <input type="password" id="contrasenya" name="contrasenya" />
        </div>

        <div class="form-field">
          <label for="contrasenya">Nueva contraseña:</label>
          <input type="password" id="contrasenya" name="contrasenya" />
        </div>

        <div class="form-field">
          <label for="contrasenya">Repetir contraseña:</label>
          <input type="password" id="contrasenya" name="contrasenya" />
        </div>
      </div>

      <!-- ENLACES OPCIONES -->
      <div class="seccion-inferior-enlaces mt-10 mb-5">
        <!-- OPCIÓN CONTRASEÑAS -->
        <p>
          <span>Iniciar sesión</span>
          o
          <span>Crear cuenta</span>
        </p>
      </div>

      <!-- BOTÓN -->
      <button class="button" type="submit">Confirmar</button>
    </form>
  </div>
</template>

<script>
import "./autentication.scss";
import imgLogo from "../../assets/images/logo.png";

export default {
  name: "PasswordChange",
  comments: {
    imgLogo,
  },
  data() {
    return {};
  },
  methods: {
    enviarCorreoCambioContrasenya() {
      alert("te hemos enviado un correo!");
    },
  },
};
</script>
