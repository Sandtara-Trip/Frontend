import React, { useState, useEffect } from "react";
import NavbarBefore from "../components/user/NavbarBefore";
import NavbarAfter from "../components/user/NavbarAfter";
import Footer from "../components/user/footer";

const MainLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    // Check both token keys that might be used in the app
    const token = localStorage.getItem("token") || localStorage.getItem("Token");
    setIsLoggedIn(!!token);
    
    // Listen for storage events (like logout from another tab)
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem("token") || localStorage.getItem("Token");
      setIsLoggedIn(!!currentToken);
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
