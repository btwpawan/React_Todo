import React, { useState } from "react";
import "./App.css";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos([...todos, { text: todo, finished: false }]);
    setTodo("");
  };

  const handleToggleFinish = (index) => {
    const newTodos = [...todos];
    newTodos[index].finished = !newTodos[index].finished;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <nav className="navbar">
        <h2>Task Manager</h2>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Your Tasks</a>
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="todo-card">
          <h3>Task - Manage your todos at one place</h3>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a Todo"
          />
          <button onClick={handleAdd}>Save</button>

          <div className="options">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
            />
            <label> Show Finished</label>
          </div>

          <div className="todo-list">
            <h4>Your Todos</h4>
            {todos.length === 0 && (
              <p className="no-todos">No Todos to display</p>
            )}
            {todos.map((t, i) => {
              if (showFinished && !t.finished) return null;
              return (
                <div className="todo-item" key={i}>
                  <span
                    style={{
                      textDecoration: t.finished ? "line-through" : "none",
                    }}
                  >
                    {t.text}
                  </span>
                  <div className="todo-actions">
                    <button onClick={() => handleToggleFinish(i)}>
                      {t.finished ? "Undo" : "Done"}
                    </button>
                    <button onClick={() => handleDelete(i)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
