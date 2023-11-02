import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createOrUpdateCabin(id, cabin) {
  const isNewImage = cabin.image?.startsWith?.(supabaseUrl) ? false : true;

  const imageName = isNewImage
    ? `${Math.random()}-${cabin.image.name}`.replaceAll("/", "")
    : "";

  const imagePath = isNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : cabin.image;

  let query = supabase.from("cabins");
  if (id)
    //For Update
    query = query
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  //For Create
  else query = query.insert([{ ...cabin, image: imagePath }]).select();

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be ${id ? "updated" : "created"}`);
  }
  //upload the image
  if (isNewImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

    //delete the cabin if there was an error uploading the image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(error);
      throw new Error(
        "Cabin image could not be uploaded and cabin was not created"
      );
    }
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
