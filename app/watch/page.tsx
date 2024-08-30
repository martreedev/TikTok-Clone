/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import TikTokTopbar from "../components/Topbar/Topbar";

import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Share2, Video, HeartIcon } from 'lucide-react';
import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import TikTokSidebar from "../components/TiktokSideBar/TikTokSideBar";
import { CheckUserStatus } from "../firebase/Authentication";

interface VideoPlayerProps {
    description: string
    videoURL: string
    name: string
    photo: string
    videoID: string
}

const VideoPlayer = (props: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [LikeCount, setLikeCount] = useState(0);
    const [LikedAccountsArray, setLikedAccountsArray] = useState<string[]>([]);

    const [VideoIsLiked, setVideoIsLiked] = useState(false);

    const { user } = CheckUserStatus();
    const checkVideoLikeCount = async () => {
        const docRef = doc(db, "uploads", props.videoID)
        const docSnapshot = await getDoc(docRef)
        const Video = docSnapshot.data()
        if (Video) {
            const likedAccounts: string[] = Video['likedAccounts']
            setLikeCount(likedAccounts.length)
            setLikedAccountsArray(likedAccounts)
            if (user) {
                const userID = user.uid// get user id
                if (likedAccounts.includes(userID)) {
                    setVideoIsLiked(true);
                    return
                }
            }

        }
    }

    useEffect(() => {// check the like count on the video
        checkVideoLikeCount()
    }, [checkVideoLikeCount, user])

    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const likeVideo = async (videoID: string) => {
        const docRef = doc(db, "uploads", videoID)
        if (VideoIsLiked) {// if video is liked then unlike video
            if (LikedAccountsArray.includes(user.uid)) {// if user is in liked accounts list
                setVideoIsLiked(false)
                let arr = LikedAccountsArray
                arr = arr.filter(e => e !== user.uid);
                const newAccountArray = { likedAccounts: arr }
                updateDoc(docRef, newAccountArray)
            }
        } else {
            if (user) {
                let arr = LikedAccountsArray
                arr.push(user.uid)
                const newData = { likedAccounts: arr }
                setVideoIsLiked(true)
                updateDoc(docRef, newData)
            }
        }
    }

    return (
        <div className=" relative w-full h-[85vh] bg-white flex justify-center">
            <div className="w-full h-full max-w-[calc(85vh*9/16)] relative">
                <video
                    ref={videoRef}
                    src={props.videoURL}
                    className="hover:cursor-pointer rounded-2xl w-full h-full object-cover"
                    loop
                    onClick={togglePlay}
                />
                <div style={{ background: "linear-gradient(to top, lightgreen, darkgreen);" }} className="w-full absolute bottom-0 left-0 p-4 text-white">
                    <p className="hover:cursor-pointer hover:underline font-bold">{props.name}</p>
                    <p className="hover:cursor-pointer hover:underline mt-2">{props.description}</p>
                </div>
                <div className="absolute right-4 bottom-4 flex flex-col items-center space-y-4">
                    <button>
                        <img style={{ width: 40 }} className="rounded-full" src={props.photo}></img>
                    </button>

                    <button onClick={() => likeVideo(props.videoID)} className="p-2 bg-gray-800 rounded-full">
                        {VideoIsLiked ? <Heart size={24} color="red" fill="red" /> : <Heart size={24} color="white" />}

                        <p className="text-white">{LikeCount}</p>
                    </button>

                    <button className="p-2 bg-gray-800 rounded-full">
                        <MessageCircle size={24} color="white" />
                        <p className="text-white">0</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface VideoObject {
    name: string
    description: string
    videoURL: string
    uid: string
    photo: string
    videoID: string
    likes: number
    comments: any[]
}

interface VideoFeedProps {
    videos: VideoObject[]
}

const VideoFeed = (props: VideoFeedProps) => {
    return (
        <div className="mt-4 w-screen h-screen overflow-y-scroll snap-y snap-mandatory">
            {props.videos.map((video, index) => (
                <div key={index} className="snap-start h-screen">
                    <VideoPlayer
                        videoURL={video.videoURL}
                        name={video.name}
                        description={video.description}
                        photo={video.photo}
                        videoID={video.videoID}

                    />
                </div>
            ))}
        </div>
    );
};

const Watch = () => {
    const [VideoArray, setVideoArray] = useState<VideoObject[]>([]);

    useEffect(() => {
        getVideoArray()
    }, [])

    const getVideoArray = async () => {
        const uploadsRef = collection(db, "uploads")
        const documents = await getDocs(uploadsRef)
        let videoArray: VideoObject[] = []
        documents.docs.forEach((doc) => {
            const VideoObject: VideoObject = {
                videoID: doc.id,
                name: doc.data()['name'],
                description: doc.data()['description'],
                videoURL: doc.data()['videoURL'],
                photo: doc.data()['photo'],
                uid: doc.data()['author'],
                likes: doc.data()['likes'],
                comments: doc.data()['comments']
            }
            videoArray.push(VideoObject)
        })
        setVideoArray(videoArray)
    }


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
export default Watch;