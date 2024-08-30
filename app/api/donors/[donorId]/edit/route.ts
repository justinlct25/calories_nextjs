import { getDonor, getDonorByName, getDonorByUserId, updateDonor } from "@/drizzle/queries/donors.query";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadBufferToBucketStorage } from "@/utils/uploadBucket/uploadBucketStorage";


const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
const bucketFolderIcon = process.env.BUCKET_STORAGE_FOLDER_DONOR_ICON || ''
const bucketFolderBackground = process.env.BUCKET_STORAGE_FOLDER_DONOR_BACKGROUND || ''

export async function POST(req: Request, {params}: any) {
    try {
        const session = await auth();
        const donorId = params.donorId;
        if (!session?.user.id || !session?.user.email){
            console.log("invalid session")
            return NextResponse.json({message: "Invalid session."}, {status: 409})
        }
        const userDonor = await getDonorByUserId(session?.user.id);
        if (!userDonor) {
            console.log("Donor not found")
            return NextResponse.json({message: "Donor not found."}, {status: 404})
        }
        if (userDonor.id !== Number(donorId)) {
            console.log("Target donor profile does not belongs to the user")
            return NextResponse.json({message: "Target donor profile does not belongs to the user."}, {status: 404})
        }
        const formData = await req.formData();
        const donorName = String(formData.get('name'));
        const existingDonor = await getDonorByName(donorName);
        if (existingDonor) {
            console.log("Donor name already exists")
            return NextResponse.json({message: "Donor name already exists."}, {status: 409})
        }
        let donorUpdateObj: any = {
            name: donorName,
        }
        if (formData.get("firstname")) donorUpdateObj = { ...donorUpdateObj, firstname: String(formData.get("firstname")) }
        if (formData.get("lastname")) donorUpdateObj = { ...donorUpdateObj, lastname: String(formData.get("lastname")) }
        if (formData.get("phone")) donorUpdateObj = { ...donorUpdateObj, phone: String(formData.get("phone")) }
        if (formData.get("weight")) donorUpdateObj = { ...donorUpdateObj, weight: Number(formData.get("weight")) }
        if (formData.get("birth")) donorUpdateObj = { ...donorUpdateObj, birth: new Date(String(formData.get("birth")))}
        const iconFile = await formData.get('icon') as File;
        if (iconFile instanceof File) {
            const buffer = Buffer.from(await iconFile.arrayBuffer());
            const fileName = `donor${donorId}-${Date.now()}-${iconFile.name}`
            if (fileName !== userDonor.icon) {
                await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderIcon)
                donorUpdateObj = {...donorUpdateObj, icon: fileName}
            }
        }
        const backgroundFile = await formData.get('background') as File;
        if (backgroundFile instanceof File) {
            const buffer = Buffer.from(await backgroundFile.arrayBuffer());
            const fileName = `donor${donorId}-${Date.now()}-${backgroundFile.name}`
            if (fileName !== userDonor.background) {
                await uploadBufferToBucketStorage(bucketName, fileName, buffer, bucketFolderBackground)
                donorUpdateObj = {...donorUpdateObj, background: fileName}
            }
        }
        await updateDonor(Number(donorId), donorUpdateObj);
        return NextResponse.json({message: "Donor profile updated."}, {status: 200});

    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}