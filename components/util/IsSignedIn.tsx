import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface IsSignedInProps {
    adminCheck?: boolean;
}

export default function IsSignedIn({ adminCheck }: IsSignedInProps) {
    const { data: session, status } = useSession();
    const { toast } = useToast();
    const router = useRouter();


    useEffect(() => {
        if (status === "authenticated" && session) {
            if (adminCheck) {
                fetch(`/api/admin/${session?.user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.isAdmin) {
                        router.back(); 
                        toast({
                            title: "Error",
                            description: `You are not authorized to create activities.`,
                            variant: 'destructive'
                        })
                    }
                });
            }
        } else if (status === "unauthenticated") {
            router.back();
            toast({
                title: "Error",
                description: `You have not signed in.`,
                variant: 'destructive'
            })
        }
    }, [session, status]);

    return (<></>)
}