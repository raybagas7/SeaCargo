import axios from "axios";

export const postImage = async (imageFile: File) => {
  const formDataImage = new FormData();
  formDataImage.append("file", imageFile);
  formDataImage.append("upload_preset", "g2ipkyag");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dro3sbdac/image/upload",
      formDataImage,
    );
    console.log(response);
    return response.data.url;
  } catch (error) {
    throw error;
  }
};
