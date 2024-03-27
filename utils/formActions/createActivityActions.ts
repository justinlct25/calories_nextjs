// 'use server';

// import { Storage } from '@google-cloud/storage'
// import { useRouter } from 'next/navigation'
// import { useToast } from '@/components/ui/use-toast'

// const bucketName = process.env.BUCKET_STORAGE_IMAGES || '';
// const bucketFolder = process.env.BUCKET_STORAGE_FOLDER_ACTIVITY_THUMBNAIL || ''
// const storage = new Storage();
// const bucket = storage.bucket(bucketName);

// const router = useRouter();
// const { toast } = useToast();

// export const CreateActivityFormAction = async (form: FormData) => {
//     try {
//         console.log(form)
//         const response = await fetch('/api/activities/create', {
//             method: 'POST',
//             headers: {
//                     'Content-Type': 'application/json'
//                 },
//             body: JSON.stringify(form)
//         })
//         const data = await response.json();
//         if (response.ok) {
//             const createdActivityId = data.activity.id;
//             const thumbnailFile = form.get('thumbnail') as File;
//             if (thumbnailFile) {
//                 const buffer = await thumbnailFile.arrayBuffer();
//                 const fileName = `activity${createdActivityId}-${Date.now()}-${thumbnailFile.name}`
//                 await bucket.file(bucketFolder + "/" + fileName).save(Buffer.from(buffer));
//                 const updateRes = await fetch('/api/activities/update', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         activityId: createdActivityId,
//                         update: {thumbnail: fileName}
//                     })
//                 })
//             }
//             toast({
//                 title: "Success",
//                 description: `${data.message}`,
//                 variant: 'primary'
//             })
//             router.push(`/activities/${data.activity.id}`);
//         } else {
//             toast({
//                 title: "Error",
//                 description: `${data.message}`,
//                 variant: 'destructive'
//             })
//         }

        
//         return true;
//     } catch(error) {
//         console.log(error);
//         return false
//     }
// }