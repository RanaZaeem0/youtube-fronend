import axios from 'axios';
import { useEffect, useState } from 'react';

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
  
  
export default function useAllvideo() {
 const [video, setVideo] = useState<VideoData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      const refreshToken = localStorage.getItem('refreshToken') 
      useEffect(() => {
            try {            
                const getAllVideo  =  axios.get(`${import.meta.env.VITE_BACKEND_URL}video/`,
                    {
                        headers:{
                            "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4OWJkZmQ1OWY3MmNjOTM0OTNjNjkiLCJpYXQiOjE3MjI3NTgzOTQsImV4cCI6MTcyMjg0NDc5NH0.IpSzrdwtCknlI6Az8gzjlOzRH2Uwsq1IUpOifDBJSEE`,
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
