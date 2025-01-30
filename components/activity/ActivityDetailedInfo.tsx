"use client";

import { activities } from "@/drizzle/schemas/activities.schema"
import GoBack from '../util/GoBack';
import ActivityDates from './ActivityDates';
import ActivityTimes from './ActivityTimes';
import EditBtn from '../util/EditBtn';
import ActivityLocation from './ActivityLocation';
import { InfoIcon, TableIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityParticipantList from "./ActivityParticipantList";
import ActivityParticipantTable from "./ActivityParticipantTable";
import TopPadding from "../TopPadding";
import ActivityPublicToggleButton from "./ActivityPublicToggleButton";
import ActivityClosedToggleButton from "./ActivityOpenedToggleButton";
import ActivityStatusSelection from "./ActivityStatusSelection";
import { Loading } from "../ui/loading";
import ActivityDateTime from "./ActivtyDateTime";
import BottomPadding from "../BottomPadding";

interface ActivityDetailedInfoProps {
    activityInfo: typeof activities.$inferInsert;
    thumbnailUrl: string;
    backgroundUrl: string;
    descriptionHTML: { __html: string };
    participants: any;
    isAdmin: boolean | undefined;
    activityStatus: string;
    setActivityStatus: React.Dispatch<React.SetStateAction<string>>;
    activityClosed: boolean;
    setActivityClosed: React.Dispatch<React.SetStateAction<boolean>>;
}


const ActivityDetailedInfo: React.FC<ActivityDetailedInfoProps> = ({ activityInfo, thumbnailUrl, backgroundUrl, descriptionHTML, participants, isAdmin, activityStatus, setActivityStatus, activityClosed, setActivityClosed }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<'info' | 'rank' | 'list' | 'table'>('info');
    const [isActivityPublic, setIsActivityPublic] = useState<boolean>(false);
    const [activityAllStatuses, setActivityAllStatuses] = useState<any[]>([]);

    const setIsActivityOpened: React.Dispatch<React.SetStateAction<boolean>> = () => {
        setActivityClosed(prevState => !prevState);
    }

    useEffect(() => {
        fetch(`/api/activities/statuses`)
        .then((res) => res.json())
        .then(async (data) => {
            if (data) {
                setActivityAllStatuses(data);
            }
        })
    }, [])

    useEffect(() => {
        setIsActivityPublic(activityInfo?.public ? activityInfo?.public : false);
        setActivityClosed(activityInfo?.closed ? activityInfo?.closed : false);
        setLoading(false);
    }, [activityInfo]);

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} backDirectory='parent' />
                {
                    isAdmin && 
                    <div className="absolute top-0 right-10 z-[100] flex flex-col items-end">
                        <TopPadding />
                        <div className='flex space-x-5'>
                            <EditBtn editUrl={`/activities/${activityInfo?.id}/edit`} />
                            <ActivityPublicToggleButton isPublic={isActivityPublic} setIsPublic={setIsActivityPublic} activityId={activityInfo?.id} />
                        </div>
                        <ActivityClosedToggleButton isOpened={!activityClosed} setIsOpened={setIsActivityOpened} activityId={activityInfo?.id} />
                    </div>
                }
                <div className="relative w-full aspect-[8/2]  justify-center items-center  pl-10 pr-10">
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center z-[-1] bg-blend-darken bg-black bg-opacity-60"
                            style={{
                                backgroundImage: `url(${backgroundUrl})`,
                                clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                            }}
                        >
                            {!backgroundUrl && <Loading hasHeight={false} hasText={false} />}
                        </div>
                    <div className="flex flex-row justify-center items-center pt-20">
                        <div className="mr-6 w-1/6 aspect-[1] rounded-xl">
                            {!thumbnailUrl ? <Loading hasHeight={false} hasText={false} /> :
                                <img src={thumbnailUrl} alt="Thumbnail" className="mr-6 rounded-xl w-full h-full object-cover" />
                            }
                        </div>
                        <div>
                            <ActivityStatusSelection isAdmin={isAdmin?isAdmin:false} options={activityAllStatuses} value={activityStatus} setValueState={setActivityStatus}
                                updateFunc = {async (id?: number) => {
                                        const url = `/api/activities/${activityInfo?.id}/status/${id ? id : activityInfo?.status?.id}`
                                        const res = await fetch(url, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                        });
                                        return res;
                                    }} />
                            <div className="text-4xl min-w-[40%]">{activityInfo?.name}</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center mt-10">
                        <div className="bg-black w-full aspect-[12/1] z-[-10] flex flex-row justify-around items-center rounded-md">
                            <div className="w-3/5 flex flex-row justify-around items-center">
                                {loading ? <Loading /> : <>
                                    {/* <ActivityDates startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} /> */}
                                    <ActivityDateTime className="w-1/5" startAt={(new Date(activityInfo?.startAt)).toISOString()} endAt={(new Date(activityInfo?.endAt)).toISOString()} />
                                    <ActivityLocation className="w-4/5" location={activityInfo?.location} address={activityInfo?.address} />
                                    {/* <ActivityTimes startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} /> */}
                                </>}
                            </div>
                        </div>
                    </div>  
                </div>
            
                
            <div className="w-full flex flex-col items-center">
                <div className="flex justify-center items-center w-full p-6 max-w-3/5 space-x-20">
                    <button onClick={() => setView('info')} className={view === 'info' ? '' : 'text-gray-400'} >
                        <InfoIcon size={32} />
                    </button>
                    <button onClick={() => setView('list')} className={view === 'list' ? '' : 'text-gray-400'}>
                        <UsersIcon size={32} />
                    </button>
                    { isAdmin && (
                        <button onClick={() => setView('table')} className={view === 'table' ? '' : 'text-gray-400'}>
                            <TableIcon size={32} />
                        </button>
                    )}
                </div>
                {
                         view === 'info' ? (
                            <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                                {/* <div className="text-4xl">活動詳情 Event Details</div> */}
                                {descriptionHTML.__html == "" ? <Loading /> :
                                    <div className="mt-4" dangerouslySetInnerHTML={descriptionHTML} />
                                }
                            </div>
                        ) : view === 'list' ? (
                            <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                                {/* <h2 className="text-4xl">Participated Donors</h2> */}
                                <ActivityParticipantList participants={participants} />
                            </div>
                        ) : (
                            isAdmin && (
                                <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                                    {/* <h2 className="text-4xl">Participated Donors</h2> */}
                                    {/* <>{JSON.stringify(participants)}</> */}
                                    <ActivityParticipantTable data={participants} />
                                </div>
                            )
                        )
                }
            </div>
            <BottomPadding />
        </div>
    );
};

export default ActivityDetailedInfo;
