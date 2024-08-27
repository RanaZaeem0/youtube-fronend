import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faBars,
  faBarsProgress,
  faBell,
  faClockRotateLeft,
  faHouse,
  faThumbsUp,
  faUser,
  faVideo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function LeftSidebar({ className }: { className: string }) {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  return (
    <div className={`${className} w-1/6 fixed `}>
      <div className="flex flex-col gap-5 items-start justify-center ">
        <li
          onClick={() => {
            navigate(`/`);
          }}
          className=" flex  text-xs items-center pl-4  flex-col "
        >
          <FontAwesomeIcon className="text-lg py-2" icon={faHouse} />{" "}
          <h1 className="text-center ">Home</h1>{" "}
        </li>
        <li
          onClick={() => {
            navigate(`/profile/${username}`);
          }}
          className=" text-xs flex items-center    flex-col  "
        >
          {" "}
          <FontAwesomeIcon className=" text-lg py-2" icon={faUser} />
          <h1>Your Profile</h1>
        </li>
        <li
          onClick={() => {
            navigate(`/`);
          }}
          className=" text-xs flex flex-col   "
        >
          {" "}
          <FontAwesomeIcon className=" text-lg py-2" icon={faVideo} />{" "}
          Subcribers
        </li>
        <li
          onClick={() => {
            navigate(`/playlist`);
          }}
          className=" text-xs flex  pl-2  flex-col  "
        >
          {" "}
          <FontAwesomeIcon
            className="pl-1 text-lg py-2"
            icon={faBarsProgress}
          />
          Playlist
        </li>
        <li
          onClick={() => {
            navigate(`/likeVidoes/`);
          }}
          className="  text-xs flex    flex-col  "
        >
          <FontAwesomeIcon className="  text-lg py-2" icon={faThumbsUp} />
          Like Videos
        </li>
      </div>
    </div>
  );
}
