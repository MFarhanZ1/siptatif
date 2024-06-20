import React, { useState } from "react";
import Footer from "../../../components/Footer";
import SideBarKoordinatorTA from "./SideBarKoordinatorTA";
import Pembimbing from "./Pembimbing";
import Penguji from "./Penguji";
import TableMahasiswaKoordinator from "../../../components/TableMahasiswaKoordinator";

function MainKoordinatorTA() {
  const [onMenuClick, setOnMenuClick] = useState("mahasiswa");

  const renderContent = () => {
    switch (onMenuClick) {
      case "mahasiswa":
        return <TableMahasiswaKoordinator />;
      case "penguji":
        return <Penguji />;
      case "pembimbing":
        return <Pembimbing />;
    }
  };
  return (
    <div className="h-full select-none">
      <div className="flex overflow-hidden h-full">
        <div className="bg-[#E1E1E1] w-[21%] border-r border-black p-4 flex flex-col justify-between overflow-hidden">
          {/* side bar */}
          <div className="overflow-y-auto flex-1 ">
            <SideBarKoordinatorTA onMenuClick={setOnMenuClick} />
          </div>
          <footer>
            <p className="text-center z-1 font-ibm-plex-mono-medium underline">
              🔥siptatif v3.27🔥
            </p>
          </footer>
        </div>

        <div className="flex flex-col h-full w-full">
          {/* content side bar */}
          <div className="w-full flex-grow overflow-y-auto">
            {renderContent()}
          </div>

          <Footer />
          {/* footer */}
        </div>
      </div>
    </div>
  );
}

export default MainKoordinatorTA;
