import React,{useState} from "react";
import getRefreshToken from "../../config"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell} from "@fortawesome/free-solid-svg-icons"
import {authApi} from '../../api/api'
export default function SubcriberBtn({channalId,isSubscribed}:{
    channalId?:string,
    isSubscribed?:boolean
}) {
  const [isSubscribedCheak,setIsSubcribedCheak]= useState(isSubscribed)
    const Navigator = useNavigate()
    const Token = getRefreshToken()
  const handleSubcribeChannel = async (channelId: string) => {
    try {
      if (!Token) {
        Navigator("/signup");
        return console.log("not login");
      }
      const response = await authApi.post(
        `subscription/${channelId}`,
        {},
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
        setIsSubcribedCheak(!isSubscribedCheak)
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        // No response received from server
        console.log("No response received from server", error.request);
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <div className="mr-2">
   {   !isSubscribedCheak ? <button
          type="button"
          onClick={() => {
            if (channalId) {
              handleSubcribeChannel(channalId);
            } else {
              console.error("Channel ID is not defined");
            }
          }}
          className="text-zinc-200 bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none bg-zinc-800  shadow-2xl shadow-slate-100  dark:shadow-lg  font-normal rounded-full text-sm px-5 py-2.5 text-center me-2 "
        >
          Subscribe
        </button>
        :
        <button
          type="button"
          onClick={() => {
            if (channalId) {
              handleSubcribeChannel(channalId);
            } else {
              console.error("Channel ID is not defined");
            }
          }}
          className="text-zinc-200 bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none bg-zinc-800  shadow-2xl shadow-slate-100  dark:shadow-lg  font-normal rounded-full text-sm px-5 py-2.5 text-center me-2 "
        >
         <FontAwesomeIcon icon={faBell} />  Subscribed
        </button>
        
        }
        
        
      </div>
    </div>
  );
}
