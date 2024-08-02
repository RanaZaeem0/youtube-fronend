import axios from 'axios';
import  { useEffect, useState } from 'react'

interface allVideoData {
    UserDetails:{username:string , avatar:string,email:string, id:string}
      id: string;
      title: string;
      description: string;
      published: boolean;
      thumbnail:string;
      createdAt: string; // Use Date if you plan to parse this to a Date object
      duration:string;
      owner:string;
      updatedAt:string;
      videoFile:string;
      views:string;

    
    }
  
export default function useAllvideo() {
 const [videos, setVideos] = useState<allVideoData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
                 const limit = 12
            try {            
                const getAllVideo  =  axios.get(`${import.meta.env.VITE_BACKEND_URI}video/allvideo/${limit}`)
               .then(res =>{
                console.log(res.data);
                setVideos(res.data.data)
                setIsLoading(false)
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                
            }
    
      }, [])
 
    return {
        isLoading,
        videos
    }
}
