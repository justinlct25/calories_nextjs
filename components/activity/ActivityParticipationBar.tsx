"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { donorsToActivities } from "@/drizzle/schemas/donors-to-activities.schema";
import { participate } from "@/drizzle/queries/donors-to-activities.query";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import ShareSocialsModal from "../ShareSocialsModal";

interface ActivityParticipationBarProps {
  activityId: number;
}

const ActivityParticipationBar: React.FC<ActivityParticipationBarProps> = ({
  activityId,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
  const [participation, setParticipation] = useState<
    typeof donorsToActivities.$inferInsert | null
  >();
  const [showSocials, setShowSocials] = useState(false);

  const fetchSetParticipantData = async () => {
    if (session) {
      fetch(`/api/activities/${activityId}/participants`)
        .then((res) => res.json())
        .then((data) => {
          setParticipation(data.participation);
          setNumOfParticipants(data.numOfParticipants);
        });
    }
  };
  useEffect(() => {
    fetchSetParticipantData();
  }, [session]);

  const handleJoin = async () => {
    if (session) {
      fetch(`/api/activities/${activityId}/participants`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setParticipation(data.participation);
          fetchSetParticipantData();
        });
    } else {
      router.push(`/sign-in?activityId=${activityId}`);
    }
  };

  const handleQuit = async () => {
    if (session) {
      fetch(`/api/activities/${activityId}/participants`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setParticipation(null);
            fetchSetParticipantData();
          }
        });
    }
  };

  const handleShare = () => {
    setShowSocials(true);
    // const url = window.location.href;
    // const shareData = {
    //   title: "Join me on this activity!",
    //   text: "Check out this activity!",
    //   url: url,
    // };
    // if (navigator.canShare && navigator.canShare(shareData)) {
    //   navigator.share(shareData);
    // } else {
    //   console.log("Sharing not supported");
    // }
  };

  return (
    <>
      <div
        // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center'
        // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-yellow-500 bg-opacity-70 flex justify-center items-center'
        // className='fixed bottom-0 w-full h-20 bg-blend-darken bg-white bg-opacity-70 flex justify-center items-center'
        className="fixed bottom-0 w-full h-24 bg-blend-darken bg-black bg-opacity-90 flex justify-center items-center"
        style={{
          // backgroundImage: `url(${thumbnailUrl})`,
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // backgroundPosition: 'bottom',
          clipPath:
            // "polygon(100% 100%, 100% 0, 85% 0, 75% 45%, 0 45%, 0% 100%)",
            "polygon(100% 100%, 100% 0px, 75% 0px, 70% 45%, 0px 45%, 0% 100%)"
        }}
      >
        <div className="w-2/3 md:w-3/4 flex justify-center items-end pt-10">
          <div className="flex ">
            <User />
            {numOfParticipants}
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 flex flex-col md:flex-row justify-evenly max-w-20 md:max-w-none">
          {participation !== null && participation !== undefined ? (
            <Button className="m2" variant="destructive" onClick={handleQuit}>
              Quit
            </Button>
          ) : (
            <Button className="m2 bg-green-500 hover:bg-green-400 max-w-20 mb-2 md:mb-0 ml-2 md:ml-0" variant="secondary" onClick={handleJoin}>
              Join
            </Button>
          )}
          <Button className="m2 bg-slate-100 text-black hover:bg-gray-400 max-w-20 ml-2 md:ml-0" onClick={() => handleShare()}>
            Share
          </Button>
        </div>
      </div>
      {showSocials && (
        <ShareSocialsModal closeModal={() => setShowSocials(false)} />
      )}
    </>
  );
};

export default ActivityParticipationBar;
