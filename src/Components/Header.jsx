import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import Logo from '../assets/Logo.png';
import { links } from '../data.js';
import Button from '../Components/Button';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion } from "framer-motion"
import { AuthContext } from "../Context/AuthContext"
import { LuCalendarRange, LuUserRoundPen } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";



export default function Header() {
  const {user, logout } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation();

  const getInitials = (fullName)=>{
    if (!fullName) return "";
    return fullName.split(" ").slice(0,2).map((name)=> name[0]).join("").toUpperCase();
  }

  const userMenuLinks = [
    {
      id : 1,
      content : "Your Events",
      to: "/your-events",
      icon: <LuCalendarRange className="text-dark" />
    },
     {
      id : 2,
      content : "Profile",
      to: "/profile",
      icon: <LuUserRoundPen className="text-dark" />
    },
    {
      id : 3,
      content : "Settings",
      to: "/coming-soon",
      icon: <FiSettings className="text-dark" />
    },
    {
      id : 4,
      content : "Help",
      to: "/coming-soon",
      icon: <MdOutlineHelpOutline className="text-dark" />
    }
  ]

  const UserMenu =()=>{
    const [isOpen , setIsOpen] = useState(false)
    const handleLogout=()=>{
      logout()
      setIsOpen(false)
    }
    return (
      <div onClick={() => setIsOpen(!isOpen)}  className="flex items-center">
        <div className="w-12 h-12 bg-gray-500 text-xl rounded-full border-1 border-purple-700 text-dark flex justify-center items-center font-bold">
          {getInitials(user.fullName)}
        </div>
        <button > {isOpen ? <FaChevronUp /> : <FaChevronDown />}</button>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 bg-white shadow-lg rounded-md w-50 z-10">
            {userMenuLinks.map((link)=>{
              return <Link key={link.id} to={link.to} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-lg text-dark border-b border-b-gray-500"><span>{link.icon}</span>{link.content}</Link>
            })}
            <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-lg text-red-600 hover:bg-gray-100"><span className="text-red-600"><FiLogOut /></span>Logout</button>
          </motion.div>)}
      </div>
    )
  }



  return (
    <header className="sticky top-0 bg-white border-b-2 border-b-gray-300 px-5 lg:px-20 z-100 ">
      <motion.div  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
 className="container flex mx-auto py-5 justify-between items-center relative">
        <Link to="/" aria-label="Home">
          <img src={Logo} alt="Logo"/>
        </Link>

        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={ location.pathname === link.to ? "text-lg underline font-bold text-purple-500 hover:text-purple-900" : "text-lg hover:underline"}
            >
              {link.pathName}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-3">
          {user ? <div className="">
            <UserMenu />
          </div> : <div className="flex gap-3">
            <Link to="/auth/signUp">
            <Button content="Sign Up" className="w-[100px]" />
          </Link>
          <Link to="/auth/signIn">
            <button
              className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
              aria-label="Sign In"
            >
              Sign In
            </button>
          </Link></div>}
        </div>

        <div className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </div>
      </motion.div>

      {isMenuOpen && (
        <motion.div  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
 className="md:hidden flex flex-col items-end gap-4 pb-5">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={ location.pathname === link.to ? "text-lg underline font-bold text-purple-500" : "text-lg"}
              onClick={toggleMenu}
            >
              {link.pathName}
            </Link>
          ))}
          { user ? <UserMenu /> : <div className="flex flex-col gap-2">
            <Link to="/auth/signUp" onClick={toggleMenu}>
            <Button content="Sign Up" className="w-[100px]" />
          </Link>
          <Link to="/auth/signIn" onClick={toggleMenu}>
            <button className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white">
              Sign In
            </button>
          </Link>
          </div>}
        </motion.div>
      )}
    </header>
  );
}