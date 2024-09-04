'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react";
const WatchPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/')
    }, [])
    return (
        <div>

        </div>
    )
}
export default WatchPage