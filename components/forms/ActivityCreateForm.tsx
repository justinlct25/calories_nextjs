"use client";

import { useState } from "react"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/rich-txt-editor/Tiptap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { processTiptapImageUrls } from "@/utils/tiptapImageHelper";


export const activityCreateForm = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number(),
    price: z.number()
})

const ActivityCreateForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof activityCreateForm>>({
        resolver: zodResolver(activityCreateForm),
        defaultValues: {
            name: '',
            startAt: '',
            endAt: '',
            quota: 0,
            price: 0
        }
    })
    const [description, setDescription] = useState<string>('');
    const handleDescriptionChange = (content: any) => {
        setDescription(content)
    }

    const onSubmit = async (values: z.infer<typeof activityCreateForm>) => {
        const response = await fetch('/api/activity/create', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            name: values.name,
                            startAt: values.startAt,
                            endAt: values.endAt,
                            quota: values.quota,
                            price: values.price,
                        })
                    })
        const descriptionWithUploadedImgLinks = await processTiptapImageUrls(description);
    }

    return (
        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className='space-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start At</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            placeholderText="Select Start Date"
                                            selected={field.value ? new Date(field.value) : null}
                                            onChange={(date:any) => {
                                                form.setValue('startAt', date.toISOString());
                                            }}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd HH:mm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start At</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            placeholderText="Select Start Date"
                                            selected={field.value ? new Date(field.value) : null}
                                            onChange={(date:any) => {
                                                form.setValue('endAt', date.toISOString());
                                            }}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd HH:mm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quota"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quota</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full mt-6' type="submit">Create</Button>
                </form>
            </Form>
            <Tiptap
                content={description}
                onChange={(newContent: string) => {handleDescriptionChange(newContent)}}
            />
        </div>
    )
}

export default ActivityCreateForm;