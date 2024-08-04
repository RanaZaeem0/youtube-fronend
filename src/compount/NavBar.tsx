import React from 'react'
import { useNavigate } from 'react-router-dom'
import youtubeIcon  from "./img/youtube.webp"
import IconYoutube from "./img/icon.webp"
import Button from './helperCompount/Button'
import Input from './helperCompount/Input'

export default function NavBar() {

  const Navigator = useNavigate()

  return (
    <div>
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center "
            onClick={()=>Navigator('/')}>
              <img className='h-10 w-12 mr-2' src={IconYoutube} alt="" />
              <h2 className='font-bold text-white '>Youtube</h2>
            </div>
            <div className="flex items-center w-full max-w-md rounded-full bg-muted px-4 py-2">
    <SearchIcon className="w-5 h-5 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search YouTube"
      className="flex-1 bg-transparent px-4 py-2 text-base outline-none"
    />
    <Button type="submit" className="rounded-full">
      <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
      <span className="sr-only">Search</span>
    </Button>
  </div>
            <div className="p-2">
                
              <button onClick={()=>Navigator('/signup')} className='w-full text-blue-700
       bg-gray-800 mt-2 p-2 font-medium rounded-xl '> Sign Up</button>
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