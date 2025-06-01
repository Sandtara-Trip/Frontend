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
import DetailWisata from "../views/pages/user/detailWisata";
import DetailHotel from "../views/pages/user/detailHotel";
import DetailKuliner from "../views/pages/user/detailKuliner";
import OrderWisata from "../views/pages/user/orderWisata";
import OrderHotel from "../views/pages/user/orderHotel";
import ChooseRoom from "../views/pages/user/ChooseRoom";
import UserProfile from "../views/pages/user/userProfile";
import WeatherCalendar from "../views/pages/user/weatherCalender";
import NotFoundPage from "../views/pages/user/notFound";
import LoadingScreen from "../components/user/loading";

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
  {
    path: "/detail-wisata/:id",
    element: <DetailWisata />,
  },
  {
    path: "/detail-hotel/:id",
    element: <DetailHotel />,
  },
  {
    path: "/detail-kuliner/:id",
    element: <DetailKuliner />,
  },
  {
    path: "/order-wisata/:id",
    element: <OrderWisata />,
  },
  {
    path: "/order-hotel/:id",
    element: <OrderHotel />,
  },
  {
    path: "/choose-room/:id",
    element: <ChooseRoom />,
  },
  {
    path: "/user-profile/:id",
    element: <UserProfile />,
  },
  {
    path: "/weather-calender",
    element: <WeatherCalendar />,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
    {
    path: "/load",
    element: <LoadingScreen />,
  },
]);

