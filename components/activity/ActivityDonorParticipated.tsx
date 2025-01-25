"use client";


import React, { useEffect, useState } from 'react';
import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import { capitalizeFirstLetter, getBorderColor, getStatusColor, getStatusText } from '@/utils/helperFunc';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { ATTENDANCE_STATUS_NAMES } from '@/utils/constants';

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

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(background ?? '');
        setThumbnailUrl(url);
    }

    const handleActivityClick = () => {
        router.push(`/activities/${activityId}`);
    };

    useEffect(() => {
        fetchThumbnail();
    }, []);

    const getDateString = (startAt: string, endAt: string): string => {
        const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
        const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
        let formattedDate = '';
        if (startAtDate === format(new Date(), 'yyyy-MM-dd')) {
            formattedDate = 'Today';
        } else if (startAtDate === endAtDate) {
            formattedDate = startAtDate;
        } else {
            formattedDate = `${startAtDate} - ${endAtDate}`;
        }
        return formattedDate;
    }

    const getTimeString = (startAt: string, endAt: string): string => {
        const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
        const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
        const formattedStartAt = format(new Date(startAt), 'HH:mm');
        const formattedEndAt = format(new Date(endAt), 'HH:mm');
        if (startAtDate == endAtDate) return `${formattedStartAt} - ${formattedEndAt}`;
        return `${formattedStartAt}`;
    }

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
        <div className={`cursor-pointer activity m-4 rounded-lg bg-cover bg-center h-48 w-full max-w-screen-2xl`}
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
            onClick={handleActivityClick}
        >
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