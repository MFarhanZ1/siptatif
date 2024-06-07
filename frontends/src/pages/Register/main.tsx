// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import topimage from "../../../assets/images/pngs/siptatif-logo.png";
import FormRegister from "./FormRegister";
import VerifyEmail from "./VerifyEmail";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
function Register() {
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [searchParams] = useSearchParams("");
	const tokenVerification = searchParams.get("__token_verification");

	useEffect(() => {
		if (tokenVerification) {
			fetch(`${process.env.BASE_URL}/verifikasi-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					__token_verification: tokenVerification,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.response) {
						Swal.fire({
							title: "Yeay, verifikasi anda berhasil!",
							html: data.message,
							icon: "success",
							showConfirmButton: false,
							timer: 4000,
						}).then(() => {
							setIsEmailValid(true);
						});
					} else {
						Swal.fire({
							title: "Yah, verifikasi anda gagal!",
							html: data.message,
							icon: "error",
							showConfirmButton: false,
							timer: 4000,
						});
					}
				});
		}
	}, [tokenVerification]);

	return (
		<div className="flex flex-col bg-[#e7f8f1] h-screen font-poppins">
			{/* marquee information */}
			<div className="bg-[#FAAE2B] font-poppins overflow-hidden whitespace-nowrap ">
				<p className="inline-block animate-marquee">
					Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 |
					Kontak admin untuk masalah teknis di support@uin-suska.ac.id
				</p>
			</div>
			{/* main content */}
			<div
				id="main-content"
				className="flex items-center justify-center flex-1 gap-14"
			>
				{/* Logo siptatif usr */}
				<div>
					<img src={topimage} className="w-[530px]" alt="Top Image" />
				</div>
				{/* form login */}
				<div className="w-4/12">
					{isEmailValid ? <FormRegister /> : <VerifyEmail />}
				</div>{" "}
				{/* end of form login */}
			</div>{" "}
			{/* end of main content */}
		</div>
	);
}

export default Register;
