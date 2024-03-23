import { Storage } from '@google-cloud/storage';

// Function to extract base64 image data from HTML content
function extractBase64Images(htmlContent: string): string[] {
    const regex = /<img.*?src="data:image\/(?:jpeg|png|gif|jpg);base64,([^">]+)"/g;
    const base64Images: string[] = [];
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
        base64Images.push(match[1]);
    }
    return base64Images;
}

async function uploadBase64ImageToGCP(base64Data: string, imgName: string): Promise<string> {
    const buffer = Buffer.from(base64Data, 'base64');
    const storage = new Storage();
    const bucketName = process.env.BUCKET_STORAGE_NAME_ACTIVITY_DESCRIPTION || '';
    const bucketURL = process.env.BUCKET_STORAGE_URL_ACTIVITY_DESCRIPTION || '';
    
    try {
        await storage.bucket(bucketName).file(imgName).save(buffer);
        return `${bucketURL}/${imgName}`;
    } catch(error) {
        throw new Error(`Failed to upload image ${imgName} to GCP due to ${error}.`);
    }
}

// Function to replace original base64 encoded images with uploaded image paths
function replaceBase64Images(htmlContent: string, base64Images: string[], uploadedUrls: string[]): string {
    console.log("uploadedurls:")
    console.log(uploadedUrls);
    for (let i = 0; i < base64Images.length; i++) {
        htmlContent = htmlContent.replace(`data:image;base64,${base64Images[i]}`, uploadedUrls[i]);
    }
    return htmlContent;
}

// Function to handle processing of HTML content with base64 images
export async function processTipTapBase64Images(activityId: number, htmlContent: string): Promise<string> {
    const base64Images = extractBase64Images(htmlContent);
    const uploadedUrls: string[] = [];
    
    // Upload each base64 image to GCP storage and collect the URLs
    for (let i = 0; i < base64Images.length; i++) {
        const imageName = `activity${activityId}-img${i}.jpeg`;
        const uploadedUrl = await uploadBase64ImageToGCP(base64Images[i], imageName);
        uploadedUrls.push(uploadedUrl);
    }
    
    const updatedHtmlContent = replaceBase64Images(htmlContent, base64Images, uploadedUrls);
    return updatedHtmlContent;
}
