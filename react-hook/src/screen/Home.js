import React from "react";
import Navigation from "../helper/navigation";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-wrap justify-between">
      {Navigation.length > 0 &&
        Navigation.map((item, index) => {
          return (
            <div
              key={index}
              className="mb-5 flex justify-center items-center w-full sm:w-1/2 lg:w-1/3 p-2"
            >
              <Link to={item.navigate} className="w-full">
                <div className="bg-purple-950 text-white w-full h-[150px] flex items-center justify-center rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
