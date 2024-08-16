import React from 'react'
import useGetLikeVideo from "../hook/useGetUserLikeVideo"
import { NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import LikeVideoCompount from "../compount/likeVideoCompount"
export default function LikeVideos() {
  const Navigator = useNavigate()
  const {likeVideo,isLoading} = useGetLikeVideo()
  return (
   <div className="pt-20">
    LIekm
    <LikeVideoCompount/>
   </div>
  )
}
