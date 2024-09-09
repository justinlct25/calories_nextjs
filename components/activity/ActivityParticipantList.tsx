"use client"

import { useState, useEffect } from 'react';;
import { useRouter } from 'next/navigation';

interface ActivityParticipantListProps {
    activityId: number;
}

const ActivityParticipantList: React.FC<ActivityParticipantListProps> = ({ activityId }) => {
    const router = useRouter();
    const [participants, setParticipants] = useState<any[]>([]);

    const fetchParticipants = async () => {
        fetch(`/api/activities/${activityId}/participants`)
        .then((res) => res.json())
        .then((data) => {
            setParticipants(data.participants)
        });
    }

    useEffect(() => {
        fetchParticipants();
    }, [])

    return (
        <div>
            <div className="text-lg font-bold">Participants</div>
            <div>
                {participants.map((participant, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div>{participant.firstname} {participant.lastname}</div>
                        <div>{participant.phone}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}