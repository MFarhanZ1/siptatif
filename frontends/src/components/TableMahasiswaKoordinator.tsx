import React from 'react'
import Pagination from './Pagination'
import SeachField from './SeachField'

export default function TableMahasiswaKoordinator() {
  return (
    <div className="flex flex-col gap-4 overflow-x-auto font-poppins flex-1 m-3">
      <div>
        <SeachField />
      </div>
      <div className="overflow-y-auto border border-black">
        {/* table */}
        <table className="w-full text-xs text-left table-auto">
          <thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
            <tr className="text-center text-sm">
              {/* {header.map((item, index) => (
                <th scope="col" className="" key={index}>
                  {item}
                </th>
              ))} */}
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* {body.map((item) => (
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
                <td className="px-6 py-2 truncate max-w-36">
                  {
                    <div className="rounded-lg p-1 font-bold bg-purple-400">
                      {item.kuota_terpakai}/{item.kuota_tersedia} Tersedia
                    </div>
                  }
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <Pagination totalItems={30} totalPages={18} itemsPerPage={10} currentPage={1} onPageChange={() => {}}/>
    </div>
  )
}
