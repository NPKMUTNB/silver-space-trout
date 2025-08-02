import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter, 
  clearCompleted,
  selectFilteredTodos,
  selectFilter 
} from '../store/todoSlice';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectFilter);
  const allTodos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, text) => {
    dispatch(editTodo({ id, text }));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const activeTodosCount = allTodos.filter(todo => !todo.completed).length;
  const completedTodosCount = allTodos.filter(todo => todo.completed).length;

  return (
    <div className="todo-app">
      <h2>Todo List Example</h2>
      
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่มงานใหม่..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          เพิ่ม
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          ทั้งหมด ({allTodos.length})
        </button>
        <button
          className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          ยังไม่เสร็จ ({activeTodosCount})
        </button>
        <button
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          เสร็จแล้ว ({completedTodosCount})
        </button>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">ไม่มีรายการในหมวดนี้</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))
        )}
      </div>

      {/* Actions */}
      {completedTodosCount > 0 && (
        <div className="todo-actions">
          <button 
            onClick={handleClearCompleted}
            className="clear-completed-btn"
          >
            ลบงานที่เสร็จแล้ว ({completedTodosCount})
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
