'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import { loadDonorBgImgUrl, loadDonorIconUrl } from "@/utils/loadBucket/loadBucketUrls";
import GoBack from "@/components/util/GoBack";
import { Bike, BookUser, QrCode, Users } from "lucide-react";
import DonorQRCode from "@/components/donor/DonorQRCode";
import ActivityDonorParticipated from "@/components/activity/ActivityDonorParticipated";
import DonorPersonalDetail from "@/components/donor/DonorPersonlDetail";
import { useUserStore } from "@/app/stores/user-store-provider";
import ActivitiesStatusFilterSelection from "@/components/activity/ActivitiesStatusFilterSelection";
import { ACTIVITY_FILTER_STATUS_MAPPING } from "@/utils/constants";
import { Loading } from "@/components/ui/loading";

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
    const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
    const [statusFilter, setStatusFilter] = useState<keyof typeof ACTIVITY_FILTER_STATUS_MAPPING>('ALL');
    const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
    const [view, setView] = useState<'activities' | 'friends'>('activities');

    
    const { user } = useUserStore((state: any) => state);

    async function loadDonorInfo() {
        try {
            const res = await fetch(`/api/donors/${donorId}`);
            const data = await res.json();
            if (data && data.donor) {
                const sortedActivities = data.donor.activities.sort((a: any, b: any) => a.activity.status.id - b.activity.status.id);
                setDonorInfo(data.donor);
                setFilteredActivities(sortedActivities);
                setLoadingActivities(false);
                setDonorIconUrl(await loadDonorIconUrl(data.donor.icon));
                setDonorBgImgUrl(await loadDonorBgImgUrl(data.donor.background));
            }
        } catch (error) {
            console.error("Failed to load donor info:", error);
        }
    }

    function checkIsDonorProfileOfUser() {
        if (session && user && Object.keys(user).length !== 0 && String(user.donor.id) === String(donorId)) {
            setIsDonorProfileOfUser(true);
        }
    }

    useEffect(() => {
        if (donorId) {
            loadDonorInfo();
        }
    }, [donorId]);

    useEffect(() => {
        checkIsDonorProfileOfUser();
    }, [session, user, donorId]);

    useEffect(() => {
        if (donorInfo) {
            setQRCodeValue(donorInfo.id);
        }
    }, [donorInfo]);

    useEffect(() => {
        if (donorInfo) {
            const statuses = ACTIVITY_FILTER_STATUS_MAPPING[statusFilter];
            setFilteredActivities(donorInfo.activities.filter((activity: any) => statuses.includes(activity.activity.status.name)));
        }
    }, [statusFilter, donorInfo]);

    const handleQRCodeClose = () => {
        setIsQRCodeOpen(false);
    };

    const handlePersonalDetailClose = () => {
        setIsPersonalDetailOpen(false);
    };

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} backDirectory="home" />
            {isDonorProfileOfUser && (
                <button className={`absolute right-40 top-0 transform -translate-y-1/2 ml-5 mr-10 z-10 mt-32`} onClick={() => { setIsPersonalDetailOpen(true) }}>
                    <BookUser size={32} />
                </button>
            )}
            <button className={`absolute right-20 top-0 transform -translate-y-1/2 ml-5 mr-10 z-10 mt-32`} onClick={() => { setIsQRCodeOpen(true) }}>
                <QrCode size={32} />
            </button>
            <div
                style={{
                    backgroundImage: `url("${donorBgImgUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex flex-col justify-center items-center"
            >
                {!donorBgImgUrl && <div className="absolute "><Loading hasHeight={false} hasText={false} /></div>}
                <div>Level {donorInfo?.levels}</div>
                <div className="text-4xl">{donorInfo?.username}</div>
                <div className="h-1/4"></div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[6]"></div> {/* padding from top */}
                <div className="w-1/5 aspect-[1] bg-white bg-opacity-20 z-[10] absolute left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center">
                    <div className="w-9/12 aspect-[1] bg-yellow-500 rounded-full flex items-center justify-center">
                        {!donorIconUrl ? <Loading hasHeight={false} hasText={false} /> :
                            <img src={donorIconUrl} alt="icon" className="object-contain w-full h-full rounded-full" />
                        }
                    </div>
                </div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4]"></div> {/* padding from top */}
                <div className="bg-black w-9/12 aspect-[5.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-between items-center rounded-md">
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pl-20">
                        <div className="text-2xl">Donated<br />Calories</div>
                        <div className="text-4xl">{donorInfo?.calories}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pr-20">
                        <div className="text-2xl">Participated<br />Events</div>
                        <div className="text-4xl">{donorInfo?.activities?.length}</div>
                    </div>
                </div>
                <div className="w-full aspect-[9]"></div>
                <div className="w-full flex flex-col justify-center items-center mx-auto p-10">
                    <DonorQRCode open={isQRCodeOpen} value={qrCodeValue} onClose={handleQRCodeClose} />
                    {isDonorProfileOfUser && (
                        <DonorPersonalDetail open={isPersonalDetailOpen} onClose={handlePersonalDetailClose} user={user} />
                    )}
                    <div className="flex justify-center items-center w-full p-6 max-w-3/5 space-x-20">
                        <button onClick={() => setView('activities')} className={view === 'activities' ? '' : 'text-gray-400'}>
                            <Bike size={32} />
                        </button>
                        <button onClick={() => setView('friends')} className={view === 'friends' ? '' : 'text-gray-400'}>
                            <Users size={32} />
                        </button>
                    </div>

                    <>
                        {view === 'activities' && (
                            <>
                                <h2 className="text-4xl">Activities Record</h2>
                                <div className="flex justify-center py-4">
                                    <ActivitiesStatusFilterSelection
                                        value={statusFilter}
                                        setValueState={setStatusFilter}
                                    />
                                </div>
                                {loadingActivities ? <Loading /> : 
                                    <>
                                        {filteredActivities.length > 0 && (
                                                filteredActivities.map((activity: any) => (
                                                    <ActivityDonorParticipated
                                                        key={activity.activity.id}
                                                        isDonorUser={isDonorProfileOfUser}
                                                        activityId={activity.activity.id}
                                                        name={activity.activity.name}
                                                        startAt={activity.activity.startAt}
                                                        endAt={activity.activity.endAt}
                                                        location={activity.activity.location}
                                                        address={activity.activity.address}
                                                        background={activity.activity.thumbnail}
                                                        activityStatus={activity.activity.status.name}
                                                        attendanceRecord={activity.activity.participants[0].attendanceRecord}
                                                    />
                                                ))
                                        )}
                                    </>}
                            </>
                        )}
                        {view === 'friends' && (
                            <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                            <h2 className="text-4xl">Friends</h2>
                            {/* Add your friends component here */}
                        </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}