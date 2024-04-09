'use client';

import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls } from '@/utils/loadBucket/loadBucketUrls';
import ActivityDetailedInfo from '@/components/activity/ActivityDetailedInfo';
import { useState, useEffect } from 'react';
import ActivityParticipationBar from '@/components/activity/ActivityParticipationBar';


export default function ActivityInfoPage() {
  const { activityId } = useParams();
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
    <div className='w-full'>
      {activityInfo && <ActivityDetailedInfo activityInfo={activityInfo} thumbnailUrl={thumbnailUrl} descriptionHTML={descriptionHTML} />}
      {activityInfo && <ActivityParticipationBar thumbnailUrl={thumbnailUrl} />}
    </div>
      
  );
}