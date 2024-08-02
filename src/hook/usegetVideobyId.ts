import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface UserData {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  }
  
  interface Comment {
    _id: string;
    content: string;
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
    userData: UserData[];
    videoLikes: number; // Adjust type based on how you handle likes
    comments: Comment[];
  }
  
  
export default function useAllvideo() {
 const [video, setVideo] = useState<VideoData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
     const    {videoId}    = useParams()
      useEffect(() => {
            try {            
                const getAllVideo  =  axios.get(`${import.meta.env.VITE_BACKEND_URI}video/${videoId}`)
               .then(res =>{
                console.log(res.data.data[0]);
                setVideo(res.data.data[0])
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
