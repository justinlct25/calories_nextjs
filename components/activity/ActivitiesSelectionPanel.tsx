import ActivityThumbnailBtn from "@/components/activity/ActivityThumbnailBtn";
import { Loading } from "../ui/loading";
import { useState, useEffect } from "react";
import ActivitiesStatusFilterSelection from "./ActivitiesStatusFilterSelection";
import { ACTIVITY_FILTER_STATUS_MAPPING, ACTIVITY_FILTER_STATUSES } from "@/utils/constants";

interface ActivitiesSelectionPanelProps {
  isAdmin: boolean;
}

const ActivitiesSelectionPanel: React.FC<ActivitiesSelectionPanelProps> = ({isAdmin}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<keyof typeof ACTIVITY_FILTER_STATUS_MAPPING>('ALL');

  useEffect(() => {
      fetch(`/api/activities`)
      .then((res) => res.json())
      .then((data) => {
          setActivities(data.activities);
          setFilteredActivities(data.activities);
          setLoading(false);
      })
  }, [])

  useEffect(() => {
      const statuses = ACTIVITY_FILTER_STATUS_MAPPING[statusFilter];
      setFilteredActivities(activities.filter(activity => statuses.includes(activity.status.name)));
  }, [statusFilter, activities]);

  return (
    <div className="max-w-screen-xl mx-auto">

      <div className="flex justify-center py-4">
        <ActivitiesStatusFilterSelection
          value={statusFilter}
          setValueState={setStatusFilter}
          />
      </div>
          
      {loading && <Loading />}

      {filteredActivities.length > 0 && (
        <div className='flex flex-wrap px-20 py-4 justify-center'>
          {filteredActivities.map((activity) => {
            console.log(activity)
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