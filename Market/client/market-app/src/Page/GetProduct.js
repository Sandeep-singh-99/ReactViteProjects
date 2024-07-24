import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function GetProduct() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-product"
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts()
  },[]);
  return (
    <div className="p-20 space-y-5">
      <div className="bg-slate-950 px-10 py-5">
        <div className="flex justify-end gap-5">
        <NavLink to={"category-product"} className="text-white text-xl font-semibold">
            Category Sort
          </NavLink>
          <NavLink to={"upload"} className="text-white text-xl font-semibold">
            Upload Product
          </NavLink>
        </div>
      </div>
      <div className="grid  grid-cols-3 gap-10">
        {product.map((index) => (
            <div key={index._id} className="">
            <img className="h-52" src={index.img} alt={index.name} />
            <h1 className="text-2xl">{index.name}</h1>
            <p className="text-xl">RS.{index.price}</p>
            <p>{index.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetProduct;
