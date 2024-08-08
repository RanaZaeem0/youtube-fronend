import React, { useEffect, useState } from "react";
import usegetVideobyId from "../hook/usegetVideobyId";
import Avatar from "./helperCompount/Avatar";
import SideBarVideos from "./SideBarVideos";
import axios from "axios";
import { log } from "console";
import CreateComments from "./comments/CreateComment";
import GetAllComment from "./comments/GetAllComment";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton";
import getRefreshToken from "../config"
import { channel } from "diagnostics_channel";
import useGetChannalProflie from "../hook/useGetChannalDetails";
import useAddWatchhistory from "../hook/useAddWatchhistory";
import { useNavigate } from "react-router-dom";
import LikeButton from "./helperCompount/LikeButton";
import SubcriberBtn from "./helperCompount/SubcriberBtn";
export default function WatchVideo() {

  const [videoPLay, setVideoPlay] = useState(true);
  const { isLoading, video } = usegetVideobyId();
   const {channalProfile} = useGetChannalProflie()
    const {addWatchHistory} = useAddWatchhistory()
    const  Navigator = useNavigate()

    


  
  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <AllVideoSkeleton />
        ) : (
          <div className="flex max-lg:flex-col ">
            <div className="flex items-start justify-start flex-col max-lg:ml-0 ml-16 w-3/5 max-lg:w-full">
              <div className="w-full bg-background pb-8 rounded-lg overflow-hidden group cursor-pointer">
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
                        className="w-full "
                        src={video?.videoFile}
                        autoPlay
                        controls
                      ></video>
                    </div>
                  )}
                </div>
                <h2 className="font-medium text-2xl py-4">{video?.title}</h2>
                
                
                <div className="flex  items-center w-full justify-between ">
                    <div className="flex  items-center w-full justify-between ">
                    <NavLink 
                    to={`/channal/profile/${video?.channalDetails[0].username}`}>
                    <div className="flex flex-col p-1">
                      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
                        <span className="font-medium text-white dark:text-gray-300">
                          <img src={video?.channalDetails[0].avatar} alt="" />
                        </span>
                      </div>
                      <h2 className="font-medium text-gray-600 hover:underline text-1xl text-center pl-2 pr-4">
                        {video?.channalDetails[0]?.username}
                      </h2>
                    </div>
                    </NavLink>
                    <div className="flex pr-4">
                      <SubcriberBtn channalId={video?.channalDetails[0]._id} />
                      <div className="flex mr-2">
                        <LikeButton videoId={video?._id} videoLike={video?.videoLikes} />
                      </div>
                    </div>
                    
                  </div>
                    
                    
                  </div>
                  <div className="flex p-1 ">
                      <h3 className="text-neutral-500 mr-1">
                        {video?.views}K views{" "}
                      </h3>
                      <h3 className="text-neutral-500">
                        {formatDateRelative(video?.createdAt)}
                      </h3>
                    </div>
             
              </div>
              <CreateComments />
            </div>
            <div className="w-2/5 max-lg:w-full" >
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
