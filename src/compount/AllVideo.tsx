
import axios from "axios"
import { useState, useEffect } from "react"
import AllVideoSkeleton from "./skeleton/AllVideoSkeleton.tsx"
import Avatar from "./helperCompount/Avatar.js"
import useAllvideo from "../hook/useAllvideo.js"
import { useNavigate } from "react-router-dom"
import AllVideoWrapper from "./AllVideoWrapper.tsx"

export default function Component() {
  
  const {isLoading,videos}  = useAllvideo()
  const Navigator = useNavigate()
   
  const [selectedVideo, setSelectedVideo] = useState(null)
  const handleVideoClick = (video) => {
    setSelectedVideo(video)
  }
  


 




  return (
    <div className="">

  
   
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <AllVideoSkeleton/>
      ) : (
        <AllVideoWrapper className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos &&  videos.map((video,index) => (
            <div
              key={index}
              className="bg-background rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => Navigator(`/watch/${video._id}`)}
            >
              <div className="h-60 w-96 pb-5">
                <img className="w-full h-full" src={video.thumbnail} alt={video.thumbnail}   />
              </div>
              <Avatar avatarImage={video.channalDetails[0].avatar} username={video.channalDetails[0].username} channalId={video.channalDetails[0]._id} createdAt={video.createdAt} />
            </div>
          ))}
        </AllVideoWrapper>
      )}
  
    </div>
    </div>
   

  )
}

function DoorClosedIcon(props:any) {
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
  )
}


function PlayIcon(props:any) {
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
  )
}


function XIcon(props:any) {
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
  )
}