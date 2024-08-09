
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"


  
  interface VideoData {
    "_id": string,
    "content": string,
    "owner": string,
    "createdAt": string,
    "updatedAt": string,
  }
  
  type emptyArray = VideoData[]
  
export default function useGetTweet() {
     const [getTweet, setgetTweet] = useState<emptyArray>([])
      const [isLoading, setIsLoading] = useState(true)
      
      useEffect(() => {
            try {            
           axios.get(`${import.meta.env.VITE_BACKEND_URL}tweet`,
                    {
                        headers:{
                            "Authorization":`Bearer ${getRefreshToken}`,
                            "Content-Type":"application/json"
                       
                        }
                    }
                )
               .then(res =>{
                setgetTweet(res.data.data)
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
        getTweet
    }
}
