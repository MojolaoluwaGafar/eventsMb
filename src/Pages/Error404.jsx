import React from 'react'
import Header from "../Components/Header"
import errorImage from "../assets/error404.png"
export default function Error404() {
  return (
    <>
       <Header />
       <div className="container mx-auto flex items-center justify-center text-center">
        <div>
            <img  className="mx-auto" src={errorImage} alt="error 404" />
            <h2 className="my-3 text-lg font-semibold">Oh snap!, this is awkward.</h2>
            <p>But not as awkward as shaking someone that is to give you a first bump</p>
        </div>
       </div>

    </>
  )
}
