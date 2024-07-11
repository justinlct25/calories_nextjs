"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface ActivityLocationProps {
  location?: String | null;
  address?: String | null;
}

const ActivityLocation: React.FC<ActivityLocationProps> = ({
  location,
  address,
}) => {
  if (!location || !address) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl">地點 Location</h1>
      <div className="mt-4">{location}</div>
      <div>
        {address.split(", ").map((line, i) => (
          <>
            <span key={i}>{line}</span>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default ActivityLocation;
