import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: 'all', // 'all', 'active', 'completed'
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(item => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed);
    },
  },
});

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter, 
  clearCompleted 
} = todoSlice.actions;

// Selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export default todoSlice.reducer;
