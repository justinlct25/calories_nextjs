import ActivityThumbnailBtn from "@/components/activity/ActivityThumbnailBtn";
import { Loading } from "../ui/loading";
import { useState, useEffect } from "react";
import ActivityDates from "./ActivityDates";
import ActivityLocation from "./ActivityLocation";

const ActivitiesSelectionPanel = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/activities`)
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}

      {activities.length > 0 && (
        <div className="flex flex-wrap px-20 py-12 justify-center">
          {activities.map((activity, i) => {
            if (activity.thumbnail)
              return (
                <div
                  key={activity?.id}
                  className="flex flex-col items-center justify-start max-w-64 mb-8"
                >
                  <div>
                    <ActivityThumbnailBtn activityInfo={activity} />
                  </div>
                  <p className="break-words w-full text-center px-2 font-bold">
                    {activity?.name}
                  </p>
                  <p className="pt-2">
                    {new Date(activity?.startAt).toLocaleDateString()} -{" "}
                    {new Date(activity?.endAt).toLocaleDateString()}
                  </p>
                  <p>{activity?.location}</p>
                </div>
              );
          })}
        </div>
      )}
    </>
  );
};

export default ActivitiesSelectionPanel;
