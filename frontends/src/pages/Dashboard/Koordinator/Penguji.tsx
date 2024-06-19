import { useEffect, useState } from "react";
import { getAllDataDosen } from "../../../services/AdminProdiService";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SeachField from "../../../components/SeachField";

interface Data {
  nidn: string;
  nama: string;
}
function Penguji() {
  const [body, Setbody] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState({ nidn: "", nama: "" });
  useEffect(() => {
    getAllDataDosen().then((data) => {
      Setbody(data.results);
    });
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (e: any) => {
    const selectedNidn = e.target.value;
    const selectedData = body.find((data: Data) => data.nidn === selectedNidn);
    setSelectedDosen(selectedData || { nidn: "", nama: "" });
  };
  return (
    <div className="flex m-3">
      <div className="flex flex-col w-[37%]">
        <Card className="p-10 w-full">
          <h1 className="text-xl text-center ml-1 underline mb-6 font-poppins-semibold">
            Dosen Penguji
          </h1>

          <form>
            <p className="text-xl mb-4 font-poppins">
              Nama Dosen: <span className="text-red-500">*</span>
            </p>
            <select
              className="w-full border border-black rounded-md p-2"
              onChange={handleSelectChange}
              value={selectedDosen.nidn}
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
              placeholder="Syafat Hidayat"
              label="NIDN: "
              value={selectedDosen.nidn}
            ></Input>

            <Input
              className=""
              type="text"
              maxLength={2}
              required={true}
              placeholder="masukkan kuota"
              label="Kuota: "
              oninput={(e) => {
                const pattern = /[a-zA-Z]+/;
                if (!pattern.test(e.target.value) || e.target.value === "") {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }
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
      <div className="ml-2 m-3 flex flex-col gap-4 h-full flex-grow">
        <div className="flex flex-col gap-2 overflow-auto max-h-[428px]">
          <SeachField />
          {/* <TableDosenAdmin header={header} body={body} action={true} /> */}
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
  );
}

export default Penguji;
