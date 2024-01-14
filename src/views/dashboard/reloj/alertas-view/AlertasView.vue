<template>
  <div class="alert-form-container">
    <!-- FORMULARIO ALERTAS -->
    <form @submit.prevent="addAlert">
      <div class="form-group">
        <label for="time">Hora:</label>
        <input type="time" id="time" v-model="newAlert.time" />
      </div>
      <div class="form-group">
        <label for="date">Fecha:</label>
        <input type="date" id="date" v-model="newAlert.date" />
      </div>
      <button type="submit">Añadir Alerta</button>
    </form>

    <!-- ALERTAS PROGRAMADAS -->
    <div class="alerts-list">
      <h3>Alertas Programadas</h3>
      <ul>
        <li v-for="(alert, index) in alerts" :key="index">
          {{ alert.date }} a las {{ alert.time }}
          <button @click="removeAlert(index)">Eliminar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./alertas-view.scss";
import AudioMP3 from "../../../../assets/sounds/household016.mp3";
export default {
  data() {
    return {
      newAlert: {
        time: "",
        date: "",
      },
      alerts: [],
      alarmSound: new Audio(AudioMP3),
    };
  },
  created() {
    setInterval(this.checkAlerts, 1000); // Chequea cada segundo
  },
  methods: {
    addAlert() {
      const alertDateTime = new Date(
        this.newAlert.date + " " + this.newAlert.time
      );
      this.alerts.push({
        time: this.newAlert.time,
        date: this.newAlert.date,
        dateTime: alertDateTime,
        triggered: false, // para rastrear si la alerta ha sido activada
      });
      console.log("Alerta Añadida:", this.alerts);
      this.resetForm();
    },
    resetForm() {
      this.newAlert.time = "";
      this.newAlert.date = "";
    },

    removeAlert(index) {
      this.alerts.splice(index, 1);
    },

    // alertas de sonido
    checkAlerts() {
      const now = new Date();
      this.alerts.forEach((alert, index) => {
        const alertDateTime = new Date(alert.date + " " + alert.time);
        if (now >= alertDateTime && !alert.triggered) {
          this.alerts[index].triggered = true; // Marca la alerta como activada
          // this.playAlarmSound();
        }
      });
    },

    playAlarmSound() {
      this.alarmSound.play();
    },
  },
};
</script>
