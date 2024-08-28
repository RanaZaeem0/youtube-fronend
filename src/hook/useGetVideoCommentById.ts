import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {authApi,api } from "../api/api"

  
interface GetComments{
    content: string;
    owner:string;
     _id:string;
     createdAt:string
     commentUser:{
      _id:string,
      avatar:string,
      username:string
     }
  }
  type GetCommentsData = GetComments[]
  
export default function useGetCommentById() {
     const [getComments, setGetComments] = useState<GetCommentsData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      const  [refetchComments,setRefetchComments] = useState(true)
      const {videoId} = useParams()
      const [error,setError] = useState('')
      useEffect(() => {
        try {
           api.get(
            `comment/all/${videoId}`,

          ).then(
            (response)=>{
              if (response.status >= 200 && response.status < 300) {
        setGetComments(response.data.data)
        setIsLoading(false)
                console.log("Comment get all");
               }
            }
          )
       
        } catch (error: any) {
          if (error.response) {
            // Server responded with a status other than 200 range
            console.log(
              `Error response from server: ${error.response.status} - ${error.response.data}`
            );
            setError(`Error: ${error.response.data.message || "Server Error"}`);
          } else if (error.request) {
            // No response received from server
            console.log("No response received from server", error.request);
            setError("No response received from server. Please try again later.");
          } else {
            // Other errors
            console.log(`Error during signup: ${error.message}`);
            setError(`Error: ${error.message}`);
          }
        }
      }, [refetchComments,videoId]);
 
      const refetchComment =()=>{
        setRefetchComments(!refetchComments)
      }


    return {
        isLoading,
        getComments,
        refetchComment
    }
}
