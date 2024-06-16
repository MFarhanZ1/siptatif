import { useState } from "react";
import iconhome from "../../../../assets/icons/home.svg";
import icondosen from "../../../../assets/icons/write.svg";
import iconsidearrow from "../../../../assets/images/pngs/panahsamping.png";
import icondownarrow from "../../../../assets/images/pngs/panahbawah.png";
import iconpengumuman from "../../../../assets/icons/pengumuman.svg";
import "../../../index.css";

function SideBarAdminProdi() {
  const [isDropdownOpenDosen, setisDropdownOpenDosen] = useState(false);
  const [arrowDosen, setArrowDosen] = useState(iconsidearrow);
  return (
    <div>
      <div className="flex flex-col gap-5 font-poppins w-full">
        <div className="bg-[#C3E796] hover:bg-[#8ABC6B] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img
            src={iconhome}
            className="w-[30px] content-center"
            alt="Top Image"
          />
          <h1 className="text-xl content-center mt-1">Dashboard</h1>
        </div>
        <div
          onClick={() => {
            setisDropdownOpenDosen(!isDropdownOpenDosen);
            if (arrowDosen === icondownarrow) {
              setArrowDosen(iconsidearrow);
            } else {
              setArrowDosen(icondownarrow);
            }
          }}
          className="bg-[#C3E796] hover:bg-[#8ABC6B] border border-black rounded-md cursor-pointer flex flex-row justify-between"
        >
          <div className="flex flex-row gap-2 p-2">
            <img src={icondosen} className="w-[30px] " alt="Top Image" />
            <h1 className="text-xl content-center mt-1">Dosen</h1>
          </div>
          <img
            src={arrowDosen}
            alt=""
            className="w-[15px] h-[15px] mr-3 self-center"
          />
        </div>
        {/* dropdown konten */}
        {isDropdownOpenDosen && (
          <div className="flex flex-col gap-2 px-2">
            <div className="cursor-pointer border bg-[#ECECEC] hover:bg-[#d1d1d1] border-black rounded-md px-4 py-2 active:bg-[#F6DCFF]">
              🚀~ Kelola Data Dosen
            </div>
            <div className="cursor-pointer border border-black bg-[#ECECEC] rounded-md px-4 py-2 hover:bg-[#d1d1d1] active:bg-[#F6DCFF]">
              💎~ Kelola detail dosen
            </div>
          </div>
        )}

        <div className="bg-[#C3E796] hover:bg-[#8ABC6B] border border-black rounded-md cursor-pointer flex flex-row justify-between">
          <div className="flex flex-row gap-2 p-2">
            <img src={iconpengumuman} className="w-[30px] " alt="Top Image" />
            <h1 className="text-xl content-center mt-1">Pengumuman</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdminProdi;
