"use client";

import { useState, useEffect } from "react"
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


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]


export const activityEditForm = z.object({
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
    .refine((file) => (file.length == 1) ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true, `Max image size is 5MB.`)
    .refine((file) => (file.length == 1) ? (ACCEPTED_IMAGE_TYPES.includes(file[0]?.type) ? true : false) : true, "Only .jpg, .jpeg, .png and .webp formats are supported."),
    background: z.any()
    .optional()
    .refine((file) => (file.length == 1) ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true, `Max image size is 5MB.`)
    .refine((file) => (file.length == 1) ? (ACCEPTED_IMAGE_TYPES.includes(file[0]?.type) ? true : false) : true, "Only .jpg, .jpeg, .png and .webp formats are supported.")
    //   z
    //   .refine((file) => file?.length == 1, 'File is required.')
    //   .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
    //   .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`),
})

interface ActivityEditFormProps {
    activityId: number;
    activity: z.infer<typeof activityEditForm>;
    thumbnailUrl: string;
    backgroundUrl: string
    description: string;
}

const ActivityEditForm: React.FC<ActivityEditFormProps> = ({ activityId, activity, thumbnailUrl, backgroundUrl, description}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof activityEditForm>>({
        resolver: zodResolver(activityEditForm),
        defaultValues: {
            name: activity.name ?? undefined,
            startAt: activity.startAt ?? undefined,
            endAt: activity.endAt ?? undefined,
            quota: activity.quota ? (typeof activity.quota === 'string' ? parseInt(activity.quota) : activity.quota) : undefined,
            price: activity.price ? (typeof activity.price === 'string' ? parseInt(activity.price) : activity.price) : undefined,
            location: activity.location ?? undefined,
            address: activity.address ?? undefined,
        },
        mode: 'onChange',
    })
    const thumbnailFileRef = form.register('thumbnail', { required: true });
    const backgroundFileRef = form.register('background', { required: true });
    const [descriptionHTML, setDescriptionHTML] = useState<string>('');
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

    useEffect(() => {
        setDescriptionHTML(description);
        setThumbnailPreview(thumbnailUrl);
        setBackgroundPreview(backgroundUrl);
    }, [description, thumbnailUrl, backgroundUrl])

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailPreview(null);
        }
    };

    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setBackgroundPreview(null);
        }
    };

    const handleDescriptionEditorChange = (content: any) => {
        setDescriptionHTML(content)
    }

    const onSubmit = async (values: z.infer<typeof activityEditForm>) => {
        // event.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to submit the form?");
        if (!userConfirmed) return;
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('startAt', values.startAt);
        formData.append('endAt', values.endAt);
        if (values.quota) formData.append('quota', String(values.quota));
        if (values.price) formData.append('price', String(values.price));
        if (values.location) formData.append('location', values.location);
        if (values.address) formData.append('address', values.address);
        formData.append('thumbnail', values.thumbnail[0]);
        formData.append('background', values.background[0]);
        formData.append('description', descriptionHTML);
        const response = await fetch(`/api/activities/${activityId}/edit`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json()
        if (response.ok) {
            const updatedActivityId = data.activityId
            toast({
                title: "Success",
                description: `${data.message}`,
                variant: 'primary'
            })
            router.push(`/activities/${updatedActivityId}`);
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
                                    <div className="w-64 h-64 border-2 border-gray-300">
                                        {thumbnailPreview ? <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" /> : null}
                                    </div>
                                    <FormControl>
                                        <Input type="file" className="text-black" accept="image/png, image/jpg, image/jpeg" {...thumbnailFileRef} onChange={handleThumbnailChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="background"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background</FormLabel>
                                    <div className="h-64 border-2 border-gray-300">
                                        {backgroundPreview ? <img src={backgroundPreview} alt="Background Preview" className="w-full h-full object-cover" /> : null}
                                    </div>
                                    <FormControl>
                                        <Input type="file" className="text-black" accept="image/png, image/jpg, image/jpeg" {...backgroundFileRef} onChange={handleBackgroundChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    {/* </div> */}
                    {/* <div> */}
                        <FormLabel>Description</FormLabel>
                        {/* <div>Description</div> */}
                        {(descriptionHTML!=='') && <Tiptap
                            content={descriptionHTML}
                            onChange={(newContent: string) => {handleDescriptionEditorChange(newContent)}}
                        />
                        }
                        {/* <Tiptap
                            content={descriptionHTML}
                            onChange={(newContent: string) => {handleDescriptionEditorChange(newContent)}}
                        /> */}
                    </div>
                    <Button className='w-full mt-6' type="submit">Edit</Button>
                    
                </form>
            </Form>
        </div>
    )
}

export default ActivityEditForm;