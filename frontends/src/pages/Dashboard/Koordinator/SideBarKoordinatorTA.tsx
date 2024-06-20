import iconmahasiswa from "../../../../assets/icons/mahasiswakoordinator.svg"
import iconpembimbing from "../../../../assets/icons/pembimbingkoordinator.svg"
import iconpenguji from "../../../../assets/icons/pengujikoordinator.svg"
interface SideBarKoordinatorTAProps {
  onMenuClick: (menu: string) => void
}
function SideBarKoordinatorTA({onMenuClick}: SideBarKoordinatorTAProps) {
  return (
    <div>
      <div className="flex flex-col gap-5 font-poppins w-full">
        <div onClick={() => onMenuClick("mahasiswa")} className="bg-[#C3E796] hover:bg-[#8ABC6B] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={iconmahasiswa} className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Mahasiswa</h1>
        </div>
        <div onClick={() => onMenuClick("pembimbing")}  className="bg-[#C3E796] hover:bg-[#8ABC6B] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={iconpembimbing} className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Pembimbing</h1>
        </div>
        <div onClick={() => onMenuClick("penguji")} className="bg-[#C3E796] hover:bg-[#8ABC6B] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src={iconpenguji} className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Penguji</h1>
        </div>
      </div>
    </div>
  )
}

export default SideBarKoordinatorTA