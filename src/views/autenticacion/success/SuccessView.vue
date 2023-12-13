<!-- Login.vue -->
<template>
  <div class="auth-container">
    <h1 v-if="comeFrom === 'register'">Ha sido REGISTRADO correctamente!</h1>
    <h1 v-if="comeFrom === 'login'">Ha sido LOGUEADO correctamente!</h1>
    <h1 v-if="comeFrom === 'changepassword'">
      Ha CAMBIADO SU CONTRASEÑA correctamente!
    </h1>
  </div>
</template>

<script>
import "../autentication.scss";

export default {
  name: "SuccessView",
  comments: {},
  props: {
    comeFrom: String,
  },
  data() {
    return {
      comeFromPage: "",
    };
  },
  methods: {},
};
</script>
