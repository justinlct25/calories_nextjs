"use client"

import React from 'react';
import { ChevronLeft, MapPin } from 'lucide-react'
import { useState } from 'react';


interface ActivityLocationProps {
    location?: String | null;
    address?: String | null;
    className?: string;
}

const ActivityLocation: React.FC<ActivityLocationProps> = ({ location, address, className }) => {

    // if (!location || !address) {
    //     return <div className="flex justify-center items-center">Loading...</div>;
    // }


    return (
        <div className={`flex flex-row justify-center items-center ${className}`}>
            {/* <h1 className="text-3xl">地點 Location</h1> */}
            <MapPin className="mr-2" />
            {/* {location? <div className="mt-4">{location}</div> : <div>-</div>} */}
            {address? <div>{address}</div> : <div>-</div>}
        </div>
    );
};

export default ActivityLocation;