'use server'


const bucketApiUrl = process.env.BUCKET_API_URL || "";
const bucketName = process.env.BUCKET_STORAGE_IMAGES;
const bucketFolderDonorIcon = process.env.BUCKET_STORAGE_FOLDER_DONOR_ICON;
const bucketFolderDonorBgImg = process.env.BUCKET_STORAGE_FOLDER_DONOR_BG_IMG;
const bucketFolderActivityThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL;
const bucketFolderActivityBackground = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_BACKGROUND;
const bucketFolderActivityDescription = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_DESCRIPTION


export const loadActivityThumbnailUrl = async (thumbnailFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderActivityThumbnail + "/" + thumbnailFileName;
}

export const loadActivityBackgroundUrl = async (backgroundFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderActivityBackground + "/" + backgroundFileName;
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

export const loadDonorIconUrl = async (iconFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderDonorIcon + "/" + iconFileName;
}

export const loadDonorBgImgUrl = async (bgImgFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderDonorBgImg + "/" + bgImgFileName;
}