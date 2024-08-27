import axios from "axios";
import { useState, useEffect } from "react";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton";
import Avatar from "./helperCompount/Avatar";
import useAllvideo from "../hook/useAllvideo";
import { NavLink, useNavigate } from "react-router-dom";
import AllVideoWrapper from "./AllVideoWrapper";
import { formatDistanceToNow } from "date-fns";

export default function SideBarVideos() {
  const limit = 9;
  const page = 0;
  const { isLoading, videos } = useAllvideo({ limit, page });
  const Navigator = useNavigate();

  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <div className="">
      <div className="container w-full px-4 py-8 ">
        {isLoading ? (
          <AllVideoSkeleton className="grid-cols-1" />
        ) : (
          <AllVideoWrapper className="grid grid-cols-1 items-center justify-center">
            {videos &&
              videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-background w-full rounded-lg   cursor-pointer flex"
                  onClick={() => {
                    Navigator(`/watch/${video._id}`);
                    // Avoid location.reload() here
                  }}
                >
                  <div className="h-28 rounded-xl w-2/5 pb-5">
                    <div className="flex items-center justify-center  rounded-xl w-full h-full">
                      <img
                        className="w-full  rounded-lg h-full"
                        src={video.thumbnail}
                        alt={video.title}
                      />
                    </div>
                  </div>
                  <div className="mb-4 pl-2 w-3/5">
                    <div className="">
                      <NavLink
                        to={`/profile?channal=${video.channalDetails[0]._id}`}
                      >
                        <div className="flex flex-col items-start">
                          <h2 className="text-sm w-full h-auto overflow-hidden text-ellipsis whitespace-nowrap">{video.title}</h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            {video.channalDetails[0].username}
                          </h2>
                          <div className="flex">
                            <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              views {video.views}
                            </h2>
                            <h3 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                              {formatDateRelative(video.createdAt)}
                            </h3>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
          </AllVideoWrapper>
        )}
      </div>
    </div>
  );
}

// SVG Icons (consider moving to a separate file if they are reused)
function DoorClosedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
