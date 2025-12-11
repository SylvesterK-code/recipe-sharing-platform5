// src/components/AddRecipeForm.jsx

import { useState } from "react";
import Button from "./ui/Button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// 🔥 Upload image to Supabase Storage
const uploadImage = async (file) => {
  const fileName = `recipe-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("recipe-images")
    .upload(fileName, file);

  if (error) {
    alert("Image upload failed: " + error.message);
    return { url: "", path: "" };
  }

  const { data } = supabase.storage
    .from("recipe-images")
    .getPublicUrl(fileName);

  return { url: data.publicUrl, path: fileName };
};

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ⭐ Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    if (!image) newErrors.image = "Please upload or paste an image";

    const ingList = ingredients.split("\n").filter((i) => i.trim());
    if (ingList.length < 2)
      newErrors.ingredients = "At least 2 ingredients required";

    if (!steps.trim()) newErrors.steps = "Please add preparation steps";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ⭐ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    let imageUploadResult = { url: "", path: "" };

    // Upload file if needed
    if (image instanceof File) {
      imageUploadResult = await uploadImage(image);
    } else {
      imageUploadResult = { url: image, path: null };
    }

    // 🔥 Get logged-in user
    const { data: auth } = await supabase.auth.getUser();
    const userId = auth?.user?.id;

    // ⭐ Insert recipe with created_by_id
    const { error } = await supabase.from("recipes").insert([
      {
        title,
        summary,
        image: imageUploadResult.url,
        image_path: imageUploadResult.path,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        created_by_id: userId,       // 👈 UPDATED FIELD
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error adding recipe: " + error.message);
      return;
    }

    alert("Recipe added successfully! 🎉");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 md:py-12 bg-gradient-to-br from-green-100 to-green-300">
      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Add a New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700">Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="e.g. Jollof Rice"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          {/* Summary */}
          <div>
            <label className="block font-medium text-gray-700">Summary</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="Short description of the recipe"
            />
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700">Recipe Image</label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-3 w-full rounded bg-white"
            />

            <p className="text-gray-600 text-sm mt-2">or paste an image URL</p>

            <input
              type="url"
              value={typeof image === "string" ? image : ""}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2 bg-gray-100"
              placeholder="https://example.com/image.jpg"
            />

            {/* Preview */}
            <div className="mt-3">
              <p className="text-gray-600 text-sm">Preview:</p>
              <div className="border p-2 w-fit bg-white rounded-lg shadow">
                {image instanceof File && (
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                )}

                {typeof image === "string" &&
                  image.trim() !== "" &&
                  !image.startsWith("blob:") && (
                    <img
                      src={image}
                      className="w-40 h-40 rounded-lg object-cover"
                    />
                  )}
              </div>
            </div>

            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-medium text-gray-700">
              Ingredients (one per line)
            </label>

            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 h-32 border rounded-lg bg-gray-100"
              placeholder={"e.g\n2 cups rice\n1 onion\nSalt"}
            />

            {errors.ingredients && (
              <p className="text-red-500">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block font-medium text-gray-700">
              Preparation Steps (one per line)
            </label>

            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full p-3 h-32 border rounded-lg bg-gray-100"
              placeholder={"e.g\nBoil water\nAdd rice\nCook for 20 minutes"}
            />

            {errors.steps && <p className="text-red-500">{errors.steps}</p>}
          </div>

          <Button type="submit" icon={FaPlus} variant="p_green">
            {loading ? "Saving..." : "Add Recipe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
