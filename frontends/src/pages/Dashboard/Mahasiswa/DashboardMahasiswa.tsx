import { useEffect, useState } from "react";
import { getTAMhsInfo } from "../../../services/MahasiswaService";

function convertIsoToDateString(isoString: string) {
	if (!isoString) {
		return "";
	}

	const date = new Date(isoString);
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() - offset);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function decideColor(status: string) {
    switch (status) {
		case "DITOLAK":
			return "bg-red-300";			
		case "SETUJU":
			return "bg-green-300";		
		default:
			return "bg-yellow-300";			
	}
}

const DashboardMahasiswa = () => {
	const [body, setBody] = useState([]);

	const [status, setStatus] = useState("BELUM PERNAH MENDAFTAR");
	const [noRegTA, setNoRegTA] = useState("daftar dulu mas");
	const [tglMendaftar, setTglMendaftar] = useState("");
	const [judulTA, setJudulTA] = useState("");
	const [pembimbing1, setPembimbing1] = useState("");
	const [pembimbing2, setPembimbing2] = useState("");
	const [catatan, setCatatan] = useState("");

    const [penguji1, setPenguji1] = useState("");
    const [penguji2, setPenguji2] = useState("");

	useEffect(() => {
		getTAMhsInfo().then((data) => {
			if (data.response) {
				setBody(data.results);
				setStatus(data.results[0].status);
				setNoRegTA(data.results[0].no_reg_ta);
				setTglMendaftar(convertIsoToDateString(data.results[0].timestamp));
				setJudulTA(data.results[0].judul_ta);
				setPembimbing1(data.results[0].dosen_pembimbing1);
				setPembimbing2(data.results[0].dosen_pembimbing2);
				setCatatan(data.results[0].catatan);
                setPenguji1(data.results[0].dosen_penguji1);
                setPenguji2(data.results[0].dosen_penguji2);
			}
		});
	}, []);

	let bgColor = "";
	let emotStatus = "";
	switch (status) {
		case "DITOLAK":
			bgColor = "bg-red-300";
			emotStatus = "😭";
			break;
		case "SETUJU":
			bgColor = "bg-green-300";
			emotStatus = "🥳";
			break;
		default:
			bgColor = "bg-yellow-300";
			emotStatus = "😫";
			break;
	}
	return (
		<div className="p-6 h-full font-poppins flex flex-col gap-3 -mt-2">
			<h1 className="text-3xl font-bold underline">
				Status pendaftaraan TA terakhir anda:{" "}
				<span className="text-xl italic">({noRegTA})</span>
			</h1>

			<div className="w-full h-[300px] flex justify-center items-center rounded-xl border border-black">
				
				{ status != "BELUM PERNAH MENDAFTAR" && <div className="w-full h-full bg-blue-300 rounded-l-xl p-4 overflow-auto">
					<table className="w-full border border-black">
						<tr>
							<td className="font-medium p-2 bg-blue-500 text-white border border-black">
								📆 ~ Tanggal Mendaftar:{" "}
							</td>
							<td className="p-2 border border-black">{tglMendaftar}</td>
						</tr>
						<tr>
							<td className="font-medium p-2 bg-purple-500 text-white border border-black">
								📚 ~ Judul TA:{" "}
							</td>
							<td className="p-2 border border-black">{judulTA}</td>
						</tr>
						<tr>
							<td className="font-medium p-2 bg-green-500 text-white border border-black">
								👩‍🏫 ~ Pembimbing 1:{" "}
							</td>
							<td className="p-2 border border-black">{pembimbing1}</td>
						</tr>
						<tr>
							<td className="font-medium p-2 bg-pink-500 text-white border border-black">
								👩 ~ Pembimbing 2:{" "}
							</td>
							<td className="p-2 border border-black">
								{pembimbing2 || "Tidak memilih dosen pembimbing 2"}
							</td>
						</tr>
						<tr>
							<td className="font-medium p-2 bg-gray-500 text-white border border-black">
								📝 ~ Catatan:{" "}
							</td>
							<td className="p-2 border border-black">
								{catatan || "Belum ada catatan"}
							</td>
						</tr>
					</table>
				</div>}

				<div
					className={`${bgColor} w-full h-full flex flex-col gap-7 justify-center items-center rounded-r-xl`}
				>
					<h1 className="text-5xl font-poppins-semibold">
						{emotStatus} ~{" "}
						{status[0].toUpperCase() + status.slice(1).toLowerCase() == 'Setuju' ? 'Disetujui' : status[0].toUpperCase() + status.slice(1).toLowerCase()}!
					</h1>
                    {status === "SETUJU" && <div className="w-full h-20  flex justify-center items-center">
                        <table className="w-[400px] border border-black">
                            <tr>
                                <td className="font-medium p-2 bg-pink-500 text-white border border-black">
                                    👩‍🍳 ~ Penguji 1:{" "}
                                </td>
                                <td className="p-2 border border-black">
                                    {penguji1}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-medium p-2 bg-green-500 text-white border border-black">
                                    👩‍🚀 ~ Penguji 2:{" "}
                                </td>
                                <td className="p-2 border border-black">
                                    {penguji2}
                                </td>
                            </tr>
                        </table>
                    </div>}
				</div>
			</div>

			<div className="">
                <h1 className="text-3xl mt-2 font-bold underline">
                    Riwayat Pendaftaran TA anda:{" "}
                </h1>
            </div>

			<div className="w-full h-full overflow-auto border-b border-black">
				<div className="w-full h-full">
					<table className="w-full h-full">
						<thead className="bg-purple-400 sticky top-0">
							<th className="border border-black">No. Reg TA</th>
							<th className="border border-black">Tanggal Mendaftar</th>
							<th className="border border-black">Judul Tugas Akhir</th>
							<th className="border border-black">Pembimbing 1</th>
							<th className="border border-black">Pembimbing 2</th>
							<th className="border border-black">Status</th>
						</thead>
						<tbody>
							{status == "BELUM PERNAH MENDAFTAR" && (
								<tr>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
									<td className="border border-black p-3 text-center underline italic">Belum ada data mas!</td>
								</tr>
							)}
							{body?.map(
								(item: {
									no_reg_ta: string;
									timestamp: string;
									judul_ta: string;
									dosen_pembimbing1: string;
									dosen_pembimbing2: string;
									status: string;
								}) => (
									<tr key={item.no_reg_ta}>
										<td className="border border-black p-3">{item.no_reg_ta}</td>
										<td className="border border-black p-3">
											{convertIsoToDateString(item.timestamp)}
										</td>
										<td className="border border-black p-3">{item.judul_ta}</td>
										<td className="border border-black p-3">{item.dosen_pembimbing1}</td>
										<td className="border border-black p-3">{item.dosen_pembimbing2}</td>
										<td className="border border-black p-3">{
                                            <div className={`${decideColor(item.status)} border border-black text-center p-2 rounded-xl font-semibold`}>
                                                {item.status}
                                            </div>
                                        }</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DashboardMahasiswa;
