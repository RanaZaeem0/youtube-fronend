import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken  from "../../src/config"
interface UserData {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  }
  

  
  interface VideoData {
    _id: string;
    videoFile: string;
    thumbnail: string;
    title: string;
    description: string;
    duration: number; // Adjust type based on how you handle duration
    views: number; // Adjust type based on how you handle views
    isPublished: boolean;
    owner: string;
    createdAt: string; // You may use Date if parsing this as a Date object
    updatedAt: string; // You may use Date if parsing this as a Date object
    userDetails: UserData[];
    videoLikes: number; // Adjust type based on how you handle likes
   
  }
  
  type allVideoData = VideoData 
export default function useAllvideo() {
 const [video, setVideo] = useState<allVideoData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
            try {            
                const getAllVideo  =  axios.get(`${import.meta.env.VITE_BACKEND_URL}video/`,
                    {
                        headers:{
                            "Authorization":`Bearer ${getRefreshToken}`,
                            "Content-Type":"application/json"
                       
                        }
                    }
                )
               .then(res =>{
                console.log(res.data.data);
                setVideo(res.data.data)
                setIsLoading(false)
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                
            }
    
      }, [])
 
    return {
        isLoading,
        video
    }
}
