
import { uploadBufferToBucketStorage } from './uploadBucketStorage';


const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
const bucketFolder = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_DESCRIPTION || ''

// Function to extract base64 image data from HTML content
export async function processTipTapBase64Images(activityId: number, htmlContent: string): Promise<string> {
    const regex = /<img.*?src="(data:image\/(?:jpeg|png|gif|jpg);base64,([^">]+))"/g;

    let updatedHtmlContent = htmlContent;
    let match;
    let i = 0;
    while ((match = regex.exec(htmlContent)) !== null) {
        const base64Data = match[1].split(",")[1];
        const time = Date.now();
        const imageName = `activity${activityId}-${time}-img${i}.jpeg`;
        const buffer = Buffer.from(base64Data, 'base64');
        
        try {
            await uploadBufferToBucketStorage(bucketName, imageName, buffer, bucketFolder)
            updatedHtmlContent = updatedHtmlContent.replace(match[1], `{BUCKET_API_URL}/${imageName}`);
        } catch(error) {
            throw new Error(`Failed to upload image ${imageName} to GCP due to ${error}.`);
        }
        i++;
    }

    return updatedHtmlContent;
}