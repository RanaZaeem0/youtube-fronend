import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Input from '../helperCompount/Input'
import Button from '../helperCompount/Button'
import ButtonWarning from '../helperCompount/ButtonWarning'
import {  useForm } from 'react-hook-form'
import getRefreshToken from "../../config"
interface CreatePlaylistProps {
  isVisible: boolean;
  onClose: () => void;
}
export default function CreatePlaylist({isVisible,onClose}:{
  isVisible: boolean;
  onClose: () => void;
}) {
const naigavte  = useNavigate()
if(!isVisible) return console.log("no")
interface createPlaylist {
  title: string,
}
const [ error, setError ] = useState('')
const {register,handleSubmit,setValue} = useForm<createPlaylist>()



const createPlaylist = async (data:createPlaylist)=>{

    

      console.log(data);
      setError('')
            try {
                const userDetails:createPlaylist  = data                
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}playlist/createPlaylist`,
                  userDetails,
                  {  
                    headers:{
                        "Authorization":`Bearer ${getRefreshToken}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status >= 200 && response.status < 300) {

                    console.log(response.data.data);
                    

                naigavte('/')
                }
            } catch (error:any) {
              if (error.response) {
                // Server responded with a status other than 200 range
                console.log(`Error response from server: ${error.response.status} - ${error.response.data}`);
                setError(`Error: ${error.response.data.message || 'Server Error'}`);
              } else if (error.request) {
                // No response received from server
                console.log('No response received from server', error.request);
                setError('No response received from server. Please try again later.');
              } else {
                // Other errors
                console.log(`Error during signup: ${error.message}`);
                setError(`Error: ${error.message}`);
              }            }
        }
    
    
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
  <div className="flex w-screen items-center justify-center">
  
    <div className="bg-red-500 h-full max-lg:w-full  text-center flex items-center justify-center flex-col ">
    <button onClick={onClose}>close</button>
   <h2 className='text-black font-semibold'>Create Playlist</h2>
   <h2>Enter your Playlist Name</h2>
   <form onSubmit={handleSubmit(createPlaylist)}>
            <div className="flex flex-col max-lg:w-full items-center justify-center w-96">

            
            
            <Input
              {...register("title", {
                required: true,
                pattern: {
                    value: /^\S*$/,
                    message: "title cannot contain spaces"
                  }
              })}
              type={"text"}
              placeholder={"title"}
              label={"Title"}
            />
            
          <Button label={'Create Playlist'} type="submit" className={"bg-gray-800"} />
            </div>
            
            <h2 className="text-red-500 font-normal">{error}</h2>
          </form>
<ButtonWarning label={'I dont have an account ?'} buttonText={"Sign in"} to={'/signup'} />
</div>






    </div>
  </div>
 
    
            )
}
