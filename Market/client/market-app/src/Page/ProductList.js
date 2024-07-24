import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/get-product');
        setProducts(response.data);
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="p-20 space-y-5">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="mb-5">
        <label className="block mb-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border-2 rounded-md px-5 py-3 w-full"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-md p-5">
            <img src={product.img} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.desc}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
            <p className="text-gray-500">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
