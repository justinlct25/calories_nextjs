import { getActivityByName, updateActivity } from "@/drizzle/queries/activities.query";
import { insertActivity } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import * as z from 'zod';
import { auth } from "@/lib/auth";
// import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/drizzle/queries/auth-users.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { processTipTapBase64Images } from "@/utils/tiptapImageHelper";
import { redirect } from 'next/navigation';
import { request } from "http";
import { readFileSync } from "fs";
// import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { NextApiRequest } from "next";
const { Storage } = require('@google-cloud/storage');
import multiparty from "multiparty";




const activityCreateFormSchema = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number().optional(),
    price: z.string().optional(),
    description: z.string().optional(),
})

// const upload = multer({ dest: 'uploads/' });
// const readFileAsync = promisify(fs.readFile);
const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
const bucketFolderThumbnail = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL || ''
const storage = new Storage();
const bucket = storage.bucket(bucketName);

export const createWriteStream = (filename: string, contentType?: string) => {
    const ref = bucket.file(filename);
    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    });

    return stream;
};


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
                console.log(formData)
                const quota = formData.get("quota");
                if (quota) activityDetails = { ...activityDetails, quota: Number(quota) }
                const price = formData.get("price");
                if (price) activityDetails = { ...activityDetails, price: String(price) }
                const newActivity = await insertActivity(activityDetails)
                let activityUpdateObj = {}
                const thumbnailFile = await formData.get('thumbnail') as File;
                if (thumbnailFile) {
                    const buffer = await thumbnailFile.arrayBuffer();
                    const fileName = `activity${newActivity.id}-${Date.now()}-${thumbnailFile.name}`
                    await bucket.file(bucketFolderThumbnail + "/" + fileName).save(Buffer.from(buffer));
                    activityUpdateObj = {...activityUpdateObj, thumbnail: fileName}
                }
                const description = String(formData.get('description'));
                if (description) {  
                    const descriptionWithUploadedImgLinks = await processTipTapBase64Images(newActivity.id, description);
                    activityUpdateObj = {...activityUpdateObj, description: descriptionWithUploadedImgLinks}
                }
                await updateActivity(newActivity.id, activityUpdateObj);
                return NextResponse.json(
                    {activity: newActivity, message: "Activity created successfully"}, 
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

    