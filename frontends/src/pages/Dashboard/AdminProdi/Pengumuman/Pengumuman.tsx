import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useEffect, useState } from "react";
import {
  createPengumuman,
  deleteIsiPengumuman,
  getAllPengumuman,
  updateIsiPEngumuman,
} from "../../../../services/AdminProdiService";
import TablePengumuman from "../../../../components/TablePengumuman";
import Swal from "sweetalert2";

interface Data {
  body: {
    isi: string;
    id: number;
    berlaku_mulai: string;
    berlaku_hingga: string;
    created_by: string;
  }[];
}

function convertIsoToDateString(isoString: string) {

  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function Pengumuman() {
  const today = new Date().toISOString().split("T")[0];
  // Mendapatkan tanggal besok dalam format YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
  const [isiPengumuman, setIsiPengumuman] = useState("");
  const [tanggalBerlaku, SetTanggalBerlaku] = useState(today);
  const [tanggalExpired, SetTanggalExpired] = useState("");

  const [bodyPengumuman, setBodyPengumuman] = useState<Data["body"]>([]);
  const [refresh, setRefresh] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [IdPengumuman, setIdPengumuman] = useState(0);

  useEffect(() => {
    getAllPengumuman().then((res) => {
      setBodyPengumuman(res.results);
    });
  }, [refresh]);
  return (
    <div className="h-full">
      <div className="flex gap-5 w-full h-full p-5">
        <div className="w-[37%] ml-2 h-full flex justify-center rounded-xl bg-gray-200 border-t border-b border-black items-center">
          <Card className="border border-black font-poppins p-4 w-full overflow-auto">
            <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
              Kelola Pengumuman
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoadingButton(true);
                console.log(tanggalBerlaku, tanggalExpired);
                if (editMode) {
                  updateIsiPEngumuman({
                    id: IdPengumuman,
                    isi: isiPengumuman,
                    berlaku_mulai: tanggalBerlaku,
                    berlaku_hingga: tanggalExpired,
                  }).then((res) => {
                    setEditMode(false);
                    setLoadingButton(false);
                    if (res.response) {
                      Swal.fire({
                        icon: "success",
                        title: "Yeahh berhasil ditambahkan...",
                        text: res.message,
                        timer: 2000,
                        showConfirmButton: false,
                      }).then(() => {
                        setRefresh(!refresh);
                        setIsiPengumuman("");
                        SetTanggalBerlaku(today);
                        SetTanggalExpired("");
                        setEditMode(false);
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.message,
                        timer: 2000,
                        showConfirmButton: false,
                      });
                    }
                  });
                } else {
                  setLoadingButton(true);
                  createPengumuman({
                    isi: isiPengumuman,
                    berlaku_mulai: tanggalBerlaku,
                    berlaku_hingga: tanggalExpired,
                  }).then((res) => {
                    setLoadingButton(false);
                    if (res.response) {
                      Swal.fire({
                        icon: "success",
                        title: "Yeahh berhasil ditambahkan...",
                        text: res.message,
                        timer: 2000,
                        showConfirmButton: false,
                      }).then(() => {
                        setRefresh(!refresh);
                        setIsiPengumuman("");
                        SetTanggalBerlaku(today);
                        SetTanggalExpired("");
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.message,
                        timer: 2000,
                        showConfirmButton: false,
                      });
                    }
                  });
                }
              }}
            >
              <div className="flex gap-3 flex-col">
                <Input
                  label="Isi Pengumuman: "
                  required={true}
                  type="text"
                  value={isiPengumuman}
                  onchange={(e) => setIsiPengumuman(e.target.value)}
                ></Input>
                <Input
                  placeholder="hari/bulan/tahun"
                  type="date"
                  name="tgl-lahir"
                  label="Berlaku Mulai: "
                  value={tanggalBerlaku}
                  required={true}
                  onchange={(e) => SetTanggalBerlaku(e.target.value)}
                  defaultValue={today} // Mengatur nilai default ke tanggal hari ini
                  min={today}
                />
                <Input
                  placeholder="hari/bulan/tahun"
                  type="date"
                  name="tgl-lahir"
                  value={tanggalExpired}
                  label="Berlaku Hingga: "
                  onchange={(e) => SetTanggalExpired(e.target.value)}
                  required={false}
                  min={tomorrowFormatted} // Mengatur nilai default ke tanggal besok
                />
                <div className="flex gap-3">
                  <Button
                    text="Batal"
                    onClick={() => {
                      setIsiPengumuman("");
                      setEditMode(false);
                    }}
                    type="button"
                    className="bg-red-400 cursor-pointer border border-black rounded-md font-bold w-[30%] mt-4 text-xl hover:bg-[#ae2d2d]"
                  />
                  <Button
                    className={`${
                      editMode
                        ? "bg-yellow-300 hover:bg-yellow-400"
                        : "bg-[#8BD3DD]"
                    } cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                    text={
                      loadingButton
                        ? "Sedang Memproses..."
                        : editMode
                        ? "Perbarui Data"
                        : "Tambahkan"
                    }
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>
        <div className="flex flex-col h-full w-[63%]">
          <div className="flex flex-col mr-2 gap-4 overflow-auto h-full">
            {/* <SeachField /> */}{" "}
            <TablePengumuman
              onEdit={(id: number) => {
                const data = bodyPengumuman.find((item) => item.id === id);
                if (data) {
                  setIsiPengumuman(data.isi);
                  SetTanggalBerlaku(convertIsoToDateString(data.berlaku_mulai));
                  SetTanggalExpired(convertIsoToDateString(data.berlaku_hingga));
                  setEditMode(true);
                  console.log(data);
                  setIdPengumuman(data.id);
                }
              }}
              body={bodyPengumuman}
              onDelete={(id: number) => {
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
                  console.log(id);
                  if (result.isConfirmed) {
                    deleteIsiPengumuman(id).then((res) => {
                      Swal.fire({
                        icon: "success",
                        title: res.message,
                        text: res.message,
                        timer: 2000,
                        showConfirmButton: false,
                      }).then(() => {
                        setRefresh(!refresh);
                      });
                    });
                  }
                });
              }}
            />
          </div>
          <div>
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

export default Pengumuman;
