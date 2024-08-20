import React from 'react'

import useGetPlaylistId from "../../hook/useGetPlaylistId"
import AllVideoWrapper from "../AllVideoWrapper"
import {Avatar,VideoDropdown} from "../helperCompount/index"
import { useNavigate } from 'react-router-dom'
export default function SinglePlaylist() {

  const Navigator = useNavigate()
  const {getPlaylistId,isPlaylistIdLoading}  =useGetPlaylistId()
  
console.log(getPlaylistId)

  return (
    <div>
   { isPlaylistIdLoading ? <h1>Loading ...</h1>
:      <>
<div className=" pt-10">
  <h2 className='px-2 text-3xl font-bold text-start py-5'>PLaylist Name {getPlaylistId[0].name}</h2>
</div>
<AllVideoWrapper className="grid grid-cols-1 pl-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {getPlaylistId[0]?.videos &&
                getPlaylistId[0]?.videos.map(
                  (video, index) =>
                    video.isPublished && (
                      <div
                        key={index}
                        className="bg-background rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <div
                          className="h-60 w-96 max-md:w-full pb-5"
                          onClick={() => Navigator(`/watch/${video._id}`)}
                        >
                          <img
                            className="w-full h-full"
                            src={video.thumbnail}
                            alt={video.thumbnail}
                          />
                        </div>
                        <h2 className="text-1xl h-12">{video.title}</h2>
                       <div className="flex justify-between w-full">
                       <Avatar
                          avatarImage={video.channalDetails[0].avatar}
                          videoViews={video.views}
                          username={video.channalDetails[0].username}
                          channalId={video.channalDetails[0]._id}
                          createdAt={video.createdAt}
                        />
                     
                       </div>

                       
                      </div>
                    )
                )}
            </AllVideoWrapper>
</>}
    </div>
  )
}
