
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"
import { BlobOptions } from 'buffer';
import { useParams } from 'react-router-dom';

interface UserProfile{
    "_id": string,
        "username": string,
        "email": string,
        "avatar": string,
        "fullName": string,
        "coverImage": string,
        "subscribersCount": number,
        "isSubscribed": boolean
}
  
export default function useGetUserProfile() {
     const [userProfile, setUserProfile] = useState<UserProfile | null>([])
      const [isProfileLoading, setIsProfileLoading] = useState(true)
      const {username} = useParams()
      useEffect(() => {
            try {            
           axios.get(`${import.meta.env.VITE_BACKEND_URL}users/channal/${username}`,
                    {
                        headers:{
                            "Authorization":`Bearer ${getRefreshToken}`,
                            "Content-Type":"application/json"
                       
                        }
                    }
                )
               .then(res =>{
                setUserProfile(res.data.data)
                setIsProfileLoading(false)
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                console.log('Failed to fetch user Profile Please try again later.');
                setIsProfileLoading(false);
                
            }
    
      }, [])
 
    return {
        isProfileLoading,
        userProfile
    }
}
