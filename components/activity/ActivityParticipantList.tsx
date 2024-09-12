"use client"

import ActivityParticipant from './ActivityParticipant';

interface ActivityParticipantListProps {
    participants: any[];
}

const ActivityParticipantList: React.FC<ActivityParticipantListProps> = ({ participants }) => {

    return (
        <>
            {participants.map((participant: any) => (
                <>
                    {participant.donor && <ActivityParticipant donorInfo={participant.donor} />}
                </>
            ))}
        </>
    );
}

export default ActivityParticipantList;