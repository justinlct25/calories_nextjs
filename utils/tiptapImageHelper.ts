import { Storage } from '@google-cloud/storage'
import { html } from 'next-auth/providers';

// Function to extract image URLs from HTML content
function extractImageUrls(htmlContent: string): string[] {
    const regex = /<img.*?src="(.*?)"/g;
    const urls: string[] = [];
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}

async function uploadImageToGCP(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    const buffer = await file.arrayBuffer()
    // const storage = new Storage();
    // const bucketName = process.env.BUCKET_NAME;
    // try {
    //     const uploadedFile = await storage.bucket(bucketName).upload(buffer, {
    //         destination: file.name,
    //         contentType: file.type,
    //     });

    //     // Get the URL of the uploaded image
    //     const uploadedImgUrl = uploadedFile.publicUrl();

    //     return uploadedImgUrl;
    // }
    // return uploadedImgUrl;
    return '';
}

// Function to replace original src attributes with uploaded image URLs
function replaceSrcAttributes(htmlContent: string, imageUrls: string[], uploadedUrls: string[]): string {
    for (let i = 0; i < imageUrls.length; i++) {
        htmlContent = htmlContent.replace(imageUrls[i], uploadedUrls[i]);
    }
    return htmlContent;
}

// Function to handle submit button click
export async function processTiptapImageUrls(htmlContent: string): Promise<string> {
    const imageUrls = extractImageUrls(htmlContent);
    const uploadedUrls: string[] = [];


    // Upload each image to GCP storage and collect the URLs
    for (const imageUrl of imageUrls) {
        const uploadedUrl = await uploadImageToGCP(imageUrl);
        uploadedUrls.push(uploadedUrl);
    }

    const updatedUrlsHtml = replaceSrcAttributes(htmlContent, imageUrls, uploadedUrls);

    // Replace original src attributes with uploaded image URLs
    return updatedUrlsHtml;

}


