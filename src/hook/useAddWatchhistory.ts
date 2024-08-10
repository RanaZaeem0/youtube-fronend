
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"
import { useParams } from 'react-router-dom';
import { log } from 'console';

interface WatchHistorydata {
    "_id": string,
        "watchHistory": [
            string,
        ]
}
  
export default function useAddWatchhistory() {

  
     const [addWatchHistory, setAddWatchHistory] = useState<WatchHistorydata| null >(null)
     const [addWatchHistoryLoading,setaddWatchHistoryLoading] = useState(true)
      const {videoId} = useParams()
      const Token = getRefreshToken()
      useEffect(() => {
            try {        
                if(!Token){
                    return console.log("no login");
                    
                }    
           axios.post(`${import.meta.env.VITE_BACKEND_URL}users/addWatchHistory/${videoId}`,
                   {}, {
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${Token}`,
                       
                        }
                    }
                )
               .then(res =>{
                setAddWatchHistory(res.data.data)
                setaddWatchHistoryLoading(false)
                if(res.status >= 200 && res.status <= 300 ){
                    console.log("addd");
                    
                }
               })
              
                
    
    
            } catch (error) {
                console.log(error);
                setaddWatchHistoryLoading(false)
                console.log('Failed to fetch add watch history. Please try again later.');
            }
    
      }, [])
 
    return {
        addWatchHistory,
        addWatchHistoryLoading
    }
}
