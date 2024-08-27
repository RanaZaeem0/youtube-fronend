import React, { ReactElement, ReactNode } from 'react'
import {useId} from "react"
export default function AllVideoWrapper({children,className}:{
    children:ReactNode
    className:string
}) {

  const id = useId()
  return (
    <div className={className} key={id}>
        {children}
    </div>
  )
}
