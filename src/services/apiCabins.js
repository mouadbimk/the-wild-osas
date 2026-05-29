import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";
  const imageName = `${Math.random()}-${newCabin.name}`.replaceAll("/", "");

  //1. upload image
  let ErrorImage;
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabins-images")
      .upload(imageName, newCabin.image);
    ErrorImage = storageError;
  }

  //2. get correct public URL
  const { data: publishUrlData } = await supabase.storage
    .from("cabins-images")
    .getPublicUrl(imageName);
  const imagePath = hasImagePath ? newCabin.image : publishUrlData.publicUrl;

  //3. Delete the cabin if there was an error uploading image
  if (ErrorImage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image cloud not be uploaded and the cabin was not created",
    );
  }
  //4. create/Edit cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;
  if (error) {
    await supabase.storage.from("cabins-images").remove([imageName]);
    throw new Error("Cabin could not be created");
  }
  return data;
}
