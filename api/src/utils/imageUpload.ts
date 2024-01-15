import cloudinary from 'cloudinary';
import CustomError from './error/customError';

export async function uploadImages(imageFiles: Express.Multer.File[]) {
  if (!imageFiles)
    throw new CustomError('No uploaded image found', 400, 'Bad Request');

  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
