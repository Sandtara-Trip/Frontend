// src/config/routes.js
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/pages/user/login";
import Hotel from "../views/pages/user/hotel";
import Room from "../views/pages/user/room";
import Wisata from "../views/pages/user/wisata";
import Order from "../views/pages/user/order";
import User from "../views/pages/user/user";
import TambahHotel from "../views/pages/user/tambahHotel";
import TambahRoom from "../views/pages/user/tambahRoom";
import TambahWisata from "../views/pages/user/tambahWisata";
import TambahUser from "../views/pages/user/tambahUser";
import EditHotel from "../views/pages/user/editHotel";
import EditRoom from "../views/pages/user/editRoom";
import EditWisata from "../views/pages/user/editWisata";
import EditUser from "../views/pages/user/editUser";
import MainLayout from "../models/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "hotel", element: <Hotel /> },
      { path: "hotel/add", element: <TambahHotel /> },
      { path: "hotel/edit/:id", element: <EditHotel /> },

      { path: "room", element: <Room /> },
      { path: "room/add", element: <TambahRoom /> },
      { path: "room/edit/:id", element: <EditRoom /> },

      { path: "wisata", element: <Wisata /> },
      { path: "wisata/add", element: <TambahWisata /> },
      { path: "wisata/edit/:id", element: <EditWisata /> },

      { path: "order", element: <Order /> },

      { path: "user", element: <User /> },
      { path: "user/add", element: <TambahUser /> },
      { path: "user/edit/:id", element: <EditUser /> },
    ],
  },
]);
