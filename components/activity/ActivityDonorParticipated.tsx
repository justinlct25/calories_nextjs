"use client";


import React, { useEffect, useState } from 'react';
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';

interface ActivityDonorParticipatedProps {
    activityId: number;
    name: string;
    startAt: string;
    endAt: string;
    location: string;
    address: string;
    background?: string;
}

const ActivityDonorParticipated: React.FC<ActivityDonorParticipatedProps> = ({ activityId, name, startAt, endAt, location, address, background }) => {
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

    const getDateString = (startAt: string, endAt: string): string => {
        const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
        const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
        let formattedDate = '';
        if (startAtDate === format(new Date(), 'yyyy-MM-dd')) {
            formattedDate = 'Today';
        } else if (startAtDate === endAtDate) {
            formattedDate = startAtDate;
        } else {
            formattedDate = `${startAtDate} - ${endAtDate}`;
        }
        return formattedDate;
    }

    const getTimeString = (startAt: string, endAt: string): string => {
        const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
        const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
        const formattedStartAt = format(new Date(startAt), 'HH:mm');
        const formattedEndAt = format(new Date(endAt), 'HH:mm');
        if (startAtDate == endAtDate) return `Time: ${formattedStartAt} - ${formattedEndAt}`;
        return `Start at: ${formattedStartAt}`;
    }


    return (
        <div className="cursor-pointer activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
            onClick={handleActivityClick}
        >
            <div className="bg-black bg-opacity-60 p-4 text-sm h-full flex flex-col justify-between rounded-lg hover:bg-neutral-700/90">
                {/* <div>
                    <p className="text-white mt-2">{formattedStartAt} - {formattedEndAt}</p>
                    </div> */}
                <div className="text-white mt-2">
                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                    <p>Date: {getDateString(startAt, endAt)}</p>
                    <p>{getTimeString(startAt, endAt)}</p>
                    <p>Location: {location}</p>
                    {/* <p>Address: {address}</p> */}
                </div>
            </div>
        </div>
    );
};

export default ActivityDonorParticipated;