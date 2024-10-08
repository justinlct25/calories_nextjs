import { updateActivity } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getActivityById } from "@/drizzle/queries/activities.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { processTipTapBase64Images } from "@/utils/uploadBucket/tiptapImageHelper";
import { uploadBufferToBucketStorage } from "@/utils/uploadBucket/uploadBucketStorage";



const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
const bucketFolderThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL || ''
const bucketFolderBackground = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_BACKGROUND || ''


export async function POST(req: Request, {params}: any) {
    try {
        try {
            const session = await auth();
            const activityId = params.activityId;
            const targetActivity = await getActivityById(activityId);
            if (!targetActivity) {
                console.log("Activity not found")
                return NextResponse.json({message: "Activity not found."}, {status: 404})
            }
            if (!session?.user.id || !session?.user.email){
                console.log("invalid session")
                return NextResponse.json({message: "Invalid session."}, {status: 409})
            }
            if (await isAdminRole(session?.user.id)) {
                const formData = await req.formData();
                const activityName = String(formData.get('name'));
                // const existingUser = await getUserByEmail(session?.user.email)
                let activityUpdateObj: any = {
                    // creatorId: existingUser?.admin!.id,
                    name: activityName,
                    startAt: new Date(String(formData.get("startAt"))),
                    endAt: new Date(String(formData.get("endAt"))), 
                }
                if (formData.get("quota")) activityUpdateObj = { ...activityUpdateObj, quota: Number(formData.get("quota")) }
                if (formData.get("price")) activityUpdateObj = { ...activityUpdateObj, price: String(formData.get("price")) }
                if (formData.get("location")) activityUpdateObj = { ...activityUpdateObj, location: String(formData.get("location")) }
                if (formData.get("address")) activityUpdateObj = { ...activityUpdateObj, address: String(formData.get("address")) }
                // let activityUpdateObj = {}
                const thumbnailFile = await formData.get('thumbnail') as File;
                if (thumbnailFile instanceof File) {
                    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
                    const fileName = `activity${activityId}-${Date.now()}-${thumbnailFile.name}`
                    if (fileName !== targetActivity.thumbnail) {
                        await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderThumbnail)
                        activityUpdateObj = {...activityUpdateObj, thumbnail: fileName}
                    }
                }
                const backgroundFile = await formData.get('background') as File;
                if (backgroundFile instanceof File) {
                    const buffer = Buffer.from(await backgroundFile.arrayBuffer());
                    const fileName = `activity${activityId}-${Date.now()}-${backgroundFile.name}`
                    if (fileName !== targetActivity.background) {
                        await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderBackground)
                        activityUpdateObj = {...activityUpdateObj, background: fileName}
                    }
                }
                const description = String(formData.get('description'));
                if (description) {  
                    const descriptionWithUploadedImgLinks = await processTipTapBase64Images(targetActivity.id, description);
                    activityUpdateObj = {...activityUpdateObj, description: descriptionWithUploadedImgLinks}
                }
                // console.log("update activity: " + JSON.stringify(activityUpdateObj))
                await updateActivity(targetActivity.id, activityUpdateObj);
                return NextResponse.json(
                    {activityId: targetActivity.id, message: "Activity edited successfully"}, 
                    {status: 201}
                )
            } else {
                return NextResponse.json(
                    { message: "User not an admin"},
                    { status: 409 }
                )
            }
        } catch (error) {
            console.error(`Error: `, error);
            return NextResponse.json(
                { message: "Invalid input data"},
                { status: 400 }
            )
        }
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

    