import SeachField from "../../../../components/SeachField";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { SetStateAction, useEffect, useState } from "react";
import {
  createDataKeahlianDosen,
  deleteKeahlianDosen,
  getAllDataDosen,
  getAllDataKeahlian,
  getKeahlianDosenPage,
  getKeahlianSearch,
} from "../../../../services/AdminProdiService";
import TableKeahlianDosenAdmin from "../../../../components/TableKeahlianDosenAdmin";
import Swal from "sweetalert2";
import Pagination from "../../../../components/Pagination";

function KelolaKeahlianDosen() {
  const [bodyDosen, SetBodyDosen] = useState([]);
  const [bodyKeahlian, SetBodyKeahlian] = useState([]);
  const [nidn, SetNidn] = useState("");
  const [id_keahlian, SetIdKeahlian] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [bodyPageDosen, setBodyPageDosen] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInterval, setPageInterval] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getAllDataDosen().then((data) => {
      SetBodyDosen(data.results);
    });

    getAllDataKeahlian().then((data) => {
      SetBodyKeahlian(data.results);
    });
  }, []);


  useEffect(() => {
    getKeahlianDosenPage(page).then((data) => {
      // console.log(data.results);
      setBodyPageDosen(data.results);
      setTotalItems(data.info.total_all_data);
      setPageInterval(data.info.data_per_page);
      // setCurrentPage(data.info.current_page);
      setTotalPage(data.info.total_page);
    });
  }, [page, refresh]);

  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    console.log(searchData)
    if (!searchData) {
      setRefresh(!refresh);
    }
    getKeahlianSearch(searchData).then((data) => {
      console.log(data.results);
      setBodyPageDosen(data.results);
      // setTotalItems(data.info.total_all_data);
      // setPageInterval(data.info.data_per_page);
      // // setCurrentPage(data.info.current_page);
      // setTotalPage(data.info.total_page);
    });
  }, [searchData, refresh]);

  return (
		<div className="h-full">
			<div className="flex gap-5 w-full h-full p-5">
				<div className="w-[37%] ml-2 h-full flex justify-center rounded-xl bg-gray-200 border-t border-b border-black items-center">
					<Card className="border border-black font-poppins p-4 w-full overflow-auto">
            <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
              Kelola Keahlian Dosen
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(nidn, id_keahlian);
                createDataKeahlianDosen({
                  nidn: nidn,
                  id_keahlian: id_keahlian,
                }).then((data) => {
                  if (data.response) {
                    Swal.fire({
                      icon: "success",
                      title: "Penambahan data keahlian dosen berhasil!",
                      text: data.message,
                      showConfirmButton: false,
                      showCloseButton: false,
                      timer: 2000,
                    }).then(() => {
                      setRefresh(!refresh);
                      SetNidn("");                      
                      SetIdKeahlian(0);
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Penambahan data keahlian dosen gagal!",
                      text: data.message,
                      showConfirmButton: false,
                      showCloseButton: false,
                      timer: 2000,
                    });
                  }
                });
              }}
            >
              <div className="flex gap-3 flex-col">
                <div>
                  <p className="text-xl mb-4 font-poppins">
                    Nama Dosen: <span className="text-red-500">*</span>
                  </p>
                  <select
                    onChange={(e) => {
                      SetNidn(e.target.value);
                    }}
                    className="w-full border border-black rounded-md p-2"
                    required
                  >
                    <option value="" disabled selected={nidn == ""}>
                      -- Pilih Dosen --
                    </option>
                    {bodyDosen?.map((data: { nidn: string; nama: string }) => {
                      return <option value={data.nidn}>{data.nama}</option>;
                    })}
                  </select>
                </div>

                <Input
                  label="NIDN: "
                  required={true}
                  type="text"
                  disabled={true}
                  classNameInput="disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={nidn}
                ></Input>
                <div>
                  <p className="text-xl mb-4 font-poppins">
                    Keahlian: <span className="text-red-500">*</span>
                  </p>
                  <select
                    onChange={(e) => {
                      SetIdKeahlian(Number(e.target.value));
                    }}
                    className="w-full border border-black rounded-md p-2"
                    required
                  >
                    <option value="" disabled selected={id_keahlian == 0}>
                      -- Pilih Keahlian --
                    </option>
                    {bodyKeahlian?.map((data: { id: number; nama: string }) => {
                      return <option value={data.id}>{data.nama}</option>;
                    })}
                    {/* {body.map((data: Data) => {
                  return <option value={data.nidn}>{data.nama}</option>;
                })} */}
                  </select>
                </div>
                <Button
                  className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                  text="Tambahkan"
                  type="submit"
                />
              </div>
            </form>
          </Card>
        </div>
				<div className="flex flex-col h-full w-[63%]">
					<div className="flex flex-col mr-2 gap-4 overflow-auto h-full">
          <SeachField
              onChange={(e) => {
                setSearchData(e as SetStateAction<string>);
              }}
            />
            <TableKeahlianDosenAdmin
              action={true}
              body={bodyPageDosen}
              onDelete={(nidn: string, id_keahlian: string) => {
                Swal.fire({
                  title: "Apakah Anda yakin?",
                  text: "Data yang di hapus tidak dapat dikembalikan!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#e09719",
                  confirmButtonText: "Hapus",
                  cancelButtonText: "Batal",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteKeahlianDosen(nidn, id_keahlian).then(() => {
                      console.log("deleted");
                      setRefresh(!refresh);
                    });
                  }
                });
              }}
            />
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default KelolaKeahlianDosen;
