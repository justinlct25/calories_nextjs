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
import { toast, useToast } from '../ui/use-toast'
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/rich-txt-editor/Tiptap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]


export const activityCreateForm = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    // quota: z.number().optional().transform((value) => value || undefined),
    quota: z.number().min(1).optional(),
    price: z.number().min(1).optional(),
    online: z.boolean().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    thumbnail: z.any()
    .optional()
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    //   z
    //   .refine((file) => file?.length == 1, 'File is required.')
    //   .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
    //   .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`),
    
})

const ActivityCreateForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof activityCreateForm>>({
        resolver: zodResolver(activityCreateForm),
        defaultValues: {
            name: 'Activity1',
            startAt: (new Date('2024-03-21T09:00')).toISOString(), // Default start time
            endAt: (new Date('2024-03-21T10:00')).toISOString(),   // Default end time
            // quota: undefined,
            thumbnail: undefined
        },
        mode: 'onChange',
    })
    const fileRef = form.register('thumbnail', { required: true });
    const [descriptionHTML, setDescriptionHTML] = useState<string>('');
    const handleDescriptionEditorChange = (content: any) => {
        setDescriptionHTML(content)
    }

    const onSubmit = async (values: z.infer<typeof activityCreateForm>) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('startAt', values.startAt);
        formData.append('endAt', values.endAt);
        if (values.quota) formData.append('quota', String(values.quota));
        if (values.price) formData.append('price', String(values.price));
        if (values.location) formData.append('location', values.location);
        if (values.address) formData.append('address', values.address);
        formData.append('thumbnail', values.thumbnail[0]); 
        formData.append('description', descriptionHTML);
        // console.log("formData(quota): ", JSON.stringify(formData.get('quota')))

        const response = await fetch('/api/activities/create', {
            method: 'POST',
            body: formData
        });
        const data = await response.json()
        if (response.ok) {
            const createdActivityId = data.activityId
            toast({
                title: "Success",
                description: `${data.message}`,
                variant: 'primary'
            })
            router.push(`/activities/${createdActivityId}`);
        } else {
            toast({
                title: "Error",
                description: `${data.message}`,
                variant: 'destructive'
            })
        }
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Activity Name" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="startAt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start At</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    placeholderText="Select Start Date"
                                                    className="text-black"
                                                    selected={field.value ? new Date(field.value) : null}
                                                    showTimeSelect
                                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                                                    onChange={(date: Date) => field.onChange(date.toISOString())}
                                                    // dateFormat="yyyy-MM-dd HH:mm"
                                                    // {...field}
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
                                            <FormLabel>End At</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    placeholderText="Select End Date"
                                                    className="text-black"
                                                    selected={field.value ? new Date(field.value) : null}
                                                    showTimeSelect
                                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                                                    onChange={(date: Date) => field.onChange(date.toISOString())}
                                                    // dateFormat="yyyy-MM-dd HH:mm"
                                                    // {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="quota"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quota</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                className="text-black"
                                                placeholder=""
                                                {...field}
                                                // onChange={e => field.onChange(parseInt(e.target.value))}
                                                onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                                            />
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
                                            <Input 
                                                type="number"
                                                className="text-black"
                                                placeholder=""
                                                {...field}
                                                onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Location Name" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full Address" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <Input type="file" className="text-black" accept="image/png, image/jpg, image/jpeg" {...fileRef} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormLabel>Description</FormLabel>
                        <Tiptap
                            content={descriptionHTML}
                            onChange={(newContent: string) => {handleDescriptionEditorChange(newContent)}}
                        />
                    </div>
                    <Button className='w-full mt-6' type="submit">Create</Button>
                </form>
            </Form>
        </div>
    )
}

export default ActivityCreateForm;