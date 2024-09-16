"use client"

import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditBtn from "../util/EditBtn";


interface ActivityPublicConfirmProps {
    open: boolean;
    onClose: () => void; 
    activityId: number;
    confirmSetPublic: (activityId: number) => void;
}

const ActivityPublicConfirm: React.FC<ActivityPublicConfirmProps> = ({ open, onClose, activityId, confirmSetPublic }) => {
    const router = useRouter();
    const { data: session, status } = useSession()

    const { user } = useUserStore(
        (state: any) => state,
      )

    const handlePublic = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            await confirmSetPublic(activityId);
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
                        <div>Are you sure make this activity public for participating? </div>
                        <div>You could lock it again after it is set to public. </div>
                        <div className="flex space-x-4">
                            <Button variant='secondary' onClick={handlePublic}>Make Public</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default ActivityPublicConfirm;