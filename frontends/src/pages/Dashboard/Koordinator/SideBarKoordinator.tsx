function SideBarKoordinator() {
  return (
    <div>
      <div className="flex flex-col gap-5 font-poppins w-full">
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src="" className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Mahasiswa</h1>
        </div>
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src="" className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Pembimbing</h1>
        </div>
        <div className="bg-[#92BAF7] hover:bg-[#87ace4] flex flex-row gap-2 p-2 border border-black rounded-md cursor-pointer">
          <img src="" className="w-[30px] content-center" alt="" />
          <h1 className="text-xl content-center mt-1">Penguji</h1>
        </div>
      </div>
    </div>
  )
}

export default SideBarKoordinator