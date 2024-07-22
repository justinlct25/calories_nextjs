"use client";


import React, { useEffect, useState } from 'react';
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";

interface ActivityParticipatedProps {
    activityId: number;
    name: string;
    startAt: string;
    endAt: string;
    location: string;
    address: string;
    background?: string;
}

const ActivityParticipated: React.FC<ActivityParticipatedProps> = ({ activityId, name, startAt, endAt, location, address, background }) => {
    const router = useRouter();
    const [backgroundUrl, setThumbnailUrl] = useState<string>('');

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(background ?? '');
        setThumbnailUrl(url);
    }

    const handleActivityClick = () => {
        router.push(`/activities/${activityId}`);
    };


    useEffect(() => {
        fetchThumbnail();
    }, []);

    return (
        <div className="cursor-pointer activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
            onClick={handleActivityClick}
        >
            <div className=" bg-black bg-opacity-60 p-2 text-sm h-full">
                <h3 className="text-4xl">{name}</h3>
                <p>Start At: {startAt}</p>
                <p>End At: {endAt}</p>
                <p>Location: {location}</p>
                <p>Address: {address}</p>
            </div>
        </div>
    );
};

export default ActivityParticipated;