import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://mern-recipe-app1-server.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-recipe-app1-server.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mern-recipe-app1-server.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-900 to-blue-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Delicious Recipes</h1>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="bg-gray-700 p-6 rounded-xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-white mb-4">{recipe.name}</h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 ease-in-out transform hover:scale-105"
              />
              <p className="text-gray-300 mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
              <div className="text-gray-400 text-sm text-center mb-4 overflow-hidden h-20">
                <p>{recipe.instructions}</p>
              </div>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className={`w-full py-3 rounded-md text-white ${isRecipeSaved(recipe._id) ? 'bg-green-500' : 'bg-blue-600'} 
                hover:bg-blue-500 disabled:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
