<template>
  <div class="cronometro-container">
    <div class="cronometro-display">
      {{ formatTime }}
    </div>
    <div class="cronometro-controls">
      <button @click="start">Iniciar</button>
      <button @click="stop">Detener</button>
      <button @click="reset">Reiniciar</button>
    </div>
  </div>
</template>

<script>
import "./contador-component.scss";

export default {
  name: "ContadorComponent",
  data() {
    return {
      time: 0,
      interval: null,
    };
  },
  computed: {
    formatTime() {
      const pad = (number, size) => number.toString().padStart(size, "0");
      let miliseconds = Math.floor((this.time % 1000) / 10);
      let seconds = Math.floor(this.time / 1000) % 60;
      let minutes = Math.floor(this.time / 60000) % 60;
      let hours = Math.floor(this.time / 3600000);

      return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(
        miliseconds,
        2
      )}`;
    },
  },
  methods: {
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.time += 10; // Incrementar en 10 milisegundos
        }, 10); // Actualizar cada 10 milisegundos
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    },
    reset() {
      this.stop();
      this.time = 0;
    },
  },
  beforeDestroy() {
    this.stop();
  },
};
</script>
