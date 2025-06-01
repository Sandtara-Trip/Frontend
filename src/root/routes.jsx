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

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/hotel",
    element: <Hotel />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/wisata",
    element: <Wisata />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/add-hotel",
    element: <TambahHotel />,
  },
  {
    path: "/add-room",
    element: <TambahRoom />,
  },
  {
    path: "/add-wisata",
    element: <TambahWisata />,
  },
  {
    path: "/add-user",
    element: <TambahUser />,
  },
  {
    path: "/edit-hotel",
    element: <EditHotel />,
  },
  {
    path: "/edit-room",
    element: <EditRoom />,
  },
  {
    path: "/edit-wisata",
    element: <EditWisata />,
  },
  {
    path: "/edit-user",
    element: <EditUser />,
  },
]);
