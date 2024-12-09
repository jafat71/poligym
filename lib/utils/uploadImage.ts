import axios from 'axios';

interface UploadImageProps {
  base64Img: string;
  uploadPreset: string;
}

export const uploadImage = async ({ base64Img, uploadPreset }: UploadImageProps) => {
  if (!base64Img) {
    throw new Error("No se proporcionó un archivo para subir.");
  }

  let data = {
  "file": base64Img,
  "upload_preset": uploadPreset
  }

  const url = `${process.env.EXPO_PUBLIC_CLOUDINARY_URL}`
  try {
    const response = await axios.post(
      url,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.secure_url
  } catch (error) {
    console.log('error', error)
    throw error
  }   
};
