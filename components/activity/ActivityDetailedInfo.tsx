"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { activities } from "@/drizzle/schemas/activities.schema"
import { loadActivityThumbnailUrl, loadActivityDescriptionHTMLImgUrls } from '@/utils/loadBucket/loadBucketUrls';

const ActivityDetailedInfo = ({ activityId }: any) => {
    const router = useRouter();
    const [activityInfo, setActivityInfo] = useState<typeof activities.$inferInsert>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("")
    const [descriptionHTML, setDescriptionHTML] = useState({ __html: "" })
    useEffect(() => {
        fetch(`/api/activities/${activityId}`)
        .then((res) => res.json())
        .then(async (data) => {
            // setLoading(false)
            if (data.activity) {
                setActivityInfo(data.activity);
                setThumbnailUrl(await loadActivityThumbnailUrl(data.activity.thumbnail));
                const HTMLwithBucketImgUrls: string = await loadActivityDescriptionHTMLImgUrls(data.activity.description);
                setDescriptionHTML({__html: HTMLwithBucketImgUrls})
            }
            else router.push("/activities")
        })
  }, [])
    

    return (
        <div className="w-full">
            {/* {JSON.stringify(activityInfo)} */}
            {/* <img src={thumbnailUrl} alt="" /> */}
            <div
                style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex justify-center items-center"
            >
                {/* <svg style={{visibility: "hidden",position: "absolute",width: "0px",height: "0px"}} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="flt_tag">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
                        </filter>
                    </defs>
                </svg> */}
                <div className="text-4xl">{activityInfo?.name}</div>
            </div>
            <div className=" w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4.5]"></div>
                <div className="bg-black w-4/6 aspect-[4.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center">
                    <div>{String(activityInfo?.startAt)} </div>
                    <div>{String(activityInfo?.endAt)} </div>
                </div>
                <div className="w-full aspect-[5]"></div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div>Description</div>
                    <div dangerouslySetInnerHTML={descriptionHTML} />

                </div>
            </div>
            <div>

            </div>
            {/* <div>{activityInfo?.description}</div> */}
        </div>
    );
};

export default ActivityDetailedInfo;
