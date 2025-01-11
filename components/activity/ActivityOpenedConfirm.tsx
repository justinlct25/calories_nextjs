"use client"

import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ActivityOpenedConfirmProps {
    open: boolean;
    onClose: () => void; 
    activityId: number;
    confirmSetOpened: (activityId: number) => void;
}

const ActivityOpenedConfirm: React.FC<ActivityOpenedConfirmProps> = ({ open, onClose, activityId, confirmSetOpened }) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const { user } = useUserStore((state: any) => state);

    const handleOpen = async () => {
        if (session && user && Object.keys(user).length !== 0) {
            onClose();
            await confirmSetOpened(activityId);
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
                        <div>Are you sure you want to open this activity for applications?</div>
                        <div>You can close it again after it is set to open.</div>
                        <div className="flex space-x-4">
                            <Button variant='secondary' onClick={handleOpen}>Open Activity</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}
        </div>
    );
};

export default ActivityOpenedConfirm;