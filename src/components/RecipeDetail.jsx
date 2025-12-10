// src/components/RecipeDetail.jsx

import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    const { data: recipeData } = await supabase
      .from("recipes")
      .select("image_path")
      .eq("id", id)
      .single();

    const imagePath = recipeData?.image_path;

    const { error } = await supabase.from("recipes").delete().eq("id", id);

    if (error) {
      alert("Failed to delete recipe.");
      return;
    }

    if (imagePath) {
      await supabase.storage.from("recipe-images").remove([imagePath]);
    }

    alert("Recipe deleted!");
    navigate("/");
  };

  if (!recipe)
    return <div className="text-center mt-20 text-xl">Loading recipe...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Responsive image */}
        <img
          src={recipe.image}
          className="w-full h-auto max-h-80 sm:max-h-96 object-cover rounded-xl mb-6"
        />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{recipe.title}</h1>

        {/* Summary */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          {recipe.summary}
        </p>

        {/* Ingredients */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Steps */}
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-3">Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          {recipe.steps?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        {/* Action buttons (responsive) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg">
          <Link
            to={`/edit-recipe/${id}`}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-lg text-center sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg"
          >
            Edit Recipe
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-lg sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg"
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
