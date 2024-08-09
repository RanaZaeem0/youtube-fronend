import axios from "axios";
import getRefreshToken from "../../config"
import useGetTweet from "../../hook/useGetTweet"
import {useState} from "react"
import useGetUserProfile from "../../hook/useGetUserProfile"
import TweetDropdown from "../helperCompount/TweetDropdown"
import {formatDistanceToNow} from "date-fns"
import ProfileAvatar from "../Profiles/ProfileAvatar"
import { useNavigate } from "react-router-dom";
import { Button } from "../helperCompount";
import CreateTweet from "./CreateTweet"

export default function ShowTweet(){
    
   const [error,setError] = useState('')
   const [LoadingBtn,setLoadingBtn]  = useState(false)
  const {getTweet,isLoading} = useGetTweet()
  const {userProfile,isProfileLoading} = useGetUserProfile()

console.log(getTweet)
  const Navigator  = useNavigate()
function formatDateRelative(date: string) {
  const createdAt = new Date(date);
  return formatDistanceToNow(createdAt, { addSuffix: true });
}

    return (
        <div className="bg-slate-800  w-full items-center justify-center text-white">
             <ProfileAvatar userProfile={userProfile} isProfileLoading={isProfileLoading} />
         <button className="p-4 bg-blue-400 m-4" onClick={()=>Navigator(`/profile/${userProfile?.username}`)}>Show Videos</button>
         <CreateTweet/>
             {
            !(getTweet.length > 0) &&
             <div className="h-96 bg-black">
               <h1 className="text-white">There no tweet</h1>
               <button className="p-4 bg-blue-400 m-4" onClick={()=>Navigator(`/profile/${userProfile?.username}`)}>Create Tweet</button>
             </div>
             
            }
             
            {
                !isLoading ? <div className="">
                   {getTweet.map((tweet)=>{

                    return (
                    <div className="flex">
                            <div className="flex items-start gap-4 justify-center p-4 rounded-md bg-background shadow-sm">
                    <img
                      src={userProfile?.avatar}
                      className="h-4 w-3"
                      alt=""
                    />
                    <div className="flex-1 grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">
                        {userProfile?.username}
                        </div>
                        <div className="text-xs text-muted-foreground">
                        {formatDateRelative(tweet.createdAt)}
                        </div>
                      </div>
                      <div className="text-muted-foreground">{tweet.content}</div>
                    </div>
                  </div>
                  <div className="">
                    <TweetDropdown tweetId={tweet?._id}/>
                  </div>
                    </div>
                    )
                   })
                   }
                </div>:
                <h1>Loading .. </h1>
            }

        </div>
    )
}