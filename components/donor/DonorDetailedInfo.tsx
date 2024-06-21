import { users } from "@/drizzle/schemas/users.schema";
import GoBack from "../util/GoBack";
import EditBtn from '../util/EditBtn';


interface DonorDetailedInfoProps {
    userInfo: typeof users.$inferInsert;
}

const DonorDetailedInfo: React.FC<DonorDetailedInfoProps> = ({ userInfo }) => {
    return (
        <div>
            <GoBack isNavbarPad={true} />
            <div>
                <div className="w-full aspect-[4]"></div> {/* padding from top */}
                <h1 className="text-4xl">Donor Info</h1>
                <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            </div>
        </div>
    );
}

export default DonorDetailedInfo;