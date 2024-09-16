"use client";

import { activities } from "@/drizzle/schemas/activities.schema"
import GoBack from '../util/GoBack';
import ActivityDates from './ActivityDates';
import ActivityTimes from './ActivityTimes';
import EditBtn from '../util/EditBtn';
import ActivityLocation from './ActivityLocation';
import { InfoIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityParticipantList from "./ActivityParticipantList";
import ActivityParticipantTable from "./ActivityParticipantTable";
import ToggleBtn from "../util/ToggleBtn";
import TopPadding from "../TopPadding";
import ActivityPublicToggleButton from "./ActivityPublicToggleButton";

interface ActivityDetailedInfoProps {
    activityInfo: typeof activities.$inferInsert;
    thumbnailUrl: string;
    backgroundUrl: string;
    descriptionHTML: { __html: string };
    participants: any;
    isAdmin: boolean | undefined;
}


const ActivityDetailedInfo: React.FC<ActivityDetailedInfoProps> = ({ activityInfo, thumbnailUrl, backgroundUrl, descriptionHTML, participants, isAdmin }) => {
    const [view, setView] = useState<'info' | 'rank' | 'list'>('info');
    const [isActivityPublic, setIsActivityPublic] = useState<boolean>(false);

    useEffect(() => {
        setIsActivityPublic(activityInfo?.public ? activityInfo?.public : false);
    }, [activityInfo]);

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} backDirectory='parent' />
            {
                isAdmin && 
                // <div className="mt-24 ml-24">
                // <div className="absolute top-0 right-0">
                <div className="absolute top-0 right-10 z-[100]">
                    <TopPadding />
                    <div className='flex space-x-5'>
                        <EditBtn editUrl={`/activities/${activityInfo?.id}/edit`} />
                        <ActivityPublicToggleButton isPublic={isActivityPublic} setIsPublic={setIsActivityPublic} activityId={activityInfo?.id} />
                    </div>
                </div>
            }
            <div
                style={{
                    backgroundImage: `url("${backgroundUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center pb-10 pl-10 pr-10"
            >
                {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" className="mr-6 w-1/6 aspect-[1] rounded-xl" />}
                <div className="text-4xl min-w-[40%]">{activityInfo?.name}</div>
            </div>
            <div className=" w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4]"></div> {/* padding from top */}
                <div className="bg-black w-9/12 aspect-[5.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-around items-center rounded-md">
                    <ActivityDates startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} />
                    <ActivityLocation location={activityInfo?.location} address={activityInfo?.address} />
                    <ActivityTimes startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} />
                </div>
                <div className="w-full aspect-[7]"></div> {/* padding from bottom */}
                <div className="flex justify-center items-center w-full p-6 max-w-3/5 space-x-20">
                <button onClick={() => setView('info')} className={view === 'info' ? '' : 'text-gray-400'} >
                    <InfoIcon size={32} />
                </button>
                {/* <button onClick={() => setView('rank')}></button> */}
                <button onClick={() => setView('list')} className={view === 'list' ? '' : 'text-gray-400'}>
                    <UsersIcon size={32} />
                </button>
                </div>
                { view === 'info' ? (
                    <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                        <div className="text-4xl">活動詳情 Event Details</div>
                        {JSON.stringify(activityInfo)}
                        <div className="mt-4" dangerouslySetInnerHTML={descriptionHTML} />
                    </div>
                ) : view === 'rank' ? (
                    <div>
                        {/* rank */}
                    </div>
                ) : (
                    
                    <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                        <h2 className="text-4xl">Participated Donors</h2>
                        {/* <ActivityParticipantList participants={participants} /> */}
                        <ActivityParticipantTable data={participants} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityDetailedInfo;
