import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos'); // for userswho have added todos before
    // Check if there are saved todos in localStorage
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [filter, setFilter] = useState('all');
  const [todosLeft, setTodosLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Saved added todos in local storage
    setTodosLeft(todos.filter(todo => !todo.isCompleted).length);
  }, [todos]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
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
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />
      
      {todos.length > 0 && (
        <>
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

          <ul className="todo-list">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
                toggleComplete={toggleComplete}
              />
            ))}
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
