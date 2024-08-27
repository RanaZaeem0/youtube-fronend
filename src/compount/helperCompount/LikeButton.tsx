import React,{useState} from "react";
import getRefreshToken from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faThumbsUp,faThumbsDown} from "@fortawesome/free-regular-svg-icons"
export default function LikeButton({
  videoId,
  videoLike,
}: {
  videoId: string | undefined;
  videoLike: number | undefined;
}) {
  const  [videoLikeCheck,setVideoLikeCheck] = useState(videoLike)
  const Token = getRefreshToken()
  const Navigator = useNavigate();
  const handleLike = async (videoId: string) => {
    try {
      console.log(Token)
      if (!Token) {
        Navigator("/signup");
        return console.log("not login");
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}like/${videoId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
     if(videoLikeCheck){
      if(response.data.message == "Unlike Sucess"){
        setVideoLikeCheck(videoLikeCheck - 1)
      }else if(response.data.message == "addlike  Sucess"){
        setVideoLikeCheck(videoLikeCheck + 1)
      }
     }
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
    <div className="bg-zinc-800   flex items-center justify-center rounded-full  ">
      <button className="flex   ">
        <div  onClick={() => {
          if (videoId) {
            handleLike(videoId);
          } else {
            console.error("Channel ID is not defined");
          }
      }}
          className="flex  text-base items-center"
        >
          
          <FontAwesomeIcon className="px-2" icon={faThumbsUp} />
          <h2 className="px-1">{videoLikeCheck} </h2>
        </div>
       <button className=" text-base  border-l">
       <FontAwesomeIcon className="transform px-2  scale-x-[-1]" icon={faThumbsDown} />
       </button>
      </button>
    </div>
  );
}
