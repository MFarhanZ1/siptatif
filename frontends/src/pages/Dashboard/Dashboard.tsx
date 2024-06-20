import CustomMarquee from "../../components/Marquee";
import Navbar from "../../components/Navbar";
import { verifyAccess } from "../../services/JwtAuthService";
import { useEffect, useState } from "react";
import MainAdminProdi from "./AdminProdi/main";
import MainKoordinatorTA from "./Koordinator/main";
import MainMahasiswa from "./Mahasiswa/main";
import { getListPengumuman } from "../../services/PengumumanService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState<string>("");
  const [listAnnouncement, setListAnnouncement] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
			navigate("/login");
      return;
		}

    verifyAccess().then((data) => {
        if (data.response) {
          setRole(data.role);
        }
    });

    let pengumuman = "";
    getListPengumuman().then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        pengumuman = ` ${pengumuman} ${data.results[i].isi} ${
          i === data.results.length - 1 ? " - // -" : "|"
        }`;
      }
      setListAnnouncement(pengumuman);
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
        <CustomMarquee list_announcement={listAnnouncement} />
      </div>

      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
};

export default Dashboard;
