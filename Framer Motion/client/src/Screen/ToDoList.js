import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue(""); // Clear input
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Animated To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addItem}>Add</button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              style={{
                margin: "10px 0",
                padding: "10px",
                background: "#f0f0f0",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => removeItem(index)}
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TodoList;
