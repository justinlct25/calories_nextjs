// import { Storage } from '@google-cloud/storage'
// import { html } from 'next-auth/providers';

// // Function to extract image URLs from HTML content
// function extractImageUrls(htmlContent: string): string[] {
//     const regex = /<img.*?src="(.*?)"/g;
//     const urls: string[] = [];
//     let match;
//     while ((match = regex.exec(htmlContent)) !== null) {
//         urls.push(match[1]);
//     }
//     return urls;
// }

// async function uploadImageToGCP(imgUrl: string, imgName: string): Promise<string> {
//     const response = await fetch(imgUrl);
//     if (!response.ok) throw new Error('Failed to fetch image');
//     const blob = await response.blob();
//     const file = new File([blob], imgName, { type: blob.type });
//     const buffer = await file.arrayBuffer()
//     const storage = new Storage();
//     const bucketName = process.env.BUCKET_STORAGE_NAME_ACTIVITY_DESCRIPTION || "";
//     const bucketURL = process.env.BUCKET_STORAGE_URL_ACTIVITY_DESCRIPTION || "";
//     try {
//         await storage.bucket(bucketName).file(file.name).save(Buffer.from(buffer));
//         return `${bucketURL}/${imgName}`
//     } catch(error) {
//         throw new Error(`Failed to upload image ${imgName} to GCP due to ${error}. `)
//     }
// }

// // Function to replace original src attributes with uploaded image URLs
// function replaceSrcAttributes(htmlContent: string, imageUrls: string[], uploadedUrls: string[]): string {
//     for (let i = 0; i < imageUrls.length; i++) {
//         htmlContent = htmlContent.replace(imageUrls[i], uploadedUrls[i]);
//     }
//     return htmlContent;
// }

// // Function to handle submit button click
// export async function processTiptapImageUrls(activityId: number, htmlContent: string): Promise<string> {
//     const imageUrls = extractImageUrls(htmlContent);
//     const uploadedUrls: string[] = [];
//     // Upload each image to GCP storage and collect the URLs
//     for (let i=0; i<imageUrls.length; i++) {
//         const imageName = `activity${activityId}-img${i}`
//         const uploadedUrl = await uploadImageToGCP(imageUrls[i], imageName);
//         uploadedUrls.push(uploadedUrl);
//     }
//     const updatedUrlsHtml = replaceSrcAttributes(htmlContent, imageUrls, uploadedUrls);
//     return updatedUrlsHtml;

// }


