
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"


  
  interface Playlistdata {
    "_id": string,
    "content": string,
    "owner": string,
    "createdAt": string,
    "updatedAt": string,
  }
  
  type emptyArray = Playlistdata[]
  
export default function useGetPlaylist() {
     const [getPlaylist, setgetPlaylist] = useState<emptyArray>([])
      const [isPlaylistLoading, setIsPlaylistLoading] = useState(true)
      const Token  = getRefreshToken()
useEffect(()=>{

    const fetchPlaylist  = async ()=>{
        try {            
            if(!Token){
                return null
            }
        const response  = await    axios.get(`${import.meta.env.VITE_BACKEND_URL}Playlist`,
                {
                    headers:{
                        "Authorization":`Bearer ${Token}`,
                        "Content-Type":"application/json"
                   
                    }
                }
            )
           .then(res =>{
            setgetPlaylist(res.data.data)
            setIsPlaylistLoading(false)
           })
          
            
    
    
        } catch (error) {
            console.log(error);
            console.log('Failed to fetch Playlist . Please try again later.');
            setIsPlaylistLoading(false);
            
        }
    }

    fetchPlaylist()
},[])

return {
    getPlaylist,
    isPlaylistLoading
}




    }