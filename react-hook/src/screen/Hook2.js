import React from "react";
import img from "../assets/timer.png";
import Timer from "../Hooks/UseEffect/Timer";

function Hook2() {
  return (
    <div>
      <div className="gap-5 flex flex-col">
        <h1 className="text-3xl text-gray-300  font-bold">useEffect</h1>

        <h2 className="text-white text-2xl">
          useEffect is a React Hook that lets you{" "}
          <span className="text-blue-600 ">
            synchronize a component with an external system.
          </span>
        </h2>
      </div>

      <div className="my-5">
        <img src={img} alt="not showing" />
      </div>

      <div>
        <Timer />
      </div>
    </div>
  );
}

export default Hook2;
