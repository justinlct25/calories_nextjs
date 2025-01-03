"use client"

import React from "react";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";

interface ActivityQuitConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    confirmFunc: () => void;
}

const ActivityQuitConfirmDialog: React.FC<ActivityQuitConfirmDialogProps> = ({ open, onClose, confirmFunc }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>Are you sure you want to quit this activity?</div>
                        {/* <div>Once you quit, you will no longer be a participant in this activity.</div> */}
                        <div className="flex space-x-4">
                            <Button variant='destructive' onClick={() => {
                                    onClose();
                                    confirmFunc();
                                }}>Quit</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}
        </div>
    );
};

export default ActivityQuitConfirmDialog;