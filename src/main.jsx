import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "../src/Context/AuthContext"
import { ToastContainer } from "react-toastify";
import { EventProvider } from "./Context/EventContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <EventProvider>
         <App />
      </EventProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
