import Footer from "../../components/Footer";
import Marquee from "../../components/Marquee";
import Navbar from "../../components/Navbar";
// import SideBarKoordinator from "./Koordinator/SideBarKoordinator";
import SideBarAdminProdi from "./AdminProdi/SideBarAdminProdi";
// import SideBarMahasiswa from "./Mahasiswa/main";

import FormDosen from "./AdminProdi/Dosen/FormDosen";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-[100vh] overflow-hidden">
      <div>
        {/* navbar */}
        <Navbar />
        {/* marque list */}
        <Marquee list_announcement="Perhatian! Perubahan jadwal seminar proposal menjadi 2 June 2024 | Kontak admin untuk masalah teknis di support@uin-suska.ac.id" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[20%] border-r border-black p-4 flex flex-col justify-between overflow-hidden">
          {/* side bar */}
          <div className="overflow-y-auto flex-1">
            <SideBarAdminProdi />
            {/* <SideBarMahasiswa /> */}
            {/* <SideBarKoordinator /> */}
          </div>
          <footer>
            <p className="text-center z-1 font-ibm-plex-mono-medium underline">
              🔥siptatif v3.27🔥
            </p>
          </footer>
        </div>
        <div className="w-[80%] flex flex-col">
          {/* content side bar */}
          <div className="overflow-y-auto flex-1">
            <FormDosen />
          </div>
          {/* footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
