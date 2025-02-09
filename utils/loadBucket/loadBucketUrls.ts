'use server'


const bucketApiUrl = process.env.BUCKET_API_URL || "";
const bucketName = process.env.BUCKET_STORAGE_IMAGES;
const bucketFolderDonorIcon = process.env.BUCKET_STORAGE_FOLDER_DONOR_ICON;
const bucketFolderDonorBgImg = process.env.BUCKET_STORAGE_FOLDER_DONOR_BACKGROUND;
const bucketFolderActivityThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL;
const bucketFolderActivityBackground = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_BACKGROUND;
const bucketFolderActivityDescription = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_DESCRIPTION


export const loadActivityThumbnailUrl = async (thumbnailFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderActivityThumbnail + "/" + thumbnailFileName;
}

export const loadActivityBackgroundUrl = async (backgroundFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderActivityBackground + "/" + backgroundFileName;
}

// export const loadActivityDescriptionHTMLImgUrls = async (contentHTML: string) => {
//     const regex = /<img.*?src="({BUCKET_API_URL}\/([^">]+))"/g;
//     let match;
//     while ((match = regex.exec(contentHTML)) !== null) {
//         const [fullMatch, imageUrl] = match;
//         const replacedImageUrl = imageUrl.replace('{BUCKET_API_URL}', `${bucketApiUrl}/${bucketName}/${bucketFolderActivityDescription}`);
//         contentHTML = contentHTML.replace(imageUrl, replacedImageUrl);
//     }
//     return contentHTML;
// }

export const loadActivityDescriptionHTMLImgUrls = async (contentHTML: string, removeStyles = true) => {
    const regex = /<img([^>]+)src="([^">]+)"([^>]*)>/g;
    let match;

    while ((match = regex.exec(contentHTML)) !== null) {
        const [fullMatch, beforeSrc, imageUrl, afterSrc] = match;

        // Process the <img> tag
        const newImgTag = processImgTag(fullMatch, imageUrl, removeStyles);

        // Replace the old <img> tag with the new modified one
        contentHTML = contentHTML.replace(fullMatch, newImgTag);
    }
    return contentHTML;
};

/**
 * Processes an <img> tag by updating its class, src, and optionally removing styles.
 * @param {string} imgTag - The full <img> tag to modify.
 * @param {string} imageUrl - The src URL of the image.
 * @param {boolean} removeStyles - Whether to remove inline styles.
 * @returns {string} - The modified <img> tag.
 */
const processImgTag = (imgTag: string, imageUrl: string, removeStyles: boolean): string => {
    // Replace bucket API URL if needed
    let replacedImageUrl = imageUrl.includes("{BUCKET_API_URL}")
        ? imageUrl.replace('{BUCKET_API_URL}', `${bucketApiUrl}/${bucketName}/${bucketFolderActivityDescription}`)
        : imageUrl;

    let newImgTag;

    // Preserve existing classes and append "responsive-img"
    if (/class="/.test(imgTag)) {
        newImgTag = imgTag.replace(/class="([^"]*)"/, 'class="$1 responsive-img"'); // Append responsive-img
    } else {
        newImgTag = imgTag.replace('<img', '<img class="responsive-img"');
    }

    // Remove inline styles if the parameter is true
    if (removeStyles) newImgTag = newImgTag.replace(/style="[^"]*"/g, '');

    // Replace the src attribute with the correct URL
    newImgTag = newImgTag.replace(imageUrl, replacedImageUrl);

    return newImgTag;
};


export const loadDonorIconUrl = async (iconFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderDonorIcon + "/" + iconFileName;
}

export const loadDonorBgImgUrl = async (bgImgFileName: string) => {
    return bucketApiUrl + "/" + bucketName + "/" + bucketFolderDonorBgImg + "/" + bgImgFileName;
}