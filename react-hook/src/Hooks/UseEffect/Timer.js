import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 5000);
  });

  return (
    <h1 className="text-xl bg-gray-300 px-3 py-1 w-fit">
      I have rendered <span className="text-blue-700">{count}</span> times!
    </h1>
  );
}

export default Timer;
