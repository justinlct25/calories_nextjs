'use client';


import { useParams, useRouter } from 'next/navigation';
import { activities } from "@/drizzle/schemas/activities.schema"
import { donors } from "@/drizzle/schemas/donors.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls, loadActivityBackgroundUrl } from '@/utils/loadBucket/loadBucketUrls';
import ActivityDetailedInfo from '@/components/activity/ActivityDetailedInfo';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import ActivityParticipationBar from '@/components/activity/ActivityParticipationBar';



export default function ActivityInfoPage() {
  const { data: session, status } = useSession()
  const { activityId } = useParams();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [donorInfo, setDonorInfo] = useState<typeof donors.$inferInsert>();
  const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
  const [backgroundUrl, setBackgroundUrl] = useState<string>("")
  const [descriptionHTML, setDescriptionHTML] = useState({ __html: "" })

  useEffect(() => {
    if (session) {
      fetch(`/api/admin/${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin));
    }
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
}, [session])

  return (
    <div className='w-full'>
      {activityInfo && <ActivityDetailedInfo activityInfo={activityInfo} thumbnailUrl={thumbnailUrl} backgroundUrl={backgroundUrl} descriptionHTML={descriptionHTML} />}
      {(activityInfo) && <ActivityParticipationBar activityId={Number(activityId)} donorId={Number(donorInfo?.id)} />}
    </div>
      
  );
}