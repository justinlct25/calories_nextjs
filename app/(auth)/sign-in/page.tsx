
import TopPadding from "@/components/TopPadding";
import SignInForm from "@/components/forms/SignInForm";


const page = () => {
    return (
        // <div className='w-full'>
        <div className='w-full h-screen flex items-center justify-center'>
            <TopPadding />
            <div className='w-full'>
                <SignInForm />  
            </div>
        </div>
    )
};

export default page;