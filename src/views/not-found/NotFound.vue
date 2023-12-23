<template>
  <div class="not-found-view">
    <img class="img-404" :src="imagen404" alt="Página no encontrada" />
    <p class="titulo-not-found">
      Lo sentimos, pero la ruta que has especificado no existe.
    </p>
  </div>
</template>

<script>
import "./not-found.scss";
import imagen404 from "@images/404.png";

export default {
  name: "NotFound",
  data() {
    return {
      imagen404: imagen404,
    };
  },
};
</script>
