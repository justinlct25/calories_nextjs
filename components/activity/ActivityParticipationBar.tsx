"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { donorsToActivities } from '@/drizzle/schemas/donors-to-activities.schema';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { useUserStore } from "@/app/stores/user-store-provider";
import DonorProfileUpdateRequestDialog from '../donor/DonorProfileUpdateRequestDialog';
import ActivityParticipateConfirmDialog from './ActivityParticipateConfirmDialog';
import { Loading } from '../ui/loading';

const REQUIRED_DONOR_INFORMATION = ['firstname', 'lastname', 'phone', 'birth', 'weight'];


interface ActivityParticipationBarProps {
    activityId: number;
}

const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({ activityId }) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
    const [participation, setParticipation] = useState<typeof donorsToActivities.$inferInsert | null>();
    const [isDonorProfileUpdateRequestDialogOpen, setIsDonorProfileUpdateRequestDialogOpen] = useState(false);
    const [isActivityParticipateConfirmDialogOpen, setIsActivityParticipateConfirmDialogOpen] = useState(false);
    const [fieldsRequiredUpdated, setFieldsRequiredUpdated] = useState<String[]>([]);

    const { user } = useUserStore(
        (state) => state,
    )

    const fetchParticipantInfo = async () => {
        if (session && user && Object.keys(user).length !== 0) {
          try {
            const res = await fetch(`/api/activities/${activityId}/participants/${user.donor.id}`);
            const data = await res.json();
            setParticipation(data.participation);
            setNumOfParticipants(data.numOfParticipants);
          } catch (error) {
            console.error('Error fetching participant info:', error);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("no session");
          setLoading(false);
        }
      };

      useEffect(() => {
        // Only fetch participant info when the session status is "authenticated"
        if (status === 'authenticated' && user && Object.keys(user).length !== 0) {
            fetchParticipantInfo();
        } else if (status === 'unauthenticated') {
            setLoading(false);
        }
    }, [status, user]);
    

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
                setIsDonorProfileUpdateRequestDialogOpen(true);
            } else {
                setIsActivityParticipateConfirmDialogOpen(true);
            }
        } else {
            router.push(`/sign-in?activityId=${activityId}`);
        }
    };

    const handleQuit = async () => {
        if (session) {
            setLoading(true);
            try {
                const res = await fetch(`/api/activities/${activityId}/participants/${user.donor.id}`, {
                  method: 'DELETE',
                });
                const data = await res.json();
                if (data.success) {
                  setParticipation(null);
                  fetchParticipantInfo();
                }
              } catch (error) {
                console.error('Error quitting activity:', error);
              } finally {
                setLoading(false);
              }
        }
    }
    

    return (
        <div>
            {user.donor && (
                <>
                    <DonorProfileUpdateRequestDialog
                        open={isDonorProfileUpdateRequestDialogOpen}
                        onClose={() => setIsDonorProfileUpdateRequestDialogOpen(false)}
                        activityId={activityId}
                        donorId={user.donor.id}
                        fieldsRequiredUpdated={fieldsRequiredUpdated}
                    />
                    <ActivityParticipateConfirmDialog
                        open={isActivityParticipateConfirmDialogOpen}
                        onClose={() => setIsActivityParticipateConfirmDialogOpen(false)}
                        activityId={activityId}
                        donorInfo={user.donor}
                        updateParticipantInfo={fetchParticipantInfo}
                        setLoading={setLoading}
                    />
                </>
            )}
            <div
                className='fixed bottom-0 w-full h-24 bg-blend-darken bg-black bg-opacity-90 flex justify-center items-center'
                style={{
                    clipPath: 'polygon(100% 100%, 100% 0, 85% 0, 75% 45%, 0 45%, 0% 100%)'
                }}
            >
                <div className="w-5/6 flex justify-center items-end pt-10">
                {!loading &&
                    <div className='flex '>
                        <User />
                        {numOfParticipants}
                    </div>
                }
                </div>
                <div className="w-1/6 flex justify-center">
                    {loading ? (
                        <Loading hasText={false} hasHeight={false} />
                    ) : (
                        <>
                            <Button>Share</Button>
                            {participation !== null && participation !== undefined ? (
                                <Button variant='destructive' onClick={handleQuit}>Quit</Button>
                            ) : (
                                <Button variant='secondary' onClick={handleJoin}>Join</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityParticipationBar;
