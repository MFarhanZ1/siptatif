import iconsearch from "../../assets/icons/searchfield.svg"

interface SeachFieldProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: (search: String) => void
}

function SeachField({onChange}: SeachFieldProps) {
  return (
    <div className='flex gap-2 font-poppins rounded-md border border-black p-1'>
        <img src={iconsearch} alt="" className='w-8'/>
        <input onChange={(e) => onChange(e.target.value)} className='w-full bg-transparent border-none focus:outline-none' type="text" name="" id=""  placeholder='Cari berdasarkan NIDN, Nama Dosen, Keahlian'/>
    </div>
  )
}

export default SeachField