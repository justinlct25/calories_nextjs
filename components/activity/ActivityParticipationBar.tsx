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
import { useToast } from '../ui/use-toast';
import ActivityQuitConfirmDialog from './ActivityQuitConfirmDialog';
import ActivityAbsentConfirmDialog from './ActivityAbsentConfirmDialog';
import { ACTIVITY_STATUS_NAMES } from '@/utils/constants';

const REQUIRED_DONOR_INFORMATION = ['firstname', 'lastname', 'phone', 'birth', 'weight'];

interface ActivityParticipationBarProps {
    activityId: number;
    activityStatus: string;
    activityClosed: boolean;
    updateParticipantsFunc: () => void;
    quota?: number | null;
    attendanceStatus?: string;
}

const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({ activityId, activityStatus, activityClosed, updateParticipantsFunc, quota, attendanceStatus=undefined }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);
    const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
    const [participation, setParticipation] = useState<typeof donorsToActivities.$inferInsert | null>();
    const [isDonorProfileUpdateRequestDialogOpen, setIsDonorProfileUpdateRequestDialogOpen] = useState(false);
    const [isActivityParticipateConfirmDialogOpen, setIsActivityParticipateConfirmDialogOpen] = useState(false);
    const [isActivityAbsentConfirmDialogOpen, setIsActivityAbsentConfirmDialogOpen] = useState(false);
    const [isActivityQuitConfirmDialogOpen, setIsActivityQuitConfirmDialogOpen] = useState(false);
    const [fieldsRequiredUpdated, setFieldsRequiredUpdated] = useState<String[]>([]);

    const { user } = useUserStore((state) => state);


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
    };

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

    const handleJoinConfirm = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            setLoading(true);
            setIsActivityParticipateConfirmDialogOpen(false);
            const res = await fetch(`/api/activities/${activityId}/participants/${user.donor.id}`, {
                method: 'POST',
            });
            const data = await res.json();
            if (data.success) {
                await fetchParticipantInfo();
                toast({
                    title: "Success",
                    description: data.message,
                });
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive'
                });
            }
            await updateParticipantsFunc();
            setLoading(false);
        } else {
            router.push(`/sign-in?activityId=${activityId}`);
        }
    };

    const handleAbsent = async () => {
        setIsActivityAbsentConfirmDialogOpen(true);
    }

    const handleAbsentConfirm = async () => {
        if (session) {
            setLoading(true);
            try {
                const res = await fetch(`/api/activities/${activityId}/participants/${user.donor.id}/absent`, {
                    method: 'POST',
                });
                const data = await res.json();
                if (data.success) {
                    await fetchParticipantInfo();
                    toast({
                        title: "Success",
                        description: data.message,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: data.message,
                        variant: 'destructive'
                    });
                }
            } catch (error) {
                console.error('Error marking absent:', error);
            } finally {
                await fetchParticipantInfo();
                setLoading(false);
            }
        }
    }

    const handleQuit = async () => {
        setIsActivityQuitConfirmDialogOpen(true);
    }

    const handleQuitConfirm = async () => {
        if (session) {
            setLoading(true);
            try {
                const res = await fetch(`/api/activities/${activityId}/participants/${user.donor.id}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (data.success) {
                    await fetchParticipantInfo();
                    toast({
                        title: "Success",
                        description: data.message,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: data.message,
                        variant: 'destructive'
                    });
                }
            } catch (error) {
                console.error('Error quitting activity:', error);
            } finally {
                await fetchParticipantInfo();
                await updateParticipantsFunc();
                setLoading(false);
            }
        }
    };

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
                        confirmFunc={handleJoinConfirm}
                    />
                    <ActivityAbsentConfirmDialog
                        open={isActivityAbsentConfirmDialogOpen}
                        onClose={() => setIsActivityAbsentConfirmDialogOpen(false)}
                        confirmFunc={handleAbsentConfirm}
                    />
                    <ActivityQuitConfirmDialog
                        open={isActivityQuitConfirmDialogOpen}
                        onClose={() => setIsActivityQuitConfirmDialogOpen(false)}
                        confirmFunc={handleQuitConfirm}
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
                    {!loading && (
                        <div className='flex '>
                            <User />
                            {numOfParticipants } {user.isAdmin && quota ? '/ ' + quota : ''} 
                        </div>
                    )}
                </div>
                <div className="w-1/6 flex justify-center">
                    {loading ? (
                        <Loading hasText={false} hasHeight={false} />
                    ) : (
                        <>
                            <Button>Share</Button>
                            {
                                activityStatus === ACTIVITY_STATUS_NAMES.UPCOMING ? (
                                    participation !== null && participation !== undefined ? (
                                        <>
                                            <Button variant='secondary' onClick={handleAbsent}>Absent</Button>
                                            <Button variant='destructive' onClick={handleQuit}>Quit</Button>
                                        </>
                                    ) : (
                                        !activityClosed ? (
                                            <Button variant='secondary' onClick={handleJoin}>Join</Button>
                                        ) : (
                                            <div className="flex items-center justify-center w-28 h-10 text-white text-center ">
                                                Not Opened
                                            </div>
                                        )
                                    )
                                ) : (
                                    activityStatus === ACTIVITY_STATUS_NAMES.COMPLETED ? (
                                        <div className="flex items-center justify-center w-28 h-10 text-white text-center ">
                                            {capitalizeFirstLetter(attendanceStatus ? attendanceStatus : 'processing')}  
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-28 h-10 text-white text-center ">
                                            {capitalizeFirstLetter(activityStatus)}
                                        </div>
                                    )
                                )
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityParticipationBar;

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }