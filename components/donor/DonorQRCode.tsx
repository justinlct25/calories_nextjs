import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                    <div className="bg-white p-10 rounded-lg relative">
                        <button onClick={handleClose} className="absolute top-0 right-0 m-2 text-black text-2xl">
                            X
                        </button>
                        <div>
                            <QRCode
                                size={256}
                                className="w-full h-auto max-w-full"
                                value={value}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DonorQRCode;