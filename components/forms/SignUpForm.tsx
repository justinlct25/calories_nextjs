"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import GoogleSignInBtn from "../GoogleSignInBtn";
import { useRouter } from 'next/navigation';
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Loading } from "@/components/ui/loading";

export const userSignUpFormSchemaWithValidation = z.object({
    name: z.string().min(1, 'Username is required').max(30),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters'),
    confirmPassword: z
        .string()
        .min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
});

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof userSignUpFormSchemaWithValidation>>({
        resolver: zodResolver(userSignUpFormSchemaWithValidation),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof userSignUpFormSchemaWithValidation>) => {
        setIsLoading(true);
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password
            })
        });
        const data = await response.json();
        setIsLoading(false);
        if (response.ok) {
            toast({
                title: "Success",
                description: `${data.message}`,
                variant: 'default'
            });
            router.push('/sign-in');
        } else {
            toast({
                title: "Error",
                description: `${data.message}`,
                variant: 'destructive'
            });
        }
    };

    return (
        <div className='bg-[#c0eddd] bg-opacity-100 p-10 rounded-lg shadow-lg w-96'>
            {/* <Image
                src="/images/foodsport_icon.png"
                alt="Foodsport Icon"
                width={100}
                height={100}
                className="mb-10"
            /> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className='space-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe" {...field} className="text-black bg-white bg-opacity-80 rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="mail@example.com" {...field} className="text-black bg-white bg-opacity-80 rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Enter your password" {...field} className="text-black bg-white bg-opacity-80 rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Re-Enter your Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Re-Enter your password" {...field} className="text-black bg-white bg-opacity-80 rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center mt-6">
                            <Loading hasHeight={false} hasText={false} />
                        </div>
                    ) : (
                        <Button className='w-full mt-6' type="submit">Sign up</Button>
                    )}
                </form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-white'>
                    or
                </div>
                <GoogleSignInBtn>Sign up with Google</GoogleSignInBtn>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    If you already have an account, please&nbsp; 
                    <Link className='text-blue-500 hover:underline' href='/sign-in'>Sign in</Link>
                </p>
            </Form>
        </div>
    );
};

export default SignUpForm;