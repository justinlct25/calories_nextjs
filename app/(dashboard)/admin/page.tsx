
import { auth } from '@/lib/auth';

const page = async () => {
    const session = await auth();

    if (session?.user) {
        return <h2 className='text-2xl'>Admin page - welcome back { session?.user.name}</h2>
    }

    return <h2>Please login to see this admin page</h2>;
} 

export default page;