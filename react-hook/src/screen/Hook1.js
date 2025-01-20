import React from "react";
import Counter from "../Hooks/UseState/Counter";
import img1 from "../assets/counter.png";

function Hook1() {
  return (
    <div>
      <div className="gap-5 flex flex-col">
        <h1 className="text-3xl text-gray-300  font-bold">
          UseState
        </h1>
        <h2 className="text-white text-2xl">
          useState is a React Hook that lets you add a{" "}
          <span className="text-blue-600 ">state variable</span> to
          your component.
        </h2>
      </div>
      <div className="my-10">
        <img src={img1} alt="not showing" />
      </div>
      <div>
        <Counter />
      </div>
    </div>
  );
}

export default Hook1;
