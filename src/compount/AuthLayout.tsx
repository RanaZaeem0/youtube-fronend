import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
export default function AuthLayout(
    {children}:{
        children:React.ReactElement
    }
) {


    const Navigator =useNavigate()
    const refreshToken:any = localStorage.getItem('refreshToken')

    useEffect(()=>{
      if(refreshToken == "undefined" && refreshToken == null && refreshToken?.length > 10){
        console.log(refreshToken)
        
        }else{
          Navigator('/')
        }
      },[])



  return (
    <div>{
    children}</div>
  )
}
