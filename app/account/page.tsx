'use client'
import { useRouter } from "next/navigation"
import { CheckUserStatus } from "../firebase/Authentication";
import { LogOut } from "../firebase/Authentication";
import TikTokTopbar from "../components/Topbar/Topbar";
import TikTokSidebar from "../components/TiktokSideBar/TikTokSideBar";

import React from 'react';
import { Camera, Settings, Share2 } from 'lucide-react';

interface UserProfile {
    username: string;
    handle: string;
    following: number;
    followers: number;
    likes: number;
    bio: string;
    profileImage: string;
}

const UserProfilePage: React.FC = () => {
    const { user } = CheckUserStatus();
    console.log(user)

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center mb-6">
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-48 h-48 rounded-full mr-4"
                />
                <div>
                    <h1 className="text-xl font-bold">{user?.displayName}</h1>
                    <p className="text-gray-600">{ }</p>
                    <div className="flex space-x-4 mt-2">
                        <span>{0} Following</span>
                        <span>{0} Followers</span>
                        <span>{0} Likes</span>
                    </div>
                    <p className="mt-2">{ }</p>
                </div>
            </div>

            <div className="flex space-x-2 mb-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Edit profile
                </button>
                <button className="bg-gray-200 p-2 rounded">
                    <Settings size={20} />
                </button>
                <button className="bg-gray-200 p-2 rounded">
                    <Share2 size={20} />
                </button>
            </div>

            <div className="border-b mb-4">
                <button className="font-semibold pb-2 border-b-2 border-black">Videos</button>
            </div>

            <div className="text-center py-12">
                <Camera size={48} className="mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Upload your first video</h2>
                <p className="text-gray-600">Your videos will appear here</p>
            </div>
        </div>
    );
};

export default function Account() {
    return (
        <div>
            <TikTokTopbar />
            <div className="flex">
                <TikTokSidebar />
                <UserProfilePage />
            </div>
        </div>
    )
}