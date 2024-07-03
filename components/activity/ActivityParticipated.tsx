import React, { useEffect, useState } from 'react';
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";

interface ActivityParticipatedProps {
    name: string;
    startAt: string;
    endAt: string;
    location: string;
    address: string;
    background?: string;
}

const ActivityParticipated: React.FC<ActivityParticipatedProps> = ({ name, startAt, endAt, location, address, background }) => {
    const [backgroundUrl, setThumbnailUrl] = useState<string>('');

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(background ?? '');
        setThumbnailUrl(url);
    }

    useEffect(() => {
        fetchThumbnail();
    }, []);

    return (
        <div className="activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl" style={{ backgroundImage: `url('${backgroundUrl}')` }}>
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