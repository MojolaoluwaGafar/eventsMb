import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MotionSection from "../Components/MotionSection"


export default function Layout({ children }) {
 
  return (
    <div className="w-full mx-auto min-h-screen">
      <Header />
      <div>
  <MotionSection>{children}</MotionSection>
      </div>
      <Footer />
    </div>
  );
}