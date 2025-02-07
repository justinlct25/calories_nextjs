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
    <div className="cursor-pointer activity m-1 rounded-lg bg-cover bg-center h-24 w-full max-w-96 mx-auto bg-black bg-opacity-60 p-2 text-sm flex items-center justify-center"
        onClick={handleParticipantClick}
    >
        <div className="w-[50%] flex items-center justify-center">
            <div className="w-[50%]">Level: 0</div>
            <div className="rounded-full h-16 w-16 bg-cover bg-center" 
                style={{ backgroundImage: `url('${iconUrl}')` }}
            ></div>
        </div>
        <div className="w-[50%] text-lg ml-4">{donorInfo.username}</div>
    </div>
);
}

export default ActivityParticipant;