import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SeachField from "../../../../components/SeachField";
import { getAllDataDosen } from "../../../../services/AdminProdiService";
// import Pagination from '../../../../components/Pagination';

function KelolaJabatanDosen() {
  const [bodyDosen, SetBodyDosen] = useState([]);
  const [nidn, SetNidn] = useState("");
  useEffect(() => {
    getAllDataDosen().then((data) => {
      SetBodyDosen(data.results);
    });
  });
  return (
    <div>
      <div className="flex h-full">
        <div className="flex flex-col w-[37%] m-3">
          <Card className="px-6 py-5 border border-black p-2 font-poppins">
            <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
              Kelola Jabatan Dosen
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-3 flex-col">
                <div>
                  <p className="text-xl mb-4 font-poppins">
                    Nama Dosen: <span className="text-red-500">*</span>
                  </p>
                  <select
                    onChange={(e) => SetNidn(e.target.value)}
                    className="w-full border border-black rounded-md p-2"
                  >
                    <option value="" disabled selected>
                      -- Pilih Dosen --
                    </option>
                    {bodyDosen.map((data: { nidn: string; nama: string }) => {
                      return <option value={data.nidn}>{data.nama}</option>;
                    })}
                    {/* {body.map((data: Data) => {
                  return <option value={data.nidn}>{data.nama}</option>;
                })} */}
                  </select>
                </div>

                <Input
                  label="NIDN: "
                  required={true}
                  type="text"
                  disabled={true}
                  value={nidn}
                ></Input>
                <div>
                  <p className="text-xl mb-4 font-poppins">
                    Jabatan: <span className="text-red-500">*</span>
                  </p>
                  <select className="w-full border border-black rounded-md p-2">
                    <option value="" disabled selected>
                      -- Pilih Jabatan --
                    </option>
                    <option value="">Koordinator TA</option>
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
        <div className="ml-2 m-3 flex flex-col gap-4 h-full flex-grow">
          <div className="flex flex-col gap-2 overflow-auto max-h-[428px]">
            {/* <SeachField /> */}
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
    </div>
  );
}

export default KelolaJabatanDosen;
