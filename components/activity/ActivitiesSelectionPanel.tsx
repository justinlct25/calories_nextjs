import ActivityThumbnailBtn from "@/components/activity/ActivityThumbnailBtn";
import { Loading } from "../ui/loading";
import { useState, useEffect } from "react";
import ActivitiesStatusFilterSelection, { statusFilterMapping } from "./ActivitiesStatusFilterSelection";

interface ActivitiesSelectionPanelProps {
  isAdmin: boolean;
}

const ActivitiesSelectionPanel: React.FC<ActivitiesSelectionPanelProps> = ({isAdmin}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<keyof typeof statusFilterMapping>('all');

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
    if (statusFilter === 'all') {
      setFilteredActivities(activities);
    } else {
      const statuses = statusFilter ? statusFilterMapping[statusFilter] || [] : [];
      setFilteredActivities(activities.filter(activity => statuses.includes(activity.status.name)));
    }
  }, [statusFilter, activities]);

  return (
    <div className="max-w-screen-xl mx-auto">
      {loading && <Loading />}

      <div className="flex justify-center py-4">
        <ActivitiesStatusFilterSelection
          value={statusFilter}
          setValueState={setStatusFilter}
        />
      </div>

      {filteredActivities.length > 0 && (
        <div className='flex flex-wrap px-20 py-4 justify-center'>
          {filteredActivities.map((activity) => {
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