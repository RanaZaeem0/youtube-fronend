import React, { ReactElement, ReactNode } from 'react'

export default function AllVideoWrapper({children,className}:{
    children:ReactNode
    className:string
}) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
