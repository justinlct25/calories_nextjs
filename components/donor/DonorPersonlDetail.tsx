import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"


interface DonorPersonalDetailProps {
    open: boolean;
    onClose: () => void; 
    donorInfo: any;

}

const DonorPersonalDetail: React.FC<DonorPersonalDetailProps> = ({ open, onClose, donorInfo }) => {
    const { data: session, status } = useSession();

    const handleClose = () => {
        onClose(); 
    };

    return (
        <div>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                    <div className="bg-[#252628] p-10 rounded-lg relative">
                        <button onClick={handleClose} className="absolute top-0 right-0 m-2 text-black text-2xl">
                            X
                        </button>
                        <div>
                            {/* {JSON.stringify(donorInfo)} */}
                            {JSON.stringify(session)}
                            <div>Username: {donorInfo?.name}</div>
                            <div>First Name: {donorInfo?.firstname ? donorInfo?.firstname : "-"}</div>
                            <div>Last Name: {donorInfo?.lastname ? donorInfo?.lastname : "-"}</div>
                            <div>E-mail: {donorInfo?.email}</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DonorPersonalDetail;