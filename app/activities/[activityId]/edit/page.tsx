'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageUnderNavbarWrapper from "@/components/PageUnderNavbarWrapper";
import GoBack from "@/components/util/GoBack";
import IsSignedIn from "@/components/util/IsSignedIn"; 
import ActivityEditForm, { activityEditForm } from "@/components/forms/ActivityEditForm";
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls, loadActivityBackgroundUrl } from '@/utils/loadBucket/loadBucketUrls';
import * as z from "zod"





export default function ActivityEditPage() {
    const { activityId } = useParams();
    const router = useRouter();
    // const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
    const [activityInfo, setActivityInfo] = useState<z.infer<typeof activityEditForm>>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
    const [backgroundUrl, setBackgroundUrl] = useState<string>("")
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
                setBackgroundUrl(await loadActivityBackgroundUrl(data.activity.background));
            }
            else router.push("/activities")
        })
    }, [])


    return (
        <PageUnderNavbarWrapper>
            <IsSignedIn adminCheck={true} />
            <GoBack isNavbarPad={false} backDirectory="parent"/>  
            {activityInfo && <ActivityEditForm activityId={Number(activityId)} activity={activityInfo} thumbnailUrl={thumbnailUrl} backgroundUrl={backgroundUrl} description={descriptionHTML} />}
        </PageUnderNavbarWrapper>
    )
} 

