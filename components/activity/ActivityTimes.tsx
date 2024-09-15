"use client"

import React from 'react';
import { ChevronLeft } from 'lucide-react'


interface ActivityDatesProps {
    startAt?: Date | null;
    endAt?: Date | null;
}

const ActivityDates: React.FC<ActivityDatesProps> = ({ startAt, endAt }) => {

    if (!startAt || !endAt) {
        return <div className="flex justify-start md:justify-center items-center">Loading...</div>;
    }

    const startDateTime = new Date(startAt);
    const startTimeEng = startDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      const startTimeChi = startDateTime.toLocaleTimeString('zh-CN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    const endDateTime = new Date(endAt);
    const endTimeEng = endDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    const endTimeChi = endDateTime.toLocaleTimeString('zh-CN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const isSameTime = startTimeEng===endTimeEng

    return (
        <div className="flex flex-col justify-start md:justify-center items-center w-full md:w-fit">
            <h1 className="text-xl">時間 Times</h1>
            {isSameTime ? (
                <div className="mt-4">{startTimeEng}</div>
            ) : (
                <div className="mt-3">
                    <div>{startTimeChi} - {endTimeChi}</div>
                    <div>{startTimeEng} - {endTimeEng}</div>
                </div>
            )}
        </div>
    );
};

export default ActivityDates;