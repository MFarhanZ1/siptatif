import fetchWithInterceptor from "./FetchInterceptor";

const getDataDosenMahasiswa = async () => {
	const response = await fetchWithInterceptor(
		`${process.env.BASE_URL}/pembimbing`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
		}
	);
	const data = await response.json();
	return data;
};

const getDataDosenMahasiswaPage = async (page: number) => {
	const response = await fetchWithInterceptor(
		`${process.env.BASE_URL}/pembimbing?page=${page}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
		}
	);
	const data = await response.json();
	return data;
};

const getDataDosenMahasiswaSearch = async (search: string) => {
	const response = await fetchWithInterceptor(
		`${process.env.BASE_URL}/pembimbing?search=${search}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
		}
	);
	const data = await response.json();
	return data;
};

const daftarTugasAkhir = async (judul_ta:string, jenis_pendaftaran:string, kategori_ta:string, berkas:string, nim:string, nidn_pembimbing1:string, nidn_pembimbing2:string) => {
    const response = await fetchWithInterceptor(
        `${process.env.BASE_URL}/tugas-akhir`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify({
                judul_ta:judul_ta,
                jenis_pendaftaran: jenis_pendaftaran,
                kategori_ta: kategori_ta,
                berkas: berkas,
                nim: nim,
                nidn_pembimbing1: nidn_pembimbing1,
                nidn_pembimbing2: nidn_pembimbing2 || null
            }),
        }
    );
    const data = await response.json();
    return data;
};

const getTAMhsInfo = async () => {
	const response = await fetchWithInterceptor(
		`${process.env.BASE_URL}/tugas-akhir-info`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
		}
	);
	const data = await response.json();
	return data;
}

export { getDataDosenMahasiswa, getDataDosenMahasiswaPage, getDataDosenMahasiswaSearch, daftarTugasAkhir, getTAMhsInfo };
