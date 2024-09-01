"use client"

import React from 'react';
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react';


interface ActivityLocationProps {
    location?: String | null;
    address?: String | null;
}

const ActivityLocation: React.FC<ActivityLocationProps> = ({ location, address }) => {

    // if (!location || !address) {
    //     return <div className="flex justify-center items-center">Loading...</div>;
    // }


    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">地點 Location</h1>
            {location? <div className="mt-4">{location}</div> : <div>-</div>}
            {address? <div>{address}</div> : <div>-</div>}
        </div>
    );
};

export default ActivityLocation;