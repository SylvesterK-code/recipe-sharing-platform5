// components/HomePage.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { FaArrowRight } from "react-icons/fa";

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
      {/* Top right info */}
      <p className="text-right text-xs sm:text-sm text-blue-500 pb-2 pt-4 sm:pb-4">
        Sign in or Sign up to add a recipe
      </p>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 text-center mb-10 pt-4">
        Recipe Sharing Platform
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        All Recipes
      </h2>

      {/* No recipes */}
      {recipes.length === 0 ? (
        <p className="text-center text-lg sm:text-xl text-gray-500 mt-10 text-red-500">
          No recipes found...
        </p>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-6 sm:gap-8
            mt-6
          "
        >
          {recipes.map((r) => (
            <Link to={`/recipe/${r.id}`} key={r.id}>
              <div
                className="
                  bg-white shadow-lg rounded-xl 
                  flex flex-col 
                  hover:scale-[1.03] transition-all 
                  cursor-pointer overflow-hidden
                  h-full
                "
              >
                {/* Recipe Image */}
                <img
                  src={r.image}
                  alt={r.title}
                  className="
                    h-40 sm:h-48 md:h-56 
                    w-full object-cover 
                    rounded-t-xl
                  "
                />

                <div className="flex flex-col p-4 sm:p-5 flex-grow">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
                    {r.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                    {r.summary}
                  </p>

                  {/* ADDED: Person who added the recipe */}
                  <p className="font-medium text-yellow-500 text-xs sm:text-sm mt-3 bold">
                    Added by:{" "}
                    <span className="font-medium text-orange-700 text-xs sm:text-sm mt-3 italic">
                      {r.created_by || "Unknown Author"}
                    </span>
                  </p>

                  {/* VIEW DETAILS BUTTON */}
                  <div className="mt-4 ">
                    <Button icon={FaArrowRight} iconPosition="right">
                      View Details
                    </Button>
                  </div>
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
