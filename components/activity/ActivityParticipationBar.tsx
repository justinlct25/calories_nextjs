"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

interface ActivityParticipationBarProps {
    thumbnailUrl: string;
}


const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({ thumbnailUrl }) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [isParticipate, setActivityInfo] = useState<boolean>(false);
    console.log(thumbnailUrl)
//     useEffect(() => {
//         fetch(`/api/activities/${activityId}`)
//         .then((res) => res.json())
//         .then(async (data) => {
//             // setLoading(false)
            
//         })
//   }, [])
    

    return (
        <div
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center'
            // className='fixed bottom-0 w-full h-20'
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center'
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-yellow-500 bg-opacity-70 flex justify-center items-center'
            className='fixed bottom-0 w-full h-20 bg-blend-darken bg-white bg-opacity-70 flex justify-center items-center'
            // className='fixed bottom-0 w-full h-20 bg-yellow-900 bg-opacity-60 flex'
            style={{
                // backgroundImage: `url(${thumbnailUrl})`,
                // backgroundRepeat: 'no-repeat',
                // backgroundSize: 'cover',
                // backgroundPosition: 'bottom',
                clipPath: 'polygon(100% 100%, 100% 0, 85% 0, 75% 45%, 0 45%, 0% 100%)'
            }}
        >
            Join
        </div>
    );
};

export default ActivityParticipationBar;
