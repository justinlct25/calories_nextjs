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
    const startTime = startDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    const endDateTime = new Date(endAt);
    const endTime = endDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

    const isSameTime = startTime===endTime

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Times</h1>
            {isSameTime ? (
                <div className="mt-4">{startTime}</div>
            ) : (
                <>
                    <div className="mt-3">{startTime}</div>
                    <div>to</div>
                    <div>{endTime}</div>
                </>
            )}
        </div>
    );
};

export default ActivityDates;