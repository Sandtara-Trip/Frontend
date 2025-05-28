// UserProfile.jsx
import { useState, useEffect } from "react";
import NavbarAfter from "../../../components/user/navbarAfter";
import Sidebar from "../../../components/user/userProfile/Sidebar";
import ProfileTab from "../../../components/user/userProfile/ProfileTab";
import RiwayatTab from "../../../components/user/userProfile/RiwayatTab";

const dummyUser = {
  username: "Nabila Naurotul",
  email: "taraddicts@example.com",
  photo:
    "https://tse2.mm.bing.net/th?id=OIP.ChBBAuEHXUTGul0YB_b-dgHaHa&pid=Api&P=0&h=220",
};

const UserProfile = ({ userData = dummyUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (userData) {
      setName(userData.username);
      setEmail(userData.email);
      setPhoto(userData.photo);
    }
  }, [userData]);

  return (
    <>
      <NavbarAfter />
      <div className="flex h-screen mt-16">
        <Sidebar
          name={name}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex-1 px-8 py-10 overflow-y-auto bg-gray-50">
          {activeTab === "profile" && (
            <ProfileTab name={name} email={email} photo={photo} />
          )}
          {activeTab === "riwayat" && <RiwayatTab />}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
