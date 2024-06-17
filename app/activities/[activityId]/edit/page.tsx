'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WrapperWithBack from "@/components/WrapperWithBack";
import GoBack from "@/components/util/GoBack";
import IsSignedIn from "@/components/util/IsSignedIn"; 
import ActivityEditForm, { activityEditForm } from "@/components/forms/ActivityEditForm";
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls } from '@/utils/loadBucket/loadBucketUrls';
import { activities } from "@/drizzle/schemas/activities.schema"
import * as z from "zod"





export default function ActivityEditPage() {
    const { activityId } = useParams();
    const router = useRouter();
    // const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
    const [activityInfo, setActivityInfo] = useState<z.infer<typeof activityEditForm>>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
    const [descriptionHTML, setDescriptionHTML] = useState<string>("")
    
    useEffect(() => {
        fetch(`/api/activities/${activityId}`)
        .then((res) => res.json())
        .then(async (data) => {
            // setLoading(false)
            if (data.activity) {
                if (data.activity.startAt) {
                    data.activity.startAt = (new Date(data.activity.startAt)).toISOString();
                }
                if (data.activity.endAt) {
                    data.activity.endAt = (new Date(data.activity.endAt)).toISOString();
                }
                const HTMLwithBucketImgUrls: string = await loadActivityDescriptionHTMLImgUrls(data.activity.description);
                console.log("HTMLwithBucketImgUrls: ", HTMLwithBucketImgUrls) 
                if (HTMLwithBucketImgUrls !== "") {
                    setDescriptionHTML(HTMLwithBucketImgUrls)
                } else {
                    setDescriptionHTML(" ");
                }
                setActivityInfo(data.activity);
                setThumbnailUrl(await loadActivityThumbnailUrl(data.activity.thumbnail));
            }
            else router.push("/activities")
        })
    }, [])


    return (
        <WrapperWithBack>
            <IsSignedIn adminCheck={true} />
            <GoBack isNavbarPad={false} />  
            <h2>Edit Activity</h2>
            {activityInfo && <ActivityEditForm activityId={Number(activityId)} activity={activityInfo} thumbnailUrl={thumbnailUrl} description={descriptionHTML} />}
        </WrapperWithBack>
    )
} 

