/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import VideoFeed from './VideoFeed';

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

const ForYouPageFeed = () => {
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
        <VideoFeed videos={VideoArray} />
    )
}
export default ForYouPageFeed;
