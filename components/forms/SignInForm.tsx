"use client";

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
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import GoogleSignInBtn from "../GoogleSignInBtn";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Image from "next/image";



const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters'),
})

interface SignInFormProps {
    activityId: number | null;
}


const SignInForm: React.FC<SignInFormProps> = ({ activityId }) => {
    // const { setUser } = useGlobalContext();
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    // const { data: session, status} = useSession();



    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });
        if (signInData?.error) {
            toast({
                title: "Error",
                description: "Oops! Something went wrong!",
                variant: 'destructive'
            })
        } else {
            console.log(JSON.stringify(signInData, null, 2));
            router.refresh();
            if (activityId) {
                router.push(`/activities/${activityId}`);
            } else {
                router.push('/activities');
            }
            router.refresh();

        }
    }

    return (
        // <div className='bg-[#25ad91] bg-opacity-70 p-10 rounded-md w-96'>
        <div className='bg-[#c0eddd] bg-opacity-100 p-10 rounded-lg shadow-lg w-96'>
        {/* <div className='bg-slate-200 p-10 rounded-md w-96'> */}
            <Image
                    src="/images/foodsport_icon.png"
                    alt="Foodsport Icon"
                    width={500}
                    height={500}
                    className="mb-10"
                />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className='space-y-2'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="mail@example.com"
                                            {...field}
                                            className="text-black" // Set text color to black
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
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
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                            className="text-black" // Set text color to black
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full mt-6' type="submit">Sign in</Button>
                </form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-black'>
                    or
                </div>
                <GoogleSignInBtn>Sign in with Google</GoogleSignInBtn>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    If you don&apos;t have an account, please&nbsp; 
                    <Link className='text-blue-500 hover:underline' href='/sign-up'>Sign up</Link>
                </p>
            </Form>
        </div>
    );
};

export default SignInForm;
