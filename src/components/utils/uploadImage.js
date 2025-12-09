
// src/components/utils/uploadImage.js

// import { supabase } from "../supabaseClient";

// export const uploadImage = async (file) => {
//   const fileName = `${Date.now()}-${file.name}`;

//   const { data, error } = await supabase.storage
//     .from("recipe-images")
//     .upload(fileName, file);

//   if (error) return null;

//   const { publicUrl } = supabase.storage
//     .from("recipe-images")
//     .getPublicUrl(fileName).data;

//   return publicUrl;
// };



// src/components/utils/uploadImage.js

import { supabase } from "../supabaseClient";

export const uploadImage = async (file) => {
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
