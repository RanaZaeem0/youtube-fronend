
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"
import { useParams } from 'react-router-dom';
import {authApi } from "../api/api"

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
  type emptyArray = VideoData[]
  
export default function useGetChannelVideo() {
     const [getChannalVideo, setgetChannalVideo] = useState<emptyArray>([])
      const [isLoading, setIsLoading] = useState(true)
     
  const {username} = useParams()
      useEffect(() => {
            try {            
           authApi.get(`video/channalvideo/${username}`,
                )
               .then(res =>{
                setgetChannalVideo(res.data.data[0].ChannalVideo)
                setIsLoading(false)
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                console.log('Failed to fetch watch history. Please try again later.');
                setIsLoading(false);
                
            }
    
      }, [])
 
    return {
        isLoading,
        getChannalVideo
    }
}
