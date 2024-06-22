
import { donors } from "@/drizzle/schemas/donors.schema";
import GoBack from "../util/GoBack";
import EditBtn from '../util/EditBtn';


interface DonorDetailedInfoProps {
    donorInfo: typeof donors.$inferInsert;
}

const DonorDetailedInfo: React.FC<DonorDetailedInfoProps> = ({ donorInfo }) => {
    return (
        <div>
            <GoBack isNavbarPad={true} />
            <div>
                <h1 className="text-4xl">Donor Info</h1>
                <pre>{JSON.stringify(donorInfo, null, 2)}</pre>
            </div>
        </div>
    );
}

export default DonorDetailedInfo;