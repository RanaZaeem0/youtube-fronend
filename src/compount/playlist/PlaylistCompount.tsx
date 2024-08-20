import React from 'react'
import useGetPlaylist  from "../../hook/useGetUserPlaylist.ts"
import {NavLink} from "react-router-dom"
import AllVideoWrapper from "../AllVideoWrapper"
import {Avatar,VideoDropdown} from "../helperCompount/index"
import {formatDistanceToNow} from "date-fns"
import { useNavigate } from 'react-router-dom'
export default function PlaylistCompount() {

  const  navigate  = useNavigate()
    const  { getPlaylist,isPlaylistLoading} = useGetPlaylist()
    function formatDateRelative(date: string) {
      const createdAt = new Date(date);
      return formatDistanceToNow(createdAt, { addSuffix: true });
    }

    console.log(getPlaylist)

    return (
    <div>
        <div className="text-white bg-zinc-800  w-full">
          {!isPlaylistLoading ? (
            <div className="">
              {getPlaylist.length == 0 ? (
                <h1 className='pt-10'>There is no playlist</h1>
              ) : (
               <div className=" pl-4">
                 <h2 className="text-white font-semibold py-2 pt-10">Your Playlist </h2>
              { 
                  
                  <AllVideoWrapper className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {
                    getPlaylist && 
                    getPlaylist.map((item,index)=>{
                      return  <div className="">
                      
                      {
                        item.firstVideo && <div
                        key={index}
                        className="bg-background rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <div
                          className="h-60 relative w-96 max-md:w-full pb-5"
                          onClick={() => navigate(`/singlePlaylist/${item._id}`)}
                        >
                          <img
                            className="w-full h-full"
                            src={item.firstVideo.thumbnail}
                            alt={item.firstVideo.thumbnail}
                          />
                          <h2 className="text-zinc-200 absolute top-2  pl-2 bg-zinc-500 pr-3 p-3  font-normal"> total videos {item.totalVideos} </h2>
                        </div>
                        
                       <div className="flex flex-col w-full">
                       <h2 className="text-zinc-200  font-medium">{item.name} </h2>
                       <h2 className="text-zinc-400 text-sm font-normal">LastUpdate {formatDateRelative(item.updatedAt)} </h2>
                       <h2 className="text-zinc-400 font-normal text-sm">View full playlist </h2>                     
                       </div>

                       
                      </div>
                      }

                      </div>
                    })
                  }
                </AllVideoWrapper>
              
              }
               </div>
              )}
            </div>
          ) : null}
        </div>
    </div>
  )
}



