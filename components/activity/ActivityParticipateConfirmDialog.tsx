"use client"

import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditBtn from "../util/EditBtn";


interface ActivityParticipateConfirmDialogProps {
    open: boolean;
    onClose: () => void; 
    activityId: number;
    donorInfo: any;
    updateParticipantInfo: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivityParticipateConfirmDialog: React.FC<ActivityParticipateConfirmDialogProps> = ({ open, onClose, activityId, donorInfo, updateParticipantInfo, setLoading }) => {
    const router = useRouter();
    const { data: session, status } = useSession()

    const { user } = useUserStore(
        (state: any) => state,
      )

    const handleJoin = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            setLoading(true);
            onClose();
            fetch(`/api/activities/${activityId}/participants/${donorInfo.id}`, {
                method: 'POST',
            })
            .then((res) => res.json())
            .then(async (data) => {
                await updateParticipantInfo();
                setLoading(false);
            })
        } else {
            router.push(`/sign-in?activityId=${activityId}`);
        }
    };

    const handleClose = () => {
        onClose(); 
    };


    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>Are you sure to use these information to participate: </div>
                        {/* <div className="text-left "> */}
                        <div className="bg-white bg-opacity-20 p-4 rounded relative w-4/5">
                            <div>Firstname: {donorInfo.firstname}</div>
                            <div>Lastname: {donorInfo.lastname}</div>
                            <div>Phone: {donorInfo.phone}</div>
                            <div>Weight: {donorInfo.weight} kg</div>
                            <div>Birth: {(donorInfo.birth).split("T")[0]}</div>
                            <EditBtn isNavbarPad={false} bottom={true} absolute={true} editUrl={`/donors/${user.donor?.id}/edit?activityId=${activityId}`} />
                        </div>
                        <div>Once you are participated, the participant information for this activity can not be changed. </div>
                        <div className="flex space-x-4">
                            <Button variant='secondary' onClick={handleJoin}>Join</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default ActivityParticipateConfirmDialog;