import ActivityThumbnailBtn from "@/components/activity/ActivityThumbnailBtn";
import { Loading } from "../ui/loading";
import { useState, useEffect } from "react";

const ActivitiesSelectionPanel = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
      fetch(`/api/activities`)
      .then((res) => res.json())
      .then((data) => {
          setActivities(data.activities);
          setLoading(false);
      })
  }, [])

  return (
    <>
      {loading && <Loading />}

      {activities.length > 0 && (
        <div className='flex flex-wrap px-20 py-12'>
          {activities.map((activity) => {
            if (activity.thumbnail)
              return (
                <ActivityThumbnailBtn
                  key={activity?.id}
                  activityInfo={activity}
                />
              );
          })}
        </div>
      )}
    </>
  );
};

export default ActivitiesSelectionPanel;
