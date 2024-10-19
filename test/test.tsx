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
    <div className={styles.container}>
      <h1 className={styles.h1Text}>To-Do List</h1>
      <div className={styles.topContainer}>
        <input
          className={styles.inputBar}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new to-do item"
        />
        <button className={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button className={styles.rmvBtn} onClick={() => removeTodo(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
