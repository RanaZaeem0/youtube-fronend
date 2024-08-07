import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "../../compount/img/icon.webp";
import img2 from "../../compount/img/youtube.webp";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton";
import AllVideoWrapper from "../AllVideoWrapper";
import useGetUserVideo from "../../hook/useGetUserVideo.ts";
import useGetUserProfile from "../../hook/useGetUserProfile.ts";
import { log } from "console";
import usegetChannalVideotByusername from "../../hook/useGetChannalVideo.ts";
import { formatDistanceToNow } from "date-fns";
export default function ChannalProfile() {
  const { userProfile, isProfileLoading } = useGetUserProfile();
  const { getChannalVideo, isLoading } = usegetChannalVideotByusername();
  const Navigator = useNavigate();
  console.log(getChannalVideo);

  function formatDateRelative(date: Date) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <div className="flex flex-col min-h-dvh">
      {!isProfileLoading
        ? userProfile && (
            <header className="relative h-52 overflow-hidden">
              <img
                src={userProfile.coverImage}
                alt="Cover image"
                width={1920}
                height={480}
                className="absolute inset-0 h-full w-full object-cover bg-no-repeat"
                style={{ aspectRatio: "1920/480", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <img src={userProfile.avatar} className="h-12 w-12" alt="" />
                <div className="space-y-1 text-white">
                  <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                  <p className="text-sm">Subscriber {userProfile.subscribersCount}</p>

                </div>
              </div>
            </header>
          )
        : null}
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <AllVideoSkeleton className=" grid-cols-3" />
          ) : (
            <AllVideoWrapper className="grid grid-cols-3 items-center justify-center  ">
              {getChannalVideo && getChannalVideo.length > 0 ? (
                getChannalVideo.map((video, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg overflow-hidden group cursor-pointer flex flex-col"
                    onClick={() => Navigator(`/watch/${video._id}`)}
                  >
                    <div className="h-28 w-72 pb-5">
                      <img
                        className="w-full h-full"
                        src={video.thumbnail}
                        alt={video.thumbnail}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="">
                       
                          <div className="flex flex-col items-start ">
                            <div className="flex p-1">
                              <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
                                <span className="font-medium text-white dark:text-gray-300">
                                  <img src={userProfile?.avatar} alt="" />
                                </span>
                              </div>
                              <h2 className="font-medium text-gray-600 hover:underline text-1xl text-center pl-2 pr-4">
                                {userProfile?.username}
                              </h2>
                            </div>
                            <div className="flex p-1 ">
                              <h3 className="text-neutral-500 mr-1">
                                {video.views}K views{" "}
                              </h3>
                              <h3 className="text-neutral-500">
                                {formatDateRelative(video.createdAt)}
                              </h3>
                            </div>
                          </div>
                  
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
