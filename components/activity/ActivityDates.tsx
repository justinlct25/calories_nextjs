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
    const startDateEng = startDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const startDateChi = startDateTime.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const endDateTime = new Date(endAt);
    const endDateEng = endDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isSameDate = startDateEng===endDateEng

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl">日期 Date</h1>
            {isSameDate ? (
                <div className="mt-4">
                    <div>{startDateChi}</div>
                    <div>{startDateEng}</div>
                </div>
                  
            ) : (
                <>
                    <div className="mt-3">{startDateEng} to {endDateEng}</div>
                    {/* <div>to</div> */}
                    {/* <div>{endDate}</div> */}
                </>
            )}
        </div>
    );
};

export default ActivityDates;