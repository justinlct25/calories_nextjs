'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import DonorDetailedInfo from "@/components/donor/DonorDetailedInfo";
import { loadDonorBgImgUrl, loadDonorIconUrl } from "@/utils/loadBucket/loadBucketUrls";

export default function DonorInfoPage() {
    const { data: session, status } = useSession();
    const { donorId } = useParams();
    const [donorInfo, setDonorInfo] = useState<any>();
    const [donorIconUrl, setDonorIconUrl] = useState<string>("");
    const [donorBgImgUrl, setDonorBgImgUrl] = useState<string>("");
    
    useEffect(() => {
        if (session) {
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
    }, [session]);
    
    return (
        <div className="w-full">
                {/* <div className="w-full aspect-[4]"></div> padding from top */}
                {/* <h1 className="text-4xl">Donor Info</h1>
                <pre>{JSON.stringify(donorInfo, null, 2)}</pre> */}
            <DonorDetailedInfo donorInfo={donorInfo} iconUrl={donorIconUrl} bgImgUrl={donorBgImgUrl} />
            {/* <h2 className="text-4xl">Activities Participated</h2>
            {donorInfo?.activities && donorInfo.activities.map((activity: any, index: number) => (
                <div key={index}>
                    <h3>{activity.activity.name}</h3>
                    <p>Start At: {activity.activity.startAt}</p>
                    <p>End At: {activity.activity.endAt}</p>
                    <p>Location: {activity.activity.location}</p>
                    <p>Address: {activity.activity.address}</p>
                    <hr />
                </div>
            ))} */}
        </div>
    );
}