import { signInWithGoogle } from "@/app/firebase/Authentication"
import { useRouter } from 'next/navigation';

interface Props {
    closeModalFunction: Function
}

const ContinueWithGoogleButton = (props: Props) => {
    const router = useRouter();
    async function HandleGoogleLogin() {
        const res = await signInWithGoogle();
        if (res == true) {
            props.closeModalFunction();
            router.push('/')
            console.log('worked great')
        } else {
            console.log("couldnt sign you in G")
        }
    }

    return (
        <button onClick={HandleGoogleLogin} className="w-full bg-blue-500 text-black py-2 rounded-md  flex pl-2 justify-start transition-opacity duration-300 hover:opacity-70">
            <img src="google_logo.svg" alt="Google logo" className=" w-12 bg-white p-2 rounded-md" />
            <div className='mr-6 text-left'>
                <p className='text-white ml-3 font-semibold'>Continue with Google</p>
                <p className='text-gray-300 ml-3 text-sm'>Quick sign-in</p>
            </div>
        </button>
    )
}
export default ContinueWithGoogleButton
