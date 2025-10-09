import React, { useState } from 'react'
import { Link } from "react-router"
import AuthLayout from '../../Layouts/AuthLayout'
import Logo from "../../assets/Logo.png"
import signInImage from "../../assets/Frame-signin.png"
import Input from "../../Components/AuthComponents/Input"
import Typography from "../../Components/AuthComponents/Typography"
import Button from "../../Components/Button"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router"
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify"
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const { login, googleAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword]= useState(false)
  const toggleShowPassword= ()=> {setShowPassword(!showPassword)}
  
  const [formData, setFormData] = useState({email: "", password: ""});
  const [errors, setErrors]= useState({email: "", password: ""})
  const [isLoading, setIsLoading ] = useState(false)
  const navigate = useNavigate()

  const handleChange= (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
    setErrors({...errors,[e.target.name] : ""})
  }

  const formValidate= ()=> {
    const newErrors={};
    const emailRegex = /^\S+@\S+\.\S+$/
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&*])[A-Za-z\d@.#$!%?&*]{6,}$/;

    const { email, password } = formData;

    if (!email.trim()) {
    newErrors.email= "Email is required";
    }else if (!emailRegex.test(email))
    newErrors.email = "Invalid email";

     
    if (!password) {
    newErrors.password = "Password is required";
    } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    }
    //  else if (!passwordRegex.test(password)) {
    // newErrors.password = "Password must include uppercase, lowercase, number, and special character";
    // }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if (!formValidate()) return;
    setErrors({})
    console.log(formData);
    setIsLoading(true)
      try {
      await login(formData);
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.", {
        position: "top-center",
      });
      setErrors({ general: error.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

    const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      await googleAuth(tokenResponse);
      toast.success("Google Sign-in successful!", { position: "top-center" });
      navigate("/");
    } catch (err) {
      console.error("Google login failed", err);
      toast.error("Google login failed!", { position: "top-center" });
    }
  },
  onError: () => toast.error("Google Signup Failed", { position: "top-center" }),
    });


  return (
    <AuthLayout image={signInImage}>
        <div className="flex flex-col items-center justify-center mx-auto">
           <Link to="/"><img src={Logo} alt="" /></Link>
           <form onSubmit={handleSubmit} className="flex flex-col mx-auto px-10 py-2" action="">
            <Typography content="Welcome Back" className="font-extrabold text-2xl" />
            <Typography content="Sign In To Your Account" />

            <Input onChange={handleChange} value={formData.email} name="email" type="email" className="mt-5 rounded-md text-lg w-xs lg:w-md h-10" placeholder="Email" />
            {errors.email && <span className="text-red-700 font-semibold">{errors.email}</span>}
            <div className="relative">
              <Input onChange={handleChange} value={formData.password} name="password" type={showPassword ? "text" : "password"} className="mt-3 rounded-md text-lg w-xs lg:w-md h-10" placeholder="Password"  />
            <button className="absolute top-1/2 right-3" type="button" onClick={toggleShowPassword}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            </div>
            {errors.password && <span className="text-red-700 font-semibold w-md">{errors.password}</span>}
            <Link to="/auth/forgotPassword"><span className="my-3 font-semibold underline">Forgot Password?</span></Link>
            {errors.general && <span className="text-red-700 font-semibold">{errors.general}</span>}

            {isLoading ? <Button type="submit" content="Signing In" className="mt-3" /> : <Button type="submit" content="Sign In" className="mt-3" /> }
            <button type="submit" onClick={googleLogin} className="border-1 border-black lg:w-[448px] rounded-md mt-3 flex items-center justify-center h-[40px] gap-2">Sign in with<span className="font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text"><FcGoogle size={20} /></span></button>
            <p className="pt-2 font-bold">Dont have an account? <Link to="/auth/signUp"><span className="text-purple-500">Sign up</span></Link></p>
           </form>

        </div>
    </AuthLayout>
  )
}
