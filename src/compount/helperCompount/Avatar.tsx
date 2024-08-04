
import { NavLink } from 'react-router-dom'
import {format} from "date-fns"

export default function Avatar({username ='A',channalId ='1',createdAt='a',avatarImage=""}:{
  username:string
  channalId? : string
  createdAt:string
  avatarImage:string
}) 



{

    return (
    <NavLink to={`/profile?channal=${channalId}`}>
      <div className='flex items-center'><div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
    <span className="font-medium text-white dark:text-gray-300"><img src={avatarImage} alt="" /></span>
    
</div>
      <h2 className='font-normal text-gray-600 hover:underline text-1xl text-center pl-2 pr-4'>{username}</h2>
<h3 className='text-neutral-500'>
  {}
  {format(new Date(createdAt), 'MMM dd, yyyy')

}</h3>
</div>
    </NavLink>
  )
}
