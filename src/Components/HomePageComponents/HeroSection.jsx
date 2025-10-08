import React, { useContext } from 'react'
import Button from "../Button"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { AuthContext } from "../../Context/AuthContext"

export default function HeroSection() {
  const { user } = useContext(AuthContext)

  return (
    <main className="hero flex items-center px-8 lg:px-20">
        <motion.div  initial={{ scale: 0 }} animate={{ scale: 1 }} className="container mx-auto">
            <section className="flex-col lg:flex justify-start text-white lg:w-full md:py-10">
            <h1 className="text-[25px] lg:text-4xl font-semibold tracking-wider leading-8 lg:leading-10 md:w-[400px] lg:w-[450px]">Discover Unforgettable Experiences With Ease</h1>
            <p className="py-4 text-[15px] md:w-[400px] lg:w-[400px]">Find, book, and manage tickets for concerts, workshops, and social gatherings with ease. Create events, connect with your audience, and start making lasting memories today!</p>
            { user ? <Link to="/createEvent"><Button className="w-[264px] text-[18px]" content="Create Event" /></Link> : <Link to="/auth/signUp"><Button className="w-[264px]" content="Sign Up" /></Link>}
        </section>
        </motion.div>
    </main>
  )
}
