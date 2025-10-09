import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "../src/Context/AuthContext"
import { ToastContainer } from "react-toastify";
import { EventProvider } from "./Context/EventContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <EventProvider>
         <App />
      </EventProvider>
      <ToastContainer />
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
