import React from "react";
import { useUserStore } from "@/app/stores/user-store-provider";
import EditBtn from "../util/EditBtn";


interface DonorPersonalDetailProps {
    open: boolean;
    onClose: () => void; 
}

const DonorPersonalDetail: React.FC<DonorPersonalDetailProps> = ({ open, onClose }) => {

    const { user } = useUserStore(
        (state: any) => state,
      )

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
                        <div >
                            <div className="mt-4">
                                <EditBtn isNavbarPad={true} editUrl={`/donors/${user.donor.id}/edit`} />
                                <h2 className="text-2xl font-bold mb-2">Donor Details</h2>
                                <p>Username: {user.donor?.name}</p>
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
                    </div>
                </div>
            )}

        </div>
    );
};

export default DonorPersonalDetail;