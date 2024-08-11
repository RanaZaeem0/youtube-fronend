import axios from "axios";
import { useState, useEffect } from "react";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton.tsx";
import Avatar from "./helperCompount/Avatar.js";
import useAllvideo from "../hook/useAllvideo.js";
import { useNavigate } from "react-router-dom";
import AllVideoWrapper from "./AllVideoWrapper.tsx";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons"
import VideoDropdown from "./helperCompount/VideoDropdown.tsx"

export default function Component() {
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(0);
  const { isLoading, videos } = useAllvideo({ limit, page });
  const Navigator = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const hanldeShowMore = () => {
    setLimit(limit+ 6);
    setPage(page + 1);
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <AllVideoSkeleton className="grid-cols-3" />
        ) : (
          <div className="w-auto overflow-hidden pt-4 ">
            <div className="mb-5 ml-4 flex items-center ">
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                All
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Podcasts
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Music
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Mixes
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Source code
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                AI
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Software framwork
              </button>
              <button className="bg-neutral-800  hover:bg-neutral-700  border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Google
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Algouthme
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Comedy clube{" "}
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Live
              </button>
              <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-normal">
                Drama
              </button>
            </div>
            <AllVideoWrapper className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos &&
                videos.map(
                  (video, index) =>
                    video.isPublished && (
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
                        <h2 className="text-1xl h-12">{video.title}</h2>
                       <div className="flex justify-between w-full">
                       <Avatar
                          avatarImage={video.channalDetails[0].avatar}
                          videoViews={video.views}
                          username={video.channalDetails[0].username}
                          channalId={video.channalDetails[0]._id}
                          createdAt={video.createdAt}
                        />
                     <div className="relative">
                     <VideoDropdown/>
                     </div>
                       </div>

                       
                      </div>
                    )
                )}
            </AllVideoWrapper>
            <div className="flex items-center justify-center mt-5">
              <button onClick={hanldeShowMore} className="bg-red-400 p-2  rounded-xl ">
                Show More
              </button>
            </div>
          </div>
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
