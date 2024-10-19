"use client";

import React from "react";
import styles from "./test.module.css";
import { useState } from "react";

export default function Test(): JSX.Element {
  // Your Test Starts Here
  const [todos, setTodos] = useState<string[]>([]); //state variable to store the list of todos
  const [inputValue, setInputValue] = useState<string>(""); //state variable to store the input value
  const [error, setError] = useState<string>(""); //state variable to store the error message
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which todo is being edited
  const [editingValue, setEditingValue] = useState<string>(""); // Track the value of the todo being edited

  const addTodo = () => {
    if (inputValue.trim()) {
      //trim the input value to remove any leading or trailing white spaces
      setTodos([...todos, inputValue]);
      setInputValue("");
      setError(""); // Clear error message when input is valid
    } else {
      setError("Please enter at least one letter."); // Set error message when input is invalid
    }
  };
  //use filter method to remove the todo item at the given index from the todos array
  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  //edit the to do item
  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(todos[index]); // Set the current value of the todo being edited
  };
  //save the edited item
  const saveTodo = (index: number) => {
    if (editingValue.trim()) {
      const newTodos = [...todos];
      newTodos[index] = editingValue;
      setTodos(newTodos); // Update the item array with the new value
      setEditingIndex(null); // Exit edit mode
    } else {
      setError("Please enter at least one letter.");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1Text}>To-Do List</h1>
      <div className={styles.topContainer}>
        <input
          //input field to add a new item
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
        {/* map through the todos array to display the list of todos */}
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              // If in editing mode, display an input field and a save button
              <>
                <input
                  className={styles.inputBar}
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button
                  className={styles.saveBtn}
                  onClick={() => saveTodo(index)}
                >
                  Save
                </button>
              </>
            ) : (
              // If normal mode display the todo item and two buttons
              <>
                {todo}
                <div>
                  <button
                    className={styles.rmvBtn}
                    onClick={() => removeTodo(index)}
                  >
                    Remove
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
