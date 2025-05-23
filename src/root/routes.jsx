// src/config/routes.js
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/pages/user/homePage";
import LoginPage from "../views/pages/user/login";
import Register from "../views/pages/user/register";
import ForgotPassword from "../views/pages/user/forgotPassword";
import ResetPassword from "../views/pages/user/resetPassword";
import AuthenticationForm from "../views/pages/user/authenticationForm";
import VerificationFailed from "../views/pages/user/VerificationFailed";
import About from "../views/pages/user/About";
import FaqSection from "../views/pages/user/faq";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/validation-code",
    element: <AuthenticationForm />,
  },
  {
    path: "/resend",
    element: <VerificationFailed />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/faq",
    element: <FaqSection />,
  },
]);
