import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const isNewImage = newCabin.image?.startsWith?.(supabaseUrl) ? false : true;

  const imageName = isNewImage
    ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    : "";

  const imagePath = isNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //upload the image
  if (isNewImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

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

export async function updateCabin(id, updatedCabin) {
  const isNewImage = updatedCabin.image?.startsWith?.(supabaseUrl)
    ? false
    : true;

  const imageName = isNewImage
    ? `${Math.random()}-${updatedCabin.image.name}`.replaceAll("/", "")
    : "";

  const imagePath = isNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : updatedCabin.image;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be updated");
  }
  //upload the image
  if (isNewImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, updatedCabin.image);

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
