'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
// import DonorInfoPag from "@/components/donor/DonorInfoPage";
import { loadDonorBgImgUrl, loadDonorIconUrl } from "@/utils/loadBucket/loadBucketUrls";
import GoBack from "@/components/util/GoBack";
import { BookUser, QrCode } from "lucide-react";
// import QRCode from "react-qr-code"
import DonorQRCode from "@/components/donor/DonorQRCode";
import ActivityDonorParticipated from "@/components/activity/ActivityDonorParticipated";
import DonorPersonalDetail from "@/components/donor/DonorPersonlDetail";
import { useUserStore } from "@/app/stores/user-store-provider";


export default function DonorInfoPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { donorId } = useParams();
    const [donorInfo, setDonorInfo] = useState<any>();
    const [donorIconUrl, setDonorIconUrl] = useState<string>("");
    const [donorBgImgUrl, setDonorBgImgUrl] = useState<string>("");
    const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
    const [isPersonalDetailOpen, setIsPersonalDetailOpen] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState("");
    const [isDonorProfileOfUser, setIsDonorProfileOfUser] = useState(false);

    const { user } = useUserStore(
        (state: any) => state,
      )
    
    async function loadDonorInfo() {
        fetch(`/api/donors/${donorId}`)
            .then((res) => res.json())
            .then(async (data) => {
                if (data.donor) {
                    setDonorInfo(data.donor);
                    setDonorIconUrl(await loadDonorIconUrl(data.donor.icon));
                    setDonorBgImgUrl(await loadDonorBgImgUrl(data.donor.background));
                }
            });
    }

    function checkIsDonorProfileOfUser() {
        if (session && Object.keys(user).length !== 0 && String(user.donor.id) == String(donorId)) {
            setIsDonorProfileOfUser(true);
        }
    }

    useEffect(() => {
        loadDonorInfo();
        checkIsDonorProfileOfUser();
    } , [session, Object.keys(user).length]);
    
    const handleQRCodeClose = () => {
        setIsQRCodeOpen(false);
    };

    const handlePersonalDetailClose = () => {
        setIsPersonalDetailOpen(false);
    };

    useEffect(() => {
        if (donorInfo) {
            setQRCodeValue(donorInfo.id);
        }
    })

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} backDirectory="home" />
            {isDonorProfileOfUser && (
                <button className={`absolute right-40 top-0 transform -translate-y-1/2 ml-5 mr-10 z-10 mt-32`} onClick={()=>{setIsPersonalDetailOpen(true)}}>
                    <BookUser size={32} />
                </button>
            )}
            <button className={`absolute right-20 top-0 transform -translate-y-1/2 ml-5 mr-10 z-10 mt-32`} onClick={()=>{setIsQRCodeOpen(true)}}>
                <QrCode size={32} />
            </button>
            {/* <EditBtn isNavbarPad={true} editUrl={`/activities`} /> */}
            <div
                style={{
                    backgroundImage: `url("${donorBgImgUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex flex-col justify-center  items-center"
            >
                <div>Level {donorInfo?.levels}</div>
                <div className="text-4xl">{donorInfo?.username}</div>
                <div className="h-1/4"></div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[6]"></div> {/* padding from top */}  
                <div className="w-1/5 aspect-[1] bg-white bg-opacity-20 z-[10] absolute left-1/2  -translate-x-1/2 rounded-full flex items-center justify-center">
                    <div className="w-9/12 aspect-[1] bg-yellow-500 rounded-full flex items-center justify-center">
                        <img src={donorIconUrl} alt="icon" className="object-contain w-full h-full rounded-full" />
                    </div>
                    {/* <i className="fas fa-icon"></i> */}
                </div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4]"></div> {/* padding from top */}  
                <div className="bg-black w-9/12 aspect-[5.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-between items-center rounded-md">
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pl-20">
                        <div className="text-2xl">Donated<br />Calories</div>
                        <div className="text-4xl">{donorInfo?.calories}</div>
                    </div>
                    {/* <div className="flex-grow"></div> */}
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pr-20">
                        <div className="text-2xl">Participated<br />Events</div>
                        <div className="text-4xl">{donorInfo?.activities?.length}</div>
                    </div>
                </div>
                <div className="w-full aspect-[5]"></div>
                <div className="w-full flex flex-col justify-center items-center mx-auto p-10">
                {/* <EditBtn isNavbarPad={true} editUrl={`/activities`} /> */}
                <DonorQRCode open={isQRCodeOpen} value={qrCodeValue} onClose={handleQRCodeClose} />
                {isDonorProfileOfUser && (
                    <DonorPersonalDetail open={isPersonalDetailOpen} onClose={handlePersonalDetailClose} user={user} />
                )}
                <h2 className="text-4xl">Activities Participated</h2>
                {donorInfo?.activities && donorInfo.activities.map((activity: any, index: number) => (
                    <ActivityDonorParticipated activityId={activity.activity.id} name={activity.activity.name} startAt={activity.activity.startAt} endAt={activity.activity.endAt} location={activity.activity.location} address={activity.activity.address} background={activity.activity.thumbnail} />
                ))}
                </div>
            </div>
        </div>
    );
}