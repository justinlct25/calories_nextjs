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
        <div className={`flex flex-col justify-center items-center ${className}`}>
            <div className="mt-4 justify-center items-center">
                <p className="flex items-center mb-2"><Calendar className="mr-2" /> {getDateString(startAt, endAt)}</p>
                <p className="flex items-center mb-2"><Clock className="mr-2" /> {getTimeString(startAt, endAt)}</p>
            </div>
        </div>
    );
};

export default ActivityDateTime;