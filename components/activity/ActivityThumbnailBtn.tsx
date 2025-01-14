"use client";

import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { EarthLockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ActivityThumbnailBtnProps {
    activityInfo: any;
}

const ActivityThumbnailBtn: React.FC<ActivityThumbnailBtnProps> = ({activityInfo} : any) => {
    const router = useRouter();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    const handleActivityClick = () => {
        router.push(`/activities/${activityInfo.id}`);
    };

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(activityInfo.thumbnail)
        setThumbnailUrl(url);
    }

    useEffect(() => {
        fetchThumbnail()
    }, [])

    return (
        <div className="m-4 ">
            {thumbnailUrl && (
                <div className="rounded-lg">
                    <div
                        className="bg-cover bg-center cursor-pointer h-60 w-60 rounded-lg bg-blend-darken bg-black/15 hover:bg-black/60 relative"
                        style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                        onClick={handleActivityClick}
                    >
                        {!activityInfo.public && (
                            <div className="absolute top-0 right-0 bg-black/60 p-1 rounded">
                                <EarthLockIcon className="text-white" />
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-center m-4">
                            {activityInfo.name}
                        </div>
                    </div>
                    {/* <div className="backdrop-blur-sm bg-white/30">{activityInfo?.name}</div> */}
                </div>
            )}
        </div>
    );
};

export default ActivityThumbnailBtn;
