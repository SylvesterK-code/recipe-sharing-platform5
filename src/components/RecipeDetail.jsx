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

  // ⭐ Updated delete function with image auto-delete
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    // Fetch image file path before deleting record
    const { data: recipeData } = await supabase
      .from("recipes")
      .select("image_path")
      .eq("id", id)
      .single();

    const imagePath = recipeData?.image_path;

    // Delete recipe row
    const { error } = await supabase.from("recipes").delete().eq("id", id);

    if (error) {
      alert("Failed to delete recipe.");
      return;
    }

    // Delete image from storage
    if (imagePath) {
      await supabase.storage.from("recipe-images").remove([imagePath]);
    }

    alert("Recipe deleted!");
    navigate("/");
  };

  if (!recipe)
    return <div className="text-center mt-20 text-xl">Loading recipe...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        <img
          src={recipe.image}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        <p className="text-gray-700 text-lg mb-6">{recipe.summary}</p>

        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Steps</h2>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.steps?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="flex gap-4 mt-8">
          <Link
            to={`/edit-recipe/${id}`}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Edit Recipe
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
