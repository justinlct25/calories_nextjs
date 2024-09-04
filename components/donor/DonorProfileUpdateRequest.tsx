"use client"

import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DonorProfileUpdateRequestProps {
    open: boolean;
    onClose: () => void; 
    activityId: number;
    fieldsRequiredUpdated: String[]
}

const DonorProfileUpdateRequest: React.FC<DonorProfileUpdateRequestProps> = ({ open, onClose, activityId, fieldsRequiredUpdated }) => {

    const router = useRouter();

    const { user } = useUserStore(
        (state: any) => state,
      )

    const handleClose = () => {
        onClose(); 
    };

    const handleUpdateClick = () => {
        router.push(`/donors/${user.donor.id}/edit?activityId=${activityId}`);
    }

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>Please update your donor profile before participate the activity</div>
                        <div>Missing required information: {fieldsRequiredUpdated.join(', ')}. </div>
                        <div>
                            <Button variant='secondary' onClick={() => {handleUpdateClick}}>Update</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default DonorProfileUpdateRequest;