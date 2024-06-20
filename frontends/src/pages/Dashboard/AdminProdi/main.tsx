import { useState } from "react";
import SideBarAdminProdi from "./SideBarAdminProdi";
import Footer from "../../../components/Footer";
import KelolaDataDosen from "./Dosen/KelolaDataDosen";
import KelolaJabatanDosen from "./Dosen/KelolaJabatanDosen";
import KelolaKeahlianDosen from "./Dosen/KelolaKeahlianDosen";
import Pengumuman from "./Pengumuman/Pengumuman";
import DashboardAdminProdi from "./DashboardAdminProdi";

function MainAdminProdi() {
  const [onMenuClick, setOnMenuClick] = useState("dashboard");
  const renderContent = () => {
    switch (onMenuClick) {
      case "dashboard":
        return <DashboardAdminProdi onMenuClick={setOnMenuClick} />;
      case "kelolaodosen":
        return <KelolaDataDosen />;
      case "kelolakeahlian":
        return <KelolaKeahlianDosen />;
      case "kelolajabatan":
        return <KelolaJabatanDosen />;
      case "pengumuman":
        return <Pengumuman />;
    }
  };
  return (
    <div className="h-full select-none">

      <div className="flex overflow-hidden h-full w-full">

        <div className="bg-[#E1E1E1] w-[21%] border-r border-black p-4 flex flex-col justify-between overflow-hidden h-full">
          
          {/* side bar */}
          <div className="h-full flex-grow overflow-hidden">
            <SideBarAdminProdi onMenuClick={setOnMenuClick} />
          </div>
          <footer>
            <p className="text-center z-1 font-ibm-plex-mono-medium underline">
              🔥siptatif v3.27🔥
            </p>
          </footer>

        </div>

        <div className="w-full flex flex-col">
          {/* content side bar */}
          <div className="overflow-y-auto flex-grow">{renderContent()}</div>
          <Footer />
          {/* footer */}
        </div>

      </div>

    </div>
  );
}

export default MainAdminProdi;
