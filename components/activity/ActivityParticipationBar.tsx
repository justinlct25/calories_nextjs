"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { donorsToActivities } from '@/drizzle/schemas/donors-to-activities.schema';
import { participate } from '@/drizzle/queries/donors-to-activities.query';
import { User } from 'lucide-react';
import { Button } from '../ui/button';


interface ActivityParticipationBarProps {
    activityId: number;
    donorId: number | undefined;
}



const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({ activityId, donorId }) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
    const [participation, setParticipation] = useState<typeof donorsToActivities.$inferInsert | null>();

    const fetchSetParticipantData = async () => {
        if (session) {
            fetch(`/api/activities/${activityId}/participants/${donorId}`)
            .then((res) => res.json())
            .then((data) => {
                setParticipation(data.participation)
                setNumOfParticipants(data.numOfParticipants)
            });
        }
    }
    useEffect(() => {
        fetchSetParticipantData();
    }, [session])

    const handleJoin = async () => {
        if (donorId) {
            fetch(`/api/activities/${activityId}/participants/${donorId}`, {
                method: 'POST',
            })
            .then((res) => res.json())
            .then((data) => {
                setParticipation(data.participation);
                fetchSetParticipantData();
            })
        } else {
            router.push(`/sign-in?activityId=${activityId}`);
        }
    };

    const handleQuit = async () => {
        if (donorId) {
            fetch(`/api/activities/${activityId}/participants/${donorId}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setParticipation(null);
                    fetchSetParticipantData();
                }
            });
        }
    }
    

    return (
        <div
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center'
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-yellow-500 bg-opacity-70 flex justify-center items-center'
            // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-white bg-opacity-70 flex justify-center items-center'
            className='fixed bottom-0 w-full h-24 bg-blend-darken bg-black bg-opacity-90 flex justify-center items-center'
            style={{
                // backgroundImage: `url(${thumbnailUrl})`,
                // backgroundRepeat: 'no-repeat',
                // backgroundSize: 'cover',
                // backgroundPosition: 'bottom',
                clipPath: 'polygon(100% 100%, 100% 0, 85% 0, 75% 45%, 0 45%, 0% 100%)'
            }}
        >
            <div className="w-5/6 flex justify-center items-end pt-10">
                <div className='flex '>
                    <User />
                    {numOfParticipants}
                </div>
            </div>
            <div className="w-1/6 flex justify-center">
                <Button>Share</Button> 
                {
                    (participation !== null && participation !== undefined) ?
                        <Button variant='destructive' onClick={handleQuit}>Quit</Button> : 
                        <Button variant='destructive' onClick={handleJoin}>Join</Button>
                }
            </div>
        </div>
    );
};

export default ActivityParticipationBar;
