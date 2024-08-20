import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../../compount/img/icon.webp";
import img2 from "../../compount/img/youtube.webp";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton.tsx";
import AllVideoWrapper from "../AllVideoWrapper.tsx";
import useGetUserVideo from "../../hook/useGetUserVideo.ts";
import ProfileAvatar from "./ProfileAvatar.tsx";
import CreateTweet from "../tweet/CreateTweet.tsx";
import PublishVideoCompount from "../PublishVideo.tsx";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from '../../store/store.ts';

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
  UserDetails: UserData[];
  videoLikes: number;
}

type AllVideoData = VideoData[];

export default function ProfileComponent() {
  const [showVideos,setShowVideos] = useState(true)
  const { video, isLoading } = useGetUserVideo(); // Use the correct type for video
  const [openTweet, setOpenTweet] = useState(false);
  const Navigator = useNavigate();
  
  
  console.log(video)
  const handleTweet = () => {
    setOpenTweet(!openTweet);
  };
  const {status,userData} = useSelector((state:RootState) => state.auth)
  console.log(userData)
  interface UserProfile {
    username: string;
    _id:string;
    email:string;
    avatar: string;
    coverImage: string;
    subscribersCount: number;
    isSubscribed: boolean;
  }
  
  const userProfile: UserProfile | null = userData
    ? {
         _id:userData._id,
        username: userData.username,
        email:userData.email,
        avatar: userData.avatar || '', // Default to empty string if undefined
        coverImage: userData.coverImage || '',
        subscribersCount: userData.subscribersCount || 0,
        isSubscribed: userData.isSubscribed || false,
      }
    : null;
  return (
    <div className="flex flex-col pt-2">
      <ProfileAvatar userProfile={userProfile} isProfileLoading={status} />
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto px-4 py-8">
          <div>
            <h2 className="w-full underline border-b-2 py-4 m-5 items-end justify-center bg-transparent">
              <button
                className="rounded-lg text-zinc-400 bg-zinc-800 mr-2 hover:bg-zinc-100 p-4"
                onClick={() => Navigator('/publishvideo')}
              >
                Publish Video
              </button>
       { showVideos&&      <button
                className="rounded-lg text-zinc-400 bg-zinc-800 hover:bg-zinc-100 p-4"
                onClick={() => setShowVideos(!showVideos)}
              >
                Create Tweet
              </button>}
           {!showVideos &&
              <CreateTweet  />}
            </h2>
          </div>
         
       {showVideos ? <div className="">
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
                      
                        <NavLink to={`/profile?channel=${videoItem.UserDetails[0]._id}`}>
                          <div className="flex flex-col items-start">
                            <h2 className="font-normal text-white text-start hover:underline text-1xl pl-2 pr-4">
                              {videoItem.title} zain
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              {videoItem.UserDetails[0].username}
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              views {videoItem.views}
                            </h2>
                          </div>
                        </NavLink>
                      
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-white p-4">
                  You have not uploaded any videos
                  
                </h2>
              )}
            </AllVideoWrapper>
          )} 
       </div>  
      : null}
        </div>
      </main>
    </div>
  );
}
