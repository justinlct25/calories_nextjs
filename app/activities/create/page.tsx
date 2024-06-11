'use client'

import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import WrapperWithBack from "@/components/WrapperWithBack";
import GoBack from "@/components/GoBack";
import IsSignedIn from "@/components/util/IsSignedIn"; 



export default function ActivityCreationPage() {
    


    return (
        <WrapperWithBack>
            <IsSignedIn adminCheck={true} />
            <GoBack isNavbarPad={false} />  
            <h2>Create Activity</h2>
            <ActivityCreateForm />
        </WrapperWithBack>
    )
} 

