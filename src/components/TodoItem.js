import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, index, removeTodo, toggleComplete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Add delay for animation to complete before removing
    setTimeout(() => {
      removeTodo(index);
    }, 300);
  };

  return (
    <li 
      className={`todo-item ${todo.isCompleted ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
    >
      <div className="todo-content" onClick={() => toggleComplete(index)}>
        <div className="todo-checkbox">
          {todo.isCompleted && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <span className="todo-text">{todo.text}</span>
      </div>
      <button 
        className="todo-delete" 
        onClick={handleDelete}
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
