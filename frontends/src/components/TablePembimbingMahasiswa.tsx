import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SeachField from "./SeachField";
import { getDataDosenMahasiswaPage } from "../services/MahasiswaService";

function TablePembimbingMahasiswa() {
  const [body, setBody] = useState([]);

  const [page, setPage] = useState(1);

  const [pageInterval, setPageInterval] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getDataDosenMahasiswaPage(1).then((data) => {
      setBody(data.results);
      setTotalItems(data.info.total_all_data);
      setPageInterval(data.info.data_per_page);
      // setCurrentPage(data.info.current_page);
      setTotalPage(data.info.total_page);
    });
  }, [page]);
  const redItem: number = 1;
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
              <th>NIDN</th>
              <th>Nama Dosen</th>
              <th>Keahlian</th>
              <th>Kuota</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {body?.map(
              (item: {
                nidn: string;
                nama: string;
                keahlian: string;
                kuota: string;
                kuota_terpakai: number;
                kuota_awal: number;
              }) => {
                const persentase = item.kuota_terpakai / item.kuota_awal;
                const bgColorClass = () => {
                  if (persentase == redItem) {
                    return "bg-red-700";
                  } else if (persentase >= 0.1 && persentase <= 0.3) {
                    return "bg-green-600";
                  } else if (persentase >= 0.3 && persentase <= 0.6) {
                    return "bg-yellow-600";
                  } else if (persentase >= 0.6 && persentase <= 0.7) {
                    return "bg-red-400";
                  } else if (persentase >= 0.7 && persentase <= 0.9) {
                    return "bg-red-600";
                  }
                };
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
                      {
                        <div>
                          <div className={`rounded-lg p-1 font-bold`}>
                            {item.kuota_terpakai}/{item.kuota_awal}
                          </div>
                          <div className="w-full bg-gray-400 rounded-full h-2.5">
                            <div
                              className={`${bgColorClass()} h-2.5 rounded-full`}
                              style={{ width: `${persentase * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      }
                    </td>
                    <td className="px-6 py-2 truncate max-w-36">
                      {"tersedia"}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={totalItems}
        totalPages={totalPage}
        itemsPerPage={pageInterval}
        currentPage={page}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
}

export default TablePembimbingMahasiswa;
