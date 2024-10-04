import React, { useState } from 'react';
import { Reorder, motion } from 'framer-motion';

const ReorderableList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reorderable List</h1>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        style={{ listStyleType: "none", padding: 0 }}
      >
        {items.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            as={motion.li}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "red",
              borderRadius: "5px",
              cursor: "grab",
              listStyle: "none",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default ReorderableList;
