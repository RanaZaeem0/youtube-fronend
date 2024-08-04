import axios from "axios";
import { useState, useEffect } from "react";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton.tsx";
import Avatar from "./helperCompount/Avatar.js";
import useAllvideo from "../hook/useAllvideo.js";
import { NavLink, useNavigate } from "react-router-dom";
import AllVideoWrapper from "./AllVideoWrapper.tsx";
import { format } from "path";
import { formatDate, formatDistanceToNow } from "date-fns";

export default function SideBarVideos() {
  const { isLoading, videos } = useAllvideo();
  const Navigator = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  function formatDateRelative(date: Date) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <AllVideoSkeleton className="gird-cols-1" />
        ) : (
          <AllVideoWrapper className="grid grid-cols-1 items-center justify-center  ">
            {videos &&
              videos.map((video, index) => (
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
                        to={`/profile?channal=${video.channalDetails[0]._id}`}
                      >
                        <div className="flex flex-col items-start ">
                        <h2 className="font-normal
                         text-white text-start hover:underline text-1xl pl-2 pr-4">
                            {video.title}
                          </h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            {video.channalDetails[0].username}
                          </h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            views {video.views}
                          </h2>
                          <h3 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">{formatDateRelative(video.createdAt)}</h3>
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
