import React, { useState } from 'react'
import FooterLogo from "../assets/NB-EVents-footer-logo.png"
import Button from "../Components/Button"
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { Link } from "react-router"
import { motion } from "framer-motion"
import {toast} from "react-toastify"

export default function Footer() {
    const [formData, setFormData] = useState({email : ""})
    const [errors, setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    
    const navs = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Events", to: "/events" },
      { label: "About us", to: "/about" },
      { label: "Contact us", to: "/contact" }
    ]
  }
];

    const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors})
  }
  const formValidate= ()=>{
    const { email } = formData;
    const newErrors = {};
    if (!email) {
      newErrors.email= "Email is required"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit= async (e)=>{
    console.log("subscription hit");
    
    e.preventDefault();
    if (!formValidate()) return;
    setErrors("");
    setIsLoading(true);
    try {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Subscription failed");

  toast.success(data.message);
  setFormData({ email: "" });
  console.log(data);
} catch (error) {
  console.log(error);
  toast.error(error.message || "Subscription failed!");
} finally {
  setIsLoading(false);
}
};

    const socialMediaLogos = [
        {
        heading : "Socials",
        icons: [ <FiFacebook />,<FaXTwitter />,<FaInstagram />,<FiYoutube />,]
        }]

        
  return (
    <footer className=" bg-[#0E021E] md:flex md:justify-between md:items-center px-8 lg:px-20 py-10 lg:py-15 text-white ">
       <motion.div initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }} className="container md:flex mx-auto items-center justify-between">
         
         <div className="branding max-w-[350px]">
            <img src={FooterLogo} alt="Logo" />
            <p className="pt-4 w-full md:w-[320px] lg:w-[380px] text-lg md:text-sm lg:text-lg">Stay connected and informed with our updates Subscribe to our newsletter for the latest updates on mental health tips, app features, and exclusive offers. Join our community to receive valuable insights and support right in your inbox</p>
            <form onSubmit={handleSubmit} className="flex w-full md:w-[300px] lg:w-[350px] bg-white rounded-md mt-4 py-1 lg:py-2 px-2">
                <input onChange={handleChange} name="email" value={formData.email} className="py-2 px-2 text-black w-[180px]" type="email" placeholder="Email" />
                <Button disabled={isLoading} className="w-[120px] lg:w-[200px] md:text-sm lg:text-lg" type="submit" content={isLoading ? "Subscribing" : "Subscribe"} />
            </form>
            {errors.email && <span className="text-red-500 font-semibold text-lg">{errors.email}</span>}
        </div>

        <div className="Links">
             {navs.map((nav, index) => (
              <div className="py-5 lg:py-0" key={index}>
              <h1 className="mb-4 text-lg font-bold">{nav.heading}</h1>
             <nav>
              {nav.links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="hover:underline hover:text-purple-500 md:text-sm lg:text-lg cursor-pointer py-1 block">
                  {link.label}
               </Link>
                ))}
             </nav>
             </div>
            ))}
        </div>

             <div className="Socials">
            { socialMediaLogos.map((logos,index)=>{
                return (
                <div className="py-5 lg:py-0" key={index}>
                    <h1 className="text-lg font-bold">{logos.heading}</h1>
                    <div className="flex mt-4 gap-5">
                        {logos.icons.map((icon, i) => (
                            <span key={i}>{icon}</span>
                            ))}
                    </div>
                </div>
                )})}
                </div>
            </motion.div>

        
        
    </footer>
  )
}
