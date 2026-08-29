import React, { useRef, useState } from "react";

export default function RefPage() {
  const number = useRef(10);
  const [count, setCount] = useState(0);

  const increase = () => {
    number.current++;
    setCount((prev) => prev + 1);
  };

  return (
    <div className="text-black">
      <p>Number: {number.current}</p>

      <button className="bg-amber-300 text-black" onClick={increase}>
        Increase
      </button>
    </div>
  );
}