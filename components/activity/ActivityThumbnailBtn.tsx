"use client";

import { capitalizeFirstLetter } from "@/utils/helperFunc";
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { EarthLockIcon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { ACTIVITY_STATUS_NAMES } from "@/utils/constants";

interface ActivityThumbnailBtnProps {
    activityInfo: any;
}

const ActivityThumbnailBtn: React.FC<ActivityThumbnailBtnProps> = ({activityInfo} : any) => {
    const router = useRouter();
    const { data: session } = useSession();
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

    const getStatusColor = () => {
        if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.UPCOMING) {
            if (session) {
                if (activityInfo.participated) {
                    return "bg-blue-800/70";
                } else {
                    return "bg-green-900/70"; 
                }
            } else {
                return "bg-yellow-900/70";
            }
        } else if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.COMPLETED) {
            if (activityInfo.participated) {
                return "bg-purple-800/70";
            } else {
                return "bg-gray-900/70";
            }
        }
        if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.PENDING) return "bg-neutral-900/70";
        return "bg-neutral-900/90";
    };

    const getStatusText = () => {
        let statusText = activityInfo.status.name;
        if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.UPCOMING) {
            if (session) {
                if (activityInfo.participated) {
                    statusText = "joined";
                } else {
                    statusText = "enroll";
                }
            } else {
                statusText = ACTIVITY_STATUS_NAMES.UPCOMING;
            }
        } else if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.COMPLETED) {
            if (activityInfo.participated) {
                statusText = ACTIVITY_STATUS_NAMES.COMPLETED;
            } else {
                statusText = "ended";
            }
        }
        return capitalizeFirstLetter(statusText);
    };

    const getBorderColor = () => {
        if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.UPCOMING) {
            if (session) {
                if (activityInfo.participated) {
                    return "border-blue-800/70";
                } else {
                    return "border-green-900/70"; 
                }
            } else {
                return "border-yellow-900/70";
            }
        } else if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.COMPLETED) {
            if (activityInfo.participated) {
                return "border-purple-800/70";
            } else {
                return "border-gray-900/70";
            }
        }
        if (activityInfo.status.name === ACTIVITY_STATUS_NAMES.PENDING) return "border-neutral-900/70";
        return "border-neutral-900/90";
    };

    return (
        <div className="m-4">
            {thumbnailUrl && (
                <div className={`rounded-lg ${getBorderColor()} border-4`}>
                    <div
                        className={`bg-cover bg-center cursor-pointer h-60 w-60 rounded-lg bg-blend-darken hover:bg-neutral-700/90 relative`}
                        style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                        onClick={handleActivityClick}
                    >
                        {(!activityInfo.public || activityInfo.closed) && (
                            <div className="absolute top-0 right-0 bg-black/60 p-1 rounded-lg flex space-x-2">
                                {!activityInfo.public && (
                                    <EarthLockIcon className="text-white" />
                                )}
                                {activityInfo.closed && (
                                    <LockIcon className="text-white" />
                                )}
                            </div>
                        )}
                        <div className={`absolute w-full justify-center bottom-0 left-0 ${getStatusColor()} p-0.2 rounded-b-lg flex space-x-1 text-gray-200`}>
                            {activityInfo.status && (
                                <>{getStatusText()}</>
                            )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-center m-4">
                            {activityInfo.name}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityThumbnailBtn;