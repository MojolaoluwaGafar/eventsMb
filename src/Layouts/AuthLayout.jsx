import React from 'react'

export default function AuthLayout({ children , image}) {
  return (
    <div className="container mx-auto flex justify-center h-screen">
      <div className="hidden lg:flex items-center w-1/2 h-full">
        <img className="object-fit" src={image} alt="authFrame" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center">{children}</div>
    </div>
  )
}
