import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../../compount/img/icon.webp";
import img2 from "../../compount/img/youtube.webp";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton.tsx";
import AllVideoWrapper from "../AllVideoWrapper.tsx";
import useGetUserVideo from "../../hook/useGetUserVideo.ts";
import useGetUserProfile from "../../hook/useGetUserProfile.ts";
import ProfileAvatar from "./ProfileAvatar.tsx";
import CreateTweet from "../tweet/CreateTweet.tsx";
import PublishVideoCompount from "../PublishVideo.tsx";
import { useState } from "react";

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

interface VideoData {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
  userDetails: UserData[];
  videoLikes: number;
}

type AllVideoData = VideoData[];

export default function ProfileComponent() {
  const { userProfile, isProfileLoading } = useGetUserProfile();
  const { video, isLoading } = useGetUserVideo(); // Use the correct type for video
  const [openTweet, setOpenTweet] = useState(false);
  const Navigator = useNavigate();
console.log(video)
  const handleTweet = () => {
    setOpenTweet(!openTweet);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <ProfileAvatar userProfile={userProfile} isProfileLoading={isProfileLoading} />
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto px-4 py-8">
          <div>
            <h2 className="w-full underline border-b-2 py-4 m-5 items-end justify-center bg-transparent">
              <button
                className="rounded-lg text-zinc-400 hover:bg-zinc-100 p-4"
                onClick={() => Navigator('/publishvideo')}
              >
                Publish Video
              </button>
              <CreateTweet />
            </h2>
          </div>
          {isLoading ? (
            <AllVideoSkeleton className="grid-cols-3" />
          ) : (
            <AllVideoWrapper className="grid grid-cols-1 items-center justify-center">
              {video && video.length > 0 ? (
                video.map((videoItem, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg overflow-hidden group cursor-pointer flex"
                    onClick={() => Navigator(`/watch/${videoItem._id}`)}
                  >
                    <div className="h-28 w-72 pb-5">
                      <img
                        className="w-full h-full"
                        src={videoItem.thumbnail}
                        alt={videoItem.title}
                      />
                    </div>
                    <div className="mb-4">
                      { (
                        <NavLink to={`/profile?channel=${videoItem.userDetails[0]._id}`}>
                          <div className="flex flex-col items-start">
                            <h2 className="font-normal text-white text-start hover:underline text-1xl pl-2 pr-4">
                              {videoItem.title}
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              {videoItem.userDetails[0].username}
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              views {videoItem.views}
                            </h2>
                          </div>
                        </NavLink>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-white p-4">
                  You have not uploaded any videos
                  <PublishVideoCompount />
                </h2>
              )}
            </AllVideoWrapper>
          )}
        </div>
      </main>
    </div>
  );
}
