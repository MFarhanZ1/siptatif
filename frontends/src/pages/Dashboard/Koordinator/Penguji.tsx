import { useEffect, useState } from "react";
import { getAllDataDosen } from "../../../services/AdminProdiService";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SeachField from "../../../components/SeachField";
import { createPengujiKoordinator, getDataDosenPengujiPage } from "../../../services/KoordinatorTAService";
import Swal from "sweetalert2";
import TableKeahlianDosenAdmin from "../../../components/TableKeahlianDosenAdmin";
import TablePengujiKoordinator from "../../../components/TablePengujiKoordinator";

interface Data {
  nidn: string;
  nama: string;
}
function Penguji() {
  const [body, Setbody] = useState([]);

  const [bodypage, setBodyPage] = useState([]);

  const [page, setPage] = useState(1);
  const [pageInterval, setPageInterval] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllDataDosen().then((data) => {
      Setbody(data.results);
    });
  }, []);

  useEffect(() => {
    getDataDosenPengujiPage(page).then((data) => {
      console.log(data);
      setBodyPage(data.results);
      setTotalItems(data.info.total_all_data);
      setPageInterval(data.info.data_per_page);
      setTotalPage(data.info.total_page);
    });
  }, [page, refresh]);

  const [searchData, setSearchData] = useState("");

  const [nidn, setNidn] = useState("");
  const [kuota, setKuota] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <div className="h-full">
      <div className="flex gap-5 w-full h-full p-5">
        <div className="w-[37%] ml-2 h-full flex justify-center rounded-xl bg-gray-200 border-t border-b border-black items-center">
          <Card className="p-10 w-full">
            <h1 className="text-xl text-center ml-1 underline mb-6 font-poppins-semibold">
              Dosen Penguji
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createPengujiKoordinator(nidn, kuota).then((data) => {
                  if (data.response) {
                    Swal.fire({
                      icon: "success",
                      title: "Berhasil",
                      text: data.message,
                      showConfirmButton: false,
                      timer: 3000,
                    }).then(() => {
                      setNidn("");
                      setKuota("");
                    })
                  }else{
                    Swal.fire({
                      icon: "error",
                      title: "Gagal",
                      text: data.message,
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  }
                })
              }}
            >
              <p className="text-xl mb-4 font-poppins">
                Nama Dosen: <span className="text-red-500">*</span>
              </p>
              <select
                className="w-full border border-black rounded-md p-2"
                onChange={(e) => setNidn(e.target.value)}
                value={nidn}
              >
                <option value="">-- Pilih Dosen --</option>
                {body.map((data: Data) => {
                  return <option value={data.nidn}>{data.nama}</option>;
                })}
              </select>

              <Input
                className=""
                type="text"
                required={true}
                placeholder="127172871288"
                label="NIDN: "
                disabled={true}
                value={nidn}
              ></Input>

              <Input
                className=""
                type="number"
                maxLength={2}
                required={true}
                placeholder="masukkan kuota"
                label="Kuota: "
                value={kuota}
                onchange={(e) => {
                  setKuota(e.target.value);
                }}
              ></Input>
              <Button
                className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                text="Tambahkan"
                type="submit"
              />
            </form>
          </Card>
        </div>

        <div className="flex flex-col h-full w-[63%]">
          <div className="flex flex-col mr-2 gap-4 overflow-auto h-full">
            {/* <SeachField /> */}
            <TablePengujiKoordinator body={bodypage} onDelete={() => console.log("delete")} onEdit={() => console.log("edit")}/>
            {/* <Pagination
              totalItems={totalItems}
              totalPages={totalPage}
              itemsPerPage={pageInterval}
              currentPage={page}
              onPageChange={(page) => {
                setPage(page);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Penguji;
