import { getAllActivities, getActivityByName, updateActivityStatus } from "../queries/activities.query";
import { getActivityStatusByName } from "../queries/activity-status.query";

async function setAllActivityStatusAsPending() {
    const pendingStatus = await getActivityStatusByName("pending");
    if (!pendingStatus) return;
    const pendingStatusId = pendingStatus.id;
    const allActivities = await getAllActivities();
    // console.log(allActivities)
    for (const activity of allActivities) {
        if (!activity.statusId) {
            const response = await updateActivityStatus(activity.id, pendingStatusId);
            console.log(response)
        }
    }
    process.exit();
}

// setAllActivityStatusAsPending();