
import ActivityBriefInfo from "@/components/activity/ActivityBriefInfo";
import { useState, useEffect } from "react";

const ActivitiesSelectionPanel = () => {
    const [activities, setActivities] = useState<any[]>([]);
    useEffect(() => {
        fetch(`/api/activities`)
        .then((res) => res.json())
        .then((data) => {
            setActivities(data.activities);
        })
    }, [])


    return (
        <div className="flex flex-wrap">
            {activities.map((activity) => {
                if (activity.thumbnail) return <ActivityBriefInfo key={activity?.id} activityInfo={activity} />
            })}
        </div>
        )
} 

export default ActivitiesSelectionPanel;