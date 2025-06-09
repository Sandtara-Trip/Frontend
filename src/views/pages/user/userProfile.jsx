import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/user/userProfile/Sidebar";
import ProfileTab from "../../../components/user/userProfile/ProfileTab";
import RiwayatTab from "../../../components/user/userProfile/RiwayatTab";
import { axiosInstance } from "../../../config/api";

const UserProfile = () => {
  const location = useLocation(); 
  const tabFromState = location.state?.tab;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/users/profile');
        
        if (response.data.success) {
          const userData = response.data.data;
          setName(userData.name);
          setEmail(userData.email);
          setPhoto(userData.photo || "");
          
          // Update localStorage
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userPhoto", userData.photo || "");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to localStorage if API fails
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail") || "";
        const storedPhoto = localStorage.getItem("userPhoto") || "";
        
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPhoto) setPhoto(storedPhoto);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Set tab 
  useEffect(() => {
    if (tabFromState) {
      setActiveTab(tabFromState);
    }
  }, [tabFromState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <ProfileTab 
              name={name} 
              email={email} 
              photo={photo}
              onUserUpdate={(userData) => {
                setName(userData.name);
                setEmail(userData.email);
                setPhoto(userData.photo || "");
                // Update localStorage
                localStorage.setItem("userName", userData.name);
                localStorage.setItem("userEmail", userData.email);
                localStorage.setItem("userPhoto", userData.photo || "");
              }} 
            />
          )}
          {activeTab === "riwayat" && <RiwayatTab />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
