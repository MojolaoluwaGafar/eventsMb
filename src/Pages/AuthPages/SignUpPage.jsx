import React, { useState } from 'react'
import { Link } from "react-router"
import AuthLayout from '../../Layouts/AuthLayout'
import Logo from "../../assets/Logo.png"
import signInImage from "../../assets/Frame-signup.png"
import Input from "../../Components/AuthComponents/Input"
import Typography from "../../Components/AuthComponents/Typography"
import Button from "../../Components/Button"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router"
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify"

export default function SignUpPage() {
  const { register } = useContext(AuthContext);
  const [showPassword, setShowPassword]= useState(false)
  const [showConfirmPassword, setShowConfirmPassword]= useState(false)
  const toggleShowPassword= ()=> {setShowPassword(!showPassword)}
  const toggleShowConfirmPassword= ()=> {setShowConfirmPassword(!showConfirmPassword)}
  const [formData, setFormData] = useState({email: "", fullName: "", password: "", confirmPassword: "", checkbox: false});
  const [errors, setErrors]= useState({email: "",  fullName: "", password: "", confirmPassword: "", checkbox: false });
  const navigate = useNavigate()
  const [isLoading, setIsLoading ] = useState(false)

  const handleChange = (e)=>{
  const { name, type, value, checked } = e.target;
  setFormData({...formData,[name]: type === "checkbox" ? checked : value,});
  setErrors({...errors, [name]: ""})
  setIsLoading(false)
  };

  const formValidate= ()=>{
  const {email, fullName, password, confirmPassword, checkbox} = formData
  const newErrors = {};
  const emailRegex = /^\S+@\S+\.\S+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&*])[A-Za-z\d@.#$!%?&*]{6,}$/;

  if (!email.trim()) {
    newErrors.email = "Please enter a valid email";
  }else if (!emailRegex.test(email))
      newErrors.email = "Invalid email";

  if (!fullName.trim()) {
    newErrors.fullName = "Full name is required";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!passwordRegex.test(password)) {
    newErrors.password = "Password must include uppercase and at least a lowercase, number, and special character";
  }
  if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required"
  }else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }
  if (!checkbox) {
    newErrors.checkbox = "You must agree to the terms";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formValidate()) return;
  setErrors({});
  console.log(formData);
  setIsLoading(true)
   try {
    await register(formData);
    toast.success("Account created successfully! Please log in.", {
      position: "top-center",
    });
    navigate("/auth/signIn"); 
  } catch (error) {
    toast.error(error.message || "Registration failed. Please try again.", {
      position: "top-center",
    });
    setErrors({ general: error.message || "Something went wrong. Please try again." });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <AuthLayout image={signInImage}>
        <div className="flex flex-col items-center justify-center mx-auto">
            <Link to="/"><img src={Logo} alt="" /></Link>
           <form onSubmit={handleSubmit} className="flex flex-col mx-auto px-10 py-2">
            <Typography content="Create Account" className="font-extrabold text-2xl" />
            <Typography content="Let’s get you started so you can start joining and creating events" />

            <Input onChange={handleChange} value={formData.email} name="email" type="email" className="my-2 rounded-md text-lg w-full lg:w-md h-10" placeholder="Email" />
            {errors.email && <span className="text-red-700 font-semibold">{errors.email}</span>}
            <Input onChange={handleChange} value={formData.fullName} name="fullName" type="text" className="my-2 rounded-md text-lg w-full lg:w-md h-10 " placeholder="Full name"  />
            {errors.fullName && <span className="text-red-700 font-semibold">{errors.fullName}</span>}
            <div className="relative">
                          <Input onChange={handleChange} value={formData.password} name="password" type={showPassword ? "text" : "password"} className="my-2 rounded-md text-lg w-full lg:w-md h-10" placeholder="Password"  />
                        <button className="absolute top-5 right-3" type="button" onClick={toggleShowPassword}>
                          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
            </div>
            {errors.password && <span className="text-red-700 font-semibold w-md">{errors.password}</span>}
            <div className="relative">
            <Input onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="my-2 rounded-md text-lg w-full lg:w-md h-10" placeholder="Confirm Password"  />
             <button className="absolute top-5 right-3" type="button" onClick={toggleShowConfirmPassword}>
                          {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            </div>
            {errors.confirmPassword && <span className="text-red-700 font-semibold w-md">{errors.confirmPassword}</span>}
            <div className="flex gap-2 items-center mt-2">
            <Input onChange={handleChange} name="checkbox" checked={formData.checkbox} type="checkbox" className="rounded-md h-5" />
            <p>I agree to the <span className="underline">terms</span> and <span className="underline">conditions</span></p>
            </div>
            {errors.checkbox && <span className="text-red-700 font-semibold">{errors.checkbox}</span>}
            {errors.general && <span className="text-red-700 font-semibold">{errors.general}</span>}
             <Button disabled={isLoading} className="my-2" type="submit" content={isLoading ? "Signing Up" : "Sign up"} />
            <p className="font-bold">Already have an account? <Link to="/auth/signIn"><span className="text-purple-500">Sign in</span></Link></p>
           </form>

        </div>
    </AuthLayout>
  )
}
