'use client'

import Tiptap from "@/components/rich-txt-editor/Tiptap";
import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid'


export default function ActivityCreationPage() {


    return (
        <div>
            <h2>Create Activity</h2>
            <ActivityCreateForm />
            
        </div>
    )
} 

