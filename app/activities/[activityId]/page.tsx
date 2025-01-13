'use client';


import { useParams, useRouter } from 'next/navigation';
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls, loadActivityBackgroundUrl } from '@/utils/loadBucket/loadBucketUrls';
import ActivityDetailedInfo from '@/components/activity/ActivityDetailedInfo';
import { useState, useEffect } from 'react';
import ActivityParticipationBar from '@/components/activity/ActivityParticipationBar';
import { useUserStore } from '@/app/stores/user-store-provider';
import { useToast } from '@/components/ui/use-toast';


export default function ActivityInfoPage() {
  const { activityId } = useParams();
  const router = useRouter();
  const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [descriptionHTML, setDescriptionHTML] = useState({ __html: "" });
  const [participants, setParticipants] = useState<any[]>([]);
  const [activityStatus, setActivityStatus] = useState<string>("");
  const [activityClosed, setActivityClosed] = useState<boolean>(false);

  const { user } = useUserStore((state: any) => state);
  const { toast } = useToast();


  useEffect(() => {
    const fetchActivityData = async () => {
      const res = await fetch(`/api/activities/${activityId}`);
      const data = await res.json();
      if (data.activity) {
        if (!data.activity.public && !user.isAdmin) {
          toast({
            title: "Access Denied",
            description: "You do not have permission to view this activity.",
            variant: 'destructive'
          });
          router.push("/activities");
          return;
        }
        setActivityInfo(data.activity);
        setActivityStatus(data.activity.status.name);
        setActivityClosed(data.activity.closed);
        setThumbnailUrl(await loadActivityThumbnailUrl(data.activity.thumbnail));
        setBackgroundUrl(await loadActivityBackgroundUrl(data.activity.background));
        const HTMLwithBucketImgUrls: string = await loadActivityDescriptionHTMLImgUrls(data.activity.description);
        setDescriptionHTML({ __html: HTMLwithBucketImgUrls });
      } else {
        router.push("/activities");
      }
    };

    const fetchParticipantsData = async () => {
      const res = await fetch(`/api/activities/${activityId}/participants`);
      const data = await res.json();
      if (data.participants) {
        setParticipants(data.participants);
      }
    };

    fetchActivityData();
    fetchParticipantsData();
  }, [activityId, user.isAdmin, router]);

  return (
    <div className='w-full'>
      {activityInfo && (
        <>
          <ActivityDetailedInfo
            activityInfo={activityInfo}
            thumbnailUrl={thumbnailUrl}
            backgroundUrl={backgroundUrl}
            descriptionHTML={descriptionHTML}
            participants={participants}
            isAdmin={user.isAdmin}
            activityStatus={activityStatus}
            setActivityStatus={setActivityStatus}
            activityClosed={activityClosed}
            setActivityClosed={setActivityClosed}
          />
          <ActivityParticipationBar
            activityId={Number(activityId)}
            activityStatus={activityStatus}
            setActivityStatus={setActivityStatus}
            activityClosed={activityClosed}
            setActivityClosed={setActivityClosed}
          />
        </>
      )}
    </div>
  );
};