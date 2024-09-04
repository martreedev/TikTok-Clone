'use client'
import TikTokSidebar from "@/app/components/TiktokSideBar/TikTokSideBar"
import TikTokTopbar from "@/app/components/Topbar/Topbar"
import { db } from "@/app/firebase/config"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import VideoFeed from "@/app/components/VideoPlayer/VideoFeed"

interface VideoObject {
    name: string
    description: string
    videoURL: string
    uid: string
    photo: string
    videoID: string
    likes: any[]
    comments: any[]
}

export default function DisplaySpecificVideo({ params }: {
    params: { videoID: string }
}) {
    const [VideoArray, setVideoArray] = useState<VideoObject[]>([]);

    useEffect(() => {
        const getSingleVideo = async (videoID: string) => {
            const docRef = doc(db, "uploads", videoID)
            const docSnapshot = await getDoc(docRef)
            const Video = docSnapshot.data()
            if (Video) {
                let videoArray: VideoObject[] = []

                const VideoObject: VideoObject = {
                    videoID: params.videoID,
                    name: Video['name'],
                    description: Video['description'],
                    videoURL: Video['videoURL'],
                    photo: Video['photo'],
                    uid: Video['author'],
                    likes: Video['likes'],
                    comments: Video['comments']
                }
                videoArray.push(VideoObject)

                setVideoArray(videoArray)
            }
        }
        getSingleVideo(params.videoID)
    }, [params.videoID])

    return (
        <div>
            <TikTokTopbar />
            <div className="flex">
                <TikTokSidebar />
                <VideoFeed videos={VideoArray} />
            </div>
        </div>
    )
}