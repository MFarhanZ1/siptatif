import React, { SetStateAction, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SeachField from "../../../../components/SeachField";
import {
  createAkunByJabatan,
  deleteAkunByJabatan,
	getAllDataDosen,
	getListAkunByJabatan,
} from "../../../../services/AdminProdiService";
import TableKelolaJabatan from "../../../../components/TableKelolaJabatan";
import Swal from "sweetalert2";
// import Pagination from '../../../../components/Pagination';

function KelolaJabatanDosen() {
	const [bodyDosen, SetBodyDosen] = useState([]);
	const [bodyListAkunByJabatan, SetBodyListAkunByJabatan] = useState([]);
	const [nidnAndEmail, SetNidnAndEmail] = useState("");
	const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		getAllDataDosen().then((data) => {
			SetBodyDosen(data.results);
      console.log(data.results);
		});
		getListAkunByJabatan(search).then((data) => {
			console.log(data);
			SetBodyListAkunByJabatan(data.results);
		});
	}, []);

	useEffect(() => {
		getListAkunByJabatan(search).then((data) => {
			SetBodyListAkunByJabatan(data.results);
		});
	}, [search, refresh]);

	return (
		<div className="h-full">
			<div className="flex gap-5 w-full h-full p-5">
				<div className="w-[37%] ml-2 h-full flex justify-center rounded-xl bg-gray-200 border-t border-b border-black items-center">
					<Card className="border border-black font-poppins p-4 w-full overflow-auto">
						<h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
							Kelola Jabatan Dosen
						</h1>
						<form
							onSubmit={(e) => {
								e.preventDefault();
                createAkunByJabatan(nidnAndEmail.split("#")[1], nidnAndEmail.split("#")[0])
                  .then((data) => {
                    if (data.response) {
                      Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: data.message,
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.message,
                        showConfirmButton: false,
                        timer: 3000,
                      })
                    }
                    setRefresh(!refresh);
                    SetNidnAndEmail("");
                  })
							}}
						>
							<div className="flex gap-3 flex-col">
								<div>
									<p className="text-xl mb-4 font-poppins">
										Nama Dosen: <span className="text-red-500">*</span>
									</p>
									<select
										onChange={(e) => SetNidnAndEmail(e.target.value)}
										className="w-full border border-black rounded-md p-2"
                    required
									>
										<option value="" disabled selected={nidnAndEmail === ""}>
											-- Pilih Dosen --
										</option>
										{bodyDosen?.map((data: { nidn: string; nama: string; email: string; }) => {
											return <option value={`${data.nidn}#${data.email}`}>{data.nama}</option>;
										})}
										
									</select>
								</div>

								<Input
									label="NIDN: "
									required={true}
									type="text"
									disabled={true}
									classNameInput="disabled:bg-gray-100 disabled:cursor-not-allowed"
									value={nidnAndEmail.split("#")[0]}
								></Input>
								<div>
									<p className="text-xl mb-4 font-poppins">
										Jabatan: <span className="text-red-500">*</span>
									</p>
									<select required className="w-full border border-black rounded-md p-2">
										<option value="" disabled selected={nidnAndEmail === ""}>
											-- Pilih Jabatan --
										</option>
										<option value="2">Koordinator TA</option>
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
							placeholder="Cari berdasarkan Nama Dosen, atau Jabatan..."
							onChange={(e) => {
								setSearch(e as SetStateAction<string>);
							}}
						/>
						<TableKelolaJabatan
							body={bodyListAkunByJabatan}
							action={true}
							onDelete={(email) => {
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
										deleteAkunByJabatan(email).then((data) => {
											if (data.response) {
												Swal.fire({
													icon: "success",
													title: "Hapus jabatan dosen berhasil!",
													text: data.message,
													showConfirmButton: false,
													showCloseButton: false,
													timer: 2000,
												}).then(() => {
													setRefresh(!refresh);
												});
											} else {
												Swal.fire({
													icon: "error",
													title: "Hapus data dosen gagal!",
													text: data.message,
													showConfirmButton: false,
													showCloseButton: false,
													timer: 2000,
												});
											}
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

export default KelolaJabatanDosen;
