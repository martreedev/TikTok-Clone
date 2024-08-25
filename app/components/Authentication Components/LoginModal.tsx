/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { X } from 'lucide-react';
import ContinueWithGoogleButton from './OAuthButtons/ConintueWithGoogleButton';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
            <div className="bg-white rounded-lg w-full max-w-md px-12 pt-6  ">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold ">Log in to TikTok</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-10 pb-16 pt-8">
                    <ContinueWithGoogleButton closeModalFunction={onClose} />

                </div>
                <div className="p-4 text-center text-xs text-gray-500">
                    By continuing, you agree to TikTok's <a href="#" className="text-black">Terms of Service</a> and confirm that you have read TikTok's <a href="#" className="text-black">Privacy Policy</a>.
                </div>

            </div>
        </div>
    );
};

export default LoginModal;