import ActivityThumbnailBtn from "@/components/activity/ActivityThumbnailBtn";
import { Loading } from "../ui/loading";
import { useState, useEffect } from "react";

interface ActivitiesSelectionPanelProps {
  isAdmin: boolean;
}

const ActivitiesSelectionPanel: React.FC<ActivitiesSelectionPanelProps> = ({isAdmin}) => {
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
    <div className="max-w-screen-xl mx-auto">
      {loading && <Loading />}

      {activities.length > 0 && (
        <div className='flex flex-wrap px-20 py-4'>
          {activities.map((activity) => {
            // console.log('activity', activity)
            if (!(!isAdmin && !activity.public) && activity.thumbnail) {
              return (
                <ActivityThumbnailBtn
                  key={activity?.id}
                  activityInfo={activity}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ActivitiesSelectionPanel;
