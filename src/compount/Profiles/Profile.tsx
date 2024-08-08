import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "../../compount/img/icon.webp";
import img2 from "../../compount/img/youtube.webp";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton.tsx";
import AllVideoWrapper from "../AllVideoWrapper.tsx";
import useGetUserVideo from "../../hook/useGetUserVideo.ts";
import useGetUserProfile from "../../hook/useGetUserProfile.ts";
import  ProfileAvatar from "./ProfileAvatar.tsx"
import { log } from "console";
export default function Component() {
  const { userProfile, isProfileLoading } = useGetUserProfile();
  const { video, isLoading } = useGetUserVideo();
  const Navigator = useNavigate();
  console.log(userProfile);

  return (
    <div className="flex flex-col min-h-dvh">
      <ProfileAvatar userProfile={userProfile} isProfileLoading={isProfileLoading} />
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto px-4 py-8">
          <h2>
            <button className="px-4 py-2 rounded font-medium bg-blue-500">
              Create tweet
            </button>
          </h2>
          {isLoading ? (
            <AllVideoSkeleton className=" grid-cols-3" />
          ) : (
            <AllVideoWrapper className="grid grid-cols-1 items-center justify-center  ">
              {video && video.length > 0 ? (
                video.map((video, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg overflow-hidden group cursor-pointer flex"
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
                        <NavLink
                          to={`/profile?channal=${video.UserDetails[0]._id}`}
                        >
                          <div className="flex flex-col items-start ">
                            <h2
                              className="font-normal
                         text-white text-start hover:underline text-1xl pl-2 pr-4"
                            >
                              {video.title}
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              {video.UserDetails[0].username}
                            </h2>
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              views {video.views}
                            </h2>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-white p-4">
                  You does not uploaded any video
                  <button
                    className="px-4 py-2 rounded font-medium bg-blue-500"
                    onClick={() => Navigator("/publishvideo")}
                  >
                    Upload Video
                  </button>
                </h2>
              )}
            </AllVideoWrapper>
          )}
        </div>
      </main>
    </div>
  );
}
