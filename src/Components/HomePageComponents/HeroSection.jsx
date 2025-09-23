import React, { useContext } from 'react'
import Button from "../Button"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { AuthContext } from "../../Context/AuthContext"

export default function HeroSection() {
  const { user } = useContext(AuthContext)

  return (
    <main className="hero flex items-center px-5 lg:px-20">
        <motion.div  initial={{ scale: 0 }} animate={{ scale: 1 }} className="container mx-auto">
            <section className="flex-col lg:flex justify-start text-white lg:w-[400px]">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-10">Discover Unforgettable Experiences With Ease</h1>
            <p className="py-4 lg:w-[400px]">"Find, book, and manage tickets for concerts, workshops, and social gatherings with ease. Create events, connect with your audience, and start making lasting memories today!"</p>
            { user ? <Link to="/createEvent"><Button className="w-[264px]" content="Create Event" /></Link> : <Link to="/auth/signUp"><Button className="w-[264px]" content="Sign Up" /></Link>}
        </section>
        </motion.div>
    </main>
  )
}
