import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profile() {
  
    const [userDetails,setUserDetails] = useState([])


  
    useEffect(()=>{
        axios.get(``,
         
        )
        .then(res =>{
  setUserDetails(res.data.data)
        })
        .catch((error:any){
           console.log(error);
             
        })
    })

  
    return (
    <div>
        
    </div>
  )
}
