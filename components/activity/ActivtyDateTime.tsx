"use client";

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { getDateString, getTimeString } from '@/utils/helperFunc';
import { Loading } from '../ui/loading';

interface ActivityDateTimeProps {
    startAt?: string | null;
    endAt?: string | null;
    className?: string;
}

const ActivityDateTime: React.FC<ActivityDateTimeProps> = ({ startAt, endAt, className }) => {
    if (!startAt || !endAt) {
        return <Loading />;
    }

    return (
        <div className={`justify-center items-center w-full ${className}`}>
            <div className="mt-4 w-full justify-center  flex ">
                <div className="flex items-center mb-2 mr-4"><Calendar className="mr-2" /> {getDateString(startAt, endAt)}</div>
                <div className="flex items-center mb-2 ml-4"><Clock className="mr-2" /> {getTimeString(startAt, endAt)}</div>
            </div>
        </div>
    );
};

export default ActivityDateTime;