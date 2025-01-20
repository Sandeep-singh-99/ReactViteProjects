import React from "react";
import Counter from "../Hooks/UseState/Counter";
import img1 from "../assets/counter.png";

function Hook1() {
  return (
    <div>
      <div className="gap-5 flex flex-col">
        <h1 className="text-3xl text-gray-300  font-bold">useState</h1>
        <h2 className="text-white text-2xl">
          The <span className="text-blue-500">useState</span> hook is a fundamental part of React, a JavaScript library
          for building user interfaces. It allows you to add state to functional
          components. Before hooks were introduced, state could only be managed
          in class components.
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
