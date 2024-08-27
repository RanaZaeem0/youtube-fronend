import React, { useState } from "react";
import useGetUserProfile from "../../hook/useGetUserProfile";
import { log } from "console";
import SubcriberBtn from "../helperCompount/SubcriberBtn";
import CoverImagePopUp from "./CoverImagePopUp";
import ChangeAvatarImage from "./ChangeAvatarPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  isSubscribed: boolean;
}

interface ProfileAvatarProps {
  userProfile: UserProfile | null; // The profile might be null when loading
  isProfileLoading?: boolean;
  TotalVideos?:number | boolean
}

export default function ProfileAvatar({
  userProfile,
  isProfileLoading,
  TotalVideos
}: ProfileAvatarProps) {
  const [isCoverImagePopupVisible, setCoverImageIsPopupVisible] =
    useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  console.log(userProfile?.username);
  const showCoverImage = () => setCoverImageIsPopupVisible(true);
  const hideCoverImagePopup = () => setCoverImageIsPopupVisible(false);
  const showAvatarImage = () => setIsPopupVisible(true);
  const hideAvatarImagePopup = () => setIsPopupVisible(false);

  const usernameLocal = localStorage.getItem("username");

  return (
    <div>
      {isProfileLoading
        ? userProfile && (
            <header className=" h-96 overflow-hidden">
              {userProfile?.coverImage.length > 1 && (
                <div className="flex items-center w-full justify-center">
                  <img
                    src={userProfile?.coverImage}
                    alt="Cover image"
                    className="w-5/6  inset-0 h-40  rounded-xl object-cover bg-no-repeat"
                    style={{ aspectRatio: "1920/480", objectFit: "cover" }}
                  />
                </div>
              )}
              {userProfile?.username == usernameLocal && (
                <>
                  {" "}
                  <button
                    onClick={showCoverImage}
                    className="flex cursor-pointer  w-full items-center justify-end text-end z-20  p-5  "
                  >
                    Change Image <FontAwesomeIcon icon={faPenToSquare} />{" "}
                  </button>
                  <CoverImagePopUp
                    isVisible={isCoverImagePopupVisible}
                    onClose={hideCoverImagePopup}
                  />
                </>
              )}
              
              <div className="  flex items-center gap-4 justify-start pl-20  pt-10 w-full  ">
                <div className="flex relative">
                {userProfile?.avatar.length > 1 ? 
                    <img
                    src={userProfile?.avatar}
                    className="h-28 w-28 rounded-full"
                    alt=""
                  />: <h1 className="h-28 w-28 rounded-full text-center flex items-center justify-center text-7xl font-bold bg-purple-500 ">{userProfile.username.slice(0,1)}</h1>
                }
                  {userProfile?.username == usernameLocal && (
                    <div className="">
                      {" "}
                      <button
                        onClick={showAvatarImage}
                        className="flex cursor-pointer  items-center  z-20   absolute top-20 bg-black left-10   opacity-50 text-xl  "
                      >
                         <FontAwesomeIcon icon={faPenToSquare} />{" "}
                      </button>
                      <ChangeAvatarImage
                        isVisible={isPopupVisible}
                        onClose={hideAvatarImagePopup}
                      />
                    </div>
                  )}
                  <div className="space-y-1 pl-4 flex flex-col items-start justify-start  text-white">
                    <h2 className="text-4xl flex items-center justify-center font-bold">
                      {userProfile?.username}<FontAwesomeIcon  className="pl-3 pt-2 h-3" icon={faCircleCheck} />
                    </h2>
                    <div className="flex text-sm text-zinc-400 ">
                    <h2 className=" flex items-center justify-center ">
                      @{userProfile?.username} .
                    </h2>
                    <h2 className="pl-2 py-2">Subscriber {userProfile?.subscribersCount} .</h2>
                    <h2 className="pl-2 py-2">Total videos {TotalVideos} .</h2>
                    
                    </div>
                    
                    {!(userProfile?.username == usernameLocal) && (
                  <SubcriberBtn
                    channalId={userProfile?._id}
                    isSubscribed={userProfile.isSubscribed}
                  />
                )}
                  </div>
                </div>
              
              </div>
            </header>
          )
        : null}
    </div>
  );
}
