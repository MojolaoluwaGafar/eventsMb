import { lazy } from "react";

const Homepage = lazy(() => import("./src/Pages/HomePage.jsx"));
const EventsPage = lazy(() => import("./src/Pages/EventsPage.jsx"));
const EventDetails = lazy(() => import("./src/Pages/EventDetails.jsx"));
const Error404 = lazy(() => import("./src/Pages/Error404.jsx"));
const CreateEventPage = lazy(() => import("./src/Pages/CreateEventPage.jsx"));
const SignUpPage = lazy(() => import("./src/Pages/AuthPages/SignUpPage.jsx"));
const SignInPage = lazy(() => import("./src/Pages/AuthPages/SignInPage.jsx"));
const ForgotPassword = lazy(() => import("./src/Pages/AuthPages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./src/Pages/AuthPages/ResetPassword.jsx"));
const YourEventsPage = lazy(() => import("./src/Pages/YourEventsPage.jsx"));
const AboutPage = lazy(()=> import("./src/Pages/About.jsx"))
const ContactPage = lazy(()=> import("./src/Pages/Contact.jsx"))
export {
  Homepage,
  EventsPage,
  EventDetails,
  Error404,
  CreateEventPage,
  SignUpPage,
  SignInPage,
  ForgotPassword,
  ResetPassword,
  YourEventsPage,
  AboutPage,
  ContactPage,
};
