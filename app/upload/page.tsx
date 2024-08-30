'use client'
import TikTokTopbar from "../components/Topbar/Topbar";

import React, { useState, useRef, useEffect } from 'react';
import VideoUpload from "./uploadComponents/VideoUpload";
import FinishUpload from "./uploadComponents/FinishUpload";


const UploadPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [FileHasBeenSelected, setFileHasBeenSelected] = useState(false);

    useEffect(() => {
        if (file) {
            setFileHasBeenSelected(true)
        }
    }, [file])

    return (
        <div>
            <TikTokTopbar />
            {!FileHasBeenSelected ?
                <VideoUpload file={file} setFile={setFile} />
                :
                <FinishUpload file={file} />}
        </div>
    )
}
export default UploadPage;