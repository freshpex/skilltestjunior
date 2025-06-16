import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>My Todo List</h1>
          <p>Organize your tasks efficiently</p>
        </header>
        <TodoList />
        <footer className="app-footer">
          <p>Click on the x or the cancel button to delete the task</p>
          <p>Click on a task or the circle to mark it as completed</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
