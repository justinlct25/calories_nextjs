import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import ModalDialog from "../ModalDialog";

interface DonorQRCodeProps {
    open: boolean;
    value: string;
    onClose: () => void; 

}

const DonorQRCode: React.FC<DonorQRCodeProps> = ({ open, value, onClose }) => {

    const handleClose = () => {
        onClose(); 
    };

    return (
        <div>
            {open && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div>
                        <QRCode
                            size={256}
                            className="w-full h-auto max-w-full"
                            value={value}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default DonorQRCode;