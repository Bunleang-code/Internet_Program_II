import { defineStore } from "pinia";
import axios from 'axios'

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data; // assuming the API returns an array of todos
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        if (this.todos[foundIndex].completedAt != null) {
          this.todos[foundIndex].completedAt = null;
        } else {
          this.todos[foundIndex].completedAt = new Date().toISOString();
        }
      }
    },
    async addTodo(todo) {
      try {
        const response = await axios.post('http://localhost:3100/tasks', {
          name: todo,
          description: "description",
        });
        this.todos.push(response.data); // use the real data returned from DB
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },
    clearAll() {
      this.todos = [];
    },
  },
});
