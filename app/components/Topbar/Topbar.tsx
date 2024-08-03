import React from 'react';
import { Search, Upload, Heart, MessageCircle, User, Inbox, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import MessagesImage from '@/public/MessagesImage.svg'
import InboxImage from '@/public/InboxImage.svg'
import TikTokLogo from '@/public/TikTokLogo.png'


const TikTokTopbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Image
            priority
            src={TikTokLogo}
            alt='tiktok home button'
            width={120}
        />

      </div>

      <div className="flex-grow flex justify-center">
        <div className="ml-8 relative w-4/12 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 " >
          <input className='bg-gray-100 w-full focus:outline-0 text-black'
          style={{caretColor: 'red'}}
            type="text"
            placeholder="Search"
            
          />
          <Search className="absolute right-4 top-3 text-gray-400 border-l-2" size={23} />
        </div>
      </div>

      <div className="flex items-center space-x-4">

        <button className="flex border border-gray-300 items-center px-3 py-1 text-base font-medium text-black bg-white hover:bg-gray-100 mr-5">
          <PlusIcon size={20} className="mr-1" />
          <p className='mr-1 font-semibold'>Upload</p>
        </button>

        <button>
            <Image 
                priority
                src={MessagesImage}
                alt='Messages Button'
                width={26}
            />
        </button>

        <button>
            <Image 
                priority
                src={InboxImage}
                alt='Inbox Button'
                width={33}
            />
        </button>
        <User size={26} className="text-gray-600" />
      </div>
    </nav>
  );
};

export default TikTokTopbar;