import React, { useState } from 'react';
import './TodoForm.css';
import TaskModal from './TaskModal';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo({
      text: value,
      createdAt: new Date().toISOString(),
      isCompleted: false
    });
    setValue('');
  };

  const handleQuickAdd = () => {
    if (value.trim()) {
      addTodo({
        text: value,
        createdAt: new Date().toISOString(),
        isCompleted: false
      });
      setValue('');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSaveTask = (taskData) => {
    addTodo(taskData);
    setIsModalOpen(false);
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Enter a new task"
        />
        <div className="todo-buttons">
          <button
            type="button"
            className="todo-button todo-button-schedule"
            onClick={() => setIsModalOpen(true)}
            aria-label="Schedule task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
          <button 
            className="todo-button" 
            type="button" 
            onClick={handleQuickAdd}
            aria-label="Add task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </form>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default TodoForm;
