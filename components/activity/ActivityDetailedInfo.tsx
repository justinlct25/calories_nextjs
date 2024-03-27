"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { activities } from "@/drizzle/schemas/activities.schema"



const ActivityDetailedInfo = ({ activityId }: any) => {
    const router = useRouter();
    const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
    useEffect(() => {
        fetch(`/api/activities/${activityId}`)
        .then((res) => res.json())
        .then((data) => {
            // setLoading(false)
            if (data.activity) setActivityInfo(data.activity)
            else router.push("/activities")
        })
  }, [])
    

    return (
        <div>
            {JSON.stringify(activityInfo)}
            <div>{activityInfo?.name}</div>
            <div>{activityInfo?.description}</div>
        </div>
    );
};

export default ActivityDetailedInfo;
