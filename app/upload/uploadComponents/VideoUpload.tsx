/* eslint-disable react/no-unescaped-entities */
import { useRef } from 'react';
import { Upload, FileVideo } from 'lucide-react';

interface VideoUploadProps {
    file: File | null
    setFile: Function
}

const VideoUpload = (props: VideoUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    let file = props.file
    const setFile = props.setFile

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold">Select video to upload</h2>
                <p className="mt-1 text-sm text-gray-500">Or drag and drop it here</p>
                <button style={{ backgroundColor: "#FE2C55" }}
                    className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300"
                    onClick={triggerFileInput}
                >
                    Select video
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="video/*"
                    className="hidden"
                />
            </div>
            {file && (
                <p className="mt-4 text-sm text-gray-600">
                    Selected file: {file.name}
                </p>
            )}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <FileVideo className="mr-2 h-5 w-5" />
                    <p>Maximum size: 1 GB, video duration: 60 minutes.</p>
                </div>
                <div className="flex items-center">
                    <FileVideo className="mr-2 h-5 w-5" />
                    <p>Recommended: ".mp4". Other major formats are supported.</p>
                </div>
                <div className="flex items-center">
                    <FileVideo className="mr-2 h-5 w-5" />
                    <p>2K and 4K are supported.</p>
                </div>
                <div className="flex items-center">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    <p>Recommended: 16:9 for landscape, 9:16 for vertical.</p>
                </div>
            </div>
        </div>
    );
};
export default VideoUpload;