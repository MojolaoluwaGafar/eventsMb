import React, {useEffect, useContext} from 'react'
import {AuthContext} from "../Context/AuthContext"
import {useNavigate} from "react-router"

export default function ProtectRoute({children}) {
  const Navigate = useNavigate()
    const {token} = useContext(AuthContext)

    useEffect(()=> {
      if (!token) {
        Navigate("/auth/signIn")
      }
    }, [token, Navigate])
    
  return children
}
