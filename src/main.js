import Vue from "vue";
import App from "./App.vue";
import { createClient } from "@supabase/supabase-js";
import router from "./router/router";
import '@fortawesome/fontawesome-free/css/all.css';

const supabaseUrl = "https://cgcgyerkxjpyrgfbttgl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnY2d5ZXJreGpweXJnZmJ0dGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NDI4MTIsImV4cCI6MjAxNzExODgxMn0.kD1AkSLQoGCs2GlSACDl7Ch2JkLKqaXI6p9BGzeDVWg";
const supabase = createClient(supabaseUrl, supabaseKey);

// Crear la instancia de la aplicación Vue y configurar la propiedad global $supabase
new Vue({
  render: (h) => h(App),
  router,
  data: {
    $supabase: supabase, // Configurar la propiedad global $supabase
  },
}).$mount("#app");
