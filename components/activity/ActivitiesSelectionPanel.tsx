
import ActivityBriefInfo from "@/components/activity/ActivityBriefInfo";
import { useState, useEffect } from "react";

const ActivitiesSelectionPanel = () => {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        fetch(`/api/activities`)
        .then((res) => res.json())
        .then((data) => {
            setActivities(data.activities);
            console.log(data.activities)
        })
    }, [])


    return (<div>
            <h2>Activities</h2>
            {activities.map((activity) => {
                return <ActivityBriefInfo activityInfo={activity} />
            })}
        </div>)
} 

export default ActivitiesSelectionPanel;