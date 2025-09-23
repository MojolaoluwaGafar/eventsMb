import React, { useState } from 'react'
import { Link } from "react-router"
import AuthLayout from '../../Layouts/AuthLayout'
import Logo from "../../assets/Logo.png"
import signUpImage from "../../assets/Frame-signup.png"
import Input from "../../Components/AuthComponents/Input"
import Typography from "../../Components/AuthComponents/Typography"
import Button from "../../Components/Button"
import { toast } from "react-toastify"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router"

export default function ResetPassword() {
    const [formData, setFormData] = useState({password : "",  confirmPassword : ""})
    const [errors, setErrors] = useState({})
    const [isLoading , setIsLoading] = useState(false)
    const {token} = useParams();
    const Navigate = useNavigate()
      const [showPassword, setShowPassword]= useState(false)
      const [showConfirmPassword, setShowConfirmPassword]= useState(false)
      const toggleShowPassword= ()=> {setShowPassword(!showPassword)}
      const toggleShowConfirmPassword= ()=> {setShowConfirmPassword(!showConfirmPassword)}
    const handleChange=(e)=>{
      setFormData({...formData, [e.target.name]: e.target.value})
      setErrors({...errors})
    }
    const formValidate= ()=>{
      const { password, confirmPassword } = formData;
      const newErrors = {};
      if (!password || !confirmPassword) {
        newErrors.password= "Please provide all fields"
      }
      else if (confirmPassword !== password) {
        newErrors.password= "Passwords do not match"
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reset-password/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await response.json();
         if (!response.ok) throw new Error(data.message);
         toast.success("New password created, Log in now!", {
            position: "top-center",
          })
          Navigate("/auth/signIn")
        return data;
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
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
            <Typography content="Reset Password" className="font-extrabold text-2xl" />
            <Typography content="Enter Your New Password" />

            <div className="relative">
              <Input onChange={handleChange} value={formData.password} name="password" type={showPassword ? "text" : "password"} className="my-2 rounded-md text-lg w-full lg:w-md h-10" placeholder="Password"  />
              <button className="absolute top-5 right-3" type="button" onClick={toggleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>

           </div>
            {errors.password && <span className="text-red-700 font-semibold w-md">{errors.password}</span>}

            <div className="relative">
            <Input onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="my-2 rounded-md text-lg w-full lg:w-md h-10" placeholder="Confirm Password"  />
            <button className="absolute top-5 right-3" type="button" onClick={toggleShowConfirmPassword}>{showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
              </div>
          {errors.confirmPassword && <span className="text-red-700 font-semibold w-md">{errors.confirmPassword}</span>}

            <Button type="submit" content={isLoading ? "loading..." : "Reset Password"} />
           </form>

        </div>
    </AuthLayout>
  )
}
