import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router'
import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/AuthPages/SignUpPage"
import SignInPage from "./Pages/AuthPages/SignInPage"
import ForgotPassword from "./Pages/AuthPages/ForgotPassword"
import ResetPassword from "./Pages/AuthPages/ResetPassword"
import Interests from "./Pages/AuthPages/Interests"
import Error404 from "./Pages/Error404"
import EventDetailsPage from "./Pages/EventDetails"
import EventsPage from "./Pages/EventsPage"
import CreateEventPage from "./Pages/CreateEventPage"
import ComingSoon from "./Components/ComingSoon"
import ProtectedRoute from "./Components/ProtectedRoute"
import YourEventsPage from "./Pages/YourEventsPage"
import Profile from "./Pages/Profile" 
import { Suspense } from "react";
import FallBackLoader from "./Components/Loader";

function App() {

  return (
  <>
    <Router>
      <Suspense fallback={<FallBackLoader />}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signUp" element={<SignUpPage />} />
        <Route path="/auth/signIn" element={<SignInPage />} />
        <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/auth/interests" element={<Interests />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />


        <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/createEvent" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
        <Route path="/your-events" element={<ProtectedRoute><YourEventsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      </Suspense>
    </Router>
  </>
  )
}

export default App
