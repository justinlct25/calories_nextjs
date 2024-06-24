
import { donors } from "@/drizzle/schemas/donors.schema";
import GoBack from "../util/GoBack";
import EditBtn from '../util/EditBtn';


interface DonorDetailedInfoProps {
    donorInfo: any;
    iconUrl: string;
    bgImgUrl: string;
}

const DonorDetailedInfo: React.FC<DonorDetailedInfoProps> = ({ donorInfo, iconUrl, bgImgUrl }) => {

    return (
        <div className="w-full">
            <GoBack isNavbarPad={true} backDirectory="home" />
            <EditBtn isNavbarPad={true} editUrl={`/activities`} />
            <div
                style={{
                    backgroundImage: `url("${bgImgUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: 'polygon(100% 0, 100% 100%, 90% 100%, 80% 75%, 20% 75%, 10% 100%, 0 100%, 0% 0%)',
                    filter: 'url(#flt_tag)',
                }}
                className="w-full aspect-[3] bg-blend-darken bg-black bg-opacity-60 flex flex-col justify-center  items-center"
            >
                <div>Level {donorInfo?.levels}</div>
                <div className="text-4xl">{donorInfo?.name}</div>
                <div className="h-1/4"></div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[6]"></div> {/* padding from top */}  
                <div className="w-1/5 aspect-[1] bg-white bg-opacity-20 z-[10] absolute left-1/2  -translate-x-1/2 rounded-full flex items-center justify-center">
                    <div className="w-9/12 aspect-[1] bg-yellow-500 rounded-full flex items-center justify-center">
                    {/* <div className="inline-block relative w-9/12 aspect-[1] overflow-hidden rounded-full"> */}
                        {/* <i className="fas fa-icon"></i> */}
                        <img src={iconUrl} alt="icon" className="object-contain w-full h-full" />
                        {/* <img src={iconUrl} alt="icon" className="w-auto h-full " /> */}
                        {/* <img src={iconUrl} alt="icon" className="object-cover object-center w-full h-full" /> */}
                    </div>
                    {/* <i className="fas fa-icon"></i> */}
                </div>
            </div>
            <div className="w-full aspect-[2] absolute top-0">
                <div className="w-full aspect-[4]"></div> {/* padding from top */}  
                <div className="bg-black w-9/12 aspect-[5.5] z-[-10] absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-between items-center rounded-md">
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pl-20">
                        <div className="text-2xl">Donated<br />Calories</div>
                        <div className="text-4xl">{donorInfo?.calories}</div>
                    </div>
                    {/* <div className="flex-grow"></div> */}
                    <div className="flex flex-col justify-center items-center text-center w-1/4 pr-20">
                        <div className="text-2xl">Participated<br />Events</div>
                        <div className="text-4xl">{donorInfo?.activities.length}</div>
                    </div>
                </div>
                <div className="w-full aspect-[5]"></div>
                <div className="w-full flex flex-col justify-center items-center max-w-screen-xl mx-auto">
                    {/* <pre>{JSON.stringify(donorInfo, null, 2)}</pre> */}
                    <h2 className="text-4xl">Activities Participated</h2>
                    {donorInfo?.activities && donorInfo.activities.map((activity: any, index: number) => (
                        <div key={index}>
                            <h3>{activity.activity.name}</h3>
                            <p>Start At: {activity.activity.startAt}</p>
                            <p>End At: {activity.activity.endAt}</p>
                            <p>Location: {activity.activity.location}</p>
                            <p>Address: {activity.activity.address}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DonorDetailedInfo;