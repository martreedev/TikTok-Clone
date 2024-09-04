import VideoPlayer from "./VideoPlayer"
interface VideoObject {
    name: string
    description: string
    videoURL: string
    uid: string
    photo: string
    videoID: string
    likes: any[]
    comments: any[]
}

interface VideoFeedProps {
    videos: VideoObject[]
}
const VideoFeed = (props: VideoFeedProps) => {
    return (
        <div className="mt-4 w-screen h-screen overflow-y-scroll snap-y snap-mandatory">
            {props.videos.map((video, index) => (
                <div key={index} className="snap-start h-screen">
                    <VideoPlayer
                        videoURL={video.videoURL}
                        name={video.name}
                        description={video.description}
                        photo={video.photo}
                        videoID={video.videoID}

                    />
                </div>
            ))}
        </div>
    );
};
export default VideoFeed