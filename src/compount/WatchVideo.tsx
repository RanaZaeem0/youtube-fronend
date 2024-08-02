import React, { useEffect, useState } from 'react'
import usegetVideobyId from '../hook/usegetVideobyId'
import Avatar from './Avatar'

export default function WatchVideo() {
   
    const [videoPLay,setVideoPlay] = useState(true)
    const {isLoading,video} = usegetVideobyId()
    

    
    return (
        <div className="">
    
      
       
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <h2>loadind</h2>
          ) : (
            <div className="flex items-start justify-start flex-col  w-3/5">
              <div                  className="bg-background rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className=" aspect-video">
                   {!videoPLay && <img src={video?.thumbnail} alt={video?.thumbnail}  className="object-cover" />}
                  {videoPLay &&  <video src={video?.videoFile} autoPlay  controls></video>}
                    
                  </div>
                  <Avatar avatarImage={video?.channalDetails[0].avatar} username={video?.channalDetails[0]?.username} channalId={video?.channalDetails[0]._id} createdAt={video.createdAt} />
                </div>
{/* Comment */}
                 <div className="">
                  {
                    video?.comments.map((comment,index)=>{
                        return <div className=""key={index}>
                        <h2>{comment.content}</h2>
                        </div>
                    })
                  }
                </div>
              
            </div>
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