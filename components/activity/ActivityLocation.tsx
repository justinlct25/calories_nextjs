"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

interface ActivityLocationProps {
  location?: String | null;
  address?: String | null;
}

const ActivityLocation: React.FC<ActivityLocationProps> = ({
  location,
  address,
}) => {
  if (!location || !address) {
    return <div className="flex justify-start md:justify-center items-center">N/A</div>;
  }

  return (
    <div className="flex flex-col justify-start md:justify-center items-center pb-8 md:pb-0 w-full md:w-fit">
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
