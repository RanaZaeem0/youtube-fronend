import React, {useState} from 'react'
import useGetUserProfile from "../../hook/useGetUserProfile"
import { log } from 'console';
import SubcriberBtn from '../helperCompount/SubcriberBtn';
import CoverImagePopUp from "./CoverImagePopUp"
import ChangeAvatarImage from "./ChangeAvatarPopUp"
interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  coverImage: string;
  subscribersCount: number;
  isSubscribed: boolean;
}

interface ProfileAvatarProps {
  userProfile: UserProfile | null; // The profile might be null when loading
  isProfileLoading: boolean;
}

export default function ProfileAvatar({userProfile,isProfileLoading}:ProfileAvatarProps) {
    const [isCoverImagePopupVisible, setCoverImageIsPopupVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);


  const showCoverImage = () => setCoverImageIsPopupVisible(true);
  const hideCoverImagePopup = () => setCoverImageIsPopupVisible(false);
  const showAvatarImage = () => setIsPopupVisible(true);
  const hideAvatarImagePopup = () => setIsPopupVisible(false);

     const  usernameLocal = localStorage.getItem('username')
    
    
     return (
    <div>
        {!isProfileLoading
        ? userProfile && (
            <header className="relative h-52 overflow-hidden">
              <img
                src={userProfile.coverImage}
                alt="Cover image"
                className="absolute inset-0 h-52 w-full object-cover bg-no-repeat"
                style={{ aspectRatio: "1920/480", objectFit: "cover" }}
              />
             {(userProfile.username == usernameLocal) &&<> <button onClick={showCoverImage} className='flex cursor-pointer  items-center justify-end z-20 w-full p-5 absolute '>Change Image </button>
              <CoverImagePopUp isVisible={isCoverImagePopupVisible} onClose={hideCoverImagePopup}  /></>}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <div className="absolute bottom-4 left-4 flex items-center gap-4 justify-between w-full pr-22 mr-5">
              <div className="">
              <img
                  src={userProfile.avatar}
                  className="h-12 w-12 rounded-lg"
                  alt=""
                />
               {(userProfile.username == usernameLocal) &&<> <button onClick={showAvatarImage} className='flex cursor-pointer  items-center justify-start z-20 w-full p-5 absolute '>Change avatar </button>
                <ChangeAvatarImage  isVisible={isPopupVisible} onClose={hideAvatarImagePopup}/></>}
                <div className="space-y-1 text-white">
                  <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                  <h2>Subscriber {userProfile.subscribersCount}</h2>
                </div>
              </div>
               {!(userProfile.username == usernameLocal) &&
               
               <SubcriberBtn  channalId={userProfile._id}  />}
              </div>
            </header>
          )
        : null}
    </div>
  )
}
