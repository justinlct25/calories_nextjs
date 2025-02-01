import { getActivityByName, updateActivity, updateActivityStatus } from "@/drizzle/queries/activities.query";
import { insertActivity } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import * as z from 'zod';
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/drizzle/queries/auth-users.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { processTipTapBase64Images } from "@/utils/uploadBucket/tiptapImageHelper";
import { uploadBufferToBucketStorage } from "@/utils/uploadBucket/uploadBucketStorage";
import { getActivityStatusByName } from "@/drizzle/queries/activity-status.query";
import { ACTIVITY_STATUS_NAMES } from "@/utils/constants";




const activityCreateFormSchema = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number().optional(),
    price: z.string().optional(),
    online: z.boolean().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
})

const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
const bucketFolderThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL || ''
const bucketFolderBackground = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_BACKGROUND || ''


export async function POST(req: Request) {
    try {
        try {
            const session = await auth();
            if (!session?.user.id || !session?.user.email){
                console.log("invalid session")
                return NextResponse.json({message: "Invalid session."}, {status: 409})
            }
            if (await isAdminRole(session?.user.id)) {
                const formData = await req.formData();
                const activityName = String(formData.get('name'));
                if (activityName && await getActivityByName(activityName)) {
                    console.log("Activity with this name already exists");
                    return NextResponse.json({message: "Activity with this name already exists"}, {status: 409})
                }
                const existingUser = await getUserByEmail(session?.user.email)
                let activityDetails: any = {
                    creatorId: existingUser?.admin!.id,
                    name: activityName,
                    startAt: new Date(String(formData.get("startAt"))),
                    endAt: new Date(String(formData.get("endAt"))), 
                }
                if (formData.get("quota")) activityDetails = { ...activityDetails, quota: Number(formData.get("quota")) }
                if (formData.get("price")) activityDetails = { ...activityDetails, price: String(formData.get("price")) }
                if (formData.get("location")) activityDetails = { ...activityDetails, location: String(formData.get("location")) }
                if (formData.get("address")) activityDetails = { ...activityDetails, address: String(formData.get("address")) }
                const newActivity = await insertActivity(activityDetails)
                let activityUpdateObj = {}
                const thumbnailFile = await formData.get('thumbnail') as File;
                if (thumbnailFile instanceof File) {
                    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
                    const fileName = `activity${newActivity.id}-${Date.now()}-${thumbnailFile.name}`
                    await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderThumbnail)
                    activityUpdateObj = {...activityUpdateObj, thumbnail: fileName}
                }
                const backgroundFile = await formData.get('background') as File;
                if (backgroundFile instanceof File) {
                    const buffer = Buffer.from(await backgroundFile.arrayBuffer());
                    const fileName = `activity${newActivity.id}-${Date.now()}-${backgroundFile.name}`
                    await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderBackground)
                    activityUpdateObj = {...activityUpdateObj, background: fileName}
                }

                const description = String(formData.get('description'));
                if (description) {  
                    const descriptionWithUploadedImgLinks = await processTipTapBase64Images(newActivity.id, description);
                    activityUpdateObj = {...activityUpdateObj, description: descriptionWithUploadedImgLinks}
                }
                
                await updateActivity(newActivity.id, activityUpdateObj);

                const pendingStatusId = (await getActivityStatusByName(ACTIVITY_STATUS_NAMES.PENDING));
                if (pendingStatusId) {
                    await updateActivityStatus(newActivity.id, pendingStatusId.id);
                }

                return NextResponse.json(
                    {activityId: newActivity.id, message: "Activity created successfully"}, 
                    {status: 201}
                )
            } else {
                return NextResponse.json(
                    { message: "User not an admin"},
                    { status: 409 }
                )
            }
        } catch (error) {
            console.error(`Error parsing user schema: `, error);
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

    