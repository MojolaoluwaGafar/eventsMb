import React, {useEffect, useContext} from 'react'
import {AuthContext} from "../Context/AuthContext"
import {useNavigate} from "react-router"

export default function ProtectRoute({children}) {
  const Navigate = useNavigate()
    const {user} = useContext(AuthContext)

    useEffect(()=> {
      if (!user) {
        Navigate("/auth/signIn")
      }
    }, [user, Navigate])
    
  return children
}
