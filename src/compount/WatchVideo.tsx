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
export default function WatchVideo() {
  const [videoPLay, setVideoPlay] = useState(true);
  const { isLoading, video } = usegetVideobyId();
  const handleLike = async () => {
    const token = localStorage.getItem("token");


  };


  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <h2>loadind</h2>
        ) : (
          <div className="flex max-lg:flex-col ">
            <div className="flex items-start justify-start flex-col ml-16 w-3/5 max-lg:w-full">
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
                <NavLink to={`/channal`}>
                  <div className="flex flex-col items-start ">
                    <div className="flex p-1">
                      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
                        <span className="font-medium text-white dark:text-gray-300">
                          <img src="" alt="" />
                        </span>
                      </div>
                      <h2 className="font-medium text-gray-600 hover:underline text-1xl text-center pl-2 pr-4">
                        {video.channalDetails.username}
                      </h2>
                    </div>
                    <div className="flex p-1 ">
                      <h3 className="text-neutral-500 mr-1">
                        {video.channalDetails.views}K views{" "}
                      </h3>
                      <h3 className="text-neutral-500">{formatDateRelative(video?.createdAt)}</h3>
                    </div>
                  </div>
                </NavLink>
                <div className="flex">
                  <button onClick={handleLike}>
                    <button
                      type="button"
                      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </button>
                </div>
              </div>
              <CreateComments />
            </div>
            <div className="">
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
