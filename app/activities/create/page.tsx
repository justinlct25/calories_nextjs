'use client'

import Tiptap from "@/components/rich-txt-editor/Tiptap";
import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import { useState } from "react";


const page = async () => {

    // const [content, setContent] = useState<string>('')

    return (
        <div>
            <h2>Create Activity</h2>
            <ActivityCreateForm />
            <Tiptap content={content} />
        </div>
    )
} 

export default page;