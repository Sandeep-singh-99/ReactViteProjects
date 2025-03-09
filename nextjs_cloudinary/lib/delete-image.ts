import cloudinary from "./cloudinary";

export const DeleteImage = async (publicId: string) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error.message);
        }
        return resolve(result);
      });
    });
  };