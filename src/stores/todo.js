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
    async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        const todo = this.todos[foundIndex];
        const newCompletedAt = todo.completedAt != null ? null : new Date().toISOString();
        
        try {
          const response = await axios.patch(`http://localhost:3100/tasks/${id}`, {
            completedAt: newCompletedAt,
          });
          this.todos[foundIndex] = response.data; // Update with server response
        } catch (error) {
          console.error('Failed to update todo status:', error);
          // Optionally revert local change if update fails
        }
      }
    },
    async addTodo(todo) {

      const trimmed = todo.trim();

      if(!trimmed) return;

      try {
        const response = await axios.post('http://localhost:3100/tasks', {
          name: trimmed,
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
