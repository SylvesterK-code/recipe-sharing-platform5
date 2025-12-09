// // src/components/EditRecipe.jsx

// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Button from "../components/ui/Button.jsx";
// import { FaHome, FaSave } from "react-icons/fa";
// import { supabase } from "../supabaseClient";

// // ⭐ Upload Image to Supabase Storage
// const uploadNewImage = async (file, oldPath = null) => {
//   const fileName = `recipe-${Date.now()}-${file.name}`;

//   // Upload new file
//   const { error } = await supabase.storage
//     .from("recipe-images")
//     .upload(fileName, file);

//   if (error) {
//     alert("Image upload failed: " + error.message);
//     return { url: "", path: "" };
//   }

//   // Delete old image if available
//   if (oldPath) {
//     await supabase.storage.from("recipe-images").remove([oldPath]);
//   }

//   const { data } = supabase.storage
//     .from("recipe-images")
//     .getPublicUrl(fileName);

//   return { url: data.publicUrl, path: fileName };
// };

// const EditRecipe = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [image, setImage] = useState("");
//   const [imagePath, setImagePath] = useState(null);
//   const [ingredients, setIngredients] = useState("");
//   const [steps, setSteps] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // ⭐ Fetch existing recipe
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const { data, error } = await supabase
//         .from("recipes")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) return alert("Failed to load recipe");

//       setTitle(data.title);
//       setSummary(data.summary);
//       setImage(data.image); // stored URL
//       setImagePath(data.image_path);
//       setIngredients(data.ingredients.join("\n"));
//       setSteps(data.steps.join("\n"));
//     };

//     fetchRecipe();
//   }, [id]);

//   // ⭐ Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!title.trim()) newErrors.title = "Recipe title is required";
//     if (!summary.trim()) newErrors.summary = "Summary is required";
//     if (!image) newErrors.image = "Please upload or paste an image";

//     const ingList = ingredients.split("\n").filter((i) => i.trim());
//     if (ingList.length < 2)
//       newErrors.ingredients = "At least 2 ingredients required";

//     if (!steps.trim()) newErrors.steps = "Please add preparation steps";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ⭐ Update recipe
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     let imageUploadResult = { url: image, path: imagePath };

//     // If image changed and is a File → upload new
//     if (image instanceof File) {
//       imageUploadResult = await uploadNewImage(image, imagePath);
//     }

//     const { error } = await supabase
//       .from("recipes")
//       .update({
//         title,
//         summary,
//         image: imageUploadResult.url,
//         image_path: imageUploadResult.path,
//         ingredients: ingredients.split("\n"),
//         steps: steps.split("\n"),
//       })
//       .eq("id", id);

//     setLoading(false);

//     if (error) {
//       alert("Error updating recipe: " + error.message);
//       return;
//     }

//     alert("Recipe updated successfully! 🎉");
//     navigate("/home");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 py-8 md:py-12 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-800">
//       <div className="mb-6">
//         <Link to="/">
//           <Button variant="primary" icon={FaHome}>
//             Back to Home
//           </Button>
//         </Link>
//       </div>

//       <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
//           Edit Recipe
//         </h2>

//         <form onSubmit={handleUpdate} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block font-medium text-gray-700 dark:text-gray-300">
//               Recipe Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//             />
//             {errors.title && <p className="text-red-500">{errors.title}</p>}
//           </div>

//           {/* Summary */}
//           <div>
//             <label className="block font-medium text-gray-700 dark:text-gray-300">
//               Summary
//             </label>
//             <input
//               type="text"
//               value={summary}
//               onChange={(e) => setSummary(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//             />
//             {errors.summary && <p className="text-red-500">{errors.summary}</p>}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block font-medium text-gray-700 dark:text-gray-300">
//               Recipe Image
//             </label>

//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="border p-3 w-full rounded bg-white dark:bg-gray-800 dark:text-white"
//             />

//             <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
//               or paste an image URL
//             </p>

//             <input
//               type="url"
//               value={typeof image === "string" ? image : ""}
//               onChange={(e) => setImage(e.target.value)}
//               className="w-full p-3 border rounded-lg mt-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
//             />

//             {/* Image Preview */}
//             <div className="mt-3">
//               <p className="text-gray-600 text-sm">Preview:</p>

//               <div className="border p-2 w-fit bg-white rounded-lg shadow">
//                 {image instanceof File ? (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     className="w-40 h-40 rounded-lg object-cover"
//                   />
//                 ) : (
//                   image && (
//                     <img
//                       src={image}
//                       className="w-40 h-40 rounded-lg object-cover"
//                     />
//                   )
//                 )}
//               </div>
//             </div>

//             {errors.image && <p className="text-red-500">{errors.image}</p>}
//           </div>

//           {/* Ingredients */}
//           <div>
//             <label className="block font-medium text-gray-700 dark:text-gray-300">
//               Ingredients (one per line)
//             </label>
//             <textarea
//               value={ingredients}
//               onChange={(e) => setIngredients(e.target.value)}
//               className="w-full p-3 h-32 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//             />
//             {errors.ingredients && (
//               <p className="text-red-500">{errors.ingredients}</p>
//             )}
//           </div>

//           {/* Steps */}
//           <div>
//             <label className="block font-medium text-gray-700 dark:text-gray-300">
//               Preparation Steps (one per line)
//             </label>
//             <textarea
//               value={steps}
//               onChange={(e) => setSteps(e.target.value)}
//               className="w-full p-3 h-32 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//             />
//             {errors.steps && <p className="text-red-500">{errors.steps}</p>}
//           </div>

//           <Button type="submit" icon={FaSave} variant="primary">
//             {loading ? "Updating..." : "Save Changes"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditRecipe;











// src/components/EditRecipe.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { FaSave, FaHome } from "react-icons/fa";
import { supabase } from "../supabaseClient";

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

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [oldImagePath, setOldImagePath] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch existing recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Failed to load recipe.");
        return;
      }

      setRecipe(data);

      setTitle(data.title);
      setSummary(data.summary);
      setImage(data.image);
      setOldImagePath(data.image_path);
      setIngredients(data.ingredients.join("\n"));
      setSteps(data.steps.join("\n"));
    };

    fetchRecipe();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Recipe title is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";

    const ingList = ingredients.split("\n").filter((i) => i.trim());
    if (ingList.length < 2)
      newErrors.ingredients = "At least 2 ingredients required";

    if (!steps.trim()) newErrors.steps = "Please add preparation steps";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    let newImage = { url: image, path: oldImagePath };

    // If user uploads a new file, upload it
    if (image instanceof File) {
      newImage = await uploadImage(image);

      // Delete old image from storage
      if (oldImagePath) {
        await supabase.storage.from("recipe-images").remove([oldImagePath]);
      }
    }

    const { error } = await supabase
      .from("recipes")
      .update({
        title,
        summary,
        image: newImage.url,
        image_path: newImage.path,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert("Failed to update recipe.");
      return;
    }

    alert("Recipe updated successfully! 🎉");
    navigate(`/recipe/${id}`);
  };

  if (!recipe)
    return <div className="text-center mt-20 text-xl">Loading recipe...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 py-8 md:py-12 bg-gradient-to-br from-green-200 to-green-400 dark:from-gray-900 dark:to-gray-800">
      {/* <div className="mb-6">
        <Link to="/home">
          <Button variant="primary" icon={FaHome}>
            Back to Home
          </Button>
        </Link>
      </div> */}

      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Edit Recipe
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          {/* Summary */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Recipe Image
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-3 w-full rounded bg-white dark:bg-gray-800 dark:text-white"
            />

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              or paste new image URL
            </p>

            <input
              type="url"
              value={typeof image === "string" ? image : ""}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
            />

            <div className="mt-3">
              <p className="text-gray-600 text-sm">Current Preview:</p>
              <div className="border p-2 w-fit bg-white rounded-lg shadow">
                {image instanceof File ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                ) : (
                  <img
                    src={image}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Ingredients (one per line)
            </label>

            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 h-32 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            {errors.ingredients && (
              <p className="text-red-500">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Steps (one per line)
            </label>

            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full p-3 h-32 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            {errors.steps && <p className="text-red-500">{errors.steps}</p>}
          </div>

          <Button type="submit" icon={FaSave} variant="primary">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
