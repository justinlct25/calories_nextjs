"use client";

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useUserStore } from "@/app/stores/user-store-provider";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const donorEditForm = z.object({
    username: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    birth: z.string().datetime().optional(),
    weight: z.number().optional(),
    address: z.string().optional(),
    icon: z.any()
    .optional()
    .refine((file) => (file.length == 1) ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true, `Max image size is 5MB.`)
    .refine((file) => (file.length == 1) ? (ACCEPTED_IMAGE_TYPES.includes(file[0]?.type) ? true : false) : true, "Only .jpg, .jpeg, .png and .webp formats are supported."),
    background: z.any()
    .optional()
    .refine((file) => (file.length == 1) ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true, `Max image size is 5MB.`)
    .refine((file) => (file.length == 1) ? (ACCEPTED_IMAGE_TYPES.includes(file[0]?.type) ? true : false) : true, "Only .jpg, .jpeg, .png and .webp formats are supported.")
})

interface DonorEditFormProps {
    donorId: number
    donor: z.infer<typeof donorEditForm>;
    iconUrl: string;
    backgroundUrl: string;
}

const DonorEditForm: React.FC<DonorEditFormProps> = ({ donorId, donor, iconUrl, backgroundUrl }) => {  
    const router = useRouter();
    const { user, setUser } = useUserStore(
        (state) => state,
    )
    const form = useForm<z.infer<typeof donorEditForm>>({
        resolver: zodResolver(donorEditForm),
        defaultValues: {
            username: donor.username ?? undefined,
            firstname: donor.firstname ?? undefined,
            lastname: donor.lastname ?? undefined,
            phone: donor.phone ?? undefined,
            birth: donor.birth ?? undefined,
            weight: donor.weight ?? undefined,
            address: donor.address ?? undefined,
        },
        mode: "onChange",
    });
    const iconFileRef = form.register('icon', { required: true });
    const backgroundFileRef = form.register('background', { required: true });
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

    useEffect(() => {
        setIconPreview(iconUrl);
        setBackgroundPreview(backgroundUrl);
    }, [iconUrl, backgroundUrl])

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
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

    const onSubmit = async (values: z.infer<typeof donorEditForm>) => {
        const userConfirmed = window.confirm("Are you sure you want to submit the form?");
        if (!userConfirmed) return;
        const currentDonor = user.donor;
        console.log("current" + JSON.stringify(currentDonor));
        const formData = new FormData();
        console.log("values" + JSON.stringify(values));
        if (values.username) {
            formData.append('username', values.username);
        } else {
            console.log('username is required')
        }
        if (values.firstname) {
            formData.append('firstname', values.firstname);
        } else {
            formData.append('firstname', '');
        }

        if (values.lastname) {
            formData.append('lastname', values.lastname);
        } else {
            formData.append('lastname', '');
        }

        if (values.phone) {
            formData.append('phone', String(values.phone));
        } else {
            formData.append('phone', '');
        }

        if (values.birth) {
            // formData.append('birth', String(values.birth));
        } else {
            // formData.append('birth', '');
        }

        if (values.weight) {
            formData.append('weight', String(values.weight));
        } else {
            formData.append('weight', '');
        }

        if (values.address) {
            formData.append('address', values.address);
        } else {
            formData.append('address', '');
        }   
        formData.append('icon', values.icon[0]);
        formData.append('background', values.background[0]);
        const response = await fetch(`/api/donors/${donorId}/edit`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json()
        if (response.ok) {
            const updatedDonor = data.updatedDonor;
            console.log("updatedDonor" + JSON.stringify(updatedDonor));
            const updatedUser = {
                ...user, 
                donor: {
                    ...user.donor,
                    updatedDonor
                }
            }
            console.log("updatedUser" + JSON.stringify(updatedUser));
            setUser({
                ...user, 
                donor: {
                    ...user.donor,
                    ...updatedDonor
                }
            })
            toast({
                title: "Success",
                description: `${data.message}`,
                variant: 'primary'
            })
            router.push(`/donors/${donorId}`);
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Firstname" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lastname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lastname" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Birth</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            placeholderText="Select Birth Date"
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
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (kg)</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <div className="w-64 h-64 border-2 border-gray-300">
                                        {iconPreview ? <img src={iconPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" /> : null}
                                    </div>
                                    <FormControl>
                                        <Input type="file" className="text-black" accept="image/png, image/jpg, image/jpeg" {...iconFileRef} onChange={handleIconChange} />
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
                    </div>
                    <Button className='w-full mt-6' type="submit">Edit</Button>
                </form>
            </Form>
        </div>
    )

}

export default DonorEditForm;