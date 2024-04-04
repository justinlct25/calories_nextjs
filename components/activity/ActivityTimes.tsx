"use client"

import React from 'react';
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react';


interface ActivityDatesProps {
    startAt?: Date | null;
    endAt?: Date | null;
}

const ActivityDates: React.FC<ActivityDatesProps> = ({ startAt, endAt }) => {

    if (!startAt || !endAt) {
        return <div className="flex justify-center items-center">Loading...</div>;
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
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">時間 Times</h1>
            {isSameTime ? (
                <div className="mt-4">{startTimeEng}</div>
            ) : (
                <div className="mt-3">
                    <div>{startTimeChi} - {endTimeChi}</div>
                    <div>{startTimeEng} - {endTimeEng}</div>
                    {/* <div>to</div> */}
                    {/* <div>{endTime}</div> */}
                </div>
            )}
        </div>
    );
};

export default ActivityDates;