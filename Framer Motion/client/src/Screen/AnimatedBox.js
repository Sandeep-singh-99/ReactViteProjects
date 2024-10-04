import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react";


export default function AnimatedBox() {
    const [isToggled, setIsToggled] = useState(false);
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <motion.div
      onClick={() => setIsToggled(!isToggled)}
      animate={{
        x: isToggled ? 200 : 0,
        opacity: isToggled ? 0.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    />
  </div>
  )
}
