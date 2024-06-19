'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { donors } from "@/drizzle/schemas/donors.schema";
import GoBack from "@/components/util/GoBack";

export default function UserInfoPage() {
    const { data: session, status } = useSession();
    const [donorInfo, setDonorInfo] = useState(typeof donors.$inferInsert);
    
    useEffect(() => {
        if (session) {
        fetch(`/api/donors/${session?.user.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.donor) {
                    console.log(JSON.stringify(data))
                    setDonorInfo(data.donor.activities[0]);
                }
            });
        }
    }, [session]);
    
    return (
        <div>
            <GoBack isNavbarPad={true} />
            <div>
                <div className="w-full aspect-[4]"></div> {/* padding from top */}
                <h1>User Info</h1>
                <pre>{JSON.stringify(donorInfo, null, 2)}</pre>
            </div>
        </div>
    );
}