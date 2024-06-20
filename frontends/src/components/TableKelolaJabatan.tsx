import iconedit from "../../assets/icons/edit.svg";
import icondelete from "../../assets/icons/delete.svg";

interface TableProps {
	action?: boolean;
	body: {
		nidn?: string;
		nama?: string;
		jabatan?: string;
		email?: string;
	}[];
	onDelete: (email: string) => void;
}

const TableKelolaJabatan = ({ body, action, onDelete }: TableProps) => {
	return (
		<div className="overflow-x-auto border border-black font-poppins h-full flex-grow">
			<table className="w-full text-xs text-left table-auto">
				<thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
					<tr className="text-center text-sm">
						<th scope="col" className="">
							NIDN
						</th>
						<th scope="col" className="">
							Nama Dosen
						</th>
						<th scope="col" className="">
							Jabatan
						</th>
						<th scope="col" className="">
							Email
						</th>
						<th scope="col" className="">
							Aksi
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{body?.map((item) => (
						<tr
							key={item.nidn}
							className="bg-white border-b border-gray-700 text-center odd:bg-gray-200 even:bg-gray-300"
						>
							<td className="px-6 py-2 truncate max-w-32">{item.nidn}</td>
							<td className="px-6 py-2 truncate max-w-36">{item.nama}</td>
							<td className="px-6 py-2 truncate max-w-32">{item.jabatan}</td>
							<td className="px-6 py-2 truncate max-w-36">{item.email}</td>
							{action && (
								<td className="flex py-2 items-center justify-center">
									<div className="flex items-center justify-center gap-1">
										<button
											type="button"
											onClick={() => {
												onDelete(item.email!);
											}}
										>
											<img src={icondelete} alt="Delete" className="w-6" />
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableKelolaJabatan;
