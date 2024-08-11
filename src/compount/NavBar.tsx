import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import youtubeIcon from "./img/youtube.webp";
import IconYoutube from "./img/icon.webp";
import Button from "./helperCompount/Button";
import Input from "./helperCompount/Input";
import img1 from "./img/icon.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavSideBar from "./helperCompount/NavSideBar";
import NavAvatars from "./helperCompount/NavAvatar";
import {
  faBars,
  faBarsProgress,
  faBell,
  faClockRotateLeft,
  faHouse,
  faThumbsUp,
  faUser,
  faVideo,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PublishVideoCompount from "./PublishVideo";

export default function NavBar() {
  const [LoginState, setLoginState] = useState(false);
  const [publishVideo, setpublishVideo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");

  //  if(refreshToken !== "undefined" && refreshToken !== "" ){
  //     setLoginState(true)
  //  }

  const Navigator = useNavigate();

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const username = localStorage.getItem("username");
  return (
    <div>
      <div className="flex w-full items-center justify-between py-2 fixed z-20 px-2 bg-black">
        <div className="flex gap-2 items-center ">
          <NavSideBar />

          <div
            className="flex items-center justify-center pl-3 "
            onClick={() => Navigator("/")}
          >
            <img className="h-8 w-10 mr-2" src={IconYoutube} alt="" />
            <h2 className="font-bold text-sm text-white ">Youtube</h2>
          </div>
        </div>
        <div className="flex max-lg:w-20 border-neutral-600 border items-center justify-center w-full max-w-md rounded-full bg-muted ">
      <input type="text"className="w-full border-none h-full m-2 ml-5 bg-black text-neutral-300 rounded-full  shadow-sm focus:outline-none  "
      placeholder="Search ..." />
          <FontAwesomeIcon className="pr-4 border-l pl-2 " icon={faMagnifyingGlass} />
        </div>
        <div className="p-2">
          {!refreshToken ||
          refreshToken === "undefined" ||
          refreshToken.length < 10 ? (
            <button
              onClick={() => Navigator("/signup")}
              className="w-full text-blue-700 max-lg:text-sm
       bg-gray-900 mt-2 p-2 font-medium rounded-xl "
            >
              {" "}
              Sign Up
            </button>
          ) : (
            <div className=" bottom-4 left-4 \ flex items-center gap-4 text-white">
              <div className="">
                <button onClick={() => Navigator("/publishvideo")}>
                  PublishVideo
                </button>
              </div>
              <FontAwesomeIcon icon={faBell} />
              <div className="">
                <NavAvatars />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
