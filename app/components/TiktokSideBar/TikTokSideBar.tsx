import React, { useEffect, useState } from 'react';
import { Home, Compass, Users, UserCircle, Video } from 'lucide-react';
import { CheckUserStatus } from '@/app/firebase/Authentication';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, isActive }) => (
  <div className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${isActive ? 'text-red-500' : 'text-gray-700'}`}>
    <Icon className="w-6 h-6 mr-2" />
    <span className="text-lg font-semibold font-medium">{label}</span>

  </div>
);

const FollowingAccount = ({ name, username, imageUrl }) => (
  <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
    <img src={imageUrl} alt={name} className="w-8 h-8 rounded-full mr-2" />
    <div className="flex flex-col">
      <span className="text-base font-medium font-semibold">{name}</span>
      <span className="text-xs text-gray-500">{username}</span>
    </div>
  </div>
);

const TikTokSidebar = () => {
  const router = useRouter();
  const { user } = CheckUserStatus();
  const followingAccounts = [
    { name: 'jordan z', username: 'jordanzanez', imageUrl: '/api/placeholder/32/32' },
    { name: 'winnehpoohp', username: 'winnehpoohp', imageUrl: '/api/placeholder/32/32' },
    { name: 'Crash Makerspace', username: 'crash_makerspace', imageUrl: '/api/placeholder/32/32' },
    { name: 'dasher +', username: 'dasher2xx', imageUrl: '/api/placeholder/32/32' },
    { name: 'Brandon Carter', username: 'bigbrandoncarter', imageUrl: '/api/placeholder/32/32' },
    { name: 'Sir Cruse', username: 'realsircruse', imageUrl: '/api/placeholder/32/32' },
    { name: 'motivationBi', username: 'motivationbi', imageUrl: '/api/placeholder/32/32' },
    { name: 'Super', username: 'ml.supr', imageUrl: '/api/placeholder/32/32' },
    { name: 'andrewfefel', username: 'andrewfefel', imageUrl: '/api/placeholder/32/32' },
    { name: 'sami', username: 'sammb._', imageUrl: '/api/placeholder/32/32' },

  ];

  function FollowingAccountsComponent() {
    return (
      <div>
        <h3 className="px-4 text-sm font-semibold text-gray-500 mb-2">Following accounts</h3>
        {followingAccounts.map((account, index) => (
          <FollowingAccount key={index} {...account} />
        ))}
        <div className="px-4 py-2 text-sm text-red-500 cursor-pointer hover:underline">
          See more
        </div>
      </div>
    )
  }

  function FollowingAccountsComponentNotLoggedIn() {
    return (
      <div>
        <p className='pl-4 pr-6 text-gray-400'>Log in to follow creators, like videos, and view comments.</p>
      </div>
    )
  }
  const pathname = usePathname();
  useEffect(() => {
    if (pathname == "/") {
      setFYPSelected(true);
      setFollowingSelected(false);
      setFriendsSelected(false);
      setAccountSelected(false)
    }
    if (pathname == "/following") {
      setFollowingSelected(true);
      setFYPSelected(false);
      setFriendsSelected(false);
      setAccountSelected(false)
    }
    if (pathname == "/friends") {
      setFriendsSelected(true)
      setFYPSelected(false)
      setFollowingSelected(false)
      setAccountSelected(false)
    }
    if (pathname == "/account") {
      setFYPSelected(false);
      setFriendsSelected(false);
      setFollowingSelected(false);
      setAccountSelected(true)
    }
  }, [pathname])
  const [FYPSelected, setFYPSelected] = useState(false);
  const [FollowingSelected, setFollowingSelected] = useState(false);
  const [FriendsSelected, setFriendsSelected] = useState(false);
  const [AccountSelected, setAccountSelected] = useState(false);

  return (
    <div className=" w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto sidebar-container">
      <style jsx>{`
        .sidebar-container::-webkit-scrollbar {
            width: 0px;
            background: transparent;
            transition: width 0.3s ease-in-out;
        }

            .sidebar-container:hover::-webkit-scrollbar {
            width: 5px;
        }

            .sidebar-container::-webkit-scrollbar-thumb {
            background: #f1f1f2;
            border-radius: 4px;
        }
        
      `}</style>
      <div className="py-4">

        <button onClick={() => router.push('/')} className='w-full'>
          <SidebarItem icon={Home} label="For You" isActive={FYPSelected} />
        </button>
        <button onClick={() => router.push('/following')} className='w-full'>
          <SidebarItem icon={Users} label="Following" isActive={FollowingSelected} />
        </button>

        {user ?
          <button onClick={() => router.push('/friends')} className='w-full'>
            <SidebarItem icon={Users} label="Friends" isActive={FriendsSelected} />
          </button> : null}

        <button onClick={() => router.push('/account')} className='w-full'>
          <SidebarItem icon={UserCircle} label="Profile" isActive={AccountSelected} />
        </button>
      </div>
      <div className="border-t border-gray-200 pt-4">
        {user ? <FollowingAccountsComponent /> : <FollowingAccountsComponentNotLoggedIn />}
      </div>
    </div>
  );
};

export default TikTokSidebar;