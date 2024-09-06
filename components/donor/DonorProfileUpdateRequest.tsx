"use client"

import React from "react";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DonorProfileUpdateRequestProps {
    open: boolean;
    onClose: () => void; 
    activityId: number;
    donorId: number;
    fieldsRequiredUpdated: String[]
}

const DonorProfileUpdateRequest: React.FC<DonorProfileUpdateRequestProps> = ({ open, onClose, activityId, donorId, fieldsRequiredUpdated }) => {

    const router = useRouter();

    const handleClose = () => {
        onClose(); 
    };

    const handleUpdateClick = () => {
        router.push(`/donors/${donorId}/edit?activityId=${activityId}`);
    }

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>Please update your donor profile before participate the activity</div>
                        <div>Missing required information: {fieldsRequiredUpdated.join(', ')}. </div>
                        <div>
                            <Button variant='secondary' onClick={handleUpdateClick}>Update</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default DonorProfileUpdateRequest;