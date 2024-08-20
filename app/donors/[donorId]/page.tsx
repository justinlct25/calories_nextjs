'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import DonorInfoPag from "@/components/donor/DonorInfoPage";
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
            <DonorInfoPag donorInfo={donorInfo} iconUrl={donorIconUrl} bgImgUrl={donorBgImgUrl} />
        </div>
    );
}