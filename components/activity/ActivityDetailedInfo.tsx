"use client";

import { useState, useEffect } from "react";
import { activities } from "@/drizzle/schemas/activities.schema";
import GoBack from '../util/GoBack';
import ActivityDates from './ActivityDates';
import ActivityTimes from './ActivityTimes';
import EditBtn from '../util/EditBtn';
import ActivityLocation from './ActivityLocation';
import { InfoIcon, TableIcon, UsersIcon } from "lucide-react";
import ActivityParticipantList from "./ActivityParticipantList";
import ActivityParticipantTable from "./ActivityParticipantTable";
import TopPadding from "../TopPadding";
import ActivityPublicToggleButton from "./ActivityPublicToggleButton";
import ActivityClosedToggleButton from "./ActivityOpenedToggleButton";
import ActivityStatusSelection from "./ActivityStatusSelection";
import { Loading } from "../ui/loading";
import ActivityDateTime from "./ActivtyDateTime";
import BottomPadding from "../BottomPadding";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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
    navigatedFromDonorId?: string | null;
}

const ActivityDetailedInfo: React.FC<ActivityDetailedInfoProps> = ({ activityInfo, thumbnailUrl, backgroundUrl, descriptionHTML, participants, isAdmin, activityStatus, setActivityStatus, activityClosed, setActivityClosed, navigatedFromDonorId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<'info' | 'rank' | 'list' | 'table'>('info');
    const [isActivityPublic, setIsActivityPublic] = useState<boolean>(false);
    const [activityAllStatuses, setActivityAllStatuses] = useState<any[]>([]);

    const { isAboveXl, isBelowXl } = useBreakpoint("xl");
    const { isAboveMd, isBelowMd } = useBreakpoint("md");
    const { isAboveSm, isBelowSm } = useBreakpoint("sm");

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
            <GoBack isNavbarPad={true} backDirectory={navigatedFromDonorId ? `/donors/${navigatedFromDonorId}` : 'parent'} className="ml-3 sm:ml-10" />
            {isAdmin && (
                <div className="absolute top-0 right-10 z-[100] flex flex-col items-end space-y-2">
                    <TopPadding />
                    <div className='flex space-x-5'>
                        {isAboveMd && <EditBtn editUrl={`/activities/${activityInfo?.id}/edit`} /> }
                        <ActivityPublicToggleButton isPublic={isActivityPublic} setIsPublic={setIsActivityPublic} activityId={activityInfo?.id} />
                    </div>
                    <ActivityClosedToggleButton isOpened={!activityClosed} setIsOpened={setIsActivityOpened} activityId={activityInfo?.id} />
                    {isBelowMd && <EditBtn editUrl={`/activities/${activityInfo?.id}/edit`} />}
                </div>
            )}
            <div className="relative w-full aspect-[8/2] justify-center items-center  xl:pl-10 xl:pr-10">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center z-[-1] bg-blend-darken bg-black bg-opacity-60"
                    style={{
                        backgroundImage: `url(${backgroundUrl})`,
                        clipPath: isAboveXl ? 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)' : "none",
                    }}
                >
                    {!backgroundUrl && <Loading hasHeight={false} hasText={false} />}
                </div>
                <div className="flex flex-col xl:flex-row justify-center items-center pt-20 ">
                    <div className="mr-0 xl:mr-6 w-1/2 xl:w-1/6 aspect-[1] rounded-xl">
                        {!thumbnailUrl ? <Loading hasHeight={false} hasText={false} /> :
                            <img src={thumbnailUrl} alt="Thumbnail" className="rounded-xl w-full h-full object-cover" />
                        }
                    </div>
                    <div className="mt-4 xl:mt-0 text-center xl:text-left">
                        <ActivityStatusSelection isAdmin={isAdmin ? isAdmin : false} options={activityAllStatuses} value={activityStatus} setValueState={setActivityStatus} className="justify-center xl:justify-start"
                            updateFunc={async (id?: number) => {
                                const url = `/api/activities/${activityInfo?.id}/status/${id ? id : activityInfo?.status?.id}`
                                const res = await fetch(url, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                });
                                return res;
                            }} />
                        <div className="text-2xl xl:text-4xl min-w-[40%]">{activityInfo?.name}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center mt-10">
                        <div className="bg-black w-full aspect-[12/1] xl:z-[-10] z-[20] flex flex-row justify-around items-center">
                            <div className="xl:w-3/5 w-full flex flex-col justify-around items-center p-4">
                                {loading ? <Loading /> : <>
                                    {/* <ActivityDates startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} /> */}
                                    <ActivityDateTime className=" pl-4 pr-4 xl:p-0" startAt={(new Date(activityInfo?.startAt)).toISOString()} endAt={(new Date(activityInfo?.endAt)).toISOString()} />
                                    <ActivityLocation className="" location={activityInfo?.location} address={activityInfo?.address} />
                                    {/* <ActivityTimes startAt={activityInfo?.startAt} endAt={activityInfo?.endAt} /> */}
                                </>}
                            </div>
                        </div>
                    </div>  
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="flex justify-center items-center w-full p-6 max-w-3/5 space-x-4 xl:space-x-20">
                    <button onClick={() => setView('info')} className={view === 'info' ? '' : 'text-gray-400'}>
                        <InfoIcon size={32} />
                    </button>
                    <button onClick={() => setView('list')} className={view === 'list' ? '' : 'text-gray-400'}>
                        <UsersIcon size={32} />
                    </button>
                    {isAdmin && (
                        <button onClick={() => setView('table')} className={view === 'table' ? '' : 'text-gray-400'}>
                            <TableIcon size={32} />
                        </button>
                    )}
                </div>
                {view === 'info' ? (
                    <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto pl-6 pr-6">
                        {descriptionHTML.__html === "" ? <Loading /> :
                            <div className="mt-4 leading-loose" dangerouslySetInnerHTML={descriptionHTML} />
                        }
                    </div>
                ) : view === 'list' ? (
                    <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                        <ActivityParticipantList participants={participants} />
                    </div>
                ) : (
                    isAdmin && (
                        <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                            <ActivityParticipantTable data={participants} />
                        </div>
                    )
                )}
            </div>
            <BottomPadding />
        </div>
    );
};

export default ActivityDetailedInfo;