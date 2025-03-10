import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo/todos/tu_usuario";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        }
      })
      .catch((err) => console.error("Error al obtener tareas:", err));
  }, []);

  const addTask = (taskLabel) => {
    const newTasks = [...tasks, { label: taskLabel, done: false }];
    updateTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    updateTasks(newTasks);
  };

  const clearTasks = () => {
    updateTasks([]);
  };

  const updateTasks = (newTasks) => {
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => setTasks(newTasks))
      .catch((err) => console.error("Error al actualizar tareas:", err));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Nueva tarea"
        onKeyDown={(e) => e.key === "Enter" && addTask(e.target.value)}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={clearTasks}>Limpiar Todo</button>
    </div>
  );
};

export default Home;
