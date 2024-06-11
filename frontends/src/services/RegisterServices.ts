const kirimLinkVerifikasiEmailService = async(request: React.FormEvent<HTMLFormElement>) => {

	const form = new FormData(request.target as HTMLFormElement);

	const response = await fetch(`${process.env.BASE_URL}/kirim-link-verifikasi`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: form.get("email"),
		}),
	})
	
	const data = await response.json();

	return data;
}

const verifyRegisterTokenFromEmailService = async (tokenVerification: string) => {
	const response = await fetch(`${process.env.BASE_URL}/verifikasi-token-register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			__token_verification: tokenVerification,
		}),
	})
	
	const data = await response.json();
	return data;
}

const registerService = async (params: {email: string, password: string, nama: string, tgl_lahir: string, no_hp: string}) => {
	const email = params.email;
	const nim = email.split("@")[0];
	const nama = params.nama;
	const tgl_lahir = params.tgl_lahir;
	const no_hp = params.no_hp;
	const password = params.password;
	
	const response = await fetch(`${process.env.BASE_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: password,
			nim: nim,
			nama: nama,
			tanggal_lahir: tgl_lahir,
			no_hp: no_hp,
		}),
	});
	console.log(email, password, nim, nama, tgl_lahir, no_hp);
	const data = await response.json();
	return data;
};

export {
	kirimLinkVerifikasiEmailService,
	verifyRegisterTokenFromEmailService,
    registerService
}