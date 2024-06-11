const verifyEmailService = async(request: React.FormEvent<HTMLFormElement>) => {

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

const registerService = (request: React.FormEvent<HTMLFormElement>, params: {email: string, nama: string, tgl_lahir: string, no_hp: string}) => {
    
	const form = new FormData(request.target as HTMLFormElement);

	const password = form.get("password");

	const email = params.email;
	const nim = email.split("@")[0];
	const nama = params.nama;
	const tgl_lahir = params.tgl_lahir;
	const no_hp = params.no_hp;

	console.log(nama);
	console.log(email);
	console.log(nim);
	console.log(password);
	console.log(tgl_lahir);
	console.log(no_hp);
};

export {
	verifyEmailService,
	verifyRegisterTokenFromEmailService,
    registerService
}