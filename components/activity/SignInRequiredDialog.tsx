"use client"

import React from "react";
import ModalDialog from "../ModalDialog";
import { Button } from "../ui/button";

interface SignInRequiredDialogProps {
    open: boolean;
    onClose: () => void;
    confirmFunc: () => void;
    operation?: string;
}

const SignInRequiredDialog: React.FC<SignInRequiredDialogProps> = ({ open, onClose, confirmFunc, operation }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>{`You have to sign in first ${ operation && 'to ' + operation + "."}`}</div>
                        {/* <div>Once you quit, you will no longer be a participant in this activity.</div> */}
                        <div className="flex space-x-4">
                            <Button variant='secondary' onClick={() => {
                                    onClose();
                                    confirmFunc();
                                }}>Sign In</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            )}
        </div>
    );
};

export default SignInRequiredDialog;