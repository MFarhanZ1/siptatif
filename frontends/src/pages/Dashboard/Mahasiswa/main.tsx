import home from "../../../../assets/icons/home.svg";
import iconpendaftaraan from "../../../../assets/icons/pendaftaraan.svg"
import iconpembimbing from "../../../../assets/icons/pembimbing.svg"
function SideBarMahasiswa() {
  return (
    <div>
      <div className="flex flex-col gap-5 font-poppins w-full">
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={home} className="w-[30px] content-center" alt="Top Image" />
          <h1 className="text-xl content-center mt-1">Dashboard</h1>
        </div>
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={iconpendaftaraan} className="w-[30px] content-center" alt="Top Image" />
          <h1 className="text-xl content-center mt-1">Pendaftaraan</h1>
        </div>
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={iconpembimbing} className="w-[30px] content-center" alt="Top Image" />
          <h1 className="text-xl content-center mt-1">Pembimbing</h1>
        </div>
      </div>
    </div>
  );
}

export default SideBarMahasiswa;
