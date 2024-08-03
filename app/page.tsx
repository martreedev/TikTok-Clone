'use client'
import Image from "next/image";
import TikTokTopbar from "./components/Topbar/Topbar";
import TikTokSidebar from "./components/TiktokSideBar/TikTokSideBar";

export default function Home() {
  return (
    <main >
      <TikTokTopbar/>
      <TikTokSidebar/>
    </main>
  );
}
