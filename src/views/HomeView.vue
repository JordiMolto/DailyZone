<template>
  <div class="ejemplo-home-section">
    <h1>BIENVENIDO!!</h1>
    <div class="ejemplo-2">
      <button class="button" @click="goToLogin">Ir a Login</button>
      <button class="button" @click="goToRegister">Ir a Register</button>
      <button class="button" @click="goToPasswordChange">Ir a Password Change</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // Navegar a la ruta de login
    goToLogin() {
      this.$router.push({ name: "login" });
    },
    // Navegar a la ruta de register
    goToRegister() {
      this.$router.push({ name: "register" });
    },
    // Navegar a la ruta de password-change
    goToPasswordChange() {
      this.$router.push({ name: "password-change" });
    },
  },
};
</script>

<style scoped>
.ejemplo-home-section {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
  height: 100vh;
  flex-direction: column;
  background: rgb(223, 223, 223);
}
.ejemplo-2 {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
