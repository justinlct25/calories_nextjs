'use client'

import { useEffect, useState } from "react";
import DonorEditForm, { donorEditForm } from "@/components/forms/DonorEditForm";
import { useUserStore } from "@/app/stores/user-store-provider";
import * as z from "zod"
import { loadDonorIconUrl, loadDonorBgImgUrl } from "@/utils/loadBucket/loadBucketUrls";
import PageUnderNavbarWrapper from "@/components/PageUnderNavbarWrapper";
import GoBack from "@/components/util/GoBack";
import { useSearchParams } from "next/navigation";



export default function DonorEditPage() {
    const { user } = useUserStore(
        (state: any) => state,
      )
    const params = useSearchParams();

    const [donorInfo, setDonorInfo] = useState<z.infer<typeof donorEditForm>>();
    const [iconUrl, setIconUrl] = useState<string>("")
    const [backgroundUrl, setBackgroundUrl] = useState<string>("")

    async function loadDonorInfo() {
        setDonorInfo(user.donor);
        setIconUrl(await loadDonorIconUrl(user.donor.icon));
        setBackgroundUrl(await loadDonorBgImgUrl(user.donor.background));
    }

    useEffect(() => {
        if (user.donor) {
            loadDonorInfo();
        }
    }, [user])


    return (
        <PageUnderNavbarWrapper>
            <GoBack isNavbarPad={false} backDirectory="parent" />
            <h1>Donor Edit Page</h1>
            {donorInfo && <DonorEditForm donorId={user?.donor.id} donor={donorInfo} iconUrl={iconUrl} backgroundUrl={backgroundUrl} />}
        </PageUnderNavbarWrapper>
    );
}