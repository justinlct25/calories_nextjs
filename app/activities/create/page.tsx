'use client'

import Tiptap from "@/components/rich-txt-editor/Tiptap";
import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import { useState } from "react";
import TopPadding from "@/components/TopPadding";
import WrapperWithBack from "@/components/WrapperWithBack";
import GoBack from "@/components/GoBack";
// import { v4 as uuidv4 } from 'uuid'


export default function ActivityCreationPage() {


    return (
        <WrapperWithBack>
            <GoBack isNavbarPad={false} />  
            <h2>Create Activity</h2>
            <ActivityCreateForm />
        </WrapperWithBack>
    )
} 

