'use client'
import { useRouter } from "next/navigation"
import { CheckUserStatus } from "../firebase/Authentication";

interface UserObject {
    name: String
    email: String
    avatar: string
}

const User = () => {
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
            {user ?
                <ul>
                    <li>{User?.name}</li>
                    <li>{User?.email}</li>
                    <img src={User?.avatar}></img>
                </ul>
                :
                null
            }
        </div>
    )
}
export default User