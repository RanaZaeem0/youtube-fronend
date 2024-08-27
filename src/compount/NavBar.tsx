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
    <div className="flex flex-col  w-full items-center justify-between top-0  pb-1 fixed z-20 px-2 max-lg:px-0 bg-black">
      <div className="flex  w-full items-center justify-between ">
        <div className="flex gap-2 items-center ">
          <NavSideBar />

          <div
            className="flex items-center justify-center pl-3 max-lg:pl-0 "
            onClick={() => Navigator("/")}
          >
            <img
              className="h-8 w-8 mr-2 max-lg:mr-1 "
              src={IconYoutube}
              alt=""
            />
            <h2 className="font-bold text-sm text-white ">Youtube</h2>
          </div>
        </div>
        <div className="flex max-lg:w-52 max-sm:w-24 border-neutral-700 border items-center justify-center  w-[48%] rounded-full bg-muted ">
          <input
            type="text"
            className="w-full border-none h-full m-2 ml-5 bg-black text-neutral-500 rounded-full  shadow-sm focus:outline-none  "
            placeholder="Search "
          />
          <div className="bg-zinc-700 w-14 flex items-center justify-center h-10 border-l rounded-r-full">
            <FontAwesomeIcon className="pr-4  pl-2 " icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="p-2">
          {!refreshToken ||
          refreshToken === "undefined" ||
          refreshToken.length < 10 ? (
            <button
              onClick={() => Navigator("/signup")}
              className="w-full text-blue-600 border border-zinc-700 max-lg:text-sm 
       bg-black  px-3 py-2 font-semibold shadow-xl rounded-full "
            >
              <FontAwesomeIcon className="pr-2" icon={faUser} />
              Sign in
            </button>
          ) : (
            <div className=" bottom-4 left-4 \ flex items-center gap-4 text-white">
              <div className="max-lg:hidden">
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
