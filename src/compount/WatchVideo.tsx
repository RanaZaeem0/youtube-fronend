import React, { useEffect, useState } from "react";
import usegetVideobyId from "../hook/usegetVideobyId";
import Avatar from "./helperCompount/Avatar";
import SideBarVideos from "./SideBarVideos";
import axios from "axios";
import { log } from "console";
import CreateComments from "./comments/CreateComment";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton";
import getRefreshToken from "../config";
import { channel } from "diagnostics_channel";
import useAddWatchhistory from "../hook/useAddWatchhistory";
import { useNavigate } from "react-router-dom";
import LikeButton from "./helperCompount/LikeButton";
import SubcriberBtn from "./helperCompount/SubcriberBtn";
import WatchVideoSkeleton from "./skeleton/WatchVideoSkeleton";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoDropdown from "../compount/helperCompount/VideoDropdown"

export default function WatchVideo() {
  const [videoPLay, setVideoPlay] = useState(true);
  const { isLoading, video } = usegetVideobyId();
  const username = video?.channalDetails[0]?.username;

  const { addWatchHistory } = useAddWatchhistory();
  const Navigator = useNavigate();

    const handleShareClick  =()=>{

    }
  function formatDateRelative(date: string | undefined): string {
    if (!date) {
      return "Date not available";
    }

    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <WatchVideoSkeleton />
        ) : (
          <div className="flex max-lg:flex-col ">
            <div className="flex items-start justify-start flex-col max-lg:ml-0 ml-2 w-3/5 max-lg:w-full">
              <div className="w-full bg-background pb-8 rounded-lg overflow-hidden group ">
                <div className=" aspect-video">
                  {!videoPLay && (
                    <img
                      src={video?.thumbnail}
                      alt={video?.thumbnail}
                      className="object-cover"
                    />
                  )}
                  {videoPLay && (
                    <div className=" h-72">
                      <video
                        className="w-full shadow-zinc-400 shadow-[0px , 0px , 10px ,10px] "
                        src={video?.videoFile}
                        autoPlay
                        controls
                      ></video>
                    </div>
                  )}
                </div>
                <h2 className="font-medium text-2xl py-4">{video?.title}</h2>

                <div className="flex  items-center w-full justify-between gap-5 ">
                  <div className="flex max-sm:flex-col max-sm:items-start  items-center  w-full justify-between pr-4 ">
                    <div className=" flex justify-center items-center gap-3">
                      <NavLink
                        to={`/channal/profile/${video?.channalDetails[0].username}`}
                      >
                        <div className="flex flex-col p-1">
                          <div className="flex">
                            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
                              <span className="font-medium text-white dark:text-gray-300">
                                <img
                                  src={video?.channalDetails[0].avatar}
                                  alt=""
                                />
                              </span>
                            </div>
                            <div className="flex flex-col items-start">
                              <h2 className="font-medium text-gray-200 hover:underline text-1xl text-center pl-2 pr-4">
                                {video?.channalDetails[0]?.username}
                              </h2>
                              <h2 className="font-medium text-gray-600 flex hover:underline text-1xl text-start text-nowrap pl-2 pr-4">
                                {video?.channalDetails[0]?.subscribersCount}{" "}
                                Subcribers
                              </h2>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                      <div className="flex w-full ">
                        <SubcriberBtn
                          channalId={video?.channalDetails[0]._id}
                          isSubscribed={video?.channalDetails[0]?.isSubscribed}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      <div onClick={handleShareClick} className=" px-4  flex  items-center rounded-full py-2 bg-zinc-800">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <h2 className="pl-2 font-normal text-sm">Share</h2>
                      </div>

                      <div className=" px-4  flex  items-center rounded-full py-2 bg-zinc-800">
                        <LikeButton
                          videoId={video?._id}
                          videoLike={video?.videoLikes}
                        />
                      </div>
                      <div  className="  py-5 flex h-2 items-center rounded-full  bg-zinc-800">
                        <VideoDropdown videoId={video?._id}/>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-800 h-28 mt-3 rounded-lg p-2  w-full ">
                <div className="flex p-1  text-base font-semibold">
                  <h3 className="text-neutral-200 mr-1">
                    {video?.views} Views{"  "}
                  </h3>
                  <h3 className="text-neutral-200">
                    {formatDateRelative(video?.createdAt)}
                  </h3>
                </div>
                <h2 className="text-sm w-full h-auto overflow-hidden text-ellipsis  ">{video?.description}</h2>
                 <button className="flex w-full items-baseline justify-end">...more</button>
                </div>
              </div>
              <CreateComments />
            </div>
            <div className="w-2/5 pr-10 max-lg:w-full">
              <SideBarVideos />
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
