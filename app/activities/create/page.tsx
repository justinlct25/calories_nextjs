'use client'

import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import WrapperWithBack from "@/components/WrapperWithBack";
import GoBack from "@/components/util/GoBack";
import IsSignedIn from "@/components/util/IsSignedIn"; 



export default function ActivityCreationPage() {
    


    return (
        <WrapperWithBack>
            <IsSignedIn adminCheck={true} />
            <GoBack isNavbarPad={false} backDirectory="parent" />  
            <h2>Create Activity</h2>
            <ActivityCreateForm />
        </WrapperWithBack>
    )
} 

