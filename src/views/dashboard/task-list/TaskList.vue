<template>
  <div class="task-list-container">
    <div class="c-title-page">
      <!-- EMOJIS  -->
      <div class="emoji-picker">
        <button
          v-if="selectedEmoji === ''"
          @click="showEmojiPicker = !showEmojiPicker"
        >
          Agregar icono
        </button>
        <button v-else @click="selectedEmoji = ''">Eliminar icono</button>
        <emoji-picker v-if="showEmojiPicker" @select="addEmoji" />
      </div>

      <!-- TÍTULO PÁGINA  -->
      <h1 class="title-page">
        <p class="emoji">
          {{ selectedEmoji }}
        </p>
        <input
          v-if="editingTitle"
          type="text"
          v-model="titlePage"
          @blur="editingTitle = false"
          @keyup.enter="editingTitle = false"
        />
        <p v-if="!editingTitle" @click="editingTitle = true">
          {{ titlePage }}
        </p>
      </h1>
    </div>

    <!-- LISTA DE TAREAS  -->
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <OptionsPopup
          :class="{ 'task-actions': true }"
          :task="task"
        ></OptionsPopup>
        <input
          v-if="task.editing"
          type="text"
          v-model="task.title"
          @keyup.enter="stopEditingTask(task)"
          @keyup.esc="stopEditingTask(task)"
          @blur="stopEditingTask(task)"
          class="task-input"
        />
        <span v-else @click="editTask(task)" class="task-title">{{
          task.title
        }}</span>
      </li>
    </ul>
    <div class="new-task-form" :class="{ 'is-focused': isNewTaskInputFocused }">
      <input
        type="text"
        v-model="newTaskTitle"
        @keyup.enter="addTask"
        @focus="isNewTaskInputFocused = true"
        @blur="isNewTaskInputFocused = false"
        placeholder="Nueva tarea..."
        class="new-task-form-input"
      />
    </div>
  </div>
</template>

<script>
import "./task-list.scss";
import OptionsPopup from "../../../components/options-popup/OptionsPopup.vue";
import "emoji-mart-vue/css/emoji-mart.css";
import { Picker } from "emoji-mart-vue";

export default {
  name: "TaskList",
  components: { OptionsPopup, EmojiPicker: Picker },
  data() {
    return {
      tasks: [],
      newTaskTitle: "",
      isNewTaskInputFocused: false, // Propiedad para rastrear el foco del input
      titlePage: "Título de la página...",
      editingTitle: false,
      showEmojiPicker: false,
      selectedEmoji: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim()) {
        const newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          editing: false,
        };
        this.tasks.push(newTask);
        this.newTaskTitle = ""; // Limpiar el input después de añadir
      }
    },
    editTask(task) {
      this.tasks.forEach((t) => {
        t.editing = false;
      }); // Para asegurar que solo una tarea se edite a la vez
      task.editing = true;
    },
    stopEditingTask(task) {
      task.editing = false;
    },

    stopEditingTitle(title) {
      this.titlePage = title;
    },

    addEmoji(emoji) {
      this.selectedEmoji = emoji.native;
      this.showEmojiPicker = false;
    },
  },
};
</script>
