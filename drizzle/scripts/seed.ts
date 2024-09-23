import { NewAccount, insertAccount } from "@/drizzle/queries/auth-accounts.query";
import { NewRole, insertRole } from "../queries/roles.query";
import { NewUserWithoutId, insertUser } from "../queries/auth-users.query";
import { ROLE_NAMES } from "@/utils/configVariables";
import { hash } from "bcrypt";
import { insertAttendanceStatus } from "../queries/attendance-status.query";


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
    for (const status of seedAttendanceStatus) {
        const response = await insertAttendanceStatus(status);
        console.log(response);
    }
    process.exit();
}

main()