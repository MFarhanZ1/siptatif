const kirimLinkLupaPasswordService = async(params: {email: string}) => {
  const email = params.email;
	const response = await fetch(`${process.env.BASE_URL}/kirim-link-lupa-password`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
		}),
	})
	
	const data = await response.json();

	return data;
}
const verifyLupaPasswordTokenFromEmailService = async (
  tokenVerification: string
) => {
  const response = await fetch(`${process.env.BASE_URL}/verifikasi-token-lupa-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      __token_verification: tokenVerification,
    }),
  });

  const data = await response.json();
  return data;
};

const resetPasswordService = async (params: {email: string, password: string}) => {
  const email = params.email;
  const password = params.password;
  
  const response = await fetch(`${process.env.BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  console.log(email, password);
  const data = await response.json();
  return data;
}

export { 
  kirimLinkLupaPasswordService, 
  verifyLupaPasswordTokenFromEmailService,
  resetPasswordService
};
