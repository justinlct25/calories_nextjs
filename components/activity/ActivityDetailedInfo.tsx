"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls } from '@/utils/loadBucket/loadBucketUrls';

const ActivityDetailedInfo = ({ activityId }: any) => {
    const router = useRouter();
    const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
    const [descriptionHTML, setDescriptionHTML] = useState({ __html: "" })
    useEffect(() => {
        fetch(`/api/activities/${activityId}`)
        .then((res) => res.json())
        .then(async (data) => {
            // setLoading(false)
            if (data.activity) {
                setActivityInfo(data.activity);
                setThumbnailUrl(await loadActivityThumbnailUrl(data.activity.thumbnail));
                const HTMLwithBucketImgUrls: string = await loadActivityDescriptionHTMLImgUrls(data.activity.description);
                setDescriptionHTML({__html: HTMLwithBucketImgUrls})
            }
            else router.push("/activities")
        })
  }, [])
    

    return (
        <div>
            {JSON.stringify(activityInfo)}
            <img src={thumbnailUrl} alt="" />
            <div>{activityInfo?.name}</div>
            <div dangerouslySetInnerHTML={descriptionHTML} />
            {/* <div>{activityInfo?.description}</div> */}
        </div>
    );
};

export default ActivityDetailedInfo;
