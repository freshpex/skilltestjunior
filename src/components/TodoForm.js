import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Enter a new task"
      />
      <button className="todo-button" type="submit" aria-label="Add task">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
