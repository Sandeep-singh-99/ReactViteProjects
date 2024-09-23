import React from "react";
import NewList from "./components/NewList";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-5xl font-semibold">News App</h1>
      </div>

      <div className="p-10">
        <NewList/>
      </div>
    </>
  );
}
