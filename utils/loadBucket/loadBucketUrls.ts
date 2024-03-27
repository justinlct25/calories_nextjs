'use server'


const bucketApiUrl = process.env.BUCKET_API_URL || "";
const bucketName = process.env.BUCKET_STORAGE_IMAGES;
const bucketFolderActivityThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL;
const bucketFolderActivityDescription = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_DESCRIPTION


export const loadActivityThumbnailUrl = async (thumbnailFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderActivityThumbnail + "/" + thumbnailFileName;
}

export const loadActivityDescriptionHTMLImgUrls = async (contentHTML: string) => {
    const regex = /<img.*?src="({BUCKET_API_URL}\/([^">]+))"/g;
    let match;
    while ((match = regex.exec(contentHTML)) !== null) {
        const [fullMatch, imageUrl] = match;
        const replacedImageUrl = imageUrl.replace('{BUCKET_API_URL}', `${bucketApiUrl}/${bucketName}/${bucketFolderActivityDescription}`);
        contentHTML = contentHTML.replace(imageUrl, replacedImageUrl);
    }
    return contentHTML;
}