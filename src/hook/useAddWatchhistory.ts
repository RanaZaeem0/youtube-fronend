
import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from "../config"
import { useParams } from 'react-router-dom';


  
export default function useAddWatchhistory() {
     const [addWatchHistory, setAddWatchHistory] = useState([])
     const [addWatchHistoryLoading,setaddWatchHistoryLoading] = useState(true)
      const {videoId} = useParams()
      useEffect(() => {
            try {            
           axios.post(`${import.meta.env.VITE_BACKEND_URL}users/addWatchHistory/${videoId}`,
                    {
                        headers:{
                            "Authorization":`Bearer ${getRefreshToken}`,
                            "Content-Type":"application/json"
                       
                        }
                    }
                )
               .then(res =>{
                setAddWatchHistory(res.data.data)
                setaddWatchHistoryLoading(false)
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
