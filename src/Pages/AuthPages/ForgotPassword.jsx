import React from 'react'
import { Link } from "react-router"
import AuthLayout from '../../Layouts/AuthLayout'
import Logo from "../../assets/Logo.png"
import signUpImage from "../../assets/Frame-signup.png"
import Input from "../../Components/AuthComponents/Input"
import Typography from "../../Components/AuthComponents/Typography"
import Button from "../../Components/Button"
import { useState } from "react"
import {toast} from "react-toastify"

export default function ForgotPassword() {
  const [formData, setFormData] = useState({email : ""})
  const [errors, setErrors] = useState({})
  const [isLoading , setIsLoading] = useState(false)

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

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if (!formValidate()) return;
    setErrors("")
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
       if (!response.ok) throw new Error(data.message || "Failed to send reset password email");
       toast.success("Reset Password Email sent", {
          position: "top-center",
        })
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email", {
          position: "top-center",
        })
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout image={signUpImage}>
        <div className="flex flex-col items-center justify-center mx-auto">
            <Link to="/"><img src={Logo} alt="" /></Link>
           <form onSubmit={handleSubmit} className="flex flex-col mx-auto px-10 py-2" action="">
            <Typography content="Forgot Password?" className="font-extrabold text-2xl" />
            <Typography content="No worries, we’ll send you instruction to help" />

            <Input onChange={handleChange} value={formData.email} name="email" type="email" className="my-5 rounded-md text-lg w-xs lg:w-md h-10" placeholder="Email" />
            {errors.email && <p className="text-red-600 font-semibold">{errors.email}</p>}
            <Button disbabled={isLoading} type="submit" content={isLoading ? "Loading..." : "Reset Password"} />
           </form>

        </div>
    </AuthLayout>
  )
}
