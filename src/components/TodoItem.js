import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, index, removeTodo, toggleComplete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    // Add delay for animation to complete before removing
    setTimeout(() => {
      removeTodo(index);
    }, 300);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === date.toDateString();
    
    const options = { hour: 'numeric', minute: 'numeric' };
    const timeStr = date.toLocaleTimeString([], options);
    
    if (isToday) {
      return `Today at ${timeStr}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${timeStr}`;
    } else {
      return `${date.toLocaleDateString()} at ${timeStr}`;
    }
  };

  const getTimeRemaining = () => {
    if (!todo.dueDate) return null;
    
    const now = new Date();
    const dueDate = new Date(todo.dueDate);
    const diffTime = dueDate - now;
    
    // If already past due
    if (diffTime < 0) {
      return { text: 'Overdue', status: 'overdue' };
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays === 0 && diffHours < 3) {
      return { text: `${diffHours}h remaining`, status: 'urgent' };
    } else if (diffDays === 0) {
      return { text: `${diffHours}h remaining`, status: 'soon' };
    } else {
      return { text: `${diffDays}d ${diffHours}h remaining`, status: 'upcoming' };
    }
  };

  const timeRemaining = todo.dueDate ? getTimeRemaining() : null;
  const formattedDueDate = formatDate(todo.dueDate);
  const createdDate = todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : null;
  const priorityClass = todo.priority ? `priority-${todo.priority}` : '';
  return (
    <li 
      className={`todo-item ${todo.isCompleted ? 'completed' : ''} ${isDeleting ? 'deleting' : ''} ${priorityClass} ${showDetails ? 'expanded' : ''}`}
    >
      <div className="todo-main">
        <div className="todo-content">
          <div 
            className="todo-checkbox"
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(index);
            }}
            aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.isCompleted && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <div 
            className="todo-info"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="todo-text">{todo.text}</span>
            {timeRemaining && (
              <span className={`todo-time ${timeRemaining.status}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {timeRemaining.text}
              </span>
            )}
          </div>
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
      </div>

      {showDetails && (
        <div className="todo-details">
          {createdDate && (
            <div className="detail-item">
              <span className="detail-label">Created:</span>
              <span className="detail-value">{createdDate}</span>
            </div>
          )}
          {formattedDueDate && (
            <div className="detail-item">
              <span className="detail-label">Due:</span>
              <span className="detail-value">{formattedDueDate}</span>
            </div>
          )}
          {todo.priority && (
            <div className="detail-item">
              <span className="detail-label">Priority:</span>
              <span className={`detail-value priority-badge ${todo.priority}`}>{todo.priority}</span>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default TodoItem;
