'use client';


import { useParams, useRouter } from 'next/navigation';
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls, loadActivityBackgroundUrl } from '@/utils/loadBucket/loadBucketUrls';
import ActivityDetailedInfo from '@/components/activity/ActivityDetailedInfo';
import { useState, useEffect } from 'react';
import ActivityParticipationBar from '@/components/activity/ActivityParticipationBar';
import { useUserStore } from '@/app/stores/user-store-provider';


export default function ActivityInfoPage() {
  // const { data: session, status } = useSession();
  const { activityId } = useParams();
  const router = useRouter();
  const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
  const [backgroundUrl, setBackgroundUrl] = useState<string>("")
  const [descriptionHTML, setDescriptionHTML] = useState({ __html: "" })
  const [participants, setParticipants] = useState<any[]>([]);

  const { user } = useUserStore(
    (state: any) => state,
  )


  useEffect(() => {
    fetch(`/api/activities/${activityId}`)
    .then((res) => res.json())
    .then(async (data) => {
        // setLoading(false)
        if (data.activity) {
            setActivityInfo(data.activity);
            setThumbnailUrl(await loadActivityThumbnailUrl(data.activity.thumbnail));
            setBackgroundUrl(await loadActivityBackgroundUrl(data.activity.background));
            const HTMLwithBucketImgUrls: string = await loadActivityDescriptionHTMLImgUrls(data.activity.description);
            setDescriptionHTML({__html: HTMLwithBucketImgUrls})
        }
        else router.push("/activities")
    })
    fetch(`/api/activities/${activityId}/participants`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.participants) {
        setParticipants(data.participants);
      }
    })
}, [])

  return (
        <div className='w-full'>
          {activityInfo && <ActivityDetailedInfo activityInfo={activityInfo} thumbnailUrl={thumbnailUrl} backgroundUrl={backgroundUrl} descriptionHTML={descriptionHTML} participants={participants} isAdmin={user.isAdmin} />}
          {(activityInfo) && <ActivityParticipationBar activityId={Number(activityId)} />}
        </div>
      
  );
}