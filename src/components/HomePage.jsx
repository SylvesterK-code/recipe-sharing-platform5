// components/HomePage.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 py-8 md:py-12">
      {/* Top Right Info Text */}
      <p className=" text-right text-xs sm:text-sm text-blue-500 pb-2 pt-4 sm:pb-4">
        Signin or Signup to add a recipe
      </p>

      {/* Page Title */}
      <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-green-700 text-center mb-10 pt-4">
        Recipe Sharing Platform
      </h1>

      <h1 className="text-4xl sm:text-4xl md:text-3xl font-bold mb-6 text-center">
        All Recipes
      </h1>

      {/* No Recipes Case */}
      {/* Grid */}
      {recipes.length === 0 ? (
        <p className="text-center text-lg sm:text-xl text-gray-500 mt-10">
          No recipes found...
        </p>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            
            gap-8
            mt-6
          ">
          {recipes.map((r) => (
            <Link to={`/recipe/${r.id}`} key={r.id}>
              <div
                className="
                  bg-white shadow-lg rounded-xl 
                  p-4 sm:p-5 
                  hover:scale-105 transition-transform 
                  cursor-pointer overflow-hidden
                "
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="
                    h-44 sm:h-48 md:h-56 
                    w-full object-cover 
                    rounded-lg mb-4
                  "
                />
                <div className="p-5">
                  <h2 className="text-lg text-green-800 sm:text-xl font-semibold">
                    {r.title}
                  </h2>

                  <p className="text-gray-600 mt-1 text-sm sm:text-base line-clamp-3 leading-relaxed">
                    {r.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
