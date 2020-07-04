import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { content: "Do the dishes", isCompleted: true },
    { content: "Clean your room", isCompleted: false },
    { content: "Exercise", isCompleted: false },
  ]);

  const handleKeyDown = (e, i) => {
    if (e.key === "Enter") {
      createTodo(e, i);
    }
    if (e.key === "Backspace" && todos[i].content === "") {
      e.preventDefault();
      return removeTodo(i);
    }
  };

  const removeTodo = (i) => {
    if (i === 0 && todos.length === 1) return;
    setTodos((todo) =>
      todos.slice(0, i).concat(todos.slice(i + 1, todos.length))
    );
    setTimeout(() => {
      if (i === 0) {
        document.forms[0].elements[i].focus();
      } else {
        document.forms[0].elements[i - 1].focus();
      }
    }, 0);
  };

  const createTodo = (e, i) => {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: "",
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  };

  const updateTodo = (e, i) => {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  };

  const toggleTodoComplete = (index) => {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>to do:</h1>
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && "todo-is-completed"}`}>
              <div
                className={"checkbox"}
                onClick={() => toggleTodoComplete(i)}
              />
              {todo.isCompleted}
              <input
                type="text"
                value={todo.content}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onChange={(e) => updateTodo(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
