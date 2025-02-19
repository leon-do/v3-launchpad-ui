export async function uploadImage(file: File) {
  // https://api.imgbb.com/
  const formData = new FormData();
  formData.append("image", file);
  const request = await fetch(
    `https://api.imgbb.com/1/upload?key=0687bb123a9d3911d2c17b568309f28f`,
    {
      method: "POST",
      body: formData,
    }
  );
  const { data } = await request.json();
  return data.display_url;
}
