import React from "react";
import img from "../assets/timer.png";
import Timer from "../Hooks/UseEffect/Timer";

function Hook2() {
  return (
    <div>
      <div className="gap-5 flex flex-col">
        <h1 className="text-3xl text-gray-300  font-bold">useEffect</h1>

        <h2 className="text-white text-2xl">
          The <span className="text-blue-500">useEffect</span> hook is another essential part of React, used for
          performing side effects in functional components. Side effects can
          include data fetching, subscriptions, or directly interacting with the
          DOM.
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
