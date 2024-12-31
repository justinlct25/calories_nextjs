import { NewAccount, insertAccount } from "@/drizzle/queries/auth-accounts.query";
import { NewRole, insertRole } from "../queries/roles.query";
import { NewUserWithoutId, insertUser } from "../queries/auth-users.query";
import { ROLE_NAMES } from "@/utils/configVariables";
import { hash } from "bcrypt";
import { insertAttendanceStatus } from "../queries/attendance-status.query";
import { insertActivityStatus } from "../queries/activity-status.query";


const seedRoles = [
    {
        name: "admin",
        description: "admin who can create activities"
    },
    {
        name: "donor",
        description: "normal user who can participate in activities and donations"
    }
]

const seedUsers = [
    {
        user: {
            name: "justinlct25",
            email: "justin@gmail.com",
            password: "justin123",  
        },
        role: ROLE_NAMES.ADMIN
    }, 
    {
        user: {
            name: "Nathalie027",
            email: "nathalie@gmail.com",
            password: "nathalie123",
        },
        role: ROLE_NAMES.DONOR
    },
    {
        user: {
            name: "Healthy",
            email: "healthy@gmail.com",
            password: "healthy123",
        },
        role: ROLE_NAMES.ADMIN
    }
]

const seedAttendanceStatus = [
    {
        name: "attending",
        description: "user is attending the activity"
    },
    {
        name: "not attending",
        description: "user not attending the activity"
    },
    {
        name: "attended",
        description: "user attended the activity"
    },
    {
        name: "absent",
        description: "user did not attend the activity"
    },
    {
        name: "absent (informed)",
        description: "user did not attend the activity but informed in advance"
    }
]

const seedActivityStatus = [
    {
        name: "pending",
        description: "activity is pending"
    },
    {
        name: "upcoming",
        description: "activity is upcoming"
    }, 
    {
        name: "ongoing",
        description: "activity is ongoing"
    },
    {
        name: "processing",
        description: "activity is processing"
    },
    {
        name: "completed",
        description: "activity is completed"
    },
    {
        name: "postponed",
        description: "activity is postponed"
    },
    {
        name: "rescheduled",
        description: "activity is rescheduled"
    },
    {
        name: "cancelled",
        description: "activity is cancelled"
    }
]

async function main() {
    
    // for (const role of seedRoles) {
    //     const response = await insertRole(role);
    //     console.log(response);
    // }
    // for (const user of seedUsers) {
    //     user.user.password = await hash(user.user.password, 10);
    //     const response = await insertUser(user.user, user.role);
    //     console.log(response);
    // }
    // for (const status of seedAttendanceStatus) {
        // const response = await insertAttendanceStatus(status);
    //     console.log(response);
    // }
    for (const status of seedActivityStatus) {
        const response = await insertActivityStatus(status);
        console.log(response);
    }
    process.exit();
}

main()