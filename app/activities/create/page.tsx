'use client'

import Tiptap from "@/components/rich-txt-editor/Tiptap";
import ActivityCreateForm from "@/components/forms/ActivityCreateForm";
import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid'


export default function ActivityCreationPage() {

    // const [description, setDescription] = useState<string>('')
    // const handleDescriptionChange = (reason: any) => {
    //     setDescription(reason);
    //   }
    //   const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     const data = {
    //       id: 'test',
    //       description: description,
    //     }
    //     console.log(data)
    //     const existingDataString = localStorage.getItem('myData')
    //     const existingData = existingDataString
    //       ? JSON.parse(existingDataString)
    //       : []
    //     const updatedData = [...existingData, data]
    //     localStorage.setItem('myData', JSON.stringify(updatedData))
    //     setDescription('')
    //   }

    return (
        <div>
            <h2>Create Activity</h2>
            <ActivityCreateForm />
            {/* <Tiptap
                description={description}
                onChange={(newDescription: string) => {handleDescriptionChange(newDescription)}}
            /> */}
        </div>
    )
} 

