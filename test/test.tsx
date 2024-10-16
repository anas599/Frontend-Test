"use client";

import React from "react";
import styles from "./test.module.css";
import { useState } from "react";

export default function Test(): JSX.Element {
  // Your Test Starts Here
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
      setError(""); // Clear error message
    } else {
      setError("Please enter at least one letter."); // Set error message
    }
  };
  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new to-do item"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
