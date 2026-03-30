import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("crudData"));
    if (storedData) {
      setItems(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("crudData", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (editId !== null) {
      // Update
      const updatedItems = items.map((item) =>
        item.id === editId ? { ...item, text: input } : item
      );
      setItems(updatedItems);
      setEditId(null);
    } else {
      // Create
      const newItem = {
        id: Date.now(),
        text: input,
      };
      setItems([...items, newItem]);
    }

    setInput("");
  };

  // Delete item
  const handleDelete = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };

  // Edit item
  const handleEdit = (item) => {
    setInput(item.text);
    setEditId(item.id);
  };

  return (
    <div className="container">
      <h1>CRUD App </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          {editId !== null ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}