import React from 'react';
import TodoList from './components/TodoList';
import './App.css';
import MainFooter from './components/Mainfooter';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>My Todo List</h1>
          <p>Organize your tasks efficiently</p>
        </header>
        <TodoList />
        <MainFooter />
      </div>
    </div>
  );
}

export default App;
