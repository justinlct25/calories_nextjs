"use client";

import { useRouter } from "next/navigation";


const ActivityBriefInfo = ({activityInfo} : any) => {
    const router = useRouter();
    const handleActivityClick = () => {
        router.push(`/activities/${activityInfo.id}`);
    };
    

    return (
        <div onClick={handleActivityClick} style={{ cursor: 'pointer' }}>
            {JSON.stringify(activityInfo)}
            <div>{activityInfo?.name}</div>
            <div>{activityInfo?.description}</div>
        </div>
    );
};

export default ActivityBriefInfo;
