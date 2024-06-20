import React, { SetStateAction, useEffect, useState } from "react";
import Pagination from "./Pagination";
import SeachField from "./SeachField";
import {
  getDataMahasiswaKoordinator,
  getDataMahasiswaKoordinatorSearch,
  getPengujiKoordinator,
  updateTAMahasiswa,
} from "../services/KoordinatorTAService";
import Card from "./Card";
import icondelete from "../../assets/icons/tutup.svg";
import Swal from "sweetalert2";

// Komponen Modal
const Modal = ({ show, onClose, data }) => {
  console.log(data);
  const [bodyPenguji1, setBodyPenguji1] = useState([]);
  const [bodyPenguji2, setBodyPenguji2] = useState([]);
  const [pembimbing2] = useState(data.dosen_pembimbing2 || "-");
  const [status, setStatus] = useState(data.status);
  const [noRegTA] = useState(data.no_reg_ta);
  
  
  const [penguji1, setPenguji1] = useState("");
  const [penguji2, setPenguji2] = useState("");
  const [filterPenguji2, setFilterPenguji2] = useState([]);
  const [penguji, setPenguji] = useState(false);
  const [catatan, setCatatan] = useState("");
  useEffect(() => {
    const updateFilterPenguji2 = bodyPenguji2?.filter(
      (data: { nidn: string }) => data.nidn !== penguji1
    );
    setFilterPenguji2(updateFilterPenguji2);
  }, [penguji1, bodyPenguji2]);

  useEffect(() => {
    getPengujiKoordinator().then((data) => {
      setBodyPenguji1(data.results);
      setBodyPenguji2(data.results);
    });
  }, [penguji1,status]);
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 items-center bg-black bg-opacity-50 flex  justify-center z-50 font-poppins overflow-auto">
      <Card className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full overflow-auto h-[86%]">
        <h2 className="text-xl mb-4 text-center underline">Detail Mahasiswa</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="font-bold">No. Registrasi: </p>
            <p>{data.no_reg_ta}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Nama Mahasiswa:</p>
            <p>{data.nama_mahasiswa}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Nama Mahasiswa:</p>
            <p>{data.nama_mahasiswa}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">NIM:</p>
            <p>{data.nim}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Judul Tugas Akhir:</p>
            <p>{data.judul_ta}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Dosen Pembimbing 1:</p>
            <p>{data.dosen_pembimbing1}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Dosen Pembimbing 2:</p>
            <p>{pembimbing2}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Berkas:</p>
            <button onClick= {() => window.open(data.berkas, "_blank")} className="bg-gray-500 px-4 py-2 hover:bg-gray-600 text-white rounded-lg cursor-pointer">Lihat Berkas</button>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Status:</p>
            <p>{status}</p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setStatus("DITOLAK");
                setPenguji(false);
                setPenguji1("");
                setPenguji2("");
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg w-full"
            >
              DITOLAK
            </button>
            <button
              onClick={() => {
                setStatus("SETUJU");
                setPenguji(true);
              }}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-lg w-full"
            >
              SETUJU
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTAMahasiswa(noRegTA, status,catatan,penguji1, penguji2).then((data) => {
                if (data.response) {
                  Swal.fire({
                    icon: "success",
                    title: "Perubahan data mahasiswa berhasil!",
                    text: data.message,
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 2000,
                  }).then(() => {
                    onClose();
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Perubahan data mahasiswa gagal!",
                    text: data.message,
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 2000,
                  });
                }
              })
              console.log(status, penguji1, penguji2);
            }
            }
            >
            {status === "DITOLAK" && (
              <div className="flex flex-col border-b border-black mb-5">
                <p className="font-bold">Catatan:</p>
                <input
                  type="text"
                  onChange={(e) => setCatatan(e.target.value)}
                  className="border-none px-2 py-1 focus:outline-none"
                />
              </div>
            )}
            <div className={`flex flex-col ${penguji ? "block" : "hidden"}`}>
              <p className="font-bold">Penguji 1:</p>
              <select
                className="w-full border border-black rounded-md p-2"
                onChange={(e) => {
                  setPenguji1(e.target.value);
                  bodyPenguji2.pop();
                }}
              >
                <option value="" disabled selected>
                  -- Pilih Penguji 1 --
                </option>
                {bodyPenguji1?.map((data: { nidn: string; nama: string }) => {
                  return <option value={`${data.nidn}`}>{data.nama}</option>;
                })}
              </select>
            </div>
            <div className={`flex flex-col ${penguji ? "block" : "hidden"}`}>
              <p className="font-bold">Penguji 2:</p>
              <select
                className="w-full border border-black rounded-md p-2"
                onChange={(e) => {
                  setPenguji2(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  -- Pilih Penguji 2 --
                </option>
                {filterPenguji2?.map((data: { nidn: string; nama: string }) => {
                  return <option value={`${data.nidn}`}>{data.nama}</option>;
                })}
              </select>
            </div>
          <button type ="submit" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 text-white rounded-lg mt-3 w-full">
            Perbarui Status
          </button>
          </form>
        </div>
      </Card>
      <div className="self-start">
        <button
          onClick={onClose}
          className="mt-4 px-2 py-1 text-white rounded-lg"
        >
          <img src={icondelete} alt="" />
        </button>
      </div>
    </div>
  );
};

export default function TableMahasiswaKoordinator() {
  const [page, setPage] = useState(1);
  const [pageInterval, setPageInterval] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [bodyPage, setBodyPage] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  useEffect(() => {
    getDataMahasiswaKoordinator(page).then((data) => {
      console.log(data);
      setBodyPage(data.results);
      setTotalItems(data.info.total_all_data);
      setPageInterval(data.info.data_per_page);
      setTotalPage(data.info.total_page);
    });
  }, [page]);

  useEffect(() => {
    getDataMahasiswaKoordinatorSearch(search).then((data) => {
      setBodyPage(data.results);
      setTotalItems(data.info.total_all_data);
      setPageInterval(data.info.data_per_page);
      setTotalPage(data.info.total_page);
    });
  }, [search]);

  const handleRowClick = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  function textColorStatus(status: string) {
    if (status === "DITOLAK") {
      return "text-red-700";
    } else if (status === "SETUJU") {
      return "text-green-700";
    } else {
      return "text-yellow-800";
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 overflow-x-auto font-poppins p-4 h-full">
        <SeachField
        placeholder="Cari berdasarkan NIM, Nama Mahasiswa, atau Judul TA..."
          onChange={(e) => {
            setSearch(e as SetStateAction<string>);
          }}
        />

        <div className="overflow-x-auto border border-black font-poppins flex-grow">
          {showModal && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              data={selectedData}
            />
          )}

          <table className="w-full text-xs text-left table-auto">
            <thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
              <tr className="text-center text-sm">
                <th scope="col">No. Registrasi</th>
                <th scope="col">Nama Mahasiswa</th>
                <th scope="col">NIM</th>
                <th scope="col">Judul</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bodyPage?.map(
                (item: {
                  no_reg_ta: string;
                  nama_mahasiswa: string;
                  nim: string;
                  judul_ta: string;
                  status: string;
                }) => (
                  <tr
                    key={item.no_reg_ta}
                    className="bg-white border-b border-gray-700 text-center odd:bg-gray-200 even:bg-gray-300"
                  >
                    <td className="px-6 py-2 truncate max-w-32">
                      {item.no_reg_ta}
                    </td>
                    <td className="px-6 py-2 truncate max-w-36">
                      {item.nama_mahasiswa}
                    </td>
                    <td className="px-6 py-2 truncate max-w-36">{item.nim}</td>
                    <td className="px-6 py-2 truncate max-w-36">
                      {item.judul_ta}
                    </td>
                    <td className={`font-bold ${textColorStatus(item.status)}`}>{item.status}</td>
                    <td className="px-6 py-2 truncate max-w-28">
                      <div
                        onClick={() => handleRowClick(item)}
                        className="bg-yellow-200 hover:bg-yellow-300 border rounded-lg p-1 border-black underline italic cursor-pointer"
                      >
                       🔎 Lihat Detail
                      </div>
                    </td>
                  </tr>
                )
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
    </>
  );
}
