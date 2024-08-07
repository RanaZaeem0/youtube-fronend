import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken  from "../../src/config"
import { useParams } from 'react-router-dom';


  
  interface channalDetails {
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
  
  
export default function useGetChannalProflie() {
 const [channalProfile, setChannalProfile] = useState<channalDetails | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      const {username} = useParams()
      useEffect(() => {
            try {            
                const getChannalProflie  =  axios.get(`${import.meta.env.VITE_BACKEND_URL}channal/${username}`,
                    {
                        headers:{
                            "Authorization":`Bearer ${getRefreshToken}`,
                            "Content-Type":"application/json"
                       
                        }
                    }
                )
               .then(res =>{
                console.log(res.data.data);
                setChannalProfile(res.data.data)
                setIsLoading(false)
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                
            }
    
      }, [])
 
    return {
        isLoading,
        channalProfile
    }
}
