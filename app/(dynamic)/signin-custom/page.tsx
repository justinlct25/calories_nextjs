 import SignInBtnCustom from "@/components/SignInBtnProvider";
import SignOutBtnCustom from "@/components/SignOut";
import { auth } from "@/lib/auth";

 export default async function Page() {
    const session = await auth();

    if (session) {
        return (
            <div>
                <div>Signed in as: {session.user.name}</div>
                <SignOutBtnCustom />
            </div>
        )
    }

    return (
        <div>
            <h1>Sign in Custom</h1>
            <SignInBtnCustom provider={{
                id: "google",
                name: "Google"
            }} />
        </div>
    )
 }