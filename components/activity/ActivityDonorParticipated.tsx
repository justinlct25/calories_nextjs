"use client";

import React, { useEffect, useState } from 'react';
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";
import { getDateString, getTimeString } from '@/utils/helperFunc';
import { capitalizeFirstLetter, getBorderColor, getStatusColor, getStatusText } from '@/utils/helperFunc';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { ATTENDANCE_STATUS_NAMES } from '@/utils/constants';
import { Loading } from "@/components/ui/loading";

interface ActivityDonorParticipatedProps {
    isDonorUser: boolean;
    activityId: number;
    name: string;
    startAt: string;
    endAt: string;
    location: string;
    address: string;
    background?: string;
    activityStatus: string;
    attendanceRecord: any
}

const ActivityDonorParticipated: React.FC<ActivityDonorParticipatedProps> = ({ isDonorUser, activityId, name, startAt, endAt, location, address, background, activityStatus, attendanceRecord }) => {
    const router = useRouter();
    const [backgroundUrl, setThumbnailUrl] = useState<string>('');
    const [loadingBackground, setLoadingBackground] = useState<boolean>(true);

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(background ?? '');
        setThumbnailUrl(url);
        setLoadingBackground(false);
    }

    const handleActivityClick = () => {
        router.push(`/activities/${activityId}`);
    };

    useEffect(() => {
        fetchThumbnail();
    }, []);    

    const borderColor = getBorderColor(true, activityStatus , true);
    const statusColor = getStatusColor(true, activityStatus, true);

    const getAttendanceDOM = (attendanceRecord: any): JSX.Element => {
        let attendanceString = attendanceRecord.attendanceStatus.name;
        if (attendanceString == ATTENDANCE_STATUS_NAMES.ATTENDED) {
            attendanceString = attendanceRecord.attendanceStatus.calories;
            return (
                <div className="text-white">
                    <div>Record: {attendanceRecord.record} </div>
                    <div>Calories: {attendanceRecord.calories}</div>
                </div>
            )
        }
        return (
            <div className="text-white">{capitalizeFirstLetter(attendanceString)}</div>
        );
    }

    return (
        <div className={`cursor-pointer activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl relative`}
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
            onClick={handleActivityClick}
        >
            {loadingBackground && <Loading hasHeight={false} hasText={false} absolute={true} />}
            <div className={`bg-black bg-opacity-60 p-4 text-sm h-full flex flex-col justify-between rounded-lg hover:bg-neutral-700/90 border-8 ${borderColor}`}>
                <h3 className="text-2xl font-bold text-white">{name}</h3>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-white mt-2 w-1/2">
                        <p className="flex items-center mb-2"><Calendar className="mr-2" /> {getDateString(startAt, endAt)}</p>
                        <p className="flex items-center mb-2"><Clock className="mr-2" /> {getTimeString(startAt, endAt)}</p>
                        <p className="flex items-center mb-2"><MapPin className="mr-2" /> {location}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center w-1/2 justify-end pr-10">
                        <div>{activityStatus && <p className={`text-white p-2 rounded-lg ${statusColor}`}>{capitalizeFirstLetter(activityStatus)}</p>}</div>
                        <div>{attendanceRecord && attendanceRecord.attendanceStatus.name && <p className="text-white">{ getAttendanceDOM(attendanceRecord) }</p>}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDonorParticipated;