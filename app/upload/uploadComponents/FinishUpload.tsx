/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { storage } from '@/app/firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { CheckUserStatus } from '@/app/firebase/Authentication';
import formatFileSize from './uploadFunctions/formatFileSize';

interface VideoUploadDetailsProps {
    file: File | null
}

const VideoUploadDetails: React.FC<VideoUploadDetailsProps> = ({ file }) => {
    if (!file) {// if there is no file then return
        return
    }
    const [progress, setProgress] = useState(0);// State for the progress bar
    const [uploadCompleted, setuploadCompleted] = useState(false);// state for when upload is complete
    const [description, setDescription] = useState<string>("");// state for the video descritpion
    const { user } = CheckUserStatus();// firebase user status
    const clampedProgress = Math.min(100, Math.max(0, progress));// upload progress
    const router = useRouter();
    let name = file?.name;//file name
    let size = file?.size;//file size
    let type = file?.type;//file type

    const submitUpload = () => {// function for submitting upload
        const fileRef = ref(storage, `videos/${user.uid}/${file?.name}`)// upload the video to firebase storage
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)// update the upload progress
        }, (error) => {
            console.log('error')
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {//get download URL of the video
                const uploadRef = collection(db, "uploads")// get the firebase upload collection
                await addDoc(uploadRef, {// add new document to the collection containing the video details
                    author: user.uid,
                    videoURL: downloadURL,
                    description: description,
                    name: user.displayName,
                    photo: user.photoURL as string,
                    likedAccounts: [],
                    comments: []
                })
                console.log("File has been uploaded")
                setuploadCompleted(true)// complete the upload
                // redirect to the watch page when with the video url to watch the new video
                router.push(`/account`)
            })
        })
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{name}</h2>
                <button onClick={() => { router.push('/') }} className="text-blue-500 flex items-center">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Replace
                </button>
            </div>

            <div className="text-sm text-gray-600 mb-4">
                Size: {size ? formatFileSize(size) : 0} | Type: {type}
            </div>

            {uploadCompleted ?
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-flex items-center mb-4">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Uploaded
                </div> : null}


            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter video description"
                ></textarea>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{description.length}/4000</span>
                </div>
            </div>

            <div className="flex space-x-4">
                <button onClick={submitUpload} style={{ backgroundColor: "#FE2C55" }} className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition duration-300">
                    Post
                </button>
                <button onClick={() => router.push('/')} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                    Discard
                </button>
            </div>
        </div>
    );
};

interface Props {
    file: File | null
}

const FinishUpload = (props: Props) => {
    return (
        <div>
            <VideoUploadDetails file={props.file} />
        </div>
    )
}
export default FinishUpload;