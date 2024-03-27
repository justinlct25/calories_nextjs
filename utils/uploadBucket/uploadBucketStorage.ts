
import { Bucket, Storage } from '@google-cloud/storage';

const bucketURL = process.env.BUCKET_STORAGE_URL || "";

export async function uploadBufferToBucketStorage(bucketName: string, imageName: string, buffer: Buffer, bucketFolder?: string, bucketUrl: string=bucketURL) {
    try {
        const storage = new Storage();
        const bucket = storage.bucket(bucketName)
        if (bucketFolder) {
            const fileDirectory = bucketFolder + "/" + imageName;
            await bucket.file(fileDirectory).save(buffer);
            await bucket.file(fileDirectory).makePublic();
            return `${bucketUrl}/${bucketFolder}/${imageName}`
        } else {
            const fileDirectory = imageName;
            await bucket.file(fileDirectory).save(buffer);
            await bucket.file(fileDirectory).makePublic();
            return `${bucketUrl}/${imageName}`

        }
    } catch(error) {
        throw new Error(`Failed to upload image ${imageName} to GCP due to ${error}.`);
    }
}

// const uploadFileToBucketStorage = async (bucketName: string, imageName: string, file: File, bucketUrl: string = bucketURL, bucketFolder: string = "") => {
//     const storage = new Storage();
//     const bucket = storage.bucket(bucketName);
  
//     // const fileName = `${Date.now()}_${file.name}`;
//     let fileBlob: any;
//     if (bucketFolder !== "") {
//         fileBlob = bucket.file(bucketFolder + "/" + imageName);
//     } else {
//         fileBlob = bucket.file(imageName);
//     }
  
//     const stream = fileBlob.createWriteStream({
//       metadata: {
//         contentType: file.type,
//       },
//     });
  
//     return new Promise((resolve, reject) => {
//       stream.on('error', (err) => {
//         reject(err);
//       });
  
//       stream.on('finish', () => {
//         const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
//         resolve(publicUrl);
//       });
  
//       stream.end(file.buffer);
//     });
//   };