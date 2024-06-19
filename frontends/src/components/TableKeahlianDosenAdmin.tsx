import React from "react";
import icondelete from "../../assets/icons/delete.svg";


interface Data {
  action?: boolean;
  body: {
    nidn: string;
    nama: string;
    keahlian: string;
    id_keahlian: string;
  }[];

  onDelete: (nidn: string, id_keahlian: string) => void;
}
function TableKeahlianDosenAdmin({ body,action,onDelete}: Data) {
  return (
    <div className="overflow-x-auto border border-black font-poppins flex-1">
      <table className="w-full text-xs text-left table-auto">
        <thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
          <tr className="text-center text-sm">
            <th scope="col" className="">
              NIDN
            </th>
            <th scope="col" className="">
              Nama Dosen
            </th>
            <th scope="col" className="">
              Keahlian
            </th>
            <th scope="col" className="">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {body?.map((item) => (
            <tr
              key={item.nidn}
              className="bg-white border-b border-gray-700 text-center odd:bg-gray-200 even:bg-gray-300"
            >
              <td className="px-6 py-2 truncate max-w-32">{item.nidn}</td>
              <td className="px-6 py-2 truncate max-w-36">{item.nama}</td>
              <td className="px-6 py-2 truncate max-w-32">{item.keahlian}</td>

              {action && (
                <td className="flex py-2 items-center justify-center">
                  <div className="flex items-center justify-center gap-1">
                   
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(item.nidn!, item.id_keahlian!);
                      }}
                    >
                      <img src={icondelete} alt="Delete" className="w-6" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableKeahlianDosenAdmin;
