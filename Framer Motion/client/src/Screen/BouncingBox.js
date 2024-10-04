import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function BouncingBox() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* LazyMotion wraps the animation */}
      <LazyMotion features={domAnimation}>
        <m.div
          onClick={() => setIsToggled(!isToggled)}
          animate={{
            y: isToggled ? [0, -100, 0] : [0],
            backgroundColor: isToggled ? "red" : "blue",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            width: 100,
            height: 100,
            backgroundColor: "blue",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        />
      </LazyMotion>
    </div>
  );
}
