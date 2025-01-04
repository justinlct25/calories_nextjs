"use client"

import React from "react";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";

interface ActivityAbsentConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    confirmFunc: () => void;
}

const ActivityAbsentConfirmDialog: React.FC<ActivityAbsentConfirmDialogProps> = ({ open, onClose, confirmFunc }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>Are you sure you want to mark yourself as absent for this activity?</div>
                        <div className="flex space-x-4">
                            <Button variant='secondary' onClick={() => {
                                    onClose();
                                    confirmFunc();
                                }}>Absent</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}
        </div>
    );
};

export default ActivityAbsentConfirmDialog;