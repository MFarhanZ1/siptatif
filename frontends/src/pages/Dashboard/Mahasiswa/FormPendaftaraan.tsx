import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import { getDataDosenMahasiswa } from "../../../services/MahasiswaService";

interface InputProps {
  onMenuClick: (menu: string) => void;
}
function FormPendaftaraan({ onMenuClick }: InputProps) {
  const [jenisPendaftaraan, setJenisPendaftaraan] = useState("");
  const [jenisKategori, setJenisKategori] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [pembimbing1, setPembimbing1] = useState("");
  const [pembimbing2, setPembimbing2] = useState("");
  const [judulTugasAkhir, setJudulTugasAkhir] = useState("");
  const [bodyPembimbing1, setBodyPembimbing1] = useState([]);
  const [bodyPembimbing2, setBodyPembimbing2] = useState([]);
  const [filterPembimbing2, setFilterPembimbing2] = useState([]);

  useEffect(() => {
    const updateFilterPembimbing2 = bodyPembimbing2?.filter(
      (data:{nidn: string}) => data.nidn !== pembimbing1
    )
    setFilterPembimbing2(updateFilterPembimbing2);
  },);
  useEffect(() => {
    
    getDataDosenMahasiswa().then((data) => {
      setBodyPembimbing1(data.results);
      setBodyPembimbing2(data.results);
      
    });
  }, [pembimbing1]);
  return (
    <div className="flex overflow-auto justify-center mx-auto my-5 font-poppins">
      <Card className="w-[60%] p-10 border border-black">
        <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
          Pengajuan Judul Tugas Akhir
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(jenisPendaftaraan);
            console.log(nama);
            console.log(nim);
            console.log(judulTugasAkhir);
            console.log(pembimbing1);
          }}
        >
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xl mb-4">
                Jenis Pendaftaraan: <span className="text-red-500">*</span>
              </p>
              <select
                required
                className="w-full border border-black rounded-md p-2"
                value={jenisPendaftaraan}
                onChange={(e) => setJenisPendaftaraan(e.target.value)}
              >
                <option value="">-- Pilih Jenis Pendaftaraan --</option>
                <option value="INDIVIDU">Individu</option>
                <option value="KELOMPOK">Kelompok</option>
              </select>
            </div>

            <Input
              label="Nama: "
              required={true}
              type="text"
              placeholder="Syafat Hidayat"
              onchange={(e) => setNama(e.target.value)}
            ></Input>

            <Input
              label="NIM: "
              required={true}
              type="number"
              placeholder="12250113554"
              onchange={(e) => setNim(e.target.value)}
            ></Input>

            <Input
              label="Judul Tugas Akhir: "
              required={true}
              type="text"
              placeholder="Pengembangan Sistem Deteksi Plagiarisme Berbasis Algoritma Machine Learning"
              onchange={(e) => setJudulTugasAkhir(e.target.value)}
            ></Input>

            <div>
              <p className="text-xl mb-4">
                Kategori Tugas: <span className="text-red-500">*</span>
              </p>
              <select
                required
                value={jenisKategori}
                onChange={(e) => setJenisKategori(e.target.value)}
                className="w-full border border-black rounded-md p-2 mb-4"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="LAPORAN">Laporan</option>
                <option value="PAPERBASED">Paper Based</option>
              </select>
            </div>

            <div>
              <p className="text-xl mb-4">
                Pembimbing 1: <span className="text-red-500">*</span>
              </p>
              <select
                required
                value={pembimbing1}
                onChange={(e) => {
                  setPembimbing1(e.target.value)
                  bodyPembimbing2.pop()
                  console.log(bodyPembimbing2)
                }
                }
                className="w-full border border-black rounded-md p-2 mb-4"
              >
                <option value="" disabled>-- Pilih Pembimbing --</option>
                {bodyPembimbing1?.map((data: {nidn: string, nama: string}) => {
                  return <option key={data.nidn} value={data.nidn}>{data.nama}</option>;
                })}
              </select>
            </div>

            <div>
              <p className="text-xl mb-4">
                Pembimbing 2:{" "}
                <span className="text-sm underline italic">(Opsional)</span>
              </p>
              <select
                value={pembimbing2}
                disabled={pembimbing1 === "" ? true : false}
                onChange={(e) => setPembimbing2(e.target.value)}
                className="w-full border border-black rounded-md p-2 mb-4 disabled:cursor-not-allowed"
              >
                <option value="">-- Pilih Pembimbing --</option>
                {filterPembimbing2?.map((data:{nidn: string, nama: string}) => {
                   return <option key={data.nidn} value={data.nidn}>{data.nama}</option>;
                })}
               
              </select>
            </div>

            <div>
              <p className="text-xl mb-4">
                Berkas: <span className="text-red-500">*</span>
              </p>
              <div
                onClick={() => {}}
                className="w-full bg-slate-500 p-2 rounded-md cursor-pointer text-white italic underline"
              >
                Kirim File
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                className={`bg-[#f8a091] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#c4867b] `}
                text="Batal"
                type="button"
                onClick={() => {
                  onMenuClick("dashboard");
                }}
              />
              <Button
                className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                text="kirim"
                type="submit"
              />
            </div>
          </div>
        </form>
      </Card>
     
    </div>
  );
}

export default FormPendaftaraan;
