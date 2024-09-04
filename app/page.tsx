'use client'
import TikTokTopbar from "./components/Topbar/Topbar";
import TikTokSidebar from "./components/TiktokSideBar/TikTokSideBar";
import ForYouPageFeed from "./components/VideoPlayer/ForYouPageFeed";

export default function Home() {
  return (
    <main >
      <TikTokTopbar />
      <div className="flex">
        <TikTokSidebar />
        <ForYouPageFeed />
      </div>

    </main>
  );
}
