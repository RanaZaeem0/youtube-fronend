import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "../../compount/img/icon.webp";
import img2 from "../../compount/img/youtube.webp";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton.tsx";
import AllVideoWrapper from "../AllVideoWrapper.tsx";
import useGetUserVideo from "../../hook/useGetUserVideo.ts";
import useGetUserProfile from "../../hook/useGetUserProfile.ts";
import useGetChannalProfile from "../../hook/useGetChannalprofile.ts"
import { log } from "console";
import ProfileAvatar from "../Profiles/ProfileAvatar.tsx"
import usegetChannalVideotByusername from "../../hook/useGetChannalVideo.ts";
import { formatDistanceToNow } from "date-fns";
import {VideoDropdown,Avatar} from "../helperCompount/index.ts"
export default function ChannalProfile() {
  const { getChannalVideo, isLoading } = usegetChannalVideotByusername();
  const { channalProfile,isChannalProfileLoading } = useGetChannalProfile()

  const Navigator = useNavigate();
  console.log(channalProfile);

  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
  const totalVideoCount  =  !isLoading && getChannalVideo.length
 
  return (
    <div className="flex flex-col min-h-dvh">
      <ProfileAvatar userProfile={channalProfile} isProfileLoading={!isChannalProfileLoading} TotalVideos={totalVideoCount} />
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <AllVideoSkeleton className=" grid-cols-3" />
          ) : (
            <AllVideoWrapper className="grid grid-cols-3 max-lg:grid-cols-1 items-center justify-center  ">
              {getChannalVideo && getChannalVideo.length > 0 ? (
                getChannalVideo.map((video, index) => (
                  <div
                        key={index}
                        className="bg-background rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <div
                          className="h-60 w-96 max-md:w-full pb-5"
                          onClick={() => Navigator(`/watch/${video._id}`)}
                        >
                          <img
                            className="w-full h-full"
                            src={video.thumbnail}
                            alt={video.thumbnail}
                          />
                        </div>
                    
                       <div className="flex justify-between w-full">
                       <Avatar
                       videoTitle={video.title}
                          avatarImage={channalProfile?.avatar}
                          videoViews={video.views}
                          username={channalProfile?.username}
                          channalId={channalProfile?._id}
                          createdAt={video.createdAt}
                        />
                     <div className="relative">
                     <VideoDropdown videoId={video._id}/>
                     </div>
                       </div>

                       
                      </div>
                ))
              ) : (
                <h2 className="text-white p-4">
                  <h2>Not Video Avalibale</h2>
                </h2>
              )}
            </AllVideoWrapper>
          )}
        </div>
      </main>
    </div>
  );
}
