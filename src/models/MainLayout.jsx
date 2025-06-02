// // src/models/MainLayout.jsx
import React from "react";
import Sidebar from "../components/user/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
