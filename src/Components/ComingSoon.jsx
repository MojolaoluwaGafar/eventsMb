import React from 'react'
import Header from "../Components/Header"
import pixelgif from "../assets/pixel-art.gif"
import { Link } from "react-router"
import Button from "../Components/Button"

export default function ComingSoon () {
  return (
    <>
    <Header />
           <div className="container mx-auto flex items-center justify-center text-center">
            <div>
                <img className="mx-auto" src={pixelgif} alt="coming soon" />
                <h2 className="my-3 text-lg font-semibold">This page is still under construction</h2>
               <Link to="/"><Button className="mx-auto" content="Go to HomePage" /></Link>
            </div>
           </div>

    </>
  )
}
