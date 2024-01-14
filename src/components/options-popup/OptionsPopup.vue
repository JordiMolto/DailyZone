<template>
  <div @mouseleave="showPopup = false" class="options-container">
    <i class="fa fa-ellipsis-h" @click="togglePopup"></i>
    <div class="options-popup" v-if="showPopup">
      <ul>
        <li
          v-for="option in options"
          :key="option.name"
          @click="handleOption(option)"
        >
          <div><i :class="option.icon"></i> {{ option.name }}</div>
          <i class="fa-solid fa-chevron-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./options-popup.scss";

export default {
  name: "OptionsPopup",
  props: {
    task: Object,
  },
  data() {
    return {
      showPopup: false,
      options: [
        { name: "Eliminar", action: "delete", icon: "fa fa-trash" },
        { name: "Duplicar", action: "duplicate", icon: "fa fa-copy" },
        { name: "Convertir en", action: "convert", icon: "fa fa-exchange-alt" },
        { name: "Color", action: "color", icon: "fa fa-palette" },
      ],
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    handleOption(option) {
      console.log(option.action); // Aquí puedes manejar cada opción
      this.selectOption(option.action);
      if (option.action === "delete") {
        this.deleteTask(this.task.id);
      }
    },
    selectOption(option) {
      console.log(option); // Manejar la opción seleccionada
      this.showPopup = false;
    },
    deleteTask(taskId) {
      // Lógica para eliminar tarea
      console.log("Eliminar tarea", taskId);
    },
  },
};
</script>
