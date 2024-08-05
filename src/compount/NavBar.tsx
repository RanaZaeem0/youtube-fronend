import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import youtubeIcon  from "./img/youtube.webp"
import IconYoutube from "./img/icon.webp"
import Button from './helperCompount/Button'
import Input from './helperCompount/Input'
import img1 from "./img/icon.webp"
import NavAvatars from './helperCompount/NavAvatar'
export default function NavBar() {
  
  const [LoginState ,setLoginState] = useState(false)
  const refreshToken = localStorage.getItem('refreshToken')

  //  if(refreshToken !== "undefined" && refreshToken !== "" ){
  //     setLoginState(true)
  //  }
  const Navigator = useNavigate()

  return (
    <div>
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center "
            onClick={()=>Navigator('/')}>
              <img className='h-10 w-12 mr-2' src={IconYoutube} alt="" />
              <h2 className='font-bold text-white '>Youtube</h2>
            </div>
            <div className="flex items-center justify-center w-full max-w-md rounded-full bg-muted px-4 py-2">
    
    <Input
      type="text"
      placeholder="Search YouTube"
      className="w-full bg-black text-neutral-300 rounded-full py-1  pl-4 pr-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    />
      <SearchIcon className="w-5 h-5 text-muted-foreground" />
  
  </div>
            <div className="p-2">
                
              {(!refreshToken || refreshToken === 'undefined' || refreshToken.length < 10)  ?                <button onClick={()=>Navigator('/signup')} className='w-full text-blue-700
       bg-gray-800 mt-2 p-2 font-medium rounded-xl '> Sign Up</button>
       :  
       <div className=" bottom-4 left-4 flex items-center gap-4 text-white">
        <div className="" onClick={()=>Navigator('/publishvideo')}>
          Publish Video
        </div>
       <div className="">
        <NavAvatars/>
       </div>
     </div>
      }
            </div>

        </div>
    </div>
  )
}




function ArrowRightIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)
}


function SearchIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)
}