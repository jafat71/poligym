interface UploadImageProps {
  file: File;
  uploadPreset: string;
}

export const uploadImage = async ({ file, uploadPreset }: UploadImageProps) => {
  if (!file) {
    throw new Error("No se proporcionó un archivo para subir.");
  }

  const formData = new FormData();
  formData.append("file", file); // Archivo de imagen
  formData.append("upload_preset", uploadPreset); // Preset configurado en Cloudinary

  console.log('formData', formData)
  console.log('uploadPreset', uploadPreset)
  console.log('process.env.EXPO_PUBLIC_CLOUDINARY_URL', process.env.EXPO_PUBLIC_CLOUDINARY_URL)
  try {
    // Realiza la solicitud de subida
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_CLOUDINARY_URL}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir la imagen a Cloudinary.");
    }

    const data = await response.json();
    return data.secure_url; // Devuelve la URL segura de la imagen subida
  } catch (error) {
    console.error("Error en la subida:", error);
    throw error;
  }
};
