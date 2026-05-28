<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTodoStore } from './stores/todo.store.ts'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  if (!title.value.trim()) return
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div style="max-width: 600px; margin: 40px auto; font-family: sans-serif; padding: 0 16px">
    <h1>Todo App</h1>

    <!-- Add -->
    <div style="display: flex; gap: 8px; margin-bottom: 24px">
      <input
        v-model="title"
        placeholder="Add a todo..."
        @keyup.enter="onAdd"
        style="flex: 1; padding: 8px; font-size: 16px"
      />
      <button @click="onAdd" style="padding: 8px 16px">Add</button>
    </div>

    <!-- Loading / Error -->
    <p v-if="todoStore.loading">Loading...</p>
    <p v-if="todoStore.error" style="color: red">{{ todoStore.error }}</p>

    <!-- List -->
    <ul style="list-style: none; padding: 0">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #eee"
      >
        <input
          type="checkbox"
          :checked="todo.is_done"
          @change="todoStore.toggleTodo(todo)"
        />
        <span :style="{ flex: 1, textDecoration: todo.is_done ? 'line-through' : 'none', color: todo.is_done ? '#aaa' : 'inherit' }">
          {{ todo.title }}
        </span>
        <button @click="todoStore.deleteTodo(todo.id)" style="color: red; background: none; border: none; cursor: pointer">
          Delete
        </button>
      </li>
    </ul>

    <p v-if="!todoStore.loading && todoStore.todos.length === 0">No todos yet.</p>
  </div>
</template>