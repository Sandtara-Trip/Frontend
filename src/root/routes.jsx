// src/config/routes.js
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
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
import OrderHotel from "../views/pages/user/OrderHotel";
import OrderKuliner from "../views/pages/user/orderKuliner";
import ChooseRoom from "../views/pages/user/ChooseRoom";
import UserProfile from "../views/pages/user/userProfile";
import WeatherCalendar from "../views/pages/user/weatherCalender";
import NotFoundPage from "../views/pages/user/notFound";
import LoadingScreen from "../components/user/loading";
import Payment from "../views/pages/user/Payment";
import PaymentSuccess from "../views/pages/user/PaymentSuccess";
import PaymentPending from "../views/pages/user/PaymentPending";
import PaymentError from "../views/pages/user/PaymentError";
import AdminLayout from "../views/admin/layouts/AdminLayout";
import User from "../views/admin/pages/user/User";
import EditUser from "../views/admin/pages/user/EditUser";
import TambahUser from "../views/admin/pages/user/TambahUser";
import Hotel from "../views/admin/pages/hotel/Hotel";
import EditHotel from "../views/admin/pages/hotel/EditHotel";
import TambahHotel from "../views/admin/pages/hotel/TambahHotel";
import Room from "../views/admin/pages/room/Room";
import EditRoom from "../views/admin/pages/room/EditRoom";
import TambahRoom from "../views/admin/pages/room/TambahRoom";
import Wisata from "../views/admin/pages/wisata/Wisata";
import EditWisata from "../views/admin/pages/wisata/EditWisata";
import TambahWisata from "../views/admin/pages/wisata/TambahWisata";
import Event from "../views/admin/pages/event/Event";
import EditEvent from "../views/admin/pages/event/EditEvent";
import TambahEvent from "../views/admin/pages/event/TambahEvent";
import Order from "../views/admin/pages/order/Order";
import OrderDetail from "../views/admin/pages/order/OrderDetail";
import AdminLogin from "../views/admin/pages/login/AdminLogin";
import Dashboard from "../views/admin/pages/dashboard/Dashboard";

import ProtectedRoute from "../components/auth/ProtectedRoute";

// Layout wrapper component
const WithMainLayout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

// Payment status wrapper to handle Midtrans callbacks
const PaymentStatusWrapper = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get('order_id');
  const statusCode = searchParams.get('status_code');
  const transactionStatus = searchParams.get('transaction_status');

  if (!orderId || !statusCode || !transactionStatus) {
    return <Navigate to="/not-found" />;
  }

  return React.cloneElement(children, {
    queryParams: {
      orderId,
      statusCode,
      transactionStatus
    }
  });
};

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      // Payment callback routes (must be first)
      {
        path: "payment",
        children: [
          {
            path: "success",
            element: <PaymentStatusWrapper><PaymentSuccess /></PaymentStatusWrapper>,
          },
          {
            path: "pending",
            element: <PaymentStatusWrapper><PaymentPending /></PaymentStatusWrapper>,
          },
          {
            path: "error",
            element: <PaymentStatusWrapper><PaymentError /></PaymentStatusWrapper>,
          },
        ],
      },
  // Admin routes
  {
        path: "admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "users/add",
        element: <TambahUser />,
      },
      {
        path: "users/edit/:id",
        element: <EditUser />,
      },
      {
        path: "hotels",
        element: <Hotel />,
      },
      {
        path: "hotels/add",
        element: <TambahHotel />,
      },
      {
        path: "hotels/edit/:id",
        element: <EditHotel />,
      },
      {
        path: "rooms",
        element: <Room />,
      },
      {
        path: "rooms/add",
        element: <TambahRoom />,
      },
      {
        path: "rooms/edit/:id",
        element: <EditRoom />,
      },
      {
        path: "wisata",
        element: <Wisata />,
      },
      {
        path: "wisata/add",
        element: <TambahWisata />,
      },
      {
        path: "wisata/edit/:id",
        element: <EditWisata />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "event/add",
        element: <TambahEvent />,
      },
      {
        path: "event/edit/:id",
        element: <EditEvent />,
      },
      {
        path: "orders/:id",
        element: <OrderDetail />,
      }
    ],
  },
      // Main routes with layout
  {
    element: <WithMainLayout />,
    children: [
      {
            path: "",
        element: <HomePage />,
      },
      {
            path: "about",
        element: <About />,
      },
      {
            path: "faq",
        element: <FaqSection />,
      },
      {
            path: "detail-wisata/:id",
        element: <DetailWisata />,
      },
      {
            path: "detail-hotel/:id",
        element: <DetailHotel />,
      },
      {
            path: "detail-kuliner/:id",
        element: <DetailKuliner />,
      },
      {
            path: "order-kuliner/:id",
        element: <OrderKuliner />,
      },
      {
            path: "order-wisata/:id",
        element: <OrderWisata />,
      },
      {
            path: "order-hotel/:id",
        element: <OrderHotel />,
      },
      {
            path: "choose-room/:id",
        element: <ChooseRoom />,
      },
      {
            path: "user-profile/:id",
        element: <UserProfile />,
      },
      {
            path: "weather-calender",
        element: <WeatherCalendar />,
      },
      {
            path: "payment/:invoiceNumber",
        element: <Payment />,
      },
    ],
  },
  // Auth routes
  {
        path: "login",
    element: <LoginPage />,
  },
  {
        path: "register",
    element: <Register />,
  },
  {
        path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
        path: "reset-password",
    element: <ResetPassword />,
  },
  {
        path: "validation-code",
    element: <AuthenticationForm />,
  },
  {
        path: "resend",
    element: <VerificationFailed />,
      },
    ],
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

