import CustomMarquee from "../../components/Marquee";
import Navbar from "../../components/Navbar";
// import SideBarKoordinator from "./Koordinator/SideBarKoordinator";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken, verifyAccess } from "../../services/JwtAuthService";
import { useEffect, useState } from "react";
import MainAdminProdi from "./AdminProdi/main";
import MainKoordinatorTA from "./Koordinator/main";
import MainMahasiswa from "./Mahasiswa/main";

// import { InvalidTokenError, JwtPayload, jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    verifyAccess().then((data) => {
      setRole(data.role);

      if (!data.response) {
        refreshToken().then((data) => {
          console.log(data);
          if (data.response) {
            localStorage.setItem("access-token", data.access_token);
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        });
      }
    });
  }, []);

  // rbac
  let content;
  if (role === "Admin Prodi") {
    content = <MainAdminProdi />;
  } else if (role == "Koordinator TA") {
    content = <MainKoordinatorTA />;
  } else if (role == "Mahasiswa") {
    content = <MainMahasiswa />;
  }

  return (
    <div className="flex flex-col bg-[#F2F7F5] h-screen">
      <div>
        {/* navbar */}
        <Navbar />
        {/* marque list */}
        <CustomMarquee list_announcement="Perhatian! Perubahan jadwal seminar proposal menjadi 2 June 2024 | Kontak admin untuk masalah teknis di support@uin-suska.ac.id" />
      </div>

      <div className="flex-1 overflow-hidden">{content}</div>

      {/* <footer className="w-full h-10 bg-black">teet</footer> */}

    </div>
  );
};

export default Dashboard;
