interface DashboardAdminProps {
    onMenuClick: (menu: string) => void;
}

const DashboardAdminProdi = ({onMenuClick}: DashboardAdminProps) => {
	return (
		<div className="w-full h-full font-poppins p-5 flex flex-col gap-6">
			<div>
				<h1 className="text-5xl font-bold">Selamat Datang,</h1>
				<p className="text-2xl italic underline">
					Admin Prodi TIF UIN Suska Riau.
				</p>
			</div>

			<div className="h-[2px] bg-black" />

			<div className="grid grid-cols-2 h-96 gap-4 font-poppins">

				<div onClick={() => onMenuClick("kelolaodosen")} className="hover:bg-red-300 hover:cursor-pointer hover:skew-y-1 active:skew-y-0 active:bg-red-400 h-full w-full bg-red-200 border-2 border-black flex items-center gap-2 p-7 rounded-2xl">
					<p className="text-6xl">👩‍🏫</p>
					<div className="flex flex-col gap-3">
						<div>
							<h1 className="font-bold text-4xl">Mulai Mengelola Data Dosen</h1>
							<p className="text-xl">
								Silakan mulai mengelola dosen dan lihat riwayat pengelolaan kamu
								sebelumnya.
							</p>
						</div>
						<p className="text-2xl underline">{"> Detail"}</p>
					</div>
				</div>
				<div onClick={() => onMenuClick("pengumuman")} className="hover:bg-blue-300 hover:cursor-pointer hover:-skew-y-1 active:skew-y-0 active:bg-blue-400 h-full w-full bg-blue-200 border-2 border-black flex items-center gap-2 p-7 rounded-2xl">
					<p className="text-6xl">📢</p>
					<div className="flex flex-col gap-3">
						<div>
							<h1 className="font-bold text-4xl">Mulai Kelola Pengumuman</h1>
							<p className="text-xl">
								Silakan mulai mengelola pengumuman dan lihat riwayat pengelolaan kamu
								sebelumnya.
							</p>
						</div>
						<p className="text-2xl underline">{"> Detail"}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardAdminProdi;
