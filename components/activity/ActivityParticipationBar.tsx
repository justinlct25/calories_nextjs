"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { donorsToActivities } from '@/drizzle/schemas/donors-to-activities.schema';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { useUserStore } from "@/app/stores/user-store-provider";
import DonorProfileUpdateRequest from '../donor/DonorProfileUpdateRequest';
import ActivityParticipateConfirm from './ActivityParticipateConfirm';

const REQUIRED_DONOR_INFORMATION = ['firstname', 'lastname', 'phone', 'birth', 'weight'];


interface ActivityParticipationBarProps {
    activityId: number;
}

const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({ activityId }) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
    const [participation, setParticipation] = useState<typeof donorsToActivities.$inferInsert | null>();
    const [isDonorProfileUpdateRequestOpen, setIsDonorProfileUpdateRequestOpen] = useState(false);
    const [isActivityParticipateConfirmOpen, setIsActivityParticipateConfirmOpen] = useState(false);
    const [fieldsRequiredUpdated, setFieldsRequiredUpdated] = useState<String[]>([]);

    const { user } = useUserStore(
        (state) => state,
    )

    const fetchParticipantInfo = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            fetch(`/api/activities/${activityId}/participants/${user.donor.id}`)
            .then((res) => res.json())
            .then((data) => {
                setParticipation(data.participation)
                setNumOfParticipants(data.numOfParticipants)
            });
        } else {
            console.log("no session")
        }
    }

    useEffect(() => {
        fetchParticipantInfo();
    }, [session, user])

    const getFieldsRequiredUpdated = () => {
        const fieldsRequiredUpdated: String[] = [];
        REQUIRED_DONOR_INFORMATION.forEach((field) => {
            if (!user.donor[field]) {
                fieldsRequiredUpdated.push(field);
            }
        });
        return fieldsRequiredUpdated;
    }

    const handleJoin = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            if (!user.donor.firstname || !user.donor.lastname || !user.donor.phone || !user.donor.birth || !user.donor.weight) {
                const fields = getFieldsRequiredUpdated();
                setFieldsRequiredUpdated(fields);
                setIsDonorProfileUpdateRequestOpen(true);
            } else {
                setIsActivityParticipateConfirmOpen(true);
            }
        } else {
            router.push(`/sign-in?activityId=${activityId}`);
        }
    };

    const handleQuit = async () => {
        if (session) {
            fetch(`/api/activities/${activityId}/participants/${user.donor.id}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setParticipation(null);
                    fetchParticipantInfo();
                }
            });
        }
    }
    

    return (
        <div>
            {user.donor && <>
                <DonorProfileUpdateRequest open={isDonorProfileUpdateRequestOpen} onClose={() => setIsDonorProfileUpdateRequestOpen(false)} activityId={activityId} donorId={user.donor.id} fieldsRequiredUpdated={fieldsRequiredUpdated} />
                <ActivityParticipateConfirm open={isActivityParticipateConfirmOpen} onClose={() => setIsActivityParticipateConfirmOpen(false)} activityId={activityId} donorInfo={user.donor} updateParticipantInfo={fetchParticipantInfo} />
            </>}
            <div
                className='fixed bottom-0 w-full h-24 bg-blend-darken bg-black bg-opacity-90 flex justify-center items-center'
                style={{
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
                            <Button variant='secondary' onClick={handleJoin}>Join</Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ActivityParticipationBar;
