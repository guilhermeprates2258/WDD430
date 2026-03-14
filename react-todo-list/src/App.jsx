import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function handleAddTodo() {
    if (newTodo.trim() === "") return;

    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false }
    ]);

    setNewTodo("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Todo List</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newTodo}
          placeholder="Add a new task..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;