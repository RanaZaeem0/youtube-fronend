import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import youtubeIcon from "./img/youtube.webp";
import IconYoutube from "./img/icon.webp";
import Button from "./helperCompount/Button";
import Input from "./helperCompount/Input";
import img1 from "./img/icon.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import NavAvatars from "./helperCompount/NavAvatar";
import {faBars, faBarsProgress, faBell, faClockRotateLeft, faHouse, faThumbsUp, faUser, faVideo} from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const [LoginState, setLoginState] = useState(false);
  const [sidebarOpen,setSidebarOpen] = useState(false)
  const refreshToken = localStorage.getItem("refreshToken");

  //  if(refreshToken !== "undefined" && refreshToken !== "" ){
  //     setLoginState(true)
  //  }
  const Navigator = useNavigate();

   const handleSidebar = ()=>{
    setSidebarOpen(!sidebarOpen)
   }

  return (
    <div>
      <div className="flex w-full items-center justify-between">
    <div className="flex gap-2 pl-2">
    <button onClick={handleSidebar}> <FontAwesomeIcon icon={faBars} /></button>
    {
      sidebarOpen && <div className="w-96 bg-neutral-900 h-full absolute ">
   <div className="flex justify-between  pl-5 pr-4">
   <ul>
 <h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faHouse} />  Home</h2>
<h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faUser} />Your channel</h2>
<h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faClockRotateLeft} />History</h2>
<h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faBarsProgress} />Playlists</h2>
<h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faVideo} />Your videos</h2>
<h2 className="px-2 py-3 mr-2"><FontAwesomeIcon icon={faThumbsUp} />Liked videos</h2>


        </ul>
        <button onClick={handleSidebar}>X</button>
   </div>
      </div>
    }
        <div
          className="flex items-center justify-center pl-3 "
          onClick={() => Navigator("/")}
        >
          <img className="h-10 w-12 mr-2" src={IconYoutube} alt="" />
          <h2 className="font-bold text-white ">Youtube</h2>
        </div>
    </div>
        <div className="flex  border-neutral-400 border items-center justify-center w-full max-w-md rounded-full bg-muted ">
          <input type="text" 
          placeholder="Seach .. "
          className="w-full h-full m-2 bg-black text-neutral-300 rounded-full  shadow-sm focus:outline-none  " />
          <SearchIcon className="w-10 rounded-r-xl h-full bg-slate-800   mr-1  text-muted-foreground" />
        </div>
        <div className="p-2">
          {!refreshToken ||
          refreshToken === "undefined" ||
          refreshToken.length < 10 ? (
            <button
              onClick={() => Navigator("/signup")}
              className="w-full text-blue-700
       bg-gray-800 mt-2 p-2 font-medium rounded-xl "
            >
              {" "}
              Sign Up
            </button>
          ) : (
            <div className=" bottom-4 left-4 \ flex items-center gap-4 text-white">
              <div className="" onClick={() => Navigator("/publishvideo")}>
                Publish Video
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

function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
     
     
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
