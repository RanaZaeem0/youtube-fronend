import React from "react";
import useGetLikeVideo from "../hook/useGetUserLikeVideo";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllVideoWrapper from "../compount/AllVideoWrapper";
import AllVideoSkeleton from "../compount/skeleton/AllVideoSkeleton";
import {formatDistanceToNow} from "date-fns"
export default function LikeVideoCompount() {
  const Navigator = useNavigate();
  const { likeVideo, isLoading } = useGetLikeVideo();
  console.log(likeVideo);
  console.log(likeVideo?.map((item) => item.VideoData.map((u) => u.title)));
  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
  return (
    <div>
      {!isLoading ? (
        <AllVideoWrapper className="grid grid-cols-1  gap-6">
          <h1 className="font-bold text-2xl pl-5 pt-5">Like Videos</h1>
          <div className="">
            {likeVideo?.map((item) => {
              return (
                <div className="">
                  {item.VideoData.map((video) => {
                    return (
                      <div className="" key={video._id}>
                        <div
                          className="bg-background flex pl-7 rounded-lg overflow-hidden group cursor-pointer"
                          onClick={() => Navigator(`/watch/${video._id}`)}
                        >
                          <div className="h-60 w-96 pb-5">
                            <img
                              className="w-full h-full"
                              src={video.thumbnail}
                              alt={video.thumbnail}
                            />
                          </div>
                          {video.ChannalDetails.map((channal) => {
                            return (
                              <NavLink to={`/profile?channal=${channal._id}`}>
                                <div className="flex flex-col items-start ">
                                  <h2
                                    className="font-normal
                 text-white text-start hover:underline text-sm  pl-2 pr-4"
                                  >
                                    {video.title}
                                  </h2>
                                  <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                                    {channal.username}
                                  </h2>
                                  <div className="flex">
                                    <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                                      viewss {video.views}
                                    </h2>
                                    <h3 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                                      {formatDateRelative(video?.createdAt)}
                                    </h3>
                                  </div>
                                </div>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className=""></div>
        </AllVideoWrapper>
      ) : (
        <AllVideoSkeleton className="" />
      )}
    </div>
  );
}
