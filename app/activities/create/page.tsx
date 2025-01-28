'use client'

import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import PageUnderNavbarWrapper from "@/components/PageUnderNavbarWrapper";
import GoBack from "@/components/util/GoBack";
import IsSignedIn from "@/components/util/IsSignedIn"; 



export default function ActivityCreationPage() {
    


    return (
        <PageUnderNavbarWrapper>
            <IsSignedIn adminCheck={true} />
            <GoBack isNavbarPad={false} backDirectory="parent" />  
            <ActivityCreateForm />
        </PageUnderNavbarWrapper>
    )
} 

