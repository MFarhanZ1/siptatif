import { SetStateAction, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Pagination from "../../../../components/Pagination";
import {
	createDataDosen,
	deleteDataDosen,
	editDataDosen,
	getDataDosenPage,
	getDataDosenSearch,
} from "../../../../services/AdminProdiService";
import TableDosenAdmin from "../../../../components/TableDataDosenAdmin";
import SeachField from "../../../../components/SeachField";
import Swal from "sweetalert2";
interface Data {
	body: {
		nidn?: string;
		nama?: string;
		no_hp?: string | null;
		jenis_kelamin?: string | null;
		email?: string;
	}[];
}
function KelolaDataDosen() {
	const [namaDosen, setNamaDosen] = useState("");
	const [nidnDosen, setNidnDosen] = useState("");
	const [emailDosen, setEmailDosen] = useState("");
	const [noHp, setNoHp] = useState("");

	const [body, setBody] = useState<Data["body"]>([]);
	const [page, setPage] = useState(1);

	const [pageInterval, setPageInterval] = useState(20);
	const [totalItems, setTotalItems] = useState(0);
	// const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [gender, setGender] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [loadingButton, setLoadingButton] = useState(false);

	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		getDataDosenPage(page).then((data) => {
			// console.log(data.results);
			setBody(data.results);

			setTotalItems(data.info.total_all_data);
			setPageInterval(data.info.data_per_page);
			// setCurrentPage(data.info.current_page);
			setTotalPage(data.info.total_page);
		});
	}, [page, refresh]);

	const [searchData, setSearchData] = useState("");
	useEffect(() => {
		if (!searchData) {
			setRefresh(!refresh);
		}
		getDataDosenSearch(searchData).then((data) => {
			setBody(data.results);

			setTotalItems(data.info.total_all_data);
			setPageInterval(data.info.data_per_page);
			// setCurrentPage(data.info.current_page);
			setTotalPage(data.info.total_page);
		});
	}, [searchData]);

	return (
		<div className="h-full">
			<div className="flex gap-5 w-full h-full p-5">
				<div className="w-[37%] ml-2 h-full flex justify-center rounded-xl bg-gray-200 border-t border-b border-black items-center">
					<Card className="border border-black font-poppins p-4 w-full overflow-auto">
						<h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
							Kelola Data Dosen
						</h1>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								// console.log(nidnDosen, namaDosen, emailDosen, noHp, gender);
								setLoadingButton(true);

								if (editMode) {
									editDataDosen({
										nidn: nidnDosen,
										nama: namaDosen,
										email: emailDosen,
										no_hp: noHp,
										jenis_kelamin: gender,
									}).then((data) => {
										setLoadingButton(false);
										if (data.response) {
											Swal.fire({
												icon: "success",
												title: "Perubahan data dosen berhasil!",
												text: data.message,
												showConfirmButton: false,
												showCloseButton: false,
												timer: 2000,
											}).then(() => {
												setRefresh(!refresh);
												setEditMode(false);
												setNidnDosen("");
												setNamaDosen("");
												setEmailDosen("");
												setNoHp("");
												setGender("");
											});
										} else {
											Swal.fire({
												icon: "error",
											});
										}
									});
								} else {
									createDataDosen({
										nidn: nidnDosen,
										nama: namaDosen,
										email: emailDosen,
										no_hp: noHp,
										jenis_kelamin: gender,
									}).then((data) => {
										setLoadingButton(false);
										if (data.response) {
											Swal.fire({
												icon: "success",
												title: "Penambahan data dosen berhasil!",
												text: data.message,
												showConfirmButton: false,
												showCloseButton: false,
												timer: 2000,
											}).then(() => {
												setRefresh(!refresh);
												setNidnDosen("");
												setNamaDosen("");
												setEmailDosen("");
												setNoHp("");
												setGender("");
											});
										} else {
											Swal.fire({
												icon: "error",
												title: "Penambahan data dosen gagal!",
												text: data.message,
												showConfirmButton: false,
												showCloseButton: false,
												timer: 2000,
											});
										}
									});
								}
							}}
						>
							<Input
								label="NIDN: "
								required={true}
								value={nidnDosen}
								type="number"
								disabled={editMode}
								classNameInput="disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100"
								placeholder="0010107574"
								onchange={(e) => setNidnDosen(e.target.value)}
							></Input>
							<Input
								label="Nama Dosen: "
								required={true}
								value={namaDosen}
								type="text"
								onchange={(e) => setNamaDosen(e.target.value)}
								placeholder="Syafat Hidayat"
							></Input>
							<Input
								label="Email: "
								required={true}
								type="email"
								value={emailDosen}
								placeholder="syafaat@uin-suska.ac.id"
								onchange={(e) => setEmailDosen(e.target.value)}
							></Input>
							<Input
								placeholder="e.g: 089123456789"
								type="text"
								name="nohp"
								label="No. HP/WA:"
								required={false}
								autocomplete="off"
								maxLength={15}
								minLength={11}
								value={noHp}
								oninput={(e) => {
									const pattern = /[a-zA-Z]+/;
									if (!pattern.test(e.target.value) || e.target.value === "") {
										setNoHp(e.target.value);
									}
								}}
							/>
							<div>
								<p className="text-xl mb-4 font-poppins">
									Jenis Kelamin: <span className="text-red-500">*</span>
								</p>
								<select
									onChange={(e) => setGender(e.target.value)}
									className="w-full border border-black rounded-md p-2"
									value={gender}
									required
								>
									<option value="">-- Pilih Jenis Kelamin --</option>
									<option value="L">Laki-laki</option>
									<option value="P">Perempuan</option>
								</select>
							</div>
							<div className="flex gap-3">
								<Button
									text="Batal"
									onClick={() => {
										setEditMode(false);
										setNidnDosen("");
										setNamaDosen("");
										setEmailDosen("");
										setNoHp("");
										setGender("");
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
						</form>
					</Card>
				</div>
				<div className="flex flex-col h-full w-[63%]">
					<div className="flex flex-col mr-2 gap-4 overflow-auto h-full">
						<SeachField
            placeholder="Cari berdasarkan NIDN, ataupun Nama Dosen..."
							onChange={(e) => {
								setSearchData(e as SetStateAction<string>);
							}}
						/>
						<TableDosenAdmin
							onDelete={(nidn) => {
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
										deleteDataDosen(nidn).then((data) => {
											if (data.response) {
												Swal.fire({
													icon: "success",
													title: "Hapus data dosen berhasil!",
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
							onEdit={(nidn) => {
								const dosen = body.find((d) => d.nidn === nidn);
								if (dosen) {
									setNidnDosen(dosen.nidn!);
									setNamaDosen(dosen.nama!);
									setEmailDosen(dosen.email!);
									setNoHp(dosen.no_hp!);
									setGender(dosen.jenis_kelamin!);
									setEditMode(true);
									setNidnDosen(nidn);
								}
							}}
							body={body}
							action={true}
						/>
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
	);
}

export default KelolaDataDosen;
