import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import EditBtn from "../util/EditBtn";
import ModalDialog from "../ModalDialog";


interface DonorPersonalDetailProps {
    open: boolean;
    onClose: () => void; 
    user: any
}

const DonorPersonalDetail: React.FC<DonorPersonalDetailProps> = ({ open, onClose, user }) => {

    const handleClose = () => {
        onClose(); 
    };

    return (
        <div>
            {open && user && (
                <ModalDialog open={open} onClose={handleClose}>
                    <div >
                        <div className="mt-4">
                            <EditBtn isNavbarPad={true} absolute={true} editUrl={`/donors/${user.donor?.id}/edit`} />
                            <h2 className="text-2xl font-bold mb-2">Donor Details</h2>
                            <p>Username: {user.donor?.username}</p>
                            <p>First Name: {user.donor?.firstname || "-"}</p>
                            <p>Last Name: {user.donor?.lastname || "-"}</p>
                            <p>Icon: {user.donor?.icon}</p>
                            <p>Background: {user.donor?.background}</p>
                            <p>Phone: {user.donor?.phone || "-"}</p>
                            <p>Birth: {user.donor?.birth || "-"}</p>
                            <p>Weight: {user.donor?.weight || "-"}</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-2">Account Details</h2>
                            <p>E-mail: {user?.email}</p>
                            <p>Created At: {user?.donor.createdAt}</p>
                            {user?.isAdmin? <p>IsAdmin: {user?.isAdmin.toString()}</p>: null}
                        </div>
                    </div>
                </ModalDialog>
            )}

        </div>
    );
};

export default DonorPersonalDetail;