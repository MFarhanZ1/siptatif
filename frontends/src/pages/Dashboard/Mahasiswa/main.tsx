import { useState } from 'react'
import Footer from '../../../components/Footer'
import SideBarMahasiswa from './SideBarMahasiswa'
import FormPendaftaraan from './FormPendaftaraan';
import TablePembimbingMahasiswa from '../../../components/TablePembimbingMahasiswa';
import DashboardMahasiswa from './DashboardMahasiswa';


function MainMahasiswa() {
  const [onMenuClick, setOnMenuClick] =useState<string>("dashboard");

  const renderContent = () => {
    switch (onMenuClick) {
      case "dashboard":
        return <DashboardMahasiswa />;
      case "pendaftaraan":
        return <FormPendaftaraan onMenuClick={setOnMenuClick}/>;
      case "pembimbing":
        return <TablePembimbingMahasiswa/>;
    }
  };

  return (
    <div className='h-full select-none'>
        <div className="flex overflow-hidden h-full">
        <div className="bg-[#E1E1E1] w-[21%] border-r border-black p-4 flex flex-col justify-between overflow-hidden h-full">
          {/* side bar */}
          <div className="overflow-y-auto flex-1 h-full">
            <SideBarMahasiswa onMenuClick={setOnMenuClick}/>
          </div>
          <footer>
            <p className="text-center z-1 font-ibm-plex-mono-medium underline">
              🔥siptatif v3.27🔥
            </p>
          </footer>
        </div>

        <div className="w-[100%] flex flex-col h-full">

          {/* content side bar */}
          <div className="overflow-y-auto h-full">
            {/* <FormPendaftaraan /> */}
            {renderContent()}
            {/* <Pembimbing /> */}
          </div>
          <Footer />
          {/* footer */}
        </div>
      </div>
    </div>
  )
}

export default MainMahasiswa