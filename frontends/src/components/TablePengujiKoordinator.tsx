import iconedit from "../../assets/icons/edit.svg";
import icondelete from "../../assets/icons/delete.svg";

interface Data {
    body: {
      nidn: string;
      nama: string;
      keahlian?: string | undefined;
      kuota_awal: string | undefined;
      kuota_tersisa?: string;
      kuota_terpakai?: number;
    }[];
    onDelete: (nidn: string) => void;
    onEdit: (nidn: string, kuota_awal: string) => void;
  }
function TablePengujiKoordinator({ body ,onDelete, onEdit}: Data) {
  return (
    <div className="overflow-x-auto border border-black font-poppins h-full flex-grow">
      {/* table */}
      <table className="w-full text-xs text-left table-auto">
        <thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
          <tr className="text-center text-sm">
            <th>NIDN</th>
            <th>Nama Dosen</th>
            <th>Keahlian</th>
            <th>Kuota Penguji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {body?.map((item) => {
            return (
              <tr
                key={item.nidn}
                className="bg-white border-b border-gray-700 text-center odd:bg-gray-200 even:bg-gray-300"
              >
                <td className="px-6 py-2 truncate max-w-32">{item.nidn}</td>
                <td className="px-6 py-2 truncate max-w-36">{item.nama}</td>
                <td className="px-6 py-2 truncate max-w-36">
                  {item.keahlian
                    ?.split(", ")
                    .map((keahlian, index) => (
                      <p key={index}>- {keahlian}</p>
                    )) ?? (
                    <p className="font-bold">
                      {"😥 Yah, Keahlian Belum Terdaftar :("}
                    </p>
                  )}
                </td>
                <td className="px-6 py-2 truncate max-w-16">
                  {item.kuota_awal}
                </td>
                <td className="flex py-2 items-center justify-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onEdit(item.nidn!, item.kuota_awal!);
                        
                      }}
                    >
                      <img src={iconedit} alt="Edit" className="w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(item.nidn!);
                      }}
                    >
                      <img src={icondelete} alt="Delete" className="w-6" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TablePengujiKoordinator