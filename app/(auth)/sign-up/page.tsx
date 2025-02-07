import SignUpForm from "@/components/forms/SignUpForm";
import TopPadding from "@/components/TopPadding";

const page = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <TopPadding />
            <div className='w-full flex flex-col items-center'>
                <SignUpForm />
            </div>
        </div>
    )
};

export default page;