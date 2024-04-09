"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls } from '@/utils/loadBucket/loadBucketUrls';
import GoBack from '../GoBack';
import ActivityDates from './ActivityDates';
import ActivityTimes from './ActivityTimes';

interface ActivityDetailedInfoProps {
    activityInfo: typeof activities.$inferInsert;
    thumbnailUrl: string;
    descriptionHTML: { __html: string };
}


const ActivityDetailedInfo: React.FC<ActivityDetailedInfoProps> = ({ activityInfo, thumbnailUrl, descriptionHTML }) => {
    

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} />
            <div
                style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center"
            >
                <div className="text-4xl">{activityInfo?.name}</div>
            </div>
            <div className=" w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4]"></div> {/* padding from top */}
                <div className="bg-black w-9/12 aspect-[5.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-around items-center rounded-md">
                    <ActivityDates startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} />
                    <ActivityTimes startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} />
                </div>
                <div className="w-full aspect-[5]"></div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="text-4xl">活動詳情 Event Details</div>
                    <div className="mt-4" dangerouslySetInnerHTML={descriptionHTML} />
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailedInfo;
