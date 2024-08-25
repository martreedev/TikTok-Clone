'use client'
import { useRouter } from "next/navigation"
import { CheckUserStatus } from "../firebase/Authentication";
import { LogOut } from "../firebase/Authentication";
import TikTokTopbar from "../components/Topbar/Topbar";

interface UserObject {
    name: String
    email: String
    avatar: string
}

const Account = () => {
    const router = useRouter();
    const { user } = CheckUserStatus();
    let User: UserObject | null = null
    if (user) {
        User = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL as string
        }
    } else if (user === false) {
        router.push("/")
    }

    return (
        <div>
            <TikTokTopbar />
            {user ?
                <ul>
                    <li>{User?.name}</li>
                    <li>{User?.email}</li>
                    <img src={User?.avatar}></img>
                    <button onClick={async () => {
                        await LogOut();
                        router.push('/')
                    }}>Log out</button>
                </ul>
                :
                null
            }
        </div>
    )
}
export default Account