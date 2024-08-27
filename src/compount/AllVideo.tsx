import axios from "axios";
import { useState, useEffect } from "react";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton.tsx";
import Avatar from "./helperCompount/Avatar.js";
import useAllvideo from "../hook/useAllvideo.js";
import { useNavigate } from "react-router-dom";
import AllVideoWrapper from "./AllVideoWrapper.tsx";
import LeftSidebar from "./helperCompount/LeftSidebar.tsx";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import VideoDropdown from "./helperCompount/VideoDropdown.tsx";

export default function Component() {
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(0);
  const { isLoading, videos } = useAllvideo({ limit, page });
  const Navigator = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const hanldeShowMore = () => {
    setLimit(limit + 6);
    setPage(page + 1);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <AllVideoSkeleton className="grid-cols-3" />
        ) : (
          <div className="w-auto   overflow-hidden pt-2 flex ">
            <LeftSidebar className="w-1/6 max-lg:hidden" />

            <div className="w-[90%] max-lg:w-full lg:relative left-24 flex flex-col items-end justify-end ">
              <div className="mb-5 ml-0 w-full flex items-start overflow-hidden  text-nowrap ">
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  All
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Music
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Podcasts{" "}
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Software development
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Universities
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Indian pop music
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Hip hop
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Live
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  New to you
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Watched
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Recently uploaded
                </button>
                <button className="bg-neutral-800  hover:bg-neutral-700 border-neutral-800  border px-3 py-1 ml-2 mr-2 rounded-lg font-medium text-sm">
                  Public speaking
                </button>
              </div>
              <AllVideoWrapper className="">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos &&
                    videos.map(
                      (video, index) =>
                        video.isPublished && (
                          <div
                            key={index}
                            className="bg-background  overflow-hidden group cursor-pointer"
                          >
                            <div
                              className="h-56 w-[22rem] max-md:w-full pb-5 "
                              onClick={() => Navigator(`/watch/${video._id}`)}
                            >
                              <div className="flex justify-center items-center w-full h-full ">
                                <img
                                  className="w-full rounded-xl object-fill h-full"
                                  src={video.thumbnail}
                                  alt={video.thumbnail}
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-between w-full">
                              <Avatar
                              videoTitle={video.title}
                                avatarImage={video.channalDetails[0].avatar}
                                videoViews={video.views}
                                username={video.channalDetails[0].username}
                                channalId={video.channalDetails[0]._id}
                                createdAt={video.createdAt}
                              />
                              <div className="relative">
                                <VideoDropdown videoId={video._id} />
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  <div className="flex items-center justify-center mt-5">
                    <button
                      onClick={hanldeShowMore}
                      className="bg-red-400 p-2  rounded-xl "
                    >
                      Show More
                    </button>
                  </div>
                </div>
              </AllVideoWrapper>
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
