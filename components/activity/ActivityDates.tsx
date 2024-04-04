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
    const startDate = startDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const endDateTime = new Date(endAt);
    const endDate = endDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isSameDate = startDate===endDate

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Date</h1>
            {isSameDate ? (
                <div className="mt-4">{startDate}</div>
            ) : (
                <>
                    <div className="mt-3">{startDate}</div>
                    <div>to</div>
                    <div>{endDate}</div>
                </>
            )}
        </div>
    );
};

export default ActivityDates;