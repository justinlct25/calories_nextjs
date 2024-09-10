"use client";


import React, { useEffect, useState } from 'react';
import { loadDonorIconUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";

interface ActivityParticipantProps {
    donorInfo: any;
}

const ActivityParticipant: React.FC<ActivityParticipantProps> = ({ donorInfo }) => {
    const router = useRouter();
    const [iconUrl, setIconUrl] = useState<string>('');

    const fetchIcon = async () => {
        const url = await loadDonorIconUrl(donorInfo.icon ?? '');
        setIconUrl(url);
    }

    const handleParticipantClick = () => {
        router.push(`/donors/${donorInfo?.id}`);
    };

    useEffect(() => {
        fetchIcon();
    }, []);

    return (
        <div className="cursor-pointer activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl"
            onClick={handleParticipantClick}
        >
            <div className=" bg-black bg-opacity-60 p-2 text-sm h-full">
                <div className="flex items-center">
                    <div className="rounded-full h-16 w-16 bg-cover bg-center" 
                        style={{ backgroundImage: `url('${iconUrl}')` }}
                    ></div>
                    <h3 className="text-4xl ml-4">{donorInfo.username}</h3>
                </div>
                <p>Level: 0</p>
            </div>
        </div>
    );
}

export default ActivityParticipant;