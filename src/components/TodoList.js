import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos'); // for users who have added todos before
    // Check if there are saved todos in localStorage
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [todosLeft, setTodosLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Saved added todos in local storage
    setTodosLeft(todos.filter(todo => !todo.isCompleted).length);
  }, [todos]);

  const addTodo = (todoData) => {
    // If todoData is just a string, convert it to object format
    const newTodo = typeof todoData === 'string' 
      ? { 
          text: todoData, 
          createdAt: new Date().toISOString(),
          isCompleted: false 
        }
      : todoData;
      
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // If completed, set completedAt timestamp
    if (newTodos[index].isCompleted) {
      newTodos[index].completedAt = new Date().toISOString();
    } else {
      newTodos[index].completedAt = null;
    }
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  // Filter todos based on active filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });
  
  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // Priority sorting (high → medium → low)
    if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3, undefined: 4 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
    
    // Due date sorting
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    
    // Default: sort by creation date (newest first)
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB - dateA;
  });
  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />
      
      {todos.length > 0 && (
        <>
          <div className="todo-controls">
            <div className="todo-filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            
            <div className="sort-dropdown">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort tasks"
              >
                <option value="createdAt">Date Created</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          <ul className="todo-list">
            {sortedTodos.map((todo, index) => {
              // Find the original index in the todos array
              const originalIndex = todos.findIndex(t => 
                t.createdAt === todo.createdAt && t.text === todo.text
              );
              
              return (
                <TodoItem
                  key={todo.createdAt ? todo.createdAt + todo.text : index}
                  index={originalIndex !== -1 ? originalIndex : index}
                  todo={todo}
                  removeTodo={removeTodo}
                  toggleComplete={toggleComplete}
                />
              );
            })}
          </ul>

          <div className="todo-summary">
            <span>{todosLeft} {todosLeft === 1 ? 'item' : 'items'} left</span>
            {todos.some(todo => todo.isCompleted) && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        </>
      )}

      {todos.length === 0 && (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <p>Your todo list is empty! Add a new task to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
