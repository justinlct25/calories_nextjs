
import ActivityBriefInfo from "@/components/activity/ActivityBriefInfo";
import { useState, useEffect } from "react";

const ActivitiesSelectionPanel = () => {
    const [activities, setActivities] = useState<any[]>([]);
    useEffect(() => {
        fetch(`/api/activities`)
        .then((res) => res.json())
        .then((data) => {
            setActivities(data.activities);
            console.log(data.activities)
        })
    }, [])


    return (<div>
            {activities.map((activity) => {
                return <ActivityBriefInfo key={activity?.id} activityInfo={activity} />
            })}
        </div>)
} 

export default ActivitiesSelectionPanel;