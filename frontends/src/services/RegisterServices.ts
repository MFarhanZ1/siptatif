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
	const response = await fetch(`${process.env.BASE_URL}/verifikasi-token`, {
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

const registerService = (request: React.FormEvent<HTMLFormElement>, params: {email: string}) => {
    
	const form = new FormData(request.target as HTMLFormElement);

	const nama = form.get("nama");
	const password = form.get("password");

	const email = params.email;
	const nim = email.split("@")[0];

	console.log(nama);
	console.log(email);
	console.log(nim);
	console.log(password);
};

export {
	verifyEmailService,
	verifyRegisterTokenFromEmailService,
    registerService
}